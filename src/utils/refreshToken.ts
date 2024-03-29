import { getClientId, getClientSecret, setAccessToken, auth } from "./auth";
import { readFileSync } from "fs";

/**
 * Refreshes the access token.
 * @returns null if credentials not found, "success" otherwise.
 */
export async function refreshToken() {
    const clientId = await getClientId();
    const clientSecret = await getClientSecret();
    if (clientId && clientSecret) {
        const access_token = await auth(clientId, clientSecret);
        setAccessToken(access_token);
        return "success";
    } else {
        console.error("Error: credentials not found or unavailable");
        return null;
    }
}

/**
 * Refreshes the access token after a delay.
 * @param delay - The delay
 */
export async function refreshTokenAfterDelay(delay: number) {
    console.log(delay);
    setTimeout(async () => {
        await refreshToken();
    }, delay * 1000); // s to ms
}

if (require.main == module) {
    console.log("Refresh Token Process intiated");
    const delay = Number(readFileSync("delay.txt", "utf-8"));
    if (isNaN(delay)) {
        console.error("Invalid delay argument");
        process.exit(1);
    }
    refreshTokenAfterDelay(delay);
}
