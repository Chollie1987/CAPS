const { io } = require('socket.io-client');

const client = io('ws://localhost:3000');
const events = require('../utility.js');

const payload = {
  storeName: 'movie-to-go',
  orderId: '31',
  customer: 'Christina Hollie',
  address: 'Portland, OR',
};

client.emit(events.pickup, payload)
client.on('received', (payload) => console.log(payload.message));
client.on(events.announcement, (payload) => console.log(payload.message));


module.exports = { client };
