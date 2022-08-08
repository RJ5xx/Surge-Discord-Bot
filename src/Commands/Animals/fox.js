const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');
const axios = require('axios');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('fox')
        .setDescription('Shows a random fox!'),
    async execute(interaction) {

        await interaction.deferReply();

        const url = "https://some-random-api.ml/animal/fox";

        axios
            .get(url)
            .then((res) => {
                const foxEmbed = new EmbedBuilder()
                    .setColor(config.color)
                    .setTitle(`Fox Image!`)
                    .setImage(res.data.image)
                    .setFooter({ text: 'Aww, how cute' })
                    .setTimestamp()

                interaction.editReply({ embeds: [foxEmbed] });
            }).catch(() => {
                interaction.editReply({ content: 'Image not avaibale, try again later!' });
            })
    },
};