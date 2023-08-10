"use strict";

const {Server} = require('socket.io');
const events = require("./eventPool.js");
const events = require('./utility.js');

const io = new Server();

io.listen(3000);

function handleConnection(socket) {
    console.log('we are connected:', socket.id);
    socket.on(events.pickUp, 'pickupReady', (payload) => console.log('pickup requested', payload.orderId));
    socket.emit('got it', {message: 'pickup received'});
    io.emit('announcment', {message: 'pickup ready'});
}

function startSocketServer() {
    console.log('The server is started');

    io.on('connection', handleConnection)
}

require("./vendor/handler.js");
require("./driver/handler.js");


events.on('pickup', (payload) => logger('pickup', payload));
events.on('in-transit', (payload) => logger('in-transit', payload));
events.on('delivery', (payload) => logger('delivery', payload));

function logger(event, payload) {
    const timestamp = new Date();
    console.log('EVENT', {event, timestamp, payload});
}

module.exports = { startSocketServer };