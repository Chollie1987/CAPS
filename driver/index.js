const {io} = require('socket.io-client');

const client = io('ws://localhost:3000');
client.on(events.announcement, (payload) => console.log(payload.message));


module.exports = {client};