module.exports ={
    pickup: 'pickupReady',
    pickedUp: 'driverPickedUp',
    inTransit: 'inTransit',
    delivered: 'package Delivered',

}

class Queue {
    constructor() {
        this.queue = []
    }
    
    enqueue(item) {
        this.queue.unshift(item);
    }

    dequeue() {
        return this.queue.pop()
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}