const delivered = require('../utility');
const  events  = require('../utils');
const {
  toTest: { delivered, handlePickup },
} = require('./handler.js');


jest.useFakeTimers();

describe('Tests the driver handler functions', () => {
  test('Driver deliver', () => {
 const io = { emit: jest.fn() };
    delivered('delivered', io);
    expect(io.emit).toHaveBeenCalledWith(events.delivered, 'delivered');
  });

  test('Driver handlePickup', () => {
    const io = { emit: jest.fn() };
    handlePickup(
      {
        store: 'movie-to-go',
        orderId: '31',
        customer: 'Cindy Lou',
        address: 'Whoville',
      },
      io
    );

    
    jest.runAllTimers();

    expect(io.emit).toHaveBeenCalledWith(events.delivered, '31');
  });
});
