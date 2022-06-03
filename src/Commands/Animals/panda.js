const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('panda')
        .setDescription('Shows a random panda'),
    async execute(interaction) {

        await interaction.deferReply();

        const url = "https://some-random-api.ml/animal/panda";

        axios
            .get(url)
            .then((res) => {
                const pandaEmbed = new MessageEmbed()
                    .setColor(config.color)
                    .setTitle(`Panda Image!`)
                    .setImage(res.data.image)
                    .setFooter({ text: 'Aww, how cute' })
                    .setTimestamp()

                interaction.editReply({ embeds: [pandaEmbed] });
            }).catch(() => {
                interaction.editReply({ content: 'Image not avaibale, try again later!' });
            })
    },
};