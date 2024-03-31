import { Command, Option } from "commander";
import { getPayoutDetails } from "../utils/api/payout";

const payout_option = new Option(
    "--payout <batchId>",
    "show details for a given payment ID"
);

const details = new Command("details")
    .description("show details for an entry")
    .addOption(payout_option)
    .action(async (options) => {
        if (options.payout) {
            const details = await getPayoutDetails(options.payout);
        }
    });

module.exports = details;
