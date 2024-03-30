import { Command, Option } from "commander";
import { existsSync, readFileSync } from "fs";
import path from "path";

const payout_option = new Option("--payout", "view the payout history");

const all_option = new Option("-a, --all", "show full history");

const date_option = new Option(
    "-d, --date <date>",
    "show history on specific date"
);

const history = new Command("history")
    .addOption(payout_option)
    .addOption(all_option)
    .addOption(date_option)
    .action((options) => {
        if (Object.keys(options).length === 0) {
            console.log(
                "Please pass an option, use ppl history --help for more info"
            );
        }
        if (options.payout) {
            const filePath = path.join(
                __dirname,
                "../utils/payout-history.txt"
            );
            if (existsSync(filePath)) {
                console.log("Date\t\tSender Batch ID\t\tPayout Batch ID\n");
                const lines = readFileSync(filePath, "utf-8");
                const lines_list = lines.split("\n");
                if (options.all) {
                    console.log(lines);
                } else if (options.date) {
                    let matchedLines = [];
                    for (let line of lines_list) {
                        const date = line.split("\t")[0];
                        if (date === options.date) {
                            matchedLines.push(line);
                        }
                    }
                    console.log(matchedLines.join("\n"));
                } else {
                    const last_3 = lines_list
                        .slice(Math.max(lines_list.length - 4, 0)) // Ensure to start from at least 0
                        .join("\n");
                    console.log(last_3);
                    console.log(
                        "History only shows the recent 3 payouts. To show all, do:\n"
                    );
                    console.log("\tppl history --payout --all");
                    console.log("\n");
                }
            } else {
                console.log("No payout history available");
            }
        }
    });

module.exports = history;
