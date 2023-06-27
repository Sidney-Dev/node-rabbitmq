const amqp = require("amqplib");
var channel, connection;

module.exports = async function connectQueue() {
    try {

        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel()
        
        // connect to 'test-queue', create one if doesnot exist already
        await channel.assertQueue(process.env.RABBITMQ_NAME)
        
        channel.consume(process.env.RABBITMQ_NAME, data => {
            console.log(JSON.parse(data.content, true))
            channel.ack(data)
        })

    } catch (error) {
        console.log(error)
    }
}