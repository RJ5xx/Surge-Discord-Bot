const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');
const axios = require('axios');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('pikachu')
        .setDescription('Shows a random pikachu!'),
    async execute(interaction) {

        await interaction.deferReply();

        const url = "https://some-random-api.ml/img/pikachu";

        axios.get(url).then((res) => {
            const pikachuEmbed = new EmbedBuilder()
                .setColor(config.color)
                .setTitle(`Pikachu Image!`)
                .setImage(res.data.link)
                .setFooter({ text: 'Aww, how cute' })
                .setTimestamp()

            interaction.editReply({ embeds: [pikachuEmbed] });
        }).catch(() => {
            interaction.editReply({ content: 'Image not avaibale, try again later!' });
        })
    },
};