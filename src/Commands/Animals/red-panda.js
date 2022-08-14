const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const config = require('../../Database/config.json');
const axios = require('axios');

module.exports = {
    ownerOnly: false,
    voteOnly: true,
    data: new SlashCommandBuilder()
        .setName('red-panda')
        .setDescription('Shows a random red panda!'),
    async execute(interaction) {

        await interaction.deferReply();

        const url = "https://some-random-api.ml/img/red_panda";

        axios
            .get(url)
            .then((res) => {
                const redPandaEmbed = new EmbedBuilder()
                    .setColor(config.color)
                    .setTitle(`Red panda Image!`)
                    .setImage(res.data.link)
                    .setFooter({ text: 'Aww, how cute' })
                    .setTimestamp()

                interaction.editReply({ embeds: [redPandaEmbed] });
            }).catch(() => {
                interaction.editReply({ content: 'Image not avaibale, try again later!' });
            })
    },
};