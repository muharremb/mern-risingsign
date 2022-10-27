const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
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
    imageURLs: [],
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
    },
    likes: {
        type: Array,
        required: true
    },
    imageURLs: {
        type: Array,
        required: false
    },
    profileImageURL: {
        type: String,
        required: true
    }
}, {
    timestamps: true
}, {minimize: false});

module.exports = mongoose.model('User', userSchema);