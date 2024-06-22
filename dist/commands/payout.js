"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const readline_1 = require("readline");
const payout_1 = require("../utils/api/payout");
const validateEmail = (email) => {
    return email
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
// all the currencies paypal supports
const paypalCurrencies = [
    "AUD", // Australian dollar
    "BRL", // Brazilian real (only for Brazil)
    "CAD", // Canadian dollar
    "CNY", // Chinese Renmenbi
    "CZK", // Czech koruna
    "DKK", // Danish krone
    "EUR", // Euro
    "HKD", // Hong Kong dollar
    "HUF", // Hungarian forint (no decimals)
    "INR", // Indian rupee (only for India)
    "ILS", // Israeli new shekel, Free Palestine
    "JPY", // Japanese yen (no decimals)
    "MYR", // Malaysian ringgit (only for Malaysia)
    "MXN", // Mexican peso
    "TWD", // New Taiwan dollar (no decimals)
    "NZD", // New Zealand dollar
    "NOK", // Norwegian krone
    "PHP", // Philippine peso
    "PLN", // Polish złoty
    "GBP", // Pound sterling
    "RUB", // Russian ruble (In-Border payments only)
    "SGD", // Singapore dollar
    "SEK", // Swedish krona
    "CHF", // Swiss franc
    "THB", // Thai baht
    "USD", // United States dollar
];
const receiver_arg = new commander_1.Argument("[emails]", "Comma-separated list of receiver emails");
const amount_arg = new commander_1.Argument("[values]", "Comma-separated list of amounts corresponding to each receiver");
const currency_option = new commander_1.Option("-c, --currency [currency]", "Specify the currency type")
    .default("USD")
    .choices(paypalCurrencies);
const note_option = new commander_1.Option("-n, --notes [string]", "Optional comma-separated list of notes corresponding to each receiver or one global note").default("Thanks for your patronage!");
const subject_option = new commander_1.Option("-s, --subject [string]", "Optional email subject").default("You have a payout!");
const message_option = new commander_1.Option("-m, --message [string]", "Optional email message").default("You have received a payout! Thanks for using our service!");
const payout = new commander_1.Command("payout")
    .description("Make payments to multiple PayPal or Venmo recipients, do ppl payout --help for more info.")
    .addArgument(receiver_arg)
    .addArgument(amount_arg)
    .addOption(currency_option)
    .addOption(note_option)
    .addOption(subject_option)
    .addOption(message_option)
    .action((recipients, values, options) => {
    const recipient_list = recipients.split(",");
    const value_list = values.split(",");
    const notes = options.notes.split(",");
    const currency_type = options.currency;
    const email_subject = options.subject;
    const email_message = options.message;
    if (notes.length === 1) {
        for (let i = 1; i < recipient_list.length; i++) {
            notes.push(notes[0]);
        }
    }
    // email validation
    for (const recipient of recipient_list) {
        if (!validateEmail(recipient)) {
            console.error(`Error: The email "${recipient}" is not valid.`);
            console.error("Make sure you don't have spaces in your comma separated list!");
            process.exit(1);
        }
    }
    const valuesSum = (values) => {
        let sum = 0;
        for (const value of values) {
            sum += Number(value);
        }
        return sum;
    };
    const rl = (0, readline_1.createInterface)({
        input: process.stdin,
        output: process.stdout,
    });
    // confirmation
    rl.question(`Are you sure you want to send a total of ${valuesSum(value_list)} ${options.currency} to ${recipient_list.length} receivers? (y/n)\n`, (confirmation) => {
        switch (confirmation.toLowerCase()) {
            case "yes":
            case "y":
                console.log("Processing payment...");
                (0, payout_1.sendPayout)(recipient_list, value_list, notes, currency_type, email_subject, email_message);
                break;
            case "no":
            case "n":
                console.log("Payment cancelled.");
                break;
            default:
                console.log("Invalid input.");
                break;
        }
        rl.close();
    });
});
module.exports = payout;
//# sourceMappingURL=payout.js.map