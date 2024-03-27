"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const pay = chalk_1.default.hex("#012169");
const pal = chalk_1.default.hex("#009cde");
function ASCII() {
    let asciiArt = "";
    asciiArt += pay(",------.                  ") + pal(",------.         ,--.") + "     ,-----.,--.   ,--.\n";
    asciiArt += pay("|  .--. ' ,--,--.,--. ,--.") + pal("|  .--. ' ,--,--.|  |") + "    '  .--./|  |   |  |\n";
    asciiArt += pay("|  '--' |' ,-.  | \\  '  / ") + pal("|  '--' |' ,-.  ||  |") + "    |  |    |  |   |  |\n";
    asciiArt += pay("|  | --' \\ '-'  |  \\   '  ") + pal("|  | --' \\ '-'  ||  |") + "    '  '--'\\|  '--.|  |\n";
    asciiArt += pay("`--'      `--`--'.-'  /   ") + pal("`--'      `--`--'`--'") + "     `-----'`-----'`--'\n";
    asciiArt += pay("                 `---'                                                 ");
    return asciiArt;
}
exports.default = ASCII;
//# sourceMappingURL=paypal_ascii.js.map