const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bird')
        .setDescription('Shows a random bird!'),
    async execute(interaction) {

        await interaction.deferReply();

        const url = "https://some-random-api.ml/animal/bird";

        axios
            .get(url)
            .then((res) => {
                const birdEmbed = new MessageEmbed()
                    .setColor(config.color)
                    .setTitle(`Bird Image!`)
                    .setImage(res.data.image)
                    .setFooter({ text: 'Aww, how cute' })
                    .setTimestamp()

                interaction.editReply({ embeds: [birdEmbed] });
            }).catch(() => {
                interaction.editReply({ content: 'Image not avaibale, try again later!' });
            })
    },
};