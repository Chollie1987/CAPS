'use strict';

const events = require('../eventPool');

events.on('pickup', pickedUp);
events.on('inTransit', inTransit);
events.on('delivered', delivered);

function pickedUp(OrderId) {
  console.log('VENDOR: Verified your order has been picked up', OrderId);
}

function pickup(data) {
   console.log('Got it');
   pickedUp(data.payload.orderId);
 }

function inTransit(orderId) {
    console.log({event: 'order en route'}, orderId);
}

function delivered(orderId) {
    console.log('delivered', orderId);
}

setInterval(() => {
  console.log('-------------');
  let EVENT = {
    event: 'pickup',
    time: new Date().getTime(),
    payload: {
      store: 'movie-to-go',
      orderId: Math.ceil(Math.random() * 50),
      customer: 'Christina Hollie',
      address: 'Portland, OR',
    },
  };
  console.log(Event);
  events.emit('pickup', EVENT);
}, 5000);
