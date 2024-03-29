import { Command, Option } from "commander";
import { createInterface } from "readline";
import { sendPayout } from "../utils/api/payout";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

const validateEmail = (email: string) => {
    return email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
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

const receiver_option = new Option(
    "-r, --receivers <emails>",
    "Comma-separated list of receiver emails"
);

const amount_option = new Option(
    "-v, --values <values>",
    "Comma-separated list of amounts corresponding to each receiver"
);

const currency_option = new Option(
    "-c, --currency [currency]",
    "Specify the currency type"
)
    .default("USD")
    .choices(paypalCurrencies);

const note_option = new Option(
    "-n, --notes [notes]",
    "Optional comma-separated list of notes corresponding to each receiver or one global note"
).default("Thanks for your patronage!");

const subject_option = new Option(
    "-s, --subject [subject]",
    "Optional email subject"
).default("You have a payout!");

const message_option = new Option(
    "-m, --message [message]",
    "Optional email message"
).default("You have received a payout! Thanks for using our service!");

const payout = new Command("payout")
    .description(
        "Make payments to multiple PayPal or Venmo recipients, do ppl payout --help for more info."
    )
    .addOption(receiver_option)
    .addOption(amount_option)
    .addOption(currency_option)
    .addOption(note_option)
    .addOption(subject_option)
    .addOption(message_option)
    .action((options) => {
        const receivers = options.emails.split(",");
        const values = options.values.split(",");
        const notes = options.values.split(",");
        const currency_type = options.currency;
        const email_subject = options.subject;
        const email_message = options.message;

        // email validation
        for (const receiver of receivers) {
            if (!validateEmail(receiver)) {
                console.error(`Error: The email ${receiver} is not valid!`);
                process.exit(1);
            }
        }

        const valuesSum = (values: String[]) => {
            let sum = 0;
            for (const value of values) {
                sum += Number(value);
            }
            return sum;
        };

        // confirmation
        rl.question(
            `Are you sure you want to send a total of ${valuesSum(values)} ${
                options.currency
            } to ${receivers.length} receivers? (y/n)\n`,
            (confirmation) => {
                switch (confirmation.toLowerCase()) {
                    case "yes":
                    case "y":
                        console.log("Processing payment...");
                        sendPayout(
                            receivers,
                            values,
                            notes,
                            currency_type,
                            email_subject,
                            email_message
                        );
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
            }
        );
    });

module.exports = payout;
