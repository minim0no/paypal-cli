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
exports.getExpirationTime = exports.setExpirationTime = exports.getAccessToken = exports.getClientSecret = exports.getClientId = exports.setAccessToken = exports.setClientSecret = exports.setClientId = exports.isExpired = exports.auth = void 0;
const keytar_1 = require("keytar");
/**
 *
 * @param clientId - The Client ID for the PayPal App
 * @param clientSecret - The Client Secret for the PayPal App
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
            console.error(data.error_description);
        }
        yield setAccessToken(data.access_token);
        yield setExpirationTime(data.expires_in);
    });
}
exports.auth = auth;
/**
 * Checks if the Access Token is expired
 * @returns True if the Access Token is expired, False otherwise
 */
function isExpired() {
    return __awaiter(this, void 0, void 0, function* () {
        const expirationTime = yield getExpirationTime();
        if (expirationTime) {
            return Date.now() > expirationTime;
        }
        else {
            return true;
        }
    });
}
exports.isExpired = isExpired;
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
/**
 * Sets the expiration time for the Access Token in the user's Credential Manager
 * @returns The expiration time for the Access Token
 */
function setExpirationTime(expires_in) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const expirationTime = Date.now() + expires_in * 1000;
            yield (0, keytar_1.setPassword)("PayPal", "ExpirationTime", expirationTime.toString());
        }
        catch (error) {
            console.error("Error saving expiration time: ", error);
        }
    });
}
exports.setExpirationTime = setExpirationTime;
/**
 * Retrieves the expiration time for the Access Token from the user's Credential Manager
 * @returns The expiration time for the Access Token
 */
function getExpirationTime() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const expirationTime = yield (0, keytar_1.getPassword)("PayPal", "ExpirationTime");
            if (expirationTime) {
                return parseInt(expirationTime);
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error("Error fetching expiration time: ", error);
        }
    });
}
exports.getExpirationTime = getExpirationTime;
//# sourceMappingURL=auth.js.map