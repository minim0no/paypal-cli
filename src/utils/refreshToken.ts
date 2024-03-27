import { getClientId, getClientSecret, setAccessToken, auth } from "./auth";
import { readFileSync } from "fs";

export async function refreshToken() {
    const clientId = await getClientId();
    const clientSecret = await getClientSecret();
    if (clientId && clientSecret) {
        setAccessToken(await auth(clientId, clientSecret));
        return "success";
    } else {
        console.error("Error: credentials not found or unavailable");
        return null;
    }
}

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
