const express = require("express");
const amqp = require("amqplib");
const dotenv = require('dotenv').config();
const RabbitMQ = require('./rabbitmq')

const app = express();

app.use(express.json());


app.get("/send-msg", (req, res) => {

    // data to be sent
    const data = {
        title  : "Fazer compras",
        author : "Mike Brown"
    }
    RabbitMQ.send(process.env.RABBITMQ_URL, process.env.RABBITMQ_NAME, data)
    res.send("Message Sent"); //response to the API request
})

app.listen(4001, () => {
    console.log("Server running at port " + 4001); 
});
