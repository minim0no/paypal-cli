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
exports.refreshTokenAfterDelay = exports.refreshToken = void 0;
const auth_1 = require("./auth");
const fs_1 = require("fs");
/**
 * Refreshes the access token.
 * @returns null if credentials not found, expiration otherwise.
 */
function refreshToken(fromChild) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientId = yield (0, auth_1.getClientId)();
        const clientSecret = yield (0, auth_1.getClientSecret)();
        if (clientId && clientSecret) {
            const result = yield (0, auth_1.auth)(clientId, clientSecret, fromChild);
            (0, auth_1.setAccessToken)(result.access_token);
            return result.expires_in;
        }
        else {
            console.error("Error: credentials not found or unavailable");
            return null;
        }
    });
}
exports.refreshToken = refreshToken;
/**
 * Refreshes the access token after a delay.
 * @param delay - The delay
 */
function refreshTokenAfterDelay(delay) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(delay);
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            console.log("10 sec passed");
            const expiration = yield refreshToken(true);
            refreshTokenAfterDelay(expiration);
        }), delay * 1000); // s to ms
    });
}
exports.refreshTokenAfterDelay = refreshTokenAfterDelay;
if (require.main == module) {
    console.log("Refresh Token Process intiated");
    const delay = Number((0, fs_1.readFileSync)("delay.txt", "utf-8"));
    if (isNaN(delay)) {
        console.error("Invalid delay argument");
        process.exit(1);
    }
    refreshTokenAfterDelay(delay);
}
//# sourceMappingURL=refreshToken.js.map