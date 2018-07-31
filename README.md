Radar-360-Server
=====

Server written in Node.js to receive data from the [Radar-360-Hardware](https://github.com/mserafin/Radar-360-Hardware) project via UART serial communication.

Uses socket.io to communicate with the browser in real time.

You should edit the **package.json** file in which the ``node index.js 8090 COM6 115200`` command is used, taking arguments.
- 8090 - service port socket.io
- COM6 - port name USB serial
- 115200 - baud rate USB serial

## Setup

```
$ yarn install --pure-lockfile
```

## Start

```
$ npm start
```