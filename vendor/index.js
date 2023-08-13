const { io } = require('socket.io-client');
const { pickedUp, inTransit, delivered } = require('./handler');

const client = io('ws://localhost:3000');
const events = require('../utility.js');

// const payload = {
//   storeName: 'movie-to-go',
//   orderId: '31',
//   customer: 'Christina Hollie',
//   address: 'Portland, OR',
// };
client.on(events.pickedUp, pickedUp);
client.on(events.inTransit, inTransit);
client.on(events.delivered, delivered);
// client.emit(events.pickup, payload)
// client.on('received', (payload) => console.log(payload.message));
// client.on(events.announcement, (payload) => console.log(payload.message));

setInterval(() => {
  console.log('-------------');
  let event = {
    event: 'pickup',
    time: new Date().getTime(),
    payload: {
      store: 'movie-to-go',
      orderId: '31',
      customer: 'Christina Hollie',
      address: 'Portland, OR',
    },
  };
  console.log('order ready for pickup', event.payload.orderId);
  client.emit(events.pickup, event);
}, 5000);
module.exports = { client };
