const { ActionRowBuilder, ButtonBuilder, ComponentType, EmbedBuilder, SelectMenuBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Shows the main command!'),
    async execute(interaction, client) {

        await interaction.deferReply();

        const selectMenu = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
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
                        {
                            label: 'Utility',
                            emoji: '🎪',
                            description: 'All utility commands!',
                            value: 'utility',
                        },
                        {
                            label: 'Owner',
                            emoji: '👑',
                            description: 'All owner commands!',
                            value: 'owner',
                        },
                    ]),
            );

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji('🔗')
                    .setStyle('Link')
                    .setLabel('Support')
                    .setURL('https://discord.gg/u63938UWHf'),

                new ButtonBuilder()
                    .setEmoji('✅')
                    .setStyle('Link')
                    .setLabel('Invite')
                    .setURL('https://discord.com/api/oauth2/authorize?client_id=982579470399586304&permissions=8&scope=bot%20applications.commands'),

                new ButtonBuilder()
                    .setEmoji('💸')
                    .setStyle('Link')
                    .setLabel('Vote')
                    .setURL('https://top.gg/bot/982579470399586304'),

                new ButtonBuilder()
                    .setEmoji('↗️')
                    .setStyle('Link')
                    .setLabel('Source Code')
                    .setURL('https://github.com/Neutral75/Surge-Discord-Bot')
            );

        const embed = new EmbedBuilder()
            .setTitle(`${client.user.username} Discord bot!`)
            .setDescription(`${client.user.username} is a discord bot with many features which are all fun and easy to use! It has over 40 commands which are cool in every way! Choose a category in the section below to see the commands! ${client.user.username} is currently in ${client.guilds.cache.size} servers and monitoring ${interaction.client.guilds.cache.reduce((acc, g) => acc + g.memberCount, 0)} users!\n\nNote: Interaction with the select menu will expire after **45** seconds!\n\nNeutral#4231 & LSIS#2572 - Founders of Surge`)
            .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
            .setColor(config.color)
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL({ dynamic: true })}` })
            .setTimestamp()

        interaction.editReply({ embeds: [embed], components: [selectMenu, button] });

        const configurationEmbed = new EmbedBuilder()
            .setTitle('Configuration Commands')
            .setDescription('Set-join\nSet-leave\nSet-modlogs')
            .setFooter({ text: `${client.user.username} Commands` })
            .setTimestamp()
            .setColor(config.color)

        const moderationEmbed = new EmbedBuilder()
            .setTitle('Moderation Commands')
            .setDescription('Kick\nBan\nTimeout\nPurge\nChange-nickname\nRole-create\nRole-delete\nAdd-role\nRemove-role\nChannel-create\nChannel-delete')
            .setFooter({ text: `${client.user.username} Commands` })
            .setTimestamp()
            .setColor(config.color)

        const informationEmbed = new EmbedBuilder()
            .setTitle('Information Commands')
            .setDescription('Help\nInvite\nVote\nBot-info\nUser-info\nUser-banner\nServer-info\nServer-banner\nRole-info\nChannel-info')
            .setFooter({ text: `${client.user.username} Commands` })
            .setTimestamp()
            .setColor(config.color)

        const giveawayEmbed = new EmbedBuilder()
            .setTitle('Giveaway Commands')
            .setDescription('Giveaway\n> Giveaway start\nGiveaway actions\n- Pause\n- Unpause\n- End\n- Delete\n- Reroll')
            .setFooter({ text: `${client.user.username} Commands` })
            .setTimestamp()
            .setColor(config.color)

        const animalsEmbed = new EmbedBuilder()
            .setTitle('Animals Commands')
            .setDescription('Cat\nDog\nBird\nFox\nKangaroo\nKoala\nPanda\nRed-panda\nPikachu\nRaccoon\nWhale')
            .setFooter({ text: `${client.user.username} Commands` })
            .setTimestamp()
            .setColor(config.color)

        const funEmbed = new EmbedBuilder()
            .setTitle('Fun Commands')
            .setDescription('Say\nMeme\nCoinflip\nDiceroll')
            .setFooter({ text: `${client.user.username} Commands` })
            .setTimestamp()
            .setColor(config.color)

        const utilityEmbed = new EmbedBuilder()
            .setTitle('Utility Commands')
            .setDescription('DM')
            .setFooter({ text: `${client.user.username} Commands` })
            .setTimestamp()
            .setColor(config.color)

        const ownerEmbed = new EmbedBuilder()
            .setTitle('Owner Commands')
            .setDescription('Stop\nServer-invite\nServer-leave')
            .setFooter({ text: `${client.user.username} Commands` })
            .setTimestamp()
            .setColor(config.color)

        const collector = interaction.channel.createMessageComponentCollector({
            componentType: ComponentType.SelectMenu,
            time: 45000
        });

        collector.on('collect', async (collected) => {
            const value = collected.values[0]

            if (value === 'configuration') {
                collected.reply({ embeds: [configurationEmbed], ephemeral: true });
            }
            if (value === 'moderation') {
                collected.reply({ embeds: [moderationEmbed], ephemeral: true });
            }
            if (value === 'information') {
                collected.reply({ embeds: [informationEmbed], ephemeral: true });
            }
            if (value === 'giveaway') {
                collected.reply({ embeds: [giveawayEmbed], ephemeral: true });
            }
            if (value === 'animals') {
                collected.reply({ embeds: [animalsEmbed], ephemeral: true });
            }
            if (value === 'fun') {
                collected.reply({ embeds: [funEmbed], ephemeral: true });
            }
            if (value === 'utility') {
                collected.reply({ embeds: [utilityEmbed], ephemeral: true });
            }
            if (value === 'owner') {
                collected.reply({ embeds: [ownerEmbed], ephemeral: true });
            }
        });

        /* collector.on('end', async(collected) => {

        }); */
    },
};