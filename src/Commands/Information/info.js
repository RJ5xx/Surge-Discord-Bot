const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const config = require('../../Database/config.json');
const ms = require('ms');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Shows the bots info!'),
    async execute(interaction, client) {

        await interaction.deferReply();

        const serverInfoEmbed = new EmbedBuilder()
            .setColor(config.color)
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.avatarURL({ dynamic: true })}` })
            .setDescription(`Name: ${client.user.username}\nID: ${client.user.id}\nUptime: ${ms(client.uptime)}\nGuild count: ${client.guilds.cache.size}\nMember count: ${interaction.client.guilds.cache.reduce((acc, g) => acc + g.memberCount, 0)}\nChannel count: ${client.channels.cache.size}\nEmoji count: ${client.emojis.cache.size}`)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .addFields(
                { name: 'Client since', value: `<t:${Math.round(client.user.createdTimestamp / 1000)}:d>`, inline: true },
                { name: 'Discord.js version', value: `${Discord.version}`, inline: true },
                { name: 'Node.js version', value: `${process.version}`, inline: true }
            )

        interaction.editReply({ embeds: [serverInfoEmbed] });
    },
};