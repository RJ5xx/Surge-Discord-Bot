const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');
const axios = require('axios');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('kangaroo')
        .setDescription('Shows a random kangaroo!'),
    async execute(interaction) {

        await interaction.deferReply();

        const url = "https://some-random-api.ml/img/kangaroo";

        axios
            .get(url)
            .then((res) => {
                const kangarooEmbed = new EmbedBuilder()
                    .setColor(config.color)
                    .setTitle(`Kangaroo Image!`)
                    .setImage(res.data.image)
                    .setFooter({ text: 'Aww, how cute' })
                    .setTimestamp()

                interaction.editReply({ embeds: [kangarooEmbed] });
            }).catch(() => {
                interaction.editReply({ content: 'Image not avaibale, try again later!' });
            })
    },
};