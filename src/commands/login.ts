import { Command } from "commander";

const login = new Command("login")
    .description("Login to the REST API to begin using the PayPal CLI")
    .argument("<string>", "Client ID")
    .argument("<string>", "Client Secret")
    .action((clientId, clientSecret) => {});

// --help
login.addHelpText(
    "after",
    `
    
    To get a Client ID and Client Secret, follow these steps:
        1. Log into the developer dashboard @ https://developer.paypal.com/dashboard/
        2. Select Apps & Credentials.
        3. New accounts come with a Default Application in the REST API apps section. To create a new project, select Create App.
        4. Copy the Client ID and Client Secret for your app.

    `
);
