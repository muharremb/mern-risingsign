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
    birthTime: {
        type: String,
        required: true
    },
    birthDate: {
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
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);