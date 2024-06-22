import { Command, Option } from "commander";
import { getPayoutDetails } from "../utils/api/payout";
import { createInterface } from "readline";
import chalk from "chalk";

const payout_option = new Option(
    "--payout <batchId>",
    "show details for a given payment ID"
);

const details = new Command("details")
    .description("Show details for an entry")
    .addOption(payout_option)
    .action(async (options) => {
        if (options.payout) {
            const details = await getPayoutDetails(options.payout);
            if (details.error == "invalid_token") {
                throw new Error(
                    "Invalid token, make sure you're logged in! ppl login --help for more info."
                );
            }
            console.log(details);
            const yellow = chalk.yellow;
            const red = chalk.red;
            const timeCreated = new Date(details.batch_header.time_created);
            const timeCompleted = new Date(details.batch_header.time_completed);
            let formattedTimeCreated = `${yellow(
                timeCreated.toLocaleDateString()
            )} at ${red(timeCreated.toLocaleTimeString())}`;
            let formattedTimeCompleted = `${yellow(
                timeCompleted.toLocaleDateString()
            )} at ${red(timeCompleted.toLocaleTimeString())}`;

            console.log(
                `The PayPal payout batch "${options.payout}" was created at`,
                `${formattedTimeCreated} and completed at`,
                `${formattedTimeCompleted}\n`
            );

            const amount = details.batch_header.amount.value;
            const fees = details.batch_header.fees.value;
            const currency = details.batch_header.amount.currency;
            const darkBlue = chalk.hex("#012169");
            const green = chalk.green;
            console.log(
                `The total amount paid, including fees, is: \n`,
                `${darkBlue(Number(amount) + Number(fees))} ${green(
                    currency
                )}\n`
            );

            const numItems = details.batch_header.items.length;
            const rl = createInterface({
                input: process.stdin,
                output: process.stdout,
            });
            rl.question(
                `Would you like to view all ${red(numItems)} items?(y/n)\n`,
                (confirmation) => {
                    switch (confirmation.toLowerCase()) {
                        case "yes":
                        case "y":
                            for (let i = 0; i < numItems; i++) {}
                            break;
                        case "no":
                        case "n":
                            const customNumItems = Number(
                                rl.question(
                                    "How many items would you like to view?",
                                    (confirmation) => {
                                        return confirmation;
                                    }
                                )
                            );
                            if (customNumItems > numItems) {
                                console.log(
                                    `You cannot select more than ${numItems} items!`
                                );
                            } else if (!customNumItems) {
                                break;
                            } else {
                                for (let i = 0; i < customNumItems; i++) {}
                            }
                            break;
                        default:
                            console.log("Invalid input.");
                            break;
                    }
                    rl.close();
                }
            );
        }
    });

module.exports = details;
