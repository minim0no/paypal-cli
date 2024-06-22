#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const paypal_ascii_1 = __importDefault(require("./utils/paypal_ascii"));
const auth_1 = require("./utils/auth");
const program = new commander_1.Command();
function checkAuth() {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield (0, auth_1.isExpired)()) {
            const clientId = yield (0, auth_1.getClientId)();
            const clientSecret = yield (0, auth_1.getClientSecret)();
            if (clientId && clientSecret) {
                (0, auth_1.auth)(clientId, clientSecret);
            }
        }
        else {
            console.log("YOU ARE AUTHENTICATED!");
        }
    });
}
const helpCommand = require("./commands/help");
const loginCommand = require("./commands/login");
const payoutCommand = require("./commands/payout");
const historyCommand = require("./commands/history");
const detailsCommand = require("./commands/details");
program
    .name("ppl")
    .version("0.0.1")
    .description("An application that interacts with the PayPal REST API")
    .action((cmd) => {
    console.log("Welcome to the PayPal CLI");
    console.log("For help, type ppl --help");
    console.log(cmd);
});
program.addHelpText("before", `\n ${(0, paypal_ascii_1.default)()}`);
program.addCommand(helpCommand);
program.addCommand(loginCommand);
program.addCommand(payoutCommand);
program.addCommand(historyCommand);
program.addCommand(detailsCommand);
checkAuth();
program.parse(process.argv);
//# sourceMappingURL=ppl.js.map