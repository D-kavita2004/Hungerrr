import "../styles/MyCart.css";
import { CartContext } from "./CartContext";
import { useContext } from "react";

const Mycart = ()=>{
   const {cartItems} = useContext(CartContext);
   console.log(cartItems);
   return(
      <div className="cart-items-container">
         <div className="table-container">
            <table className="cart-table">
               <thead>
                  <tr>
                     <th>Image</th>
                     <th>Item</th>
                     <th>Restaurent</th>
                     <th>Quantity</th>
                     <th>Price</th>
                     <th>Remove</th>
                  </tr>
               </thead>
            </table>
         </div>
        
      </div>
   )
}
export default Mycart;