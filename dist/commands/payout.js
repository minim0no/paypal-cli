"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const readline_1 = require("readline");
const rl = (0, readline_1.createInterface)({
    input: process.stdin,
    output: process.stdout,
});
const validateEmail = (email) => {
    return email
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
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
const receiver_arg = new commander_1.Argument("<email>", "Email of the receiver");
const amount_arg = new commander_1.Argument("<amount>", "Amount to send");
const currency_option = new commander_1.Option("-c, --currency [currency]", "Specify the currency type")
    .default("USD")
    .choices(paypalCurrencies);
const note_option = new commander_1.Option("-n, --note [note]", "Send a note to the receiver").default("Thanks for your patronage!");
const subject_option = new commander_1.Option("-s, --subject [subject]", "The email subject").default("You have a payout!");
const message_option = new commander_1.Option("-m, --message [message]", "The email message").default("You have received a payout! Thanks for using our service!");
const payout = new commander_1.Command("payout")
    .description("Make payments to multiple PayPal or Venmo recipients, do ppl payout --help for more info.")
    .addArgument(receiver_arg)
    .addArgument(amount_arg)
    .addOption(currency_option)
    .addOption(note_option)
    .addOption(subject_option)
    .addOption(message_option)
    .action((receiver, amount, options) => {
    if (!validateEmail(receiver)) {
        console.error("Error: receiver's email is not valid!");
        process.exit(1);
    }
    rl.question(`Are you sure you want to send ${amount} to ${receiver}? (y/n)\n`, (confirmation) => {
        switch (confirmation.toLowerCase()) {
            case "yes":
            case "y":
                console.log("Processing payment...");
                break;
            case "no":
            case "n":
                console.log("Payment cancelled.");
                process.exit(0);
            default:
                console.log("Invalid input.");
                process.exit(1);
        }
        rl.close();
    });
});
module.exports = payout;
//# sourceMappingURL=payout.js.map