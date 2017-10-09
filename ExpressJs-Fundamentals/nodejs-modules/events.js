const events = require('events');

let eventEmit = new events.EventEmitter();
eventEmit.on('msg', (data) => {
    console.log('Event received!');
});

eventEmit.emit('msg');