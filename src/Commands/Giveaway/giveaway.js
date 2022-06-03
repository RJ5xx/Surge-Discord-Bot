const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Create a giveaway!')
        .addSubcommand(subcommand => subcommand.setName('start')
            .setDescription('Start a giveaway!')
            .addStringOption((option) => option.setName('duration')
                .setDescription('How long should it last? (1m, 1h, 1d)')
                .setRequired(true))
            .addIntegerOption((option) => option.setName('winners')
                .setDescription('How many winners should there be?')
                .setRequired(true))
            .addStringOption((option) => option.setName('prize')
                .setDescription('What is the prize name?')
                .setRequired(true))
            .addChannelOption((option) => option.setName('channel')
                .setDescription('Which channel should the giveaway be in?')
                .setRequired(false)),
        )

        .addSubcommand(subcommand => subcommand.setName('actions')
            .setDescription('Options for the giveaway!')
            .addStringOption((option) => option.setName('options')
                .setDescription('Select an option!')
                .setRequired(true)
                .addChoices(
                    { name: 'end', value: 'end' },
                    { name: 'pause', value: 'pause' },
                    { name: 'pause', value: 'pause' },
                    { name: 'unpause', value: 'unpause' },
                    { name: 'reroll', value: 'reroll' },
                    { name: 'delete', value: 'delete' }
                )
            )
            .addStringOption((option) => option.setName('message_id')
                .setDescription('What is the message id of the giveaway?')
                .setRequired(true))),
    async execute(interaction, client) {

        await interaction.deferReply({ ephemeral: true });

        if (!interaction.member.permissions.has('MANAGE_MESSAGES'))
            return interaction.editReply({ content: 'You don\'t have permissions to use this command!' });

        const sub = interaction.options.getSubcommand();

        const errorEmbed = new MessageEmbed()
            .setColor('RED')

        const successEmbed = new MessageEmbed()
            .setColor('GREEN')

        switch (sub) {
            case "start": {

                const gchannel = interaction.options.getChannel('channel') || interaction.channel;
                const duration = interaction.options.getString('duration');
                const winnerCount = interaction.options.getInteger('winners');
                const prize = interaction.options.getString('prize');

                client.giveawaysManager.start(gchannel, {
                    duration: ms(duration),
                    winnerCount,
                    prize,
                    messages: {
                        giveaway: '🎉 **Giveaway started!**',
                        giveawayEnded: '🎉 **Giveaway ended!**',
                        hostedBy: 'Hosted by: {this.hostedBy}',
                        winMessage: '🎊 Congratulations, {winners}! You won **{this.prize}**'
                    }
                }).then(async () => {
                    successEmbed.setDescription('Giveaway has succesfully started!')
                    return interaction.editReply({ embeds: [successEmbed], ephemeral: true });
                }).catch((err) => {
                    errorEmbed.setDescription(`There was an error while trying to start this giveaway!\n\`${err}\``)
                    return interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
                })
            }
                break;

            case "actions": {
                const choice = interaction.options.getString('options');
                const messageId = interaction.options.getString('message_id');
                const giveaway = client.giveawaysManager.giveaways.find((g) => g.guildId === interaction.guildId && g.messageId === messageId);

                if (!giveaway) {
                    errorEmbed.setDescription(`Unable to find the giveaway message ID!`);
                    return interaction.editReply({ embeds: [errorEmbed] });
                }

                switch (choice) {
                    case "end": {
                        client.giveawaysManager.end(messageId).then(() => {
                            successEmbed.setDescription('Giveaway has been ended!');
                            return interaction.editReply({ embeds: [successEmbed], ephemeral: true });
                        }).catch((err) => {
                            errorEmbed.setDescription(`An error has occured!\n\`${err}\``);
                            return interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
                        });
                    }
                        break;

                    case "pause": {
                        client.giveawaysManager.pause(messageId).then(() => {
                            successEmbed.setDescription('Giveaway has been paused!');
                            return interaction.editReply({ embeds: [successEmbed], ephemeral: true });
                        }).catch((err) => {
                            errorEmbed.setDescription(`An error has occured!\n\`${err}\``);
                            return interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
                        });
                    }
                        break;

                    case "unpause": {
                        client.giveawaysManager.unpause(messageId).then(() => {
                            successEmbed.setDescription('Giveaway has been unpaused!');
                            return interaction.editReply({ embeds: [successEmbed], ephemeral: true });
                        }).catch((err) => {
                            errorEmbed.setDescription(`An error has occured!\n\`${err}\``);
                            return interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
                        });
                    }
                        break;

                    case "reroll": {
                        client.giveawaysManager.reroll(messageId).then(() => {
                            successEmbed.setDescription('Giveaway has been rerolled!');
                            return interaction.editReply({ embeds: [successEmbed], ephemeral: true });
                        }).catch((err) => {
                            errorEmbed.setDescription(`An error has occured!\n\`${err}\``);
                            return interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
                        });
                    }
                        break;

                    case "delete": {
                        client.giveawaysManager.delete(messageId).then(() => {
                            successEmbed.setDescription('Giveaway has been deleted!');
                            return interaction.editReply({ embeds: [successEmbed], ephemeral: true });
                        }).catch((err) => {
                            errorEmbed.setDescription(`An error has occured!\n\`${err}\``);
                            return interaction.editReply({ embeds: [errorEmbed], ephemeral: true });
                        });
                    }
                        break;
                }
            }
                break;

            default: {
                console.log('An error occured in the giveaway command!');
            }
        }
    },
};