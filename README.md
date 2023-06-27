# node-rabbitmq
Node.js - Express integration with RabbitMQ

Each folder comprises of a node application, where one is to send, and another to receive data via RabbitMQ.

For each application:

<code>cd [application name]</code>

<code>npm install</code>

<code>npm start</code>

For each site, setup the .env file by adding the following items:

<code>RABBITMQ_URL='URL'</code>

<code>RABBITMQ_NAME='QUEUENAME'</code>
