'use strict';

const events = require("../eventPool");

// events.on('pickup', pickup);
events.on('pickup', pickedUp);
// events.on('inTransit', inTransit);
// events.on('delivered', delivered);

// function pickup(data) {
//   console.log('Got it');
//   pickedUp(data.payload.orderId);
// }

function pickedUp(data) {
  console.log({event: 'pickedUp'}, 'DRIVER: order has been picked up', data);
  events.emit('inTransit', data);
  events.emit('delivered', data);
}

// function inTransit(orderId) {
//   console.log('DRIVER: order is en route', orderId);
//   events.emit('en route', orderId);
// }

// function delivered(orderId) {
//   console.log('DRIVER: order was delivered', orderId);
//   events.emit('delivered', orderId);
// }
