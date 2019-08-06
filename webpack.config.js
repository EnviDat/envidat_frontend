
const dotenv = require('dotenv');

dotenv.config();
process.env.VUE_APP_VERSION = require('./package.json').version;

console.log(`webpack ${process.env.VUE_APP_VERSION} on ${process.env.NODE_ENV}`);
