const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('vote')
        .setDescription('Vote the bot!'),
    async execute(interaction, client) {

        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setTitle(`Vote for Surge!`)
            .setDescription(`Here is the link to vote for ${client.user.username}!\nhttps://top.gg/bot/982579470399586304`)
            .addFields(
                { name: 'Voted', value: client.toppgg.hasVoted(interaction.user.id) ? '✅' : '❌', inline: true }
            )
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
    },
};