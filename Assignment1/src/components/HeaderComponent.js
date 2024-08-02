import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart,faBars } from "@fortawesome/free-solid-svg-icons";
import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import "../styles/Header.css";


const HeaderComponent = ()=>{
   const [check, setCheck] = useState("LogIn");
   const log = ()=>{ 
      check==="LogIn" ? setCheck("LogOut"):setCheck("LogIn");
   }
   return (
      <header id="header">
        <nav id="nav-items">
            <img id ="logo" src={LOGO_URL} alt="Logo"/>
            <ul>
               <li><a href="Home">Home</a></li>
               <li><a href="About">About</a></li>
               <li><a href="Contact">Contact</a></li>
               <li><a href="#" onClick={log}>{check}</a></li>
              <li><a href="#"><FontAwesomeIcon  id ="cart" icon={faShoppingCart} bounce style={{ color: "#070118" }} /></a></li>
              <li><FontAwesomeIcon id="menu" icon={faBars} style={{color: "#00040a"}} /></li>
            </ul>
         </nav>
      </header>
   )
}
export default HeaderComponent;