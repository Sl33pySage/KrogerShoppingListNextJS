// import { METHODS } from "http";
import fetch from "node-fetch";

export async function getToken() {
  const tokenUrl = "https://api-ce.kroger.com/v1/connect/oauth2/token";
  const clientId = process.env.client_id;
  const clientSecret = process.env.client_secret;

  const res = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
    },
    body: "grant_type=client_credentials&scope=product.compact",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch token");
  }
  const data = await res.json();
  return <any>data;
}
