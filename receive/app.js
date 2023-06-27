const express = require("express");
const app = express();
const dotenv = require('dotenv').config();

app.use(express.json());

const PORT = process.env.PORT || 4002;

const amqp = require("amqplib");
var channel, connection;


connectQueue() // call connectQueue function

app.listen(PORT, () => console.log("Server running at port " + PORT));

async function connectQueue() {
    try {

        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel()
        
        // connect to 'test-queue', create one if doesnot exist already
        await channel.assertQueue("cms-logs")
        
        channel.consume("cms-logs", data => {
            console.log(JSON.parse(data.content, true))
            channel.ack(data)
        })

    } catch (error) {
        console.log(error)
    }
}