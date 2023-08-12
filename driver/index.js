const {io} = require('socket.io-client');

const client = io('ws://localhost:3000');
client.on(events.announcement, (payload) => console.log(payload.message));
client.on(events.ready, handleReady);


module.exports = {client};