const mongoose = require('mongoose');

const joinLeave = new mongoose.Schema({
    guildID: String,
    joinChannelID: String,
    leaveChannelID: String,
});

module.exports = mongoose.model('join-leave', joinLeave);