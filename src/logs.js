const { EmbedBuilder } = require('discord.js');
const modlogs = require('./Schemas/modlogsModel.js');
const joinLeave = require('./Schemas/joinLeaveModel.js');
const config = require('./Database/config.json');

module.exports = (client) => {

    /* ----------------------------------------------------------------------------------- */
    client.on('channelCreate', (channel) => {
        modlogs.findOne({ guildID: channel.guild.id }, async (error, data) => {
            if (data) {
                const modlogs = client.channels.cache.get(data.modlogsChannelID);

                const channelCreate = new EmbedBuilder()
                    .setTitle('Channel created!')
                    .setDescription(`Channel: ${channel}\nName: ${channel.name}\nID: ${channel.id}\nType: ${channel.type}`)
                    .setColor(config.color)
                    .setTimestamp()

                return modlogs.send({ embeds: [channelCreate] }).catch(error => {
                    return;
                });
            } else {
                return;
            }
        });
    });
    /* ----------------------------------------------------------------------------------- */
    client.on('channelDelete', (channel) => {
        modlogs.findOne({ guildID: channel.guild.id }, async (error, data) => {
            if (data) {
                const modlogs = client.channels.cache.get(data.modlogsChannelID);

                const channelDelete = new EmbedBuilder()
                    .setTitle('Channel deleted!')
                    .setDescription(`Name: ${channel.name}\nID: ${channel.id}\nType: ${channel.type}`)
                    .setColor(config.color)
                    .setTimestamp()

                return modlogs.send({ embeds: [channelDelete] }).catch(error => {
                    return;
                });
            } else {
                return;
            }
        });
    });
    /* ----------------------------------------------------------------------------------- */
    client.on('emojiCreate', (emoji) => {
        modlogs.findOne({ guildID: emoji.guild.id }, async (error, data) => {
            if (data) {
                const modlogs = client.channels.cache.get(data.modlogsChannelID);

                const emojiCreate = new EmbedBuilder()
                    .setTitle('Emoji created!')
                    .setDescription(`Emoji: ${emoji}\nName: ${emoji.name}\nID: ${emoji.id}\nAnimated: ${emoji.animated}\nURL: ${emoji.url}`)
                    .setThumbnail(`${emoji.url}`)
                    .setColor(config.color)
                    .setTimestamp()

                return modlogs.send({ embeds: [emojiCreate] }).catch(error => {
                    return;
                });
            } else {
                return;
            }
        });
    });
    /* ----------------------------------------------------------------------------------- */
    client.on('emojiDelete', (emoji) => {
        modlogs.findOne({ guildID: emoji.guild.id }, async (error, data) => {
            if (data) {
                const modlogs = client.channels.cache.get(data.modlogsChannelID);

                const emojiDelete = new EmbedBuilder()
                    .setTitle('Emoji deleted!')
                    .setDescription(`Name: ${emoji.name}\nID: ${emoji.id}\nAnimated: ${emoji.animated}\nURL: ${emoji.url}`)
                    .setThumbnail(`${emoji.url}`)
                    .setColor(config.color)
                    .setTimestamp()

                return modlogs.send({ embeds: [emojiDelete] }).catch(error => {
                    return;
                });
            } else {
                return;
            }
        });
    });
    /* ----------------------------------------------------------------------------------- */
    client.on('guildBanAdd', (ban) => {
        modlogs.findOne({ guildID: ban.guild.id }, async (error, data) => {
            if (data) {
                const modlogs = client.channels.cache.get(data.modlogsChannelID);

                const guildBanAdd = new EmbedBuilder()
                    .setTitle('Member banned!')
                    .setDescription(`Name: ${ban.user.username}\nID: ${ban.user.id}\nBot: ${ban.user.bot}`)
                    .setThumbnail(`${ban.user.displayAvatarURL({ dynamic: true })}`)
                    .setColor(config.color)
                    .setTimestamp()

                return modlogs.send({ embeds: [guildBanAdd] }).catch(error => {
                    return;
                });
            } else {
                return;
            }
        });
    });
    /* ----------------------------------------------------------------------------------- */
    client.on('guildBanRemove', (ban) => {
        modlogs.findOne({ guildID: ban.guild.id }, async (error, data) => {
            if (data) {
                const modlogs = client.channels.cache.get(data.modlogsChannelID);

                const guildBanRemove = new EmbedBuilder()
                    .setTitle('Member unbanned!')
                    .setDescription(`Name: ${ban.user.username}\nID: ${ban.user.id}\nBot: ${ban.user.bot}`)
                    .setThumbnail(`${ban.user.displayAvatarURL({ dynamic: true })}`)
                    .setColor(config.color)
                    .setTimestamp()

                return modlogs.send({ embeds: [guildBanRemove] }).catch(error => {
                    return;
                });
            } else {
                return;
            }
        });
    });
    /* ----------------------------------------------------------------------------------- */
    client.on('inviteCreate', (invite) => {
        modlogs.findOne({ guildID: invite.guild.id }, async (error, data) => {
            if (data) {
                const modlogs = client.channels.cache.get(data.modlogsChannelID);

                const inviteCreate = new EmbedBuilder()
                    .setTitle('Invite created!')
                    .setDescription(`URL: ${invite.url}\nCode: ${invite.code}\nInviter: ${invite.inviter}\nMax uses: ${invite.maxUses}\nMax age: ${invite.maxAge} seconds\nExpires at: ${invite.expiresAt}`)
                    .setColor(config.color)
                    .setTimestamp()

                return modlogs.send({ embeds: [inviteCreate] }).catch(error => {
                    return;
                });
            } else {
                return;
            }
        });
    });
    /* ----------------------------------------------------------------------------------- */
    client.on('inviteDelete', (invite) => {
        modlogs.findOne({ guildID: invite.guild.id }, async (error, data) => {
            if (data) {
                const modlogs = client.channels.cache.get(data.modlogsChannelID);

                const inviteDelete = new EmbedBuilder()
                    .setTitle('Invite deleted!')
                    .setDescription(`URL: ${invite.url}\nCode: ${invite.code}`)
                    .setColor(config.color)
                    .setTimestamp()

                return modlogs.send({ embeds: [inviteDelete] }).catch(error => {
                    return;
                });
            } else {
                return;
            }
        });
    });
    /* ----------------------------------------------------------------------------------- */
    client.on('roleCreate', (role) => {
        modlogs.findOne({ guildID: role.guild.id }, async (error, data) => {
            if (data) {
                const modlogs = client.channels.cache.get(data.modlogsChannelID);

                const roleCreate = new EmbedBuilder()
                    .setTitle('Role created!')
                    .setDescription(`Role: ${role}\nName: ${role.name}\nID: ${role.id}\nColor: ${role.color}\nHex Color: ${role.hexColor}\nCreated at: ${role.createdAt}\nRole icon: ${role.icon || 'No icon'}`)
                    .setColor(config.color)
                    .setTimestamp()

                return modlogs.send({ embeds: [roleCreate] }).catch(error => {
                    return;
                });
            } else {
                return;
            }
        });
    });
    /* ----------------------------------------------------------------------------------- */
    client.on('roleDelete', (role) => {
        modlogs.findOne({ guildID: role.guild.id }, async (error, data) => {
            if (data) {
                const modlogs = client.channels.cache.get(data.modlogsChannelID);

                const roleDelete = new EmbedBuilder()
                    .setTitle('Role deleted!')
                    .setDescription(`Name: ${role.name}\nID: ${role.id}\nColor: ${role.color}\nHex Color: ${role.hexColor}\nCreated at: ${role.createdAt}\nRole icon: ${role.icon || 'No icon'}`)
                    .setColor(config.color)
                    .setTimestamp()

                return modlogs.send({ embeds: [roleDelete] }).catch(error => {
                    return;
                });
            } else {
                return;
            }
        });
    });
    /* ----------------------------------------------------------------------------------- */
    client.on('stickerCreate', (sticker) => {
        modlogs.findOne({ guildID: sticker.guild.id }, async (error, data) => {
            if (data) {
                const modlogs = client.channels.cache.get(data.modlogsChannelID);

                const stickerCreate = new EmbedBuilder()
                    .setTitle('Sticker created!')
                    .setDescription(`Name: ${sticker.name}\nID: ${sticker.id}\nURL: ${sticker.url}\nCreated at ${sticker.createdAt}`)
                    .setThumbnail(`${sticker.url}`)
                    .setColor(config.color)
                    .setTimestamp()

                return modlogs.send({ embeds: [stickerCreate] }).catch(error => {
                    return;
                });
            } else {
                return;
            }
        });
    });
    /* ----------------------------------------------------------------------------------- */
    client.on('stickerDelete', (sticker) => {
        modlogs.findOne({ guildID: sticker.guild.id }, async (error, data) => {
            if (data) {
                const modlogs = client.channels.cache.get(data.modlogsChannelID);

                const stickerDelete = new EmbedBuilder()
                    .setTitle('Sticker deleted!')
                    .setDescription(`Name: ${sticker.name}\nID: ${sticker.id}\nURL: ${sticker.url}\nCreated at ${sticker.createdAt}`)
                    .setThumbnail(`${sticker.url}`)
                    .setColor(config.color)
                    .setTimestamp()

                return modlogs.send({ embeds: [stickerDelete] }).catch(error => {
                    return;
                });
            } else {
                return;
            }
        });
    });
    /* ----------------------------------------------------------------------------------- */
    client.on('guildMemberAdd', (member) => {
        joinLeave.findOne({ guildID: member.guild.id }, async (error, data) => {
            if (!data) {
                return;
            } else {
                const channel = member.client.channels.cache.get(data.joinChannelID);

                const welcome = new EmbedBuilder()
                    .setTitle('Welcome!')
                    .setDescription(`${member}, welcome to ${member.guild.name}, we hope you have an amazing time in our server! Make sure to read the rules and have fun!`)
                    .setColor(config.color)
                    .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
                    .setTimestamp()

                channel.send({ embeds: [welcome] }).catch(error => {
                    return;
                });
            }
        });

        modlogs.findOne({ guildID: member.guild.id }, async (error, data) => {
            if (data) {
                const modlogs = client.channels.cache.get(data.modlogsChannelID);

                const guildMemberAdd = new EmbedBuilder()
                    .setTitle('Member joined!')
                    .setDescription(`Member: ${member}\nName + Tag: ${member.user.tag}\nID: ${member.id}`)
                    .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
                    .setColor(config.color)
                    .setTimestamp()

                return modlogs.send({ embeds: [guildMemberAdd] }).catch(error => {
                    return;
                });
            } else {
                return;
            }
        });
    });
    /* ----------------------------------------------------------------------------------- */
    client.on('guildCreate', (guild) => {
        const guildCreate = new EmbedBuilder()
            .setTitle('Server joined!')
            .setDescription(`${client.user.username} just joined **${guild.name}**! This server has ${guild.memberCount} members!`)
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL({ dynamic: false, png: 'true' })}` })
            .setColor(config.color)
            .setTimestamp()

        client.channels.cache.get('982587950963515422').send({ embeds: [guildCreate] }).catch(error => {
            return;
        });
    });
    /* ----------------------------------------------------------------------------------- */
    client.on('guildDelete', (guild) => {
        const guildCreate = new EmbedBuilder()
            .setTitle('Server left!')
            .setDescription(`${client.user.username} just left **${guild.name}**! This server had ${guild.memberCount} members!`)
            .setFooter({ text: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL({ dynamic: false, png: 'true' })}` })
            .setColor(config.color)
            .setTimestamp()

        client.channels.cache.get('982587950963515422').send({ embeds: [guildCreate] }).catch(error => {
            return;
        });
    });
    /* ----------------------------------------------------------------------------------- */
    client.on('guildMemberRemove', (member) => {
        joinLeave.findOne({ guildID: member.guild.id }, async (error, data) => {
            if (!data) {
                return;
            } else {
                const channel = member.client.channels.cache.get(data.leaveChannelID);

                const leave = new EmbedBuilder()
                    .setTitle('Bye!')
                    .setDescription(`${member.user.tag} just left ${member.guild.name}! Wasn\'t cool enough for us anyway!`)
                    .setColor(config.color)
                    .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
                    .setTimestamp()

                channel.send({ embeds: [leave] }).catch(error => {
                    return;
                });
            }
        });

        modlogs.findOne({ guildID: member.guild.id }, async (error, data) => {
            if (data) {
                const modlogs = client.channels.cache.get(data.modlogsChannelID);

                const guildMemberRemove = new EmbedBuilder()
                    .setTitle('Member left!')
                    .setDescription(`Member: ${member}\nName + Tag: ${member.user.tag}\nID: ${member.id}`)
                    .setThumbnail(`${member.user.displayAvatarURL({ dynamic: true })}`)
                    .setColor(config.color)
                    .setTimestamp()

                return modlogs.send({ embeds: [guildMemberRemove] }).catch(error => {
                    return;
                });
            } else {
                return;
            }
        });
    });
    /* ----------------------------------------------------------------------------------- */
}
