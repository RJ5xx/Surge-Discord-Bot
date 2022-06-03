const AsciiTable = require('ascii-table');
const table = new AsciiTable();
table.setHeading('Events', 'Stats').setBorder('|', '=', "0", "0");

module.exports = (client) => {
    client.handleEvents = async (eventFiles, path) => {

        for (const file of eventFiles) {
            const event = require(`../Events/${file}`);
            if (event.once) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else {
                client.on(event.name, (...args) => event.execute(...args, client));
            };

            if (event.name) {
                table.addRow(file.split('.js')[0], '✅')
            } else {
                table.addRow(file.split('.js')[0], '⛔')
            };
        };
        console.log(table.toString());
    };
};