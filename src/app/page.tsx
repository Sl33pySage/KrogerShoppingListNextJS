"use client"
import Image from "next/image";
import { auth, handlers } from "./auth";
import ProductListHandler from "./api/route";
// import RefreshHandler from "./api/token/refresh/route";
// import TokenHandler from "./api/token/route";
import { useState } from "react";





export default function Home() {


  const [groceryItems, setGroceryItems] = useState<any>([])
  const [newGroceryItem, setNewGroceryItem] = useState("")
  const [shopCart, setShopCart] = useState<{ [key: string]: any }>({})



  function addDone(e:any) {
    e.target.classList.toggle("done")
  }

  

  async function addItemToList(userItem: any) {
    if (userItem === "") return;

    // Fetch item Data
    const itemData = await ProductListHandler(userItem)

    // Update groceryItems
    setGroceryItems([...groceryItems, userItem])

    // Update shopCart with the item's price data
    setShopCart((prevCart)=> ({
      ...prevCart,
      [userItem]: itemData?.[0]?.items?.[0]?.price?.regular || "N/A",
    }))

    // Clear the input field
    setNewGroceryItem("")

    console.log("groceryItemsState",groceryItems, newGroceryItem)
  }


  function price(item:string){
    return `${item}: $${shopCart[item] || "Fetching..."}`
  }

  function total(){
    let subtotal = 0
    const tax = 1.0825
    let total = 0
    for(const property in shopCart){
      subtotal+=shopCart[property]
    }
    total = subtotal*tax
    return `Total: $${total.toFixed(2)}`
  }
//  total()
  

  return (
    <main id="main" className="text-blue-500 flex min-h-screen flex-col items-center justify-center ">
      <div id="container" className="flex-col flex items-center justify-center">
        <h1 id="title" className="text-4xl m-5" >Kroger Shopping List</h1>
        <input
        value={newGroceryItem}
        className="m-3 text-2xl bg-slate-950 p-1" 
        type="text"
        name="GroceryTextInput" 
        id="GroceryTextInput"
        placeholder="Enter Item"
        spellCheck="true"
        autoCorrect="on"
        onChange={(e)=> {

          setNewGroceryItem(e.target.value)
          }}/>
        <button 
        id="addItemButton"
        className="bg-blue-500 text-zinc-50 p-3 rounded-lg hover:opacity-50 m-2" 
        onClick={()=>{
          if (newGroceryItem.trim()) {
            addItemToList(newGroceryItem.trim())
          } else {
            alert("PLEASE ENTER A ITEM 😤")
          }
          }}>Add Item
        </button>
        <h5 id="totalTitle">{total()}</h5>
        <ul 
        className="items-center text-center"
        id="GroceryList">
          {groceryItems.map((item:any, index:any)=>(
            <li 
            key={index} className="text-3xl p-1">
              <button 
              onClick={(e)=>addDone(e)}
              className="bg-blue-500 p-3 text-zinc-50 m-2 hover:opacity-50">{price(item)}</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
