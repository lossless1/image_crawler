const mongoose = require("../libs/mongoose/index"),
    Schema = mongoose.Schema;
const moment = require('moment');

const parsedPagesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    numberTags: {
        type: Number,
        required: true
    },
    maxPages: {
        type: Number,
        required: false
    },
    isDeep: {
        type: Boolean,
        required: false
    },
    threads: {
        type: Number,
        required: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    duration: {
        type: String,
    }

});


const ParsedPages = mongoose.model('ParsedPages', parsedPagesSchema);

module.exports = ParsedPages;