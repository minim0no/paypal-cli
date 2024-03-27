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
    console.log("\nThese are common Ppl commands used to interact with PayPal: \n");
    console.log("To get started, please login");
    console.log("\tlogin\tlogs into PayPal");
    console.log("get help:");
    console.log("\thelp\tdisplays a list of common commands and usage.");
});
module.exports = help;
//# sourceMappingURL=help.js.map