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
const childProcess_1 = require("./childProcess");
const path_1 = __importDefault(require("path"));
/**
 *
 * @param clientId - The Client ID for the PayPal App
 * @param clientSecret - The Client Secret for the PayPal App
 * @returns The access token retrieved
 */
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
        const data = yield response.json();
        if (data.error) {
            console.error("Error: ", data.error_description);
        }
        if (data && data.expires_in) {
            const pidFilePath = path_1.default.join(__dirname, "cur-pid.txt");
            if ((0, fs_1.existsSync)(pidFilePath)) {
                const cur_pid = Number((0, fs_1.readFileSync)(pidFilePath, "utf-8"));
                if (!(0, childProcess_1.isRunning)(cur_pid)) {
                    (0, childProcess_1.createRefreshTokenProcess)(data.expires_in);
                }
            }
            else {
                (0, childProcess_1.createRefreshTokenProcess)(data.expires_in);
            }
        }
        return data.access_token;
    });
}
exports.auth = auth;
/**
 * Sets the Client ID in the user's Credential Manager
 * @param clientId - The Client ID for the PayPal App
 */
function setClientId(clientId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, keytar_1.setPassword)("PayPal", "ClientId", clientId);
        }
        catch (error) {
            console.error("Error saving Client ID: ", error);
        }
    });
}
exports.setClientId = setClientId;
/**
 * Sets the Client Secret in the user's Credential Manager
 * @param clientSecret - The Client Secret for the PayPal App
 */
function setClientSecret(clientSecret) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, keytar_1.setPassword)("PayPal", "ClientSecret", clientSecret);
        }
        catch (error) {
            console.error("Error saving Client Secret: ", error);
        }
    });
}
exports.setClientSecret = setClientSecret;
/**
 * Sets the Access Token in the user's Credential Manager
 * @param accessToken - The Access Token for the PayPal App
 */
function setAccessToken(accessToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, keytar_1.setPassword)("PayPal", "AccessToken", accessToken);
        }
        catch (error) {
            console.error("Error saving Access Token: ", error);
        }
    });
}
exports.setAccessToken = setAccessToken;
/**
 * Retrieves the Client ID from the user's Credential Manager
 * @returns The Client ID for the PayPal App
 */
function getClientId() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const clientId = yield (0, keytar_1.getPassword)("PayPal", "ClientId");
            if (clientId) {
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
/**
 * Retrieves the Client Secret from the user's Credential Manager
 * @returns The Client Secret for the PayPal App
 */
function getClientSecret() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const clientSecret = yield (0, keytar_1.getPassword)("PayPal", "ClientSecret");
            if (clientSecret) {
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
/**
 * Retrieves the Access Token from the user's Credential Manager
 * @returns The Access Token for the PayPal App
 */
function getAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const accessToken = yield (0, keytar_1.getPassword)("PayPal", "AccessToken");
            if (accessToken) {
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