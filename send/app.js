const express = require("express");
const amqp = require("amqplib");
const dotenv = require('dotenv').config();

const app = express();
const PORT = 4001;

var channel, connection;  //global variables

app.use(express.json());


app.get("/send-msg", (req, res) => {
    
    // data to be sent
    const data = {
        title  : "walk the dogs",
        author : "Sidney de Sousa"
    }
    sendData(data);  // pass the data to the function we defined
    console.log("A message is sent to queue")
    res.send("Message Sent"); //response to the API request
    
})

app.listen(PORT, () => {
    console.log("Server running at port " + PORT); 
    connectQueue(); 
});

async function connectQueue() {   
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel    = await connection.createChannel()
        
        const queue = await channel.assertQueue("cms-logs")
        console.log(queue)
        
    } catch (error) {
        console.log(error)
    }
}

async function sendData (data) {
    await channel.sendToQueue("test-queue", Buffer.from(JSON.stringify(data)));
    await channel.close();
    await connection.close(); 
}