const {io} = require('socket.io-client');
const events = require('../utility');
const { pickedUp } = require('./driver-handler')

const client = io('ws://localhost:3000');
client.on(events.pickup, (payload) => pickedUp(payload, client));
// client.on(events.ready, handleReady);


module.exports = {client};