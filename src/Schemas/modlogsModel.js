const mongoose = require('mongoose');

const modlogs = new mongoose.Schema({
    guildID: String,
    modlogsChannelID: String,
});

module.exports = mongoose.model('modlogs', modlogs);