const { SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: true,
    data: new SlashCommandBuilder()
        .setName('dm')
        .setDescription('DM an user!')
        .addUserOption((option) => option.setName('user')
            .setDescription('Who do you want me to DM?')
            .setRequired(true))
        .addStringOption((option) => option.setName('content')
            .setDescription('What do you want me to DM?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const content = interaction.options.getString('content');
        const user = interaction.options.getUser('user');

        user.send(`${content}\n\nFrom - ${interaction.user.username}`).catch(error => {
            return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });

        interaction.editReply({ content: `Your message has been sent to ${user.tag}`, ephemeral: true });
    },
}; 