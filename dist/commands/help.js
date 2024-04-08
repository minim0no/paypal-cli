"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const paypal_ascii_1 = __importDefault(require("../utils/paypal_ascii"));
const chalk_1 = __importDefault(require("chalk"));
const help = new commander_1.Command("help").action(() => {
    const darkBlue = chalk_1.default.hex("#012169");
    const lightBlue = chalk_1.default.hex("#009cde");
    console.log("\n");
    console.log((0, paypal_ascii_1.default)());
    console.log("\nusage: ppl [-V | --version] [-h | --help] <command>\n");
    console.log("\nThese are common Ppl commands used to interact with PayPal: ");
    console.log("\n");
    console.log(darkBlue("To get started login:"));
    console.log("\tlogin\tlog into PayPal");
    console.log("\n");
    console.log(lightBlue("For any help, execute:"));
    console.log("\thelp\tdisplay a list of common commands and usage.");
});
module.exports = help;
//# sourceMappingURL=help.js.map