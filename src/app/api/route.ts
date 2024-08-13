"use server"
import TokenHandler  from "./token/route";
import { NextResponse } from "next/server";



export default async function ProductListHandler(product: any) {
  const dataFromTokenHandler = await TokenHandler()

  const locationId = process.env.REACT_kroger_store_locationId
  

  const productUrl =`https://api-ce.kroger.com/v1/products`


  const res = await fetch(`${productUrl}?filter.locationId=${locationId}&filter.term=${product}&filter.brand=Kroger`, {
    method: "GET",
    headers: {
      'Accept': "application/json",
      'Authorization': `Bearer ${await dataFromTokenHandler.access_token}`,
    },
  })

 
  const data = await res.json()
  return await data.data

}