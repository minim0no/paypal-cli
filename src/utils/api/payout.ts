import { appendFile } from "fs";
import { getAccessToken } from "../auth";
import path from "path";

export async function sendPayout(
    recipients: String[],
    values: String[],
    notes: String[] | String,
    currency_type: String,
    email_subject: String,
    email_message: String
) {
    let payoutItems = [];

    for (let i = 0; i < recipients.length; i++) {
        payoutItems.push({
            recipient_type: "EMAIL",
            amount: {
                value: values[i],
                currency: currency_type,
            },
            receiver: recipients[i],
            note: notes[i],
            sender_item_id: `item_${i}`,
        });
    }

    const sender_batch_id = `Payouts_${Date.now()}`;

    const payoutData = {
        sender_batch_header: {
            sender_batch_id: sender_batch_id,
            email_subject: email_subject,
            email_message: email_message,
        },
        items: payoutItems,
    };

    fetch("https://api.sandbox.paypal.com/v1/payments/payouts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getAccessToken()}`,
        },
        body: JSON.stringify(payoutData),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.error == "invalid_token") {
                throw new Error(
                    "Invalid token, make sure you're logged in! ppl login --help for more info."
                );
            }
            console.log("Payout successfully processed.");
            const payout_batch_id = data.batch_header.payout_batch_id; // used for get request to track details of payout
            const sender_batch_id =
                data.batch_header.sender_batch_header.sender_batch_id;
            const timestamp = Number(sender_batch_id.split("_")[1]);
            const date = new Date(timestamp);
            const formattedDate =
                date.getMonth() +
                1 +
                "/" +
                date.getDate() +
                "/" +
                date.getFullYear();

            // Date - sender batch id - payout batch id
            const historyLine = `${formattedDate}\t${sender_batch_id}\t${payout_batch_id}\n`;
            const filePath = path.join(__dirname, "../payout-history.txt");
            appendFile(filePath, historyLine, (err) => {
                if (err) throw err;
                console.log(
                    "Payout was saved to history. Use ppl history --payout to see your most recent payout."
                );
            });
        })
        .catch((error) => console.error("Error:", error));

    return sender_batch_id;
}

export async function getPayoutDetails(payout_batch_id: string) {
    return "";
}
