import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart,faBars } from "@fortawesome/free-solid-svg-icons";
import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import {Link} from "react-router-dom";
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
               <li><Link to="/Home">Home</Link></li>
               <li><Link to="/Contact">Contact</Link></li>
               {/* <li><Link to="/Grocery">Grocery</Link></li> */}
               <li><Link to="/#" onClick={log}>{check}</Link></li>
              <li><Link to="/My-Cart"><FontAwesomeIcon  id ="cart" icon={faShoppingCart} bounce style={{ color: "#070118" }} /></Link></li>
              {/* <li><FontAwesomeIcon id="menu" icon={faBars} style={{color: "#00040a"}} /></li> */}
            </ul>
         </nav>
      </header>
   )
}
export default HeaderComponent;

<li><FontAwesomeIcon icon={faBars} style={{color: "#00040a",}}/></li>