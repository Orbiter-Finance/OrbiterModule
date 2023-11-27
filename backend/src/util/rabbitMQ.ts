import * as amqp from "amqplib";
import { accessLogger, errorLogger } from "./logger";

interface IRabbitMQConfig {
  url: string;
  reconnectInterval?: number;
}

interface IProducerConfig {
  exchangeName: string;
  exchangeType: "fanout" | "direct" | "topic";
  queueName?: string;
  routingKey?: string;
}

interface IConsumerConfig {
  exchangeName: string;
  exchangeType: "fanout" | "direct" | "topic";
  queueName: string;
  routingKey?: string;
}

export class RabbitMQ {
  private config: IRabbitMQConfig;
  private connection: amqp.Connection | null;
  private channel: amqp.Channel | null;
  public consumer!: Consumer;
  constructor(config: IRabbitMQConfig) {
    this.config = {
      ...config,
      reconnectInterval: config.reconnectInterval ?? 5000,
    };
    this.connection = null;
    this.channel = null;
  }

  public connect(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.connection) {
        resolve(this.connection);
      }
      amqp
        .connect(this.config.url, {
          clientProperties: {
            connection_name: `${this.getPrefix().serverName}_${Number(process.env.NODE_APP_INSTANCE || 0)}`,
          },
        })
        .then(async connection => {
          console.log(`RabbitMQ connected to ${this.config.url}`);
          this.connection = connection;
          this.connection.on("error", error => {
            this.reconnect();
            errorLogger.error(`RabbitMQ connection error: ${error.message}`);
          });
          this.connection.on("close", () => {
            console.error(`RabbitMQ connection closed`);
            this.reconnect();
          });
          this.channel = await this.createChannel();
          this.consumer = await this.createConsumer();
          this.channel.on("error", async err => {
            this.channel = await this.createChannel();
            errorLogger.error(`channel error: ${err.message}`);
          });
          resolve(this.connection);
        })
        .catch(error => {
          this.reconnect();
          errorLogger.error(`Failed to connect to RabbitMQ: ${error.message}`);
          reject(error);
        });
    });
  }

  private createChannel(): Promise<amqp.Channel> {
    return new Promise((resolve, reject) => {
      this.connection
        ?.createChannel()
        .then(channel => {
          accessLogger.log(`RabbitMQ channel created`);
          // this.channel = channel;
          resolve(channel);
        })
        .catch(error => {
          errorLogger.error(
            `Failed to create RabbitMQ channel: ${error.message}`,
          );
          this.reconnect();
          reject(error);
        });
    });
  }

  private reconnect(): void {
    if (this.connection) {
      this.connection.removeAllListeners();
      this.connection = null;
    }
    if (this.channel) {
      this.channel.removeAllListeners();
      this.channel = null;
    }
    console.log(
      `Reconnecting to RabbitMQ in ${Number(this.config.reconnectInterval) / 1000
      } seconds...`
    );
    setTimeout(() => this.connect(), this.config.reconnectInterval);
  }
  getPrefix() {
    const serverName = (process.env["ServerName"] || "server").toLocaleLowerCase();
    const exchange = `v1Explore`;
    return { exchange: exchange, serverName };
  }
  async bindQueue(config: IProducerConfig) {
    await this.channel?.assertExchange(
      config.exchangeName,
      config.exchangeType,
      { durable: true },
    );
    const assertQueue = await this.channel?.assertQueue(
      config.queueName || "",
      { durable: true },
    );
    await this.channel?.bindQueue(
      assertQueue?.queue ?? "",
      config.exchangeName,
      config.routingKey || "",
    );
    return assertQueue;
  }
  async createConsumer(): Promise<Consumer> {
    const { exchange, serverName } = this.getPrefix();
    const config: IConsumerConfig = {
      exchangeName: exchange,
      exchangeType: "direct",
      queueName: process.env['QUEUE_NAME'] || "maker-queue",
      routingKey: "",
    };
    const { exchangeName, exchangeType, queueName, routingKey } = config;
    if (!this.channel) {
      this.channel = await this.createChannel();
    }
    await this.channel?.assertExchange(exchangeName, exchangeType, {
      durable: true,
    });
    const assertQueue = await this.channel?.assertQueue(queueName, {
      durable: true,
    });
    await this.channel?.bindQueue(
      assertQueue?.queue ?? "",
      exchangeName,
      routingKey || "",
    );
    accessLogger.info(`create consume`);
    return new Consumer(this.channel, config);
  }
}
class Consumer {
  private channel: amqp.Channel;
  private exchangeName: string;
  private queueName: string;
  private routingKey: string;

  constructor(channel: amqp.Channel, private readonly config: IConsumerConfig) {
    this.channel = channel;
    this.exchangeName = this.config.exchangeName;
    this.queueName = this.config.queueName || "";
    this.routingKey = this.config.routingKey || "";
  }

  async consume(callback: (message: any) => Promise<boolean>): Promise<void> {
    try {
      await this.channel.assertExchange(
        this.exchangeName,
        this.config.exchangeType,
        { durable: true },
      );
      await this.channel.assertQueue(this.queueName, { durable: true });
      await this.channel.bindQueue(
        this.queueName,
        this.exchangeName,
        this.routingKey,
      );
      // console.log(`Waiting for messages from RabbitMQ...`);
      this.channel.prefetch(20, false);
      this.channel.consume(
        this.queueName,
        (message: amqp.ConsumeMessage | null) => {
          if (message !== null) {
            // console.log(`Received message from RabbitMQ `);
            callback(message.content.toString()).then(result => {
              if (result === true) {
                this.channel.ack(message);
              }
            });
          }
        },
        {
          noAck: false,
        },
      );
    } catch (error) {
      console.error(
        `Failed to consume messages from RabbitMQ: ${(error as Error).message}`,
      );
      throw error;
    }
  }
}
