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
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const auth_1 = require("../utils/auth");
const clientId_arg = new commander_1.Argument("[clientId]", "Client ID");
const clientSecret_arg = new commander_1.Argument("[clientSecret]", "Client Secret");
const login = new commander_1.Command("login")
    .description("Login to PayPal to begin using the PayPal CLI")
    .addArgument(clientId_arg)
    .addArgument(clientSecret_arg)
    .action((clientId, clientSecret) => __awaiter(void 0, void 0, void 0, function* () {
    if (clientId && clientSecret) {
        console.log("Saving credentials...");
        yield (0, auth_1.setClientId)(clientId);
        yield (0, auth_1.setClientSecret)(clientSecret);
    }
    console.log("Logging in...");
    if (!clientId || !clientSecret) {
        console.log("Error: Missing Client ID and/or Client Secret argument.");
    }
    else {
        yield (0, auth_1.auth)(clientId, clientSecret);
        console.log("Successfully logged in.");
        console.log("If you are logged out of this app, do:\n");
        console.log("\tppl login\n");
        console.log("If you want to update the app you are using, please pass in new credentials.");
    }
}));
// --help
login.addHelpText("after", `
    
    To create a Client ID and Client Secret, follow these steps:
        1. Log into the developer dashboard @ https://developer.paypal.com/dashboard/
        2. Select Apps & Credentials.
        3. New accounts come with a Default Application in the REST API apps section. To create a new project, select Create App.
        4. Copy the Client ID and Client Secret for your app.
    `);
login.showHelpAfterError("Make sure you are passing credentials if you're accessing a new app, do ppl login --help for more info.");
module.exports = login;
//# sourceMappingURL=login.js.map