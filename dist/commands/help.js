"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const paypal_ascii_1 = __importDefault(require("../utils/paypal_ascii"));
const help = new commander_1.Command("help").action(() => {
    console.log("\n");
    console.log((0, paypal_ascii_1.default)());
    console.log("\nusage: ppl [-V | --version] [-h | --help] <command>\n");
    console.log("\nThese are common Ppl commands used to interact with PayPal: ");
    console.log("\n");
    console.log("To get started login:");
    console.log("\tlogin\tlog into PayPal");
    console.log("\n");
    console.log("For any help, execute:");
    console.log("\thelp\tdisplay a list of common commands and usage.");
});
module.exports = help;
//# sourceMappingURL=help.js.map