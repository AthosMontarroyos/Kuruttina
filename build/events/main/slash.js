"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const Event_1 = require("./../../structs/types/Event");
exports.default = new Event_1.Event({
    name: 'interactionCreate',
    run(interaction) {
        if (!interaction.isCommand())
            return;
        const command = __1.client.commands.get(interaction.commandName);
        if (!command)
            return;
        const options = interaction.options;
        command.run({ client: __1.client, options, interaction });
    },
});
