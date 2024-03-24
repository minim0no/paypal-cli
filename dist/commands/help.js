"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const paypal_ascii_1 = __importDefault(require("../utils/paypal_ascii"));
const help = new commander_1.Command("help").action(() => {
    console.log("\n");
    (0, paypal_ascii_1.default)(); // DISPLAY PAYPAL ASCII
    console.log("\nusage: ppl [-V | --version] [-h | --help] <command>\n");
    console.log("\nThese are common ppl commands used to interact with the PayPal: \n");
    console.log("get some help:");
    console.log("\thelp\tget some help lol");
});
module.exports = help;
//# sourceMappingURL=help.js.map