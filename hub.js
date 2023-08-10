"use strict";

const events = require("./eventPool.js");

require("./vendor/handler.js");
require("./driver/handler.js");


events.on('pickup', (payload) => logger('pickup', payload));
events.on('in-transit', (payload) => logger('in-transit', payload));
events.on('delivery', (payload) => logger('delivery', payload));

function logger(event, payload) {
    const timestamp = new Date();
    console.log('EVENT', {event, timestamp, payload});
}