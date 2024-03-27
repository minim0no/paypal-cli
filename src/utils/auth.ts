import { request } from "http";

function auth(clientId: string, clientSecret: string) {
    let access_token = "";

    const authorization =
        "Basic " +
        Buffer.from(clientId + ":" + clientSecret).toString("base64"); // PayPal API wants Base64

    fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
        method: "POST",
        headers: {
            Authorization: authorization,
            Accept: "application/json",
            "Accept-Language": "en_US",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
    })
        .then((response) => response.json())
        .then((data) => (access_token = data.access_token))
        .catch((error) => console.error("Error:", error));

    return access_token;
}
