const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-banner')
        .setDescription('Shows the servers banner!'),
    async execute(interaction) {

        await interaction.deferReply();

        const embed = new MessageEmbed()
            .setTitle(`${interaction.guild.name}\'s banner!`)
            .setImage(interaction.guild.bannerURL({ size: 4096, dynamic: true }))
            .setDescription(`If nothing is here, ${interaction.guild.name} doesn't have a banner!`)
            .setColor(config.color)

        interaction.editReply({ embeds: [embed] });
    },
};