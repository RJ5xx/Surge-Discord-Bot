const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows the main command!'),
    async execute(interaction, client) {

        await interaction.deferReply();

        const selectMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('helpSelectMenu')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .setPlaceholder('Nothing selected')
                    .addOptions([
                        {
                            label: 'Configuration',
                            emoji: '⚙️',
                            description: 'All configuration commands!',
                            value: 'configuration',
                        },
                        {
                            label: 'Moderation',
                            emoji: '🛠',
                            description: 'All moderation commands!',
                            value: 'moderation',
                        },
                        {
                            label: 'Information',
                            emoji: 'ℹ',
                            description: 'All information commands!',
                            value: 'information',
                        },
                        {
                            label: 'Giveaway',
                            emoji: '🎉',
                            description: 'All giveaway commands!',
                            value: 'giveaway',
                        },
                        {
                            label: 'Animals',
                            emoji: '🐈',
                            description: 'All animals commands!',
                            value: 'animals',
                        },
                        {
                            label: 'Fun',
                            emoji: '🎈',
                            description: 'All fun commands!',
                            value: 'fun',
                        },
                    ]),
            );

        const button = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setEmoji('🔗')
                    .setStyle('LINK')
                    .setLabel('Support')
                    .setURL('https://discord.gg/mun838NkDj'),

                new MessageButton()
                    .setEmoji('✅')
                    .setStyle('LINK')
                    .setLabel('Invite')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=965205833724076082&permissions=8&scope=bot%20applications.commands'),

                new MessageButton()
                    .setEmoji('↗️')
                    .setStyle('LINK')
                    .setLabel('Source Code')
                    .setURL('https://github.com/Neutral75/Surge-Discord-Bot')

                /* new MessageButton()
                    .setEmoji('↗')
                    .setStyle('LINK')
                    .setLabel('Vote')
                    .setURL('https://top.gg/') */
            );

        const embed = new MessageEmbed()
            .setTitle(`${client.user.username} Discord bot!`)
            .setDescription(`${client.user.username} is a discord bot with many features which are all fun and easy to use! It has over 35 commands which are cool in every way! Choose a category in the section below to see the commands! ${client.user.username} is currently in ${client.guilds.cache.size} servers and monitoring ${interaction.client.guilds.cache.reduce((acc, g) => acc + g.memberCount, 0)} users!\n\nNote: Interaction with the menu will expire after **15** seconds!`)
            .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
            .setColor('#ED4245')
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
            .setTimestamp()

        interaction.editReply({ embeds: [embed], components: [selectMenu, button] });

        const ConfigurationEmbed = new MessageEmbed()
            .setTitle('Configuration Commands')
            .setDescription('Set-join\nSet-leave\nSet-modlogs')
            .setFooter({ text: `${client.user.username} Commands` })
            .setTimestamp()
            .setColor(config.color)

        const ModerationEmbed = new MessageEmbed()
            .setTitle('Moderation Commands')
            .setDescription('Kick\nBan\nTimeout\nPurge\nChange-nickname\nRole-create\nRole-delete\nAdd-role\nRemove-role\nChannel-create\nChannel-delete')
            .setFooter({ text: `${client.user.username} Commands` })
            .setTimestamp()
            .setColor(config.color)

        const InformationEmbed = new MessageEmbed()
            .setTitle('Information Commands')
            .setDescription('Help\nInvite\nVote\nBot-info\nUser-info\nUser-banner\nServer-info\nServer-banner\nRole-info\nChannel-info')
            .setFooter({ text: `${client.user.username} Commands` })
            .setTimestamp()
            .setColor(config.color)

        const GiveawayEmbed = new MessageEmbed()
            .setTitle('Giveaway Commands')
            .setDescription('Giveaway\n> Giveaway start\nGiveaway actions\n- Pause\n- Unpause\n- End\n- Delete\n- Reroll')
            .setFooter({ text: `${client.user.username} Commands` })
            .setTimestamp()
            .setColor(config.color)

        const AnimalsEmbed = new MessageEmbed()
            .setTitle('Animals Commands')
            .setDescription('Cat\nDog\nBird\nBear\nFox\nKoala\nPanda')
            .setFooter({ text: `${client.user.username} Commands` })
            .setTimestamp()
            .setColor(config.color)

        const FunEmbed = new MessageEmbed()
            .setTitle('Fun Commands')
            .setDescription('Say\nMeme\n8ball\nCoinflip\nDiceroll')
            .setFooter({ text: `${client.user.username} Commands` })
            .setTimestamp()
            .setColor(config.color)

        const collector = interaction.channel.createMessageComponentCollector({
            time: 15000,
            componentType: 'SELECT_MENU'
        })

        collector.on('collect', async (collected) => {
            const value = collected.values[0]

            if (value === 'configuration') {
                collected.reply({ embeds: [ConfigurationEmbed], ephemeral: true });
            }
            if (value === 'moderation') {
                collected.reply({ embeds: [ModerationEmbed], ephemeral: true });
            }
            if (value === 'information') {
                collected.reply({ embeds: [InformationEmbed], ephemeral: true });
            }
            if (value === 'giveaway') {
                collected.reply({ embeds: [GiveawayEmbed], ephemeral: true });
            }
            if (value === 'animals') {
                collected.reply({ embeds: [AnimalsEmbed], ephemeral: true });
            }
            if (value === 'fun') {
                collected.reply({ embeds: [FunEmbed], ephemeral: true });
            }
        })
    },
};
