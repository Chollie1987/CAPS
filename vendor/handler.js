'use strict';

const events = require('../eventPool');

// events.on('pickup', pickedUp);
// events.on('inTransit', inTransit);
// events.on('delivered', delivered);

function pickedUp(orderId) {
  console.log({event: 'pickedUp'},'VENDOR: Verified your order has been picked up', orderId);
}

// function pickup(data) {
//    console.log('Got it');
//    pickedUp(data.payload.orderId);
//  }

function inTransit(orderId) {
    console.log({event: 'order en route'}, orderId);
}

function thankCustomer(payload){
  console.log({event: 'thankCustomer'}, 'Vendor: Thank you for your order', payload.payload.customer);
}
  function delivered(payload) {
  console.log({event: 'delivered'},'Driver: Order was delivered', payload.payload.orderId);
  setTimeout(() => {
    thankCustomer(payload);
  }, 1000)
}

// setInterval(() => {
//   console.log('-------------');
//   let event = {
//     event: 'pickup',
//     time: new Date().getTime(),
//     payload: {
//       store: 'movie-to-go',
//       orderId: '31',
//       customer: 'Christina Hollie',
//       address: 'Portland, OR',
//     },
//   };
//   console.log('order ready for pickup', event.payload.orderId);
//   events.emit('pickup', event);
// }, 5000);
 module.exports = { pickedUp, inTransit, delivered };