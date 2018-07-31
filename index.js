const APP_NAME = 'radar';
const serverPort = process.argv[2];
const portName = process.argv[3] || 'COM1';
const baudRate = +process.argv[4] || 115200;

const io = require('socket.io')(serverPort);
const Broadcast = require('./entities/broadcast');
const Response = require('./entities/response');
const Logger = require('./entities/logger');

const broadcast = new Broadcast({
    portName,
    baudRate
});

const log = new Logger(APP_NAME);

log.info('Server port:', serverPort);
log.info('Serial name:', portName);
log.info('Serial baud rate:', baudRate);

broadcast
    .on('open', () => log.info('Serial Port Opend'))
    .on('error', error => log.error(error.message))
    .on('data', (data) => {
        const { length } = (io.sockets.adapter.rooms[APP_NAME] || []);
        if (length > 0) {
            io.sockets.in(APP_NAME).emit('data', new Response(data));
        }
        log.info(data);
    }).start();

io.on('connection', (socket) => {
    log.info(`Connection - [${socket.id}]`);
    socket.join(APP_NAME);
    socket.on('disconnect', () => log.info(`Disconnect - [${socket.id}]`));
});
