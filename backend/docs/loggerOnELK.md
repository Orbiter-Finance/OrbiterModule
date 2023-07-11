
### **Use logstash collect logs**

Make sure you have Docker and Docker Compose installed on your machine.

## **ELK Stack Docker Compose**

This Docker Compose configuration sets up the ELK (Elasticsearch, Logstash, Kibana) stack using the sebp/elk:oss-8.7.1 image.

### **Usage**

1. Clone this git@github.com:Orbiter-Finance/LogCenter.git.
2. Navigate to the cloned repository directory.
3. Change following volumes are mounted in the containers:
  - **`/Users/{path}/logstash-sample.conf:/etc/logstash/conf.d/logstash-sample.conf`**: Mounts the Logstash configuration file into the container.
  - **`/Users/{path}/data:/var/log/elasticsearch`**: Mounts a directory for storing Elasticsearch data.
4. Start the ELK stack using the following command:
 
   ```
    docker-compose up -d
   ```
   This command will download the required Docker images and start the containers in detached mode.
5. Wait for the services to start. It may take a few moments for the ELK stack to be fully available.
6. Access Kibana web interface by visiting **[http://localhost:5601](http://localhost:5601/)** in your web browser.

### **Configuration**


- **`/.env`**: Defines the project and their configurations. 

### .env
```
  logstashHost = '127.0.0.1' # host
  logstashPort = 5044 # prot
  SERVICE = 'Orbiter Module' # SERVICE to indexes name
```

It sends the processed logs to Elasticsearch, with the option to send logs to the "om" index if the "Orbiter Module" is found in the **`service`** field.

