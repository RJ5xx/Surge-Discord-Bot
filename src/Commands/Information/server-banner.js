const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('server-banner')
        .setDescription('Shows the servers banner!'),
    async execute(interaction) {

        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setTitle(`${interaction.guild.name}\'s banner!`)
            .setImage(interaction.guild.bannerURL({ size: 4096, dynamic: true }))
            .setDescription(`${interaction.guild.name} doesn't have a banner!`)
            .setColor(config.color)

        interaction.editReply({ embeds: [embed] });
    },
};