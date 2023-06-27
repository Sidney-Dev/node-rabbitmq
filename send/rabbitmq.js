const amqp = require("amqplib");

module.exports = class RabbitMQ {

    static channel = '';
    static connection = '';

    static async rmqConnect(rmqUrl, queueName) {
        try {
            this.connection = await amqp.connect(rmqUrl);
            this.channel = await this.connection.createChannel()
            
            await this.channel.assertQueue(queueName)
            
        } catch (error) {
            console.log(error)
        }
    }

    static async send(rmqUrl, queueName, data) {
        await this.rmqConnect(rmqUrl, queueName)
        await this.channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
        await this.channel.close();
        await this.connection.close(); 
    }
}
