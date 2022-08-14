const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');
const axios = require('axios');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Shows a random cat!'),
    async execute(interaction) {

        await interaction.deferReply();

        const url = "https://some-random-api.ml/img/cat";

        axios
            .get(url)
            .then((res) => {
                const catEmbed = new EmbedBuilder()
                    .setColor(config.color)
                    .setTitle(`Cat Image!`)
                    .setImage(res.data.image)
                    .setFooter({ text: 'Aww, how cute' })
                    .setTimestamp()

                interaction.editReply({ embeds: [catEmbed] });
            }).catch(() => {
                interaction.editReply({ content: 'Image not avaibale, try again later!' });
            })
    },
};