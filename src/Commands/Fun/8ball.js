const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const config = require('../../Database/config.json');
const answers = [
    'It is certain.',
    'It is decidedly so.',
    'Without a doubt.',
    'Yes - definitely.',
    'You may rely on it.',
    'As I see it, yes.',
    'Most likely.',
    'Outlook good.',
    'Yes.',
    'Signs point to yes.',
    'Reply hazy, try again.',
    'Ask again later.',
    'Better not tell you now.',
    'Cannot predict now.',
    'Concentrate and ask again.',
    'Don\'t count on it.',
    'My reply is no.',
    'My sources say no.',
    'Outlook not so good.',
    'Very doubtful.'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('8ball')
        .setDescription('Ask a question!')
        .addStringOption((option) => option.setName('question')
            .setDescription('What is your question?')
            .setRequired(true)),
    async execute(interaction) {

        await interaction.deferReply();

        const question = interaction.options.getString('question');

        const embed = new MessageEmbed()
            .setTitle('🎱 8ball!')
            .setDescription(`Your question: **${question}**\nMy response: **${answers[Math.floor(Math.random() * answers.length)]}**`)
            .setColor(config.color)

        interaction.editReply({ embeds: [embed] });
    },
};