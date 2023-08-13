const events = require('../utility');

function pickup(data) {
  console.log('Got it');
  pickedUp(data.payload.orderId);
}


function pickedUp(payload, driver) {
  console.log('DRIVER: order has been picked up', payload.payload.orderId);
  driver.emit(events.pickedUp, payload);
  inTransit(payload, driver);
  delivered(payload, driver);
}

function inTransit(payload, driver) {
  console.log('order is en route');
  driver.emit(events.inTransit, payload);
}

function delivered(payload, driver) {
  console.log('DRIVER: order was delivered');
  driver.emit(events.delivered, payload);
}

module.exports = { pickedUp }