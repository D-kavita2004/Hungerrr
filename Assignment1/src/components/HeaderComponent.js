import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import {Link} from "react-router-dom";
import "../styles/Header.css";
import { useSelector } from "react-redux";
// import { userContext } from "../ContextAPI/UserContextProvider";
// import { useContext } from "react";

const HeaderComponent = ()=>{
   // const {UserName} = useContext(userContext);

   const [check, setCheck] = useState("LogIn");
   const log = ()=>{ 
      check==="LogIn" ? setCheck("LogOut"):setCheck("LogIn");
   }
   const cartItems = useSelector((store)=>store.cart.cartItems);
   
   return (
      <header id="header">
        <nav id="nav-items">
            <img id ="logo" src={LOGO_URL} alt="Logo"/>
            <ul>
               <li><Link to="/Home">Home</Link></li>
               <li><Link to="/Contact">Contact</Link></li>
               <li><Link to="/#" onClick={log}>{check}</Link></li>
               {/* <li>{UserName}</li> */}
              <div>
              <b className="cartcount">{cartItems.length}</b>
              <li><Link to="/My-Cart"><FontAwesomeIcon  id ="cart" icon={faShoppingCart} bounce style={{ color: "#070118" }} /></Link></li>
              
              </div>
            </ul>
         </nav>
      </header>
   )
}
export default HeaderComponent;
