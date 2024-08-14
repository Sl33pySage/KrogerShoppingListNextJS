"use client";
// import Image from "next/image";
// import { auth, handlers } from "./auth";
// import ProductListHandler from "./api/route";
// import RefreshHandler from "./api/token/refresh/route";
// import TokenHandler from "./api/token/route";
import { useState } from "react";

export default function Home() {
  const [groceryItems, setGroceryItems] = useState<any>([]);
  const [newGroceryItem, setNewGroceryItem] = useState("");
  const [shopCart, setShopCart] = useState<{ [key: string]: any }>({});

  function addDone(e: any) {
    e.target.classList.toggle("done");
  }

  async function addItemToList(userItem: any) {
    if (userItem === "") return;
    // Fetch item data from the API route
    try {
      const res = await fetch(
        `/api/products?product=${encodeURIComponent(userItem)}`
      );
      if (!res.ok) {
        console.error("Failed to fetch product data");
        return;
      }
      const itemData = await res.json();
      // Extract price
      const price = itemData?.[0]?.items?.[0]?.price?.regular;
      if (!price) {
        console.error("Price not found for the product");
        // return;
      }
      // Update state
      setGroceryItems([...groceryItems, userItem]);
      // Update shopCart with the item's price data
      setShopCart((prevCart) => ({
        ...prevCart,
        [userItem]: price,
      }));
      // Clear input
      setNewGroceryItem("");
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
    console.log("groceryItemsState", groceryItems, newGroceryItem);
  }

  function price(item: string) {
    return `${item}: $${shopCart[item] || "Fetching..."}`;
  }

  function total() {
    const taxRate = 0.0825;
    const subtotal = Object.values(shopCart).reduce(
      (acc, curr) => acc + curr,
      0
    );
    const totalAmount = subtotal * (1 + taxRate);
    return `Total: $${totalAmount.toFixed(2)}`;
  }

  return (
    <main
      id="main"
      className="text-blue-500 flex min-h-screen flex-col items-center justify-center "
    >
      <div id="container" className="flex-col flex items-center justify-center">
        <h1 id="title" className="text-4xl m-5">
          Kroger Shopping List
        </h1>
        <input
          value={newGroceryItem}
          className="m-3 text-2xl bg-slate-950 p-1"
          type="text"
          name="GroceryTextInput"
          id="GroceryTextInput"
          placeholder="Enter Item"
          spellCheck="true"
          autoCorrect="on"
          onChange={(e) => {
            setNewGroceryItem(e.target.value);
          }}
        />
        <button
          id="addItemButton"
          className="bg-blue-500 text-zinc-50 p-3 rounded-lg hover:opacity-50 m-2"
          onClick={() => {
            if (newGroceryItem.trim()) {
              addItemToList(newGroceryItem.trim());
            } else {
              alert("PLEASE ENTER A ITEM 😤");
            }
          }}
        >
          Add Item
        </button>
        <h5 id="totalTitle">{total()}</h5>
        <ul className="items-center text-center" id="GroceryList">
          {groceryItems.map((item: any, index: any) => (
            <li key={index} className="text-3xl p-1">
              <button
                onClick={(e) => addDone(e)}
                className="bg-blue-500 p-3 text-zinc-50 m-2 hover:opacity-50"
              >
                {price(item)}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
