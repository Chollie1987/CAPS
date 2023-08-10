events.on('pickup', pickup);

function pickup(data) {
  console.log('Got it');
  pickedUp(data.payload.orderId);
}

function pickedUp(orderId) {
  console.log('DRIVER: order has been picked up', orderId);
  events.emit('pickedUp', orderId);
}

function inTransit() {
  console.log('order is en route');
}

function delivered() {
  console.log('DRIVER: order was delivered', orderId);
}
