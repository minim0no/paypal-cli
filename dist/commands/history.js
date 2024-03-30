"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const payout_option = new commander_1.Option("--payout", "view the payout history");
const all_option = new commander_1.Option("-a, --all", "show full history");
const date_option = new commander_1.Option("-d, --date <date>", "show history on specific date");
const history = new commander_1.Command("history")
    .addOption(payout_option)
    .addOption(all_option)
    .addOption(date_option)
    .action((options) => {
    if (Object.keys(options).length === 0) {
        console.log("Please pass an option, use ppl history --help for more info");
    }
    if (options.payout) {
        const filePath = path_1.default.join(__dirname, "../utils/payout-history.txt");
        if ((0, fs_1.existsSync)(filePath)) {
            console.log("Date\t\tSender Batch ID\t\tPayout Batch ID\n");
            const lines = (0, fs_1.readFileSync)(filePath, "utf-8");
            const lines_list = lines.split("\n");
            if (options.all) {
                console.log(lines);
            }
            else if (options.date) {
                let matchedLines = [];
                for (let line of lines_list) {
                    const date = line.split("\t")[0];
                    if (date === options.date) {
                        matchedLines.push(line);
                    }
                }
                console.log(matchedLines.join("\n"));
            }
            else {
                const last_3 = lines_list
                    .slice(Math.max(lines_list.length - 4, 0)) // Ensure to start from at least 0
                    .join("\n");
                console.log(last_3);
                console.log("History only shows the recent 3 payouts. To show all, do:\n");
                console.log("\tppl history --payout --all");
                console.log("\n");
            }
        }
        else {
            console.log("No payout history available");
        }
    }
});
module.exports = history;
//# sourceMappingURL=history.js.map