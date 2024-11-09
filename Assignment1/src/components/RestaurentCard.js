import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import { CARD_IMAGE_URL } from "../utils/constants";
import "../styles/RestaurentCard.css";

const RestaurentCard = ({resData})=>{

   // console.log(resData);
   const {name,avgRatingString,
      cuisines,locality,veg,
      cloudinaryImageId
   }=resData;

   const formatCuisines = ()=>{
      if(cuisines.length<=2){
         return `${cuisines.join(", ")}....`;
      }
      else{
         return `${cuisines.slice(0, 2).join(", ")}....`;
      }
   }
   return (
      <div className="res-card">
         <div className="img-container"><img src ={CARD_IMAGE_URL+
cloudinaryImageId}  alt="photo"/>
         </div>
         <div className="res-details">
            <div className="hotel-name"><h3>{name + " "}</h3></div>
            <div className="cuisines">{formatCuisines()}</div>
            <div className="info">
               <span><b>{(veg)?"🟢 Veg":"🔴 Non-Veg"}</b></span>
               <span><b><FontAwesomeIcon icon={faStar} style={{color: "#27b10b",}}/>{avgRatingString}</b></span>
            </div>
            <div className="location"><b>{locality}</b></div>
         </div>
      </div>
   )
}

//HOC  ---> higher order component for adding label on the cards
const withPromotedCard = (Component)=>{
   return (props)=>{
      const {promoted} = props.resData;
      // console.log(promoted);
      return(
         <>
            {promoted && <label className="promoted-label">Promoted</label>}
            <Component {...props}/>
         </>
      )
   }
}

export const MyCard = withPromotedCard(RestaurentCard);
