import { setPassword, getPassword } from "keytar";
import { readFileSync } from "fs";
import { createRefreshTokenProcess, isRunning } from "./childProcess";

/**
 *
 * @param clientId - The Client ID for the PayPal App
 * @param clientSecret - The Client Secret for the PayPal App
 * @returns The access token retrieved
 */
export async function auth(clientId: string, clientSecret: string) {
    const authorization =
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"); // PayPal API wants Base64

    const response = await fetch(
        "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        {
            method: "POST",
            headers: {
                Authorization: authorization,
                Accept: "application/json",
                "Accept-Language": "en_US",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: "grant_type=client_credentials",
        }
    ).catch((error) => console.error("Error:", error));

    const data = await (response as Response).json();
    if (data && data.expires_in) {
        const cur_pid = Number(readFileSync("cur-pid.txt", "utf-8"));
        if (!isRunning(cur_pid)) {
            createRefreshTokenProcess(data.expires_in);
        }
    }

    return data.access_token;
}

/**
 * Sets the Client ID in the user's Credential Manager
 * @param clientId - The Client ID for the PayPal App
 */
export async function setClientId(clientId: string) {
    try {
        await setPassword("PayPal", "ClientId", clientId);
        console.log("Client ID saved successfully.");
    } catch (error) {
        console.error("Error saving Client ID: ", error);
    }
}

/**
 * Sets the Client Secret in the user's Credential Manager
 * @param clientSecret - The Client Secret for the PayPal App
 */
export async function setClientSecret(clientSecret: string) {
    try {
        await setPassword("PayPal", "ClientSecret", clientSecret);
        console.log("Client Secret saved successfully.");
    } catch (error) {
        console.error("Error saving Client Secret: ", error);
    }
}

/**
 * Sets the Access Token in the user's Credential Manager
 * @param accessToken - The Access Token for the PayPal App
 */
export async function setAccessToken(accessToken: string) {
    try {
        await setPassword("PayPal", "AccessToken", accessToken);
        console.log("Access Token saved successfully.");
    } catch (error) {
        console.error("Error saving Access Token: ", error);
    }
}

/**
 * Retrieves the Client ID from the user's Credential Manager
 * @returns The Client ID for the PayPal App
 */
export async function getClientId() {
    try {
        const clientId = await getPassword("PayPal", "ClientId");
        if (clientId) {
            console.log("Client ID retrieved successfully.");
            return clientId;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching Client ID: ", error);
    }
}

/**
 * Retrieves the Client Secret from the user's Credential Manager
 * @returns The Client Secret for the PayPal App
 */
export async function getClientSecret() {
    try {
        const clientSecret = await getPassword("PayPal", "ClientSecret");
        if (clientSecret) {
            console.log("Client Secret retrieved successfully.");
            return clientSecret;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching Client Secret: ", error);
    }
}

/**
 * Retrieves the Access Token from the user's Credential Manager
 * @returns The Access Token for the PayPal App
 */
export async function getAccessToken() {
    try {
        const accessToken = await getPassword("PayPal", "AccessToken");
        if (accessToken) {
            console.log("Access Token retrieved successfully.");
            return accessToken;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching Access Token: ", error);
    }
}
