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
exports.getAccessToken = exports.getClientSecret = exports.getClientId = exports.setAccessToken = exports.setClientSecret = exports.setClientId = exports.auth = void 0;
const keytar_1 = require("keytar");
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
function auth(clientId, clientSecret) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorization = "Basic " +
            Buffer.from(clientId + ":" + clientSecret).toString("base64"); // PayPal API wants Base64
        const response = yield fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
            method: "POST",
            headers: {
                Authorization: authorization,
                Accept: "application/json",
                "Accept-Language": "en_US",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
        }).catch((error) => console.error("Error:", error));
        const filePath = path_1.default.join(__dirname, "delay.txt");
        const data = yield response.json();
        if (data && data.expires_in) {
            const out = (0, fs_1.openSync)("./out.log", "a");
            const err = (0, fs_1.openSync)("./out.log", "a");
            (0, promises_1.writeFile)(filePath, data.expires_in.toString()).then(() => {
                const child = (0, child_process_1.spawn)("node", ["refreshToken.js"], {
                    cwd: __dirname,
                    stdio: ["ignore", out, err], // ['input', 'output', 'error']
                    detached: true,
                });
                child.unref();
            });
        }
        return data.access_token;
    });
}
exports.auth = auth;
function setClientId(clientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, keytar_1.setPassword)("PayPal", "ClientId", clientId);
            console.log("Client ID saved successfully.");
        }
        catch (error) {
            console.error("Error saving Client ID: ", error);
        }
    });
}
exports.setClientId = setClientId;
function setClientSecret(clientSecret) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, keytar_1.setPassword)("PayPal", "ClientSecret", clientSecret);
            console.log("Client Secret saved successfully.");
        }
        catch (error) {
            console.error("Error saving Client Secret: ", error);
        }
    });
}
exports.setClientSecret = setClientSecret;
function setAccessToken(accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, keytar_1.setPassword)("PayPal", "AccessToken", accessToken);
            console.log("Access Token saved successfully.");
        }
        catch (error) {
            console.error("Error saving Access Token: ", error);
        }
    });
}
exports.setAccessToken = setAccessToken;
function getClientId() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const clientId = yield (0, keytar_1.getPassword)("PayPal", "ClientId");
            if (clientId) {
                console.log("Client ID retrieved successfully.");
                return clientId;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error("Error fetching Client ID: ", error);
        }
    });
}
exports.getClientId = getClientId;
function getClientSecret() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const clientSecret = yield (0, keytar_1.getPassword)("PayPal", "ClientSecret");
            if (clientSecret) {
                console.log("Client Secret retrieved successfully.");
                return clientSecret;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error("Error fetching Client Secret: ", error);
        }
    });
}
exports.getClientSecret = getClientSecret;
function getAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = yield (0, keytar_1.getPassword)("PayPal", "AccessToken");
            if (accessToken) {
                console.log("Access Token retrieved successfully.");
                return accessToken;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error("Error fetching Access Token: ", error);
        }
    });
}
exports.getAccessToken = getAccessToken;
//# sourceMappingURL=auth.js.map