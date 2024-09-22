import "../styles/MyCart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CARD_IMAGE_URL } from "../utils/constants";
import { CartContext } from "./CartContext";
import { useContext, useState } from "react";

const Mycart = ()=>{
   const {cartItems,removeFromCart} = useContext(CartContext);
   const [Show,setShow] = useState(false);

   const orderPopUp = ()=>{
      const elem1 =  document.getElementById("tb-blur");
      const elem2 =  document.getElementById("bc-blur");
      elem1.style.filter = "blur(5px)";
      elem2.style.filter = "blur(5px)";
      setShow(true);
      setTimeout(()=>{
         setShow(false);
         elem1.style.filter = "none";
         elem2.style.filter = "none";
      },3000);
   }

   let totalPrice = 0;
   return(
      <div className="cart-items-container">
               <div className="table-container" id="tb-blur">
                  <table className="cart-table">
                     <thead>
                        <tr>
                           <th>Image</th>
                           <th>Item</th>
                           <th>Rest</th>
                           <th>Qty</th>
                           <th>₹</th>
                           <th>Del</th>
                        </tr>
                     </thead>
                     <tbody>
                        {cartItems.map((item)=>{
                           const {id,imageId,name,price,extraInfo
                           } = item;
                           totalPrice = totalPrice + (price/100)*extraInfo.quantity
                           return(
                              <tr>
                                 <td ><img className="cart-image" src={CARD_IMAGE_URL+imageId}></img></td>
                                 <td>{name}</td>
                                 <td>{extraInfo.restaurent}</td>
                                 <td>{extraInfo.quantity}</td>
                                 <td>{(price/100)*extraInfo.quantity}</td>
                                 <td><FontAwesomeIcon onClick={()=>{removeFromCart(id)}} icon={faTrash} style={{color: "#eb1e28",}} /></td>
                              </tr>
                           )
                        })}
                     </tbody>
                  </table>
               </div>
               <div className="bill-container" id="bc-blur">
                     <div className="bill">
                           <div className="bc">
                                 <div className="ques">Total Price:</div>
                                 <div className="ans">{totalPrice}</div>
                           </div>
                           <div className="bc">
                                 <div className="ques">GST 18% :</div>
                                 <div className="ans">{"+" + (0.18*totalPrice).toFixed(2)}</div>
                           </div>
                           <div className="bc" id="pay-amt" >
                                 <div className="ques">Payable Amount:</div>
                                 <div className="ans" >{totalPrice + Number((0.18*totalPrice).toFixed(2))}</div>
                           </div>
                     </div>
                     <button className="place-order-btn" onClick={orderPopUp}>Place Order</button>
               </div>
         {Show?<div className="order-placed">Order Placed</div>:null}
        
      </div>
   )
}
export default Mycart;