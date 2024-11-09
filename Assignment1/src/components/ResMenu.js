import "../styles/ResMenu.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";
import ShimmerUI from "./shimmerUI";
import { CARD_IMAGE_URL } from "../utils/constants";
import { useParams } from "react-router-dom";
import { MENU_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import ResCategories from "./ResCategories";

const ResMenu = () => {
   const [ResCards, setResCards] = useState(null);
   const [expandIndex,setExpandIndex] = useState(0);
   const {resId} = useParams();
   const navigate = useNavigate();
   
   const [SelectedOption,setSelectedOption] = useState("ALL");

   //Fetching the menu item of a restaurent
   const fetchMenu = async () => {
      
      try{
         const menuDataResponse = await fetch(MENU_URL+resId);
         if (!menuDataResponse.ok) {
            throw new Error('Network response was not ok');
         }
         const contentType = menuDataResponse.headers.get('content-type');
   
         if (contentType.includes('application/json')) {
            const menuData = await menuDataResponse.json();
            setResCards(menuData.data.cards);
         }
         else {
            throw new Error('Invalid content-type');
         }
      }
      catch(error){
         console.log("Somethimg went wrong while fetching the data");
         navigate("/error")
      }
   }

   useEffect(() => {
      fetchMenu();
   }, []);

   if (ResCards === null) {
      return <ShimmerUI />;
   }

   //Restaurent details
   const ResInfoCard = ResCards.filter((item)=>{
      return item?.card?.card?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.Restaurant";
   })
   // console.log(ResInfoCard);
   const { name, cloudinaryImageId, avgRatingString, cuisines, costForTwo,areaName,city,veg } = ResInfoCard[0]?.card.card?.info || {};

   let lastIndex = ResCards.length - 1;
   const allCards = ResCards[lastIndex]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
   // console.log("allcards",allCards);

   // Item categories
   const cardCategories = allCards.filter((item)=>{
      return item?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory";
   })
   // console.log("card categories",cardCategories);

   const crousals = allCards.filter((item)=>{
      return item?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.MenuCarousel";
   })
   // console.log("Crousals",crousals);

   //Fitering the items
   const vegItems = ()=>{
      setSelectedOption("VEG");
   }
   const nonVegItems = ()=>{
      setSelectedOption("NONVEG");
   }
   const allItems = ()=>{
      setSelectedOption("ALL");
   }
   
   return (
     <div className="resCard">
            <div id="res-menu">
            
                  <h1>{name}</h1>
                  <div className="res-view">
                        <div className="res-text">
                                 <p><FontAwesomeIcon icon={faStar} style={{color: "#27b10b",}}/>{" "+avgRatingString}</p>
                                 <p>{" ₹"+costForTwo/100 + " For Two"}</p>
                                 <p>{cuisines?.join(", ")}</p>
                                 <p>{(veg)?"🟢 Veg":"🔴 Non-Veg"}</p>
                                 <p>{"Outlet ----> "+areaName+","+city}</p>
                        </div>
                        <div className="res-image">
                                 <img className="res-pic" src={CARD_IMAGE_URL + cloudinaryImageId} alt={name} />
                        </div>
                  </div>
                  
                  <div className="filter-me">
                        <div id="pure-veg">
                              <button className="filter" onClick={vegItems}>Pure Veg</button>
                        </div>
                        <div id="Non-veg">
                              <button className="filter" onClick={nonVegItems}>Non Veg</button>
                        </div>
                        <div id="Top-Rated">
                              <button className="filter" onClick={allItems}>All Items</button>
                        </div>
                  </div>
                  <div>
                     <h2>MENU</h2>
                     <hr></hr>
                  </div>
                  <div className="category-container">
                     {cardCategories.map((category, idx) => (
                        <ResCategories 
                        SelectedOption={SelectedOption}
                        category={category} 
                        index={idx}
                        key={idx}
                        cloudImage={cloudinaryImageId} 
                        resName={name}
                        expandIndex = {expandIndex}
                        setIndex = {(idx)=>setExpandIndex(idx)}
                        showCategory = {idx===expandIndex ? true:false}/>
                     ))}
                  </div>
            </div>
     </div>
   );
}
export default ResMenu;
