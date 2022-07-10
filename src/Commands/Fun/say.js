const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make me say something!')
        .addStringOption((option) => option.setName('content')
            .setDescription('What do you want me to say?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const content = interaction.options.getString('content');

        const embed = new MessageEmbed()
            .setDescription(`${content}\n\n- ${interaction.user.username}`)
            .setColor(config.color)

        interaction.editReply({ embeds: [embed] });
    },
};