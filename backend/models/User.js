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
    horoscope: {
        type: Object,
        required: true
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
});

module.exports = mongoose.model('User', userSchema);