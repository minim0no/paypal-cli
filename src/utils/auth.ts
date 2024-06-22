import { setPassword, getPassword } from "keytar";

/**
 *
 * @param clientId - The Client ID for the PayPal App
 * @param clientSecret - The Client Secret for the PayPal App
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
    if (data.error) {
        console.error(data.error_description);
    }

    await setAccessToken(data.access_token);
    await setExpirationTime(data.expires_in);
}

/**
 * Checks if the Access Token is expired
 * @returns True if the Access Token is expired, False otherwise
 */
export async function isExpired() {
    const expirationTime = await getExpirationTime();
    if (expirationTime) {
        return Date.now() > expirationTime;
    } else {
        return true;
    }
}

/**
 * Sets the Client ID in the user's Credential Manager
 * @param clientId - The Client ID for the PayPal App
 */
export async function setClientId(clientId: string) {
    try {
        await setPassword("PayPal", "ClientId", clientId);
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
            return accessToken;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching Access Token: ", error);
    }
}

/**
 * Sets the expiration time for the Access Token in the user's Credential Manager
 * @returns The expiration time for the Access Token
 */
export async function setExpirationTime(expires_in: number) {
    try {
        const expirationTime = Date.now() + expires_in * 1000;
        await setPassword(
            "PayPal",
            "ExpirationTime",
            expirationTime.toString()
        );
    } catch (error) {
        console.error("Error saving expiration time: ", error);
    }
}

/**
 * Retrieves the expiration time for the Access Token from the user's Credential Manager
 * @returns The expiration time for the Access Token
 */
export async function getExpirationTime() {
    try {
        const expirationTime = await getPassword("PayPal", "ExpirationTime");
        if (expirationTime) {
            return parseInt(expirationTime);
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching expiration time: ", error);
    }
}

/**
 * Checks if the user is authenticated, if not, it will authenticate the user
 */
export async function checkAuth() {
    if (await isExpired()) {
        const clientId = await getClientId();
        const clientSecret = await getClientSecret();
        if (clientId && clientSecret) {
            auth(clientId, clientSecret);
        }
    }
}
