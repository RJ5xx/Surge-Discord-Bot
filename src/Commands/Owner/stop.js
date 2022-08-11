const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: true,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop the bot'),
    async execute(interaction) {

        await interaction.deferReply();

        interaction.editReply({ content: 'Stopping...' }).then()

        process.exit().catch(error => {
            return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });
    },
};