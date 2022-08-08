const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('Invite the bot!'),
    async execute(interaction, client) {

        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setTitle(`Invite Surge!`)
            .setDescription(`Here is the link to invite ${client.user.username}!\nhttps://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`)
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
    },
};