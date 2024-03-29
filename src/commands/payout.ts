import { Argument, Command, Option } from "commander";

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

const receiver_arg = new Argument("<email>", "Email of the receiver");

const amount_arg = new Argument("<number>", "Amount to send");

const currency_option = new Option(
    "-c, --currency [currency]",
    "Specify the currency type"
)
    .default("USD")
    .choices(paypalCurrencies);

const note_option = new Option(
    "-n, --note [note]",
    "Send a note to the receiver"
).default("Thanks for your patronage!");

const subject_option = new Option(
    "-s, --subject [subject]",
    "The email subject"
).default("You have a payout!");

const message_option = new Option(
    "-m, --message [message]",
    "The email message"
).default("You have received a payout! Thanks for using our service!");

const payout = new Command("payout")
    .description(
        "Make payments to multiple PayPal or Venmo recipients, do ppl payout --help for more info."
    )
    .addArgument(receiver_arg)
    .addArgument(amount_arg)
    .addOption(currency_option)
    .addOption(note_option)
    .addOption(subject_option)
    .addOption(message_option);

module.exports = payout;
