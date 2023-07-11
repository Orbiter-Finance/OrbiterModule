import winston, { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
export type LoggerType = winston.Logger;
import path from "path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const LogstashTransport = require("winston-logstash/lib/winston-logstash-latest");
export interface WinstonTelegramOption {
  host?: string;
  token: string;
  chatId: string;
  parseMode?: string;
  level?: string;
  disableNotification?: boolean;
}
export interface WinstonXOptions {
  logDir?: string;
  label?: string;
  debug?: boolean;
  telegram?: WinstonTelegramOption;
  transports?: [];
  logstash?: {
    port: number;
    level?: string;
    node_name: string;
    host: string;
  };
}
export const formatMeta = (meta: any) => {
  // You can format the splat yourself
  const splat = meta[Symbol.for("splat")];
  let data = "";
  if (splat && splat.length) {
    try {
      data =
        splat.length === 1 ? JSON.stringify(splat[0]) : JSON.stringify(splat);
    } catch (error) {
      console.error("formatMeta error", error);
    }
  }
  return data != "{}" ? data : "";
};
const customFormat = winston.format.printf(
  ({ timestamp, level, message, label = "", ...meta }) =>
    `[${timestamp}] ${level}\t ${label} ${message} ${formatMeta(meta)}`,
);
export function getTransports(opts: Partial<WinstonXOptions> = {}) {
  const logDir = opts?.logDir;
  const transports: any[] = [
    new DailyRotateFile({
      format: format.combine(
        format.label({ label: opts.label }),
        format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
        format.splat(),
        customFormat,
      ),
      filename: `${logDir}/error.log`,
      level: "error" /* only error logs will be logged to the file. */,
      options: {
        flags: "a",
        createDirectory: true /* Create directory and file if not exists. */,
      },
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new DailyRotateFile({
      format: format.combine(
        format.label({ label: opts.label }),
        format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
        format.splat(),
        customFormat,
      ),
      filename: `${logDir}/info.log`,
      level: "info" /* error, warn, & info logs will be logged to the file. */,
      options: {
        flags: "a",
        createDirectory: true /* Create directory and file if not exists. */,
      },
      zippedArchive: true,
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "14d",
    }),
    new DailyRotateFile({
      format: format.combine(
        format.label({ label: opts.label }),
        format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
        format.splat(),
        customFormat,
      ),
      filename: `${logDir}/debug.log`,
      level: "debug" /* error, warn, & info logs will be logged to the file. */,
      options: {
        flags: "a",
        createDirectory: true /* Create directory and file if not exists. */,
      },
      zippedArchive: true,
      datePattern: "YYYY-MM-DD",
      maxSize: "20m",
      maxFiles: "7d",
    }),
  ];
  // if (opts?.debug || process.env["debug"]) {
  transports.push(
    new winston.transports.Console({
      format: format.combine(
        format.colorize({ message: true, level: true }),
        format.timestamp({ format: "YYYY/MM/DD HH:mm:ss" }),
        format.label({ label: opts.label }),
        format.splat(),
        customFormat,
      ),
      level: "debug",
    }),
  );
  // }
  if (opts?.logstash) {
    transports.push(
      new LogstashTransport(
        Object.assign(
          {
            max_connect_retries: 3,
          },
          opts.logstash,
        ),
      ),
    );
  }
  return transports;
}
export function createLogger(opts: Partial<WinstonXOptions> = {}) {
  if (!opts.logDir) {
    if (process.env.logDir) {
      opts.logDir = path.join(process.env.logDir, "chaincore");
    } else {
      opts.logDir = path.join(process.cwd(), "runtime", "chaincore");
    }
  }
  const winstonOpts = {
    transports: opts?.transports || getTransports(opts),
  };
  return winston.createLogger(winstonOpts);
}

export class WinstonX {
  static getLogger(category?: string, opts: WinstonXOptions = {}): LoggerType {
    const name = category || "default";
    if (winston.loggers.loggers.has(name)) {
      return winston.loggers.get(name);
    }
    if (!opts.logDir) {
      if (process.env.logDir) {
        opts.logDir = path.join(process.env.logDir, "chaincore");
      } else {
        opts.logDir = path.join(process.cwd(), "runtime", "chaincore");
      }
    }
    const winstonOpts = {
      transports: opts?.transports || getTransports(opts),
    };
    const logger = winston.loggers.add(name, winstonOpts);
    logger.on("error", err => {
      console.error("winstonX logger error", err);
    });
    return logger;
  }
}
