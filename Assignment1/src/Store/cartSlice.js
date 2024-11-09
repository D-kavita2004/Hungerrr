import {createSlice} from "@reduxjs/toolkit";

const loadFromLocalStorage = ()=>{
   const storedData = localStorage.getItem("cart");
   return storedData ? JSON.parse(storedData):[];
}
const cartSlice = createSlice({
   name:"myCart",
   initialState:{
      cartItems:loadFromLocalStorage()
   },
   reducers:{
      addItem:(state,action)=>{
         const {itemInfo,resName} = action.payload;

         itemInfo.extraInfo = itemInfo.extraInfo || {};
         itemInfo.extraInfo.restaurent = resName;

         const existingItem = state.cartItems.find((cartItem) => cartItem.id === itemInfo.id);           
         if (existingItem) {
            // If item is already in the cart, increase its quantity
            existingItem.extraInfo.quantity = existingItem.extraInfo.quantity + 1;
         }
         else{
            itemInfo.extraInfo.quantity=1;
            state.cartItems.push(itemInfo);
         } 
      },
      removeItem:(state,action)=>{

         let newCart = state.cartItems.filter((item)=>{
            if(item.id === action.payload){
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
         state.cartItems = newCart;
      },
      clearCart:(state)=>{
         state.cartItems.length = 0;
      }
   }
});

export const {addItem,removeItem,clearCart} = cartSlice.actions;
export default cartSlice.reducer;