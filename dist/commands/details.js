"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const payout_1 = require("../utils/api/payout");
const chalk_1 = __importDefault(require("chalk"));
const payout_option = new commander_1.Option("--payout <batchId>", "show details for a given payment ID");
const details = new commander_1.Command("details")
    .description("show details for an entry")
    .addOption(payout_option)
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
    if (options.payout) {
        const details = yield (0, payout_1.getPayoutDetails)(options.payout);
        if (details.error == "invalid_token") {
            throw new Error("Invalid token, make sure you're logged in! ppl login --help for more info.");
        }
        console.log(details);
        const yellow = chalk_1.default.yellow;
        const red = chalk_1.default.red;
        const timeCreated = new Date(details.batch_header.time_created);
        const timeCompleted = new Date(details.batch_header.time_completed);
        let formattedTimeCreated = `${yellow(timeCreated.toLocaleDateString())} at ${red(timeCreated.toLocaleTimeString())}`;
        let formattedTimeCompleted = `${yellow(timeCompleted.toLocaleDateString())} at ${red(timeCompleted.toLocaleTimeString())}`;
        console.log(`The PayPal payout batch "${options.payout}" was created at`, `${formattedTimeCreated} and completed at`, `${formattedTimeCompleted}\n`);
        const amount = details.batch_header.amount.value;
        const fees = details.batch_header.fees.value;
        const currency = details.batch_header.amount.currency;
        const darkBlue = chalk_1.default.hex("#012169");
        const green = chalk_1.default.green;
        console.log(`The total amount paid, including fees, is: \n`, `${darkBlue(Number(amount) + Number(fees))} ${green(currency)}`);
    }
}));
module.exports = details;
//# sourceMappingURL=details.js.map