import { setPassword, getPassword } from "keytar";

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

    return data.access_token;
}

export async function setClientId(clientId: string) {
    try {
        await setPassword("PayPal", "ClientId", clientId);
        console.log("Client ID saved successfully.");
    } catch (error) {
        console.error("Error saving Client ID: ", error);
    }
}

export async function setClientSecret(clientSecret: string) {
    try {
        await setPassword("PayPal", "ClientSecret", clientSecret);
        console.log("Client Secret saved successfully.");
    } catch (error) {
        console.error("Error saving Client Secret: ", error);
    }
}

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
