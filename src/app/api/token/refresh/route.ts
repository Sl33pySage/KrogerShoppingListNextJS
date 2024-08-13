import { headers } from "next/headers"
import TokenHandler from "../route"



export default async function RefreshHandler(tokenData:any) {
    // const expires_in = tokenData.expires_in
    const access_token = tokenData.access_token
    // const token_type = tokenData.token_type
    // console.log("TOKENTIME: ", expires_in, "\nACCESSTOKEN: ", access_token, "\nTOKENTYPE: ", token_type)

    const refreshUrl = "https://api-ce.kroger.com/v1/connect/oauth2/token"

    const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: decodeURIComponent(access_token),
    })

    const res = await fetch(refreshUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${Buffer.from(`${process.env.client_id}:${process.env.client_secret}`).toString("base64")}`
        },
        body: body
    })

    const data = await res.json()
    console.log(data)
    return data

}