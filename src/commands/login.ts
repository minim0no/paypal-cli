import { Command } from "commander";
import { refreshToken, setClientId, setClientSecret } from "../utils/auth";

const login = new Command("login")
    .description(
        "Login to PayPal to begin using the PayPal CLI, --help for more info"
    )
    .argument("[string]", "Client ID")
    .argument("[string]", "Client Secret")
    .action(async (clientId, clientSecret) => {
        if (clientId && clientSecret) {
            await setClientId(clientId);
            await setClientSecret(clientSecret);
        }
        const opt = refreshToken();
        if (!opt) {
            console.log("Error: Missing Client ID or Client Secret argument.");
        } else {
            console.log("Successfully logged in.");
        }
    });

// --help
login.addHelpText(
    "after",
    `
    
    To create a Client ID and Client Secret, follow these steps:
        1. Log into the developer dashboard @ https://developer.paypal.com/dashboard/
        2. Select Apps & Credentials.
        3. New accounts come with a Default Application in the REST API apps section. To create a new project, select Create App.
        4. Copy the Client ID and Client Secret for your app.
    `
);

module.exports = login;
