"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../structs/types/Command");
exports.default = new Command_1.Command({
    name: "ping",
    description: "reply with pong 🏓",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    run({ interaction }) {
        const row = new discord_js_1.ActionRowBuilder({ components: [
                new discord_js_1.ButtonBuilder({ customId: "test-button", label: "Clique aqui", style: discord_js_1.ButtonStyle.Success })
            ] });
        interaction.reply({ content: "pong 🏓" });
    },
});
