const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Delete some messages!')
        .addIntegerOption(option => option.setName('amount')
            .setDescription('Number of messages to purge')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const amount = interaction.options.getInteger('amount');

        if (!interaction.member.permissions.has('MANAGE_MESSAGES'))
            return interaction.editReply({ content: `${config.missingPermissions}` });

        if (amount <= 1 || amount > 100)
            return interaction.editReply({ content: 'You need to input a number between 1 and 99!' });

        await interaction.channel.bulkDelete(amount, true).catch(error => {
            interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        const embed = new MessageEmbed()
            .setTitle(`${amount} messages deleted! ${config.successEmoji}`)
            .addFields(
                { name: `Messages Deleted`, value: `${amount}`, inline: true },
                { name: `Channel`, value: `<#${interaction.channel.id}>`, inline: true },
                { name: `Server`, value: `${interaction.guild.name}`, inline: true },
                { name: `Moderator`, value: `${interaction.member.user.tag}`, inline: true },
            )
            .setColor(config.color)
            .setTimestamp()

        interaction.channel.send({ embeds: [embed] });
    },
};