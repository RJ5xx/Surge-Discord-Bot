const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel-delete')
        .setDescription('Delete a channel!')
        .addChannelOption(option => option.setName('channel')
            .setDescription('Which channel should be deleted?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const channel = interaction.options.getChannel('channel');

        if (!interaction.member.permissions.has('MANAGE_CHANNELS'))
            return interaction.editReply({ content: `${config.missingPermissions}` });

        interaction.guild.channels.delete(`${channel.id}`).catch(error => {
            interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        const embed = new MessageEmbed()
            .setTitle(`#${channel.name} has been deleted! ${config.successEmoji}`)
            .addFields(
                { name: `Channel`, value: `${channel}`, inline: true },
                { name: `Server`, value: `${interaction.guild.name}`, inline: true },
                { name: `Moderator`, value: `${interaction.member.user.tag}`, inline: true },
            )
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
    },
};