import { useState, useEffect } from "react";
import ShimmerUI from "./shimmerUI";
import { CARD_IMAGE_URL } from "../utils/constants";
import "../styles/ResMenu.css";
import { useParams } from "react-router-dom";

const ResMenu = () => {
   const [ResInfo, setResInfo] = useState(null);

   const fetchMenu = async () => {
      const menuDataResponse = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=300087&catalog_qa=undefined&submitAction=ENTER");

      const contentType = menuDataResponse.headers.get('content-type');

      if (contentType.includes('application/json')) {
         const menuData = await menuDataResponse.json();
         setResInfo(menuData.data.cards);
      }
   }

   useEffect(() => {
      fetchMenu();
   }, []);

   if (ResInfo === null) {
      return <ShimmerUI />;
   }

   const { name, cloudinaryImageId, avgRatingString, cuisines, costForTwo } = ResInfo[2]?.card?.card?.info || {};

   let lastIndex = ResInfo.length - 1;
   const allCards = ResInfo[lastIndex]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
   console.log("allcards",allCards);

   let lastmenu = (allCards.length-1)-1;
   const cardCategories = allCards.slice(2,lastmenu) || [];
   console.log("card categories",cardCategories);
   
   return (
      <div id="res-menu">
         <h2>{name}</h2>
         <h4>{avgRatingString}</h4>
         <img className="res-pic" src={CARD_IMAGE_URL + cloudinaryImageId} alt={name} />
         <h5>{costForTwo}</h5>
         <p>{cuisines?.join(", ")}</p>
         <br />
         <div>
            {cardCategories.map((category, index) => (
               <div className="category" key={index}>
                  <h2>{category?.card?.card?.title}</h2>
                  <ul>
                     {category?.card?.card?.itemCards.map((item, itemIndex) => (
                        <li key={itemIndex}>{item?.card?.info?.name}</li>
                     ))}
                  </ul>
                  <br />
               </div>
            ))}
         </div>
      </div>
   );
}
export default ResMenu;
