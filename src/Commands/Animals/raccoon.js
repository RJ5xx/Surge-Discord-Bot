const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');
const axios = require('axios');

module.exports = {
    ownerOnly: false,
    voteOnly: false,
    data: new SlashCommandBuilder()
        .setName('raccoon')
        .setDescription('Shows a random raccoon!'),
    async execute(interaction) {

        await interaction.deferReply();

        const url = "https://some-random-api.ml/img/raccoon";

        axios
            .get(url)
            .then((res) => {
                const raccoonEmbed = new EmbedBuilder()
                    .setColor(config.color)
                    .setTitle(`Raccoon Image!`)
                    .setImage(res.data.image)
                    .setFooter({ text: 'Aww, how cute' })
                    .setTimestamp()

                interaction.editReply({ embeds: [raccoonEmbed] });
            }).catch(() => {
                interaction.editReply({ content: 'Image not avaibale, try again later!' });
            })
    },
};