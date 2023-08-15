"use strict";

const {Server} = require('socket.io');
const { Queue } = require('./utility');
// const events = require("./eventPool.js");
const events = require('./utility.js');

const io = new Server();

io.listen(3000);

const driverQueue = new Queue();
const packageQueue = new Queue();

function handleConnection(socket) {
    console.log('we are connected:', socket.id);
    socket.on(events.pickup, handlePickUp);
    socket.emit('got it', {message: 'pickup received'});
    socket.on(events.pickedUp, (orderId) => handlePickedUp(orderId, socket));
    socket.on(events.inTransit, (orderId) => handleInTransit(orderId, socket));
    socket.on(events.delivered, (orderId) => handleDelivered(orderId, socket));
}

function handleReady(socket) {
    console.log('driver', socket.id, 'is ready');
    if (packageQueue.isEmpty) {
        driverQueue.enqueue(socket);
    } else{
        const package = packageQueue.dequeue();
        socket.emit(events.ready, package);
    }
}

function handlePickUp (payload) {
    console.log('package ready for pickup');

    if (driverQueue.isEmpty()) {
         packageQueue.enqueue(payload);
    } else {
         const driverSocket = driverQueue.dequeue();
         driverSocket.emit(events.pickup, payload);
    }
    io.emit(events.pickup, { message: 'pickup ready', ...payload });
}

function handlePickedUp (orderId, socket) {
    console.log('driver picked up order', orderId);
     io.emit(events.pickedUp, orderId);
}

function handleInTransit (payload, socket) {
    console.log('package en route', payload);
    io.emit(events.inTransit, payload);
}

function handleDelivered (payload, socket) {
    console.log('order was delivered', payload);
    io.emit(events.delivered, payload);
}
function startSocketServer() {
    console.log('The server is started');

    io.on('connection', handleConnection)
}

module.exports = { startSocketServer };