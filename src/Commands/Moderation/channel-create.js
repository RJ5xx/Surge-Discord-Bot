const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('channel-create')
        .setDescription('Create a channel!')
        .addStringOption(option => option.setName('name')
            .setDescription('What should the channel name be?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const name = interaction.options.getString('name');

        if (!interaction.member.permissions.has('MANAGE_CHANNELS'))
            return interaction.editReply({ content: `${config.missingPermissions}` });

        interaction.guild.channels.create(`${name}`, {
            type: "GUILD_TEXT",
            permissionOverwrites: [{
                id: interaction.guild.id,
                allow: ["VIEW_CHANNEL"],
            }]
        }).catch(error => {
            interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        const embed = new MessageEmbed()
            .setTitle(`#${name} has been created! ${config.successEmoji}`)
            .addFields(
                { name: `Channel Name`, value: `${name}`, inline: true },
                { name: `Server`, value: `${interaction.guild.name}`, inline: true },
                { name: `Moderator`, value: `${interaction.member.user.tag}`, inline: true },
            )
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
    },
};