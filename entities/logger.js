const path = require('path');
const log4js = require('log4js');

class Logger {
    constructor(category) {
        log4js.configure(path.join(__dirname, '../', 'config', 'log4js.json'));
        return log4js.getLogger(category);
    }
}

module.exports = Logger;
