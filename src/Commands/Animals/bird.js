const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');
const axios = require('axios');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('bird')
        .setDescription('Shows a random bird!'),
    async execute(interaction) {

        await interaction.deferReply();

        const url = "https://some-random-api.ml/img/bird";

        axios.get(url).then((res) => {
            const birdEmbed = new EmbedBuilder()
                .setColor(config.color)
                .setTitle(`Bird Image!`)
                .setImage(res.data.link)
                .setFooter({ text: 'Aww, how cute' })
                .setTimestamp()

            interaction.editReply({ embeds: [birdEmbed] });
        }).catch(() => {
            interaction.editReply({ content: 'Image not avaibale, try again later!' });
        })
    },
};