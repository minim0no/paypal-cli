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
const refreshToken_1 = require("../utils/refreshToken");
const login = new commander_1.Command("login")
    .description("Login to PayPal to begin using the PayPal CLI, --help for more info")
    .argument("[string]", "Client ID")
    .argument("[string]", "Client Secret")
    .action((clientId, clientSecret) => __awaiter(void 0, void 0, void 0, function* () {
    if (clientId && clientSecret) {
        yield (0, auth_1.setClientId)(clientId);
        yield (0, auth_1.setClientSecret)(clientSecret);
    }
    const opt = (0, refreshToken_1.refreshToken)();
    if (!opt) {
        console.log("Error: Missing Client ID or Client Secret argument.");
    }
    else {
        console.log("Successfully logged in.");
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
module.exports = login;
//# sourceMappingURL=login.js.map