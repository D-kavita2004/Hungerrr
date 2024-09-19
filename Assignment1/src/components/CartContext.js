import { createContext, useState } from "react";

export const CartContext = createContext();

// It is a wrapper
export const CartProvider = ({children})=>{

   const [cartItems,setCartItems] = useState([]);

   const addToCart = (item, Restaurent) => {
      alert("Add button clicked");

      item.extraInfo = item.extraInfo || {};
      item.extraInfo.restaurent = Restaurent;
   
      // Check if the item is already in the cart
      const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
   
      if (existingItem) {
         // If item is already in the cart, increase its quantity
         existingItem.extraInfo.quantity = existingItem.extraInfo.quantity + 1;
         
         // Update the cart state with updated item quantities
         setCartItems([...cartItems]); // We need to trigger re-render by spreading the array
      }
      else{
         item.extraInfo.quantity=1;
         setCartItems((oldItems) => [...oldItems, item]);
      } 
   };
   
   return(
      <CartContext.Provider value={{cartItems,addToCart}}>
         {children}
      </CartContext.Provider>
   )

}