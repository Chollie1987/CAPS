'use strict';

const events = require('../eventPool');


function pickedUp(orderId) {
  console.log({event: 'pickedUp'},'VENDOR: Verified your order has been picked up', orderId);
}


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


 module.exports = { pickedUp, inTransit, delivered };