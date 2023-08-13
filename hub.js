"use strict";

const {Server} = require('socket.io');
// const events = require("./eventPool.js");
const events = require('./utility.js');

const io = new Server();

io.listen(3000);

function handleConnection(socket) {
    console.log('we are connected:', socket.id);
    socket.on(events.pickup, handlePickUp);
    socket.emit('got it', {message: 'pickup received'});
    // io.emit(events.pickup, {message: 'pickup ready', ...payload});
    socket.on(events.pickedUp, (orderId) => handlePickedUp(orderId, socket));
    socket.on(events.inTransit, (orderId) => handleInTransit(orderId, socket));
    socket.on(events.delivered, (orderId) => handleDelivered(orderId, socket));
}

function handlePickUp (payload) {
    console.log('package ready for pickup');
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

// require("./vendor/handler.js");
// require("./driver/handler.js");


// socket.on('pickup', (payload) => logger('pickup', payload));
// socket.on('in-transit', (payload) => logger('in-transit', payload));
// socket.on('delivery', (payload) => logger('delivery', payload));

// function logger(event, payload) {
//     const timestamp = new Date();
//     console.log('EVENT', {event, timestamp, payload});
// }

module.exports = { startSocketServer };