import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

// It is a wrapper
export const CartProvider = ({children})=>{

   const [cartItems,setCartItems] = useState([]);
   const [ShowPop,setShowPop] = useState(false);

   const popUp = ()=>{

      setShowPop(true);

      setTimeout(()=>{
         setShowPop(false);
      },1000);
   }
   useEffect(() => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
         try {
            setCartItems(JSON.parse(storedCart)); // Parse and load items into state
         } catch (error) {
            console.error("Error parsing cart data from localStorage:", error);
         }
      }
   }, []);
   useEffect(()=>{
      localStorage.setItem("cart",JSON.stringify(cartItems)); 
   },[cartItems]);

   const addToCart = (item, Restaurent) => {
      // alert("Add button clicked");

      item.extraInfo = item.extraInfo || {};
      item.extraInfo.restaurent = Restaurent;
      popUp();
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
   const removeFromCart = (Id)=>{

      let newCart = cartItems.filter((item)=>{
         if(item.id === Id){
            if(item.extraInfo.quantity > 1){
               item.extraInfo.quantity -=1;
               return true;
            }
            else{
               return false;
            }
         }
         else{
            return true;
         }
      })
      setCartItems(newCart); 
   }
   
   return(
      <CartContext.Provider value={{cartItems,addToCart,ShowPop,removeFromCart}}>
         {children}
      </CartContext.Provider>
   )

}