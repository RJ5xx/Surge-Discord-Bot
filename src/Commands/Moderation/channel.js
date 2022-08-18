const { ChannelType, EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('channel')
        .setDescription('Commands for channel!')
        .addSubcommand(subcommand => subcommand.setName('info')
            .setDescription('Shows info about a channel!')
            .addChannelOption(option => option.setName('channel-info')
                .setDescription('Which channel\'s info do you need?')
                .setRequired(false)),
        )
        .addSubcommand(subcommand => subcommand.setName('create')
            .setDescription('Create a channel!')
            .addStringOption(option => option.setName('channel-create')
                .setDescription('What do you want the channel to be named as?')
                .setRequired(true)),
        )
        .addSubcommand(subcommand => subcommand.setName('delete')
            .setDescription('Delete a channel!')
            .addChannelOption(option => option.setName('channel-delete')
                .setDescription('Which channel do you want to delete?')
                .setRequired(true)),
        ),
    async execute(interaction) {

        await interaction.deferReply();

        const subCommand = interaction.options.getSubcommand();

        const channelInfo = interaction.options.getChannel('channel-info') || interaction.channel;
        const channelCreate = interaction.options.getString('channel-create');
        const channelDelete = interaction.options.getChannel('channel-delete');

        switch (subCommand) {
            case "info": {
                const channelInfoEmbed = new EmbedBuilder()
                    .setColor(config.color)
                    .setTimestamp()
                    .setTitle(`${channelInfo.name}\'s Info!`)
                    .addFields(
                        { name: 'Channel Name', value: channelInfo.name, inline: true },
                        { name: 'Channel ID', value: channelInfo.id, inline: true },
                        { name: 'Channel Category', value: channelInfo.parent, inline: true },
                        { name: 'Channel Position ', value: channelInfo.position, inline: true },
                        { name: 'Channel Type', value: channelInfo.type, inline: true },
                        { name: 'Created at', value: `<t:${channelInfo.createdTimestamp}:d>`, inline: true },
                    )

                interaction.editReply({ embeds: [channelInfoEmbed] });
            };
                break;

            case "create": {
                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                    return interaction.editReply({ content: `${config.missingPermissions}` });
                }

                interaction.guild.channels.create({
                    name: channelCreate,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            allow: [PermissionsBitField.Flags.ViewChannel],
                        },
                    ],
                }).catch(error => {
                    return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
                });

                const channelCreateEmbed = new EmbedBuilder()
                    .setTitle(`${channelCreate} has been created! ${config.successEmoji}`)
                    .addFields(
                        { name: 'Channel', value: channelCreate, inline: true },
                        { name: 'Server', value: interaction.guild.name, inline: true },
                        { name: 'Moderator', value: interaction.member.user.tag, inline: true },
                    )
                    .setColor(config.color)
                    .setTimestamp()

                interaction.editReply({ embeds: [channelCreateEmbed] });
            };
                break;

            case "delete": {
                if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                    return interaction.editReply({ content: `${config.missingPermissions}` });
                }

                interaction.guild.channels.delete(channelDelete.id).catch(error => {
                    return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
                });

                const channelDeleteEmbed = new EmbedBuilder()
                    .setTitle(`${channelDelete.name} has been deleted! ${config.successEmoji}`)
                    .addFields(
                        { name: 'Channel', value: channelDelete.name, inline: true },
                        { name: 'Server', value: interaction.guild.name, inline: true },
                        { name: 'Moderator', value: interaction.member.user.tag, inline: true },
                    )
                    .setColor(config.color)
                    .setTimestamp()

                interaction.editReply({ embeds: [channelDeleteEmbed] });
            };
                break;
        };
    },
};