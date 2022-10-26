const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    birthLocation: {
        type: String,
        required: true
    },
    birthDateTime: {
        type: Date,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lng: {
        type: String,
        required: true
    },
    horoscope: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'online'
    },
    newMessages: {
        type: Object,
        default: {}
    }
}, {
    timestamps: true
}, {minimize: false});

module.exports = mongoose.model('User', userSchema);