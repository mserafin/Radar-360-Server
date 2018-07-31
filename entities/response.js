class Response {
    constructor(data) {
        this.data = data;
    }

    toJSON() {
        return this.data;
    }
}

module.exports = Response;
