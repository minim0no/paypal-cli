import { Argument, Command } from "commander";
import { setClientId, setClientSecret } from "../utils/auth";
import { refreshToken } from "../utils/refreshToken";
import { killProcess } from "../utils/childProcess";
import { read, readFileSync } from "fs";
import path from "path";

const clientId_arg = new Argument("[string]", "Client ID");

const clientSecret_arg = new Argument("[string]", "Client Secret");

const login = new Command("login")
    .description(
        "Login to PayPal to begin using the PayPal CLI, do ppl login --help for more info."
    )
    .addArgument(clientId_arg)
    .addArgument(clientSecret_arg)
    .action(async (clientId, clientSecret) => {
        if (clientId && clientSecret) {
            await setClientId(clientId);
            await setClientSecret(clientSecret);
            const filePath = path.join(__dirname, "../utils/cur-pid.txt");
            const pid = Number(readFileSync(filePath));
            killProcess(pid);
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

login.showHelpAfterError(
    "Make sure you are passing credentials if you're accessing a new REST API app, do ppl login --help for more info."
);

module.exports = login;
