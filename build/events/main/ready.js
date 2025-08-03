"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const Event_1 = require("./../../structs/types/Event");
exports.default = new Event_1.Event({
    name: "ready",
    once: true,
    run() {
        const { commands, buttons, selects, modals } = __1.client;
        console.log("✅ Bot online".green);
        console.log(`Command loaded: ${commands.size}`.cyan);
        console.log(`Buttons loaded: ${buttons.size}`.cyan);
        console.log(`Selects Menus loaded: ${selects.size}`.cyan);
        console.log(`Modals loaded: ${modals.size}`.cyan);
    }
});
