const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server-info')
        .setDescription('Shows the servers information!'),
    async execute(interaction) {

        await interaction.deferReply();

        const embed = new MessageEmbed()
            .setTitle(`${interaction.guild.name}\'s Information`)
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setColor(config.color)
            .addFields(
                { name: 'Name', value: `${interaction.guild.name}`, inline: true },
                { name: 'ID', value: `${interaction.guild.id}`, inline: true },
                { name: 'Acronym', value: `${interaction.guild.nameAcronym}`, inline: true },
                { name: 'Owner', value: `<@!${interaction.guild.ownerId}>`, inline: true },
                { name: 'Rules Channel', value: `${interaction.guild.rulesChannel}`, inline: true },
                { name: 'Updates Channel', value: `${interaction.guild.publicUpdatesChannel}`, inline: true },
                { name: 'Created At', value: `${new Date(interaction.guild.createdAt).toString().substring(4, 15)}`, inline: true },
                { name: 'Role Count', value: `${interaction.guild.roles.cache.size}`, inline: true },
                { name: 'Highest Role', value: `${interaction.guild.roles.highest}`, inline: true },
                { name: 'Member Count', value: `${interaction.guild.memberCount}`, inline: true },
                { name: 'Emoji Count', value: `${interaction.guild.emojis.cache.size}`, inline: true },
                { name: 'Channel Count', value: `${interaction.guild.channels.cache.size}`, inline: true },
                { name: 'Boosts Count', value: `${interaction.guild.premiumSubscriptionCount}`, inline: true },
                { name: 'Vanity URL', value: `${interaction.guild.vanityURLCode}` || 'None', inline: true },
                { name: 'Verified', value: `${interaction.guild.verified}`, inline: true },
            )
            .setFooter({ text: `${interaction.guild.name}`, iconURL: `${interaction.guild.iconURL({ dynamic: true})}` })
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
    },
};
