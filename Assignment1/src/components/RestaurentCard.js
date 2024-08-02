import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar } from "@fortawesome/free-solid-svg-icons";
import { CARD_IMAGE_URL } from "../utils/constants";
import "../styles/RestaurentCard.css";

const RestaurentCard = ({resData})=>{
   console.log(resData);
   const {name,avgRatingString,
      cuisines,locality,veg,
      cloudinaryImageId
   }=resData;
   return (
      <div className="res-card">
         <div className="img-container"><img src ={CARD_IMAGE_URL+
cloudinaryImageId}  alt="photo"/>
         </div>
         <div className="res-details">
            <div className="hotel-name"><h3>{name + " "}</h3></div>
            <div className="cuisines">{cuisines.join(", ")}</div>
            <div className="info">
               <span><b>{(veg)?"🟢 Veg":"🔴 Non-Veg"}</b></span>
               <span><b><FontAwesomeIcon icon={faStar} style={{color: "#27b10b",}}/>{avgRatingString}</b></span>
            </div>
            <div className="location"><b>{locality}</b></div>
         </div>
      </div>
   )
}
export default RestaurentCard;