"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const payout_1 = require("../utils/api/payout");
const payout_option = new commander_1.Option("--payout <batchId>", "show details for a given payment ID");
const details = new commander_1.Command("details")
    .description("show details for an entry")
    .addOption(payout_option)
    .action((options) => {
    if (options.payout) {
        const details = (0, payout_1.getPayoutDetails)(options.payout);
    }
});
module.exports = details;
//# sourceMappingURL=details.js.map