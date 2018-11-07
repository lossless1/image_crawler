const mongoose = require('mongoose');
const config = require('../../config/index');

mongoose.connect(config.get('mongoose:uri'),config.get('mongoose:options'));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = mongoose;