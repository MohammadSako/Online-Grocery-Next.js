const { parseCookies } = require('nookies');
const isServer = require('./isServer');

module.exports = (ctx) => {
    if (isServer()) {
        return parseCookies(ctx);
    } else {
        return parseCookies();
    }
};
