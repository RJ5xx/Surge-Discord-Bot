const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite the bot!'),
    async execute(interaction) {

        await interaction.deferReply();

        const embed = new MessageEmbed()
            .setTitle(`Invite Crate!`)
            .setDescription(`Here is the link to invite ${client.user.username}!\nhttps://discord.com/api/oauth2/authorize?client_id=${client.id}&permissions=8&scope=bot%20applications.commands`)
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
    },
};