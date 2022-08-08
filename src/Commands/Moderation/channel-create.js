const { ChannelType, EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: true,
    data: new SlashCommandBuilder()
        .setName('channel-create')
        .setDescription('Create a channel!')
        .addStringOption(option => option.setName('name')
            .setDescription('What should the channel name be?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const name = interaction.options.getString('name');

        if (!interaction.user.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            return interaction.editReply({ content: `${config.missingPermissions}` });
        }

        interaction.guild.channels.create({
            name: `${name}`,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    allow: [PermissionsBitField.Flags.ViewChannel],
                },
            ],
        }).catch(error => {
            interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        const channelCreateEmbed = new EmbedBuilder()
            .setTitle(`#${name} has been created! ${config.successEmoji}`)
            .addFields(
                { name: `Channel Name`, value: `${name}`, inline: true },
                { name: `Server`, value: `${interaction.guild.name}`, inline: true },
                { name: `Moderator`, value: `${interaction.member.user.tag}`, inline: true },
            )
            .setColor(config.color)
            .setTimestamp()

        interaction.editReply({ embeds: [channelCreateEmbed] });
    },
};