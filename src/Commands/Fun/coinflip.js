const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('util').promisify(setTimeout);
const config = require('../../Database/config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('Flip a gold coin!'),
    async execute(interaction) {

        await interaction.deferReply();

        const random = Math.floor(Math.random() * 100);

        const coinFlipping = new MessageEmbed()
            .setDescription(`Flipping the coin... :coin:`)
            .setColor('RANDOM');

        const coinFlipped = new MessageEmbed()
            .setTitle(`Coin flipped!`)
            .setColor(config.color)

        if (random > 50) {
            coinFlipped
                .setDescription(`${interaction.user.tag}'s gold coin landed on **Tails**!`)
        }
        else if (random < 50) {
            coinFlipped
                .setDescription(`${interaction.user.tag}'s gold coin landed on **Heads**!`)
        }
        else if (random == 50) {
            coinFlipped
                .setDescription(`${interaction.user.tag}'s coin landed on the **side**!`)
                .setFooter({ text: 'Message Agility#1111 for a prize!' })
        }

        interaction.editReply({ embeds: [coinFlipping] });
        await wait(3000);
        interaction.editReply({ embeds: [coinFlipped] });
    },
};