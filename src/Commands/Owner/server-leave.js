const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: true,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('server-leave')
        .setDescription('Leaves a server!')
        .addStringOption((option) => option.setName('id')
            .setDescription('What is the servers ID?')
            .setRequired(true)),
    async execute(interaction, client) {

        await interaction.deferReply();

        const id = interaction.options.getString('id');
        const guild = client.guilds.cache.get(id).catch(error => {
            return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        guild.leave().catch(error => {
            return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        interaction.editReply({ content: `I have left ${guild.name}!` });
    },
};