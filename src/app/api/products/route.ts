import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/utils/getToken";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const product = searchParams.get("product");

    if (!product) {
      return NextResponse.json(
        { error: "Product parameter is required" },
        { status: 400 }
      );
    }

    const dataFromTokenHandler = await getToken();
    const locationId = process.env.REACT_kroger_store_locationId;
    const productUrl = "https://api-ce.kroger.com/v1/products";
    const res = await fetch(
      `${productUrl}?filter.locationId=${locationId}&filter.term=${product}&filter.brand=Kroger`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${dataFromTokenHandler.access_token}`,
        },
      }
    );
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch product data" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data.data);
  } catch (error) {
    console.error("Error fetching product data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
