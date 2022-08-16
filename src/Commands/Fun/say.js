const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make me say something!')
        .addStringOption((option) => option.setName('content')
            .setDescription('What do you want me to say?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const content = interaction.options.getString('content');

        const embed = new EmbedBuilder()
            .setDescription(`${content}\n\n- ${interaction.user.username}`)
            .setColor(config.color)

        interaction.editReply({ embeds: [embed] }).catch(error => {
            return interaction.editReply({ content: `${config.errorMessage} ${config.errorEmoji}\n${error}` });
        });
    },
};