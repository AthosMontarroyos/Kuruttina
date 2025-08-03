"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
const fileCondition = (filename) => filename.endsWith(".ts") || filename.endsWith(".js");
class ExtendedClient extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    buttons = new discord_js_1.Collection();
    selects = new discord_js_1.Collection();
    modals = new discord_js_1.Collection();
    constructor() {
        super({
            intents: [Object.keys(discord_js_1.IntentsBitField.Flags),],
            partials: [
                discord_js_1.Partials.Channel, discord_js_1.Partials.GuildMember, discord_js_1.Partials.Message, discord_js_1.Partials.Reaction, discord_js_1.Partials.ThreadMember, discord_js_1.Partials.User, discord_js_1.Partials.GuildScheduledEvent
            ]
        });
    }
    start() {
        this.login(process.env.TOKEN);
        this.registerModules();
        this.registerEvents();
    }
    registerCommands(commands) {
        this.application?.commands.set(commands)
            .then(() => {
            console.log("✅ Slash Commands (/) defined".green);
        })
            .catch(error => {
            console.log(`❌ An error occurred while trying to set the Slash Commands (/): \n${error}`.red);
        });
    }
    registerModules() {
        const slashCommands = new Array();
        const commandPath = path_1.default.join(__dirname, "..", "commands");
        fs_1.default.readdirSync(commandPath).forEach(local => {
            fs_1.default.readdirSync(commandPath + `/${local}/`).filter(fileCondition).forEach(async (filename) => {
                const command = (await Promise.resolve(`${`../commands/${local}/${filename}`}`).then(s => tslib_1.__importStar(require(s))))?.default;
                const { name, buttons, selects, modals } = command;
                if (name) {
                    this.commands.set(name, command);
                    slashCommands.push(command);
                    if (buttons)
                        buttons.forEach((run, key) => this.buttons.set(key, run));
                    if (selects)
                        selects.forEach((run, key) => this.selects.set(key, run));
                    if (modals)
                        modals.forEach((run, key) => this.modals.set(key, run));
                }
            });
        });
        this.on("ready", () => this.registerCommands(slashCommands));
    }
    registerEvents() {
        const eventsPath = path_1.default.join(__dirname, "..", "events");
        fs_1.default.readdirSync(eventsPath).forEach(local => {
            fs_1.default.readdirSync(`${eventsPath}/${local}`).filter(fileCondition)
                .forEach(async (fileName) => {
                const { name, once, run } = (await Promise.resolve(`${`../events/${local}/${fileName}`}`).then(s => tslib_1.__importStar(require(s))))?.default;
                try {
                    if (name)
                        (once) ? this.once(name, run) : this.on(name, run);
                }
                catch (error) {
                    console.log(`On error ocurred on event: ${name} \n${error}`.red);
                }
            });
        });
    }
}
exports.ExtendedClient = ExtendedClient;
