const { EventEmitter } = require('events');
const SerialPort = require('serialport');

const { Readline } = SerialPort.parsers;
const parser = Symbol('broadcast.parser');
const port = Symbol('broadcast.port');

class Broadcast extends EventEmitter {
    constructor(options) {
        super();
        this[parser] = new Readline('\r\n');
        this[port] = new SerialPort(options.portName, {
            autoOpen: false,
            baudRate: options.baudRate
        });

        this[port].on('open', () => this.emit('open'));
        this[port].on('close', () => this.emit('close'));
        this[port].on('error', ex => this.emit('error', ex));
        this[port].pipe(this[parser]).on('data', data => this.emit('data', data));
    }

    start() {
        this[port].open();
        return this;
    }

    stop() {
        this[port].close();
        return this;
    }
}

module.exports = Broadcast;
