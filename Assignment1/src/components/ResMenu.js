import { useState, useEffect } from "react";
import ShimmerUI from "./shimmerUI";
import { CARD_IMAGE_URL } from "../utils/constants";
import "../styles/ResMenu.css";
import { useParams } from "react-router-dom";
// import { MENU_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar,faAngleDown,faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

const ResMenu = () => {
   const [ResInfo, setResInfo] = useState(null);
   const [SelectedOption,setSelectedOption] = useState("ALL");
   const {resId} = useParams();
   const navigate = useNavigate();

   const {addToCart,ShowPop} = useContext(CartContext);

   //Fetching the menu item of a restaurent
   const fetchMenu = async () => {
      
      try{
         const menuDataResponse = await fetch(`/swiggy-api?page-type=REGULAR_MENU&complete-menu=true&lat=28.7040592&lng=77.10249019999999&restaurantId=${resId}`);
         if (!menuDataResponse.ok) {
            throw new Error('Network response was not ok');
         }
         const contentType = menuDataResponse.headers.get('content-type');
   
         if (contentType.includes('application/json')) {
            const menuData = await menuDataResponse.json();
            setResInfo(menuData.data.cards);
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
   useEffect(() => {
      fetchMenu();
   }, []);

   if (ResInfo === null) {
      return <ShimmerUI />;
   }

   const { name, cloudinaryImageId, avgRatingString, cuisines, costForTwo,areaName,city,veg } = ResInfo[2]?.card?.card?.info || {};
   const RestaurentName = name;
   let lastIndex = ResInfo.length - 1;
   const allCards = ResInfo[lastIndex]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];
   // console.log("allcards",allCards);
   // console.log("ResInfo",ResInfo);

   let lastmenu = (allCards.length-1)-1;
   const cardCategories = allCards.slice(2,lastmenu) || [];
   // console.log("card categories",cardCategories);

   let filtered_list = [];

   // filterItems is a function for filtering veg and non-veg items
   const filterItems = (itemList) =>{

      if(SelectedOption === "VEG"){
         filtered_list = itemList.filter((item)=>{
            return item?.card?.info?.isVeg;
         })
         return filtered_list;
      }
      else if(SelectedOption === "NONVEG"){
         filtered_list = itemList.filter((item)=>{
            return !(item?.card?.info?.isVeg);
         })
         return filtered_list;
      }
      else{
         return itemList;
      }

   }

   //Display or hide menu items of certain category
   const toggleShowBtn = (index)=>{
      const hideBtn = document.getElementById(`angle-up-${index}`);
      hideBtn.style.display="none";

      const showBtn = document.getElementById(`angle-down-${index}`);
      showBtn.style.display="block";

      const category = document.getElementById(`${index}`);
      // category.style.transition="height 0.5s ease, opacity 0.5s ease";
      category.style.display="none";
   }
   const toggleHideBtn = (index)=>{
      const hideBtn = document.getElementById(`angle-up-${index}`);
      hideBtn.style.display="block";

      const showBtn = document.getElementById(`angle-down-${index}`);
      showBtn.style.display="none";

      const category = document.getElementById(`${index}`);
      // category.style.transition="height 0.5s ease, opacity 0.5s ease";
      category.style.display="block";
   }
   
   return (
     <div className="resCard">
            <div id="res-menu">
            
                  <h1>{RestaurentName}</h1>
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
                  <div>
                     {cardCategories.map((category, index) => (
                        <div className="category" key={index} >
                           <div className="category-title">
                              <h2>{category?.card?.card?.title}</h2>
                              <div className="arrows">
                                    <FontAwesomeIcon className="angleUp" onClick={() => toggleShowBtn(index)} id={`angle-up-${index}`} icon={faAngleUp} style={{color: "#111212"}} /> :
                                    <FontAwesomeIcon className="angleDown" onClick={() => toggleHideBtn(index)} id={`angle-down-${index}`} icon={faAngleDown}  style={{color: "#111212"}} />
                              </div>
                           </div>

                           {/* we are destructuring only when the item cards are available */}
                           <div  id={index}>
                           {category?.card?.card?.itemCards ? (
                              <div className="item" key={index}>
                                 {filterItems(category?.card?.card?.itemCards).map((item, itemIndex) => {
                                    const {name,isVeg,imageId,price,ratings} = item?.card?.info;

                                    return (
                                      <div className="item-container" >
                                             <div className="item-text">
                                                   <p>{(isVeg)?"🟢 Vegetarian":"🔴 Non-Vegetarian"}</p>
                                                   <h3 key={itemIndex}>{name}</h3>
                                                   <p>{" ₹ " + price/100}</p>
                                                   <p><FontAwesomeIcon icon={faStar} style={{color: "#27b10b",}}/>{" "+ratings?.
                                                      aggregatedRating?.rating+ "("+ratings?.
                                                      aggregatedRating?.ratingCountV2+ ")"}</p>
                                             </div>
      
                                             <div className="item-image">
                                                   <img className="item-pic" src={imageId?CARD_IMAGE_URL + imageId:CARD_IMAGE_URL + cloudinaryImageId} alt={name} />
                                                   <button className="cart-btn" onClick={() => addToCart(item?.card?.info,RestaurentName)}>Add</button>
                                                   {ShowPop?<div className="popUp">Item added to Cart....</div>:null}
                                                  
                                             </div>
                                      </div>
                                    )
                                 })}
                              </div>
                           ) : null}
                           </div>
                           <br />
                        </div>
                     ))}
                  </div>
            </div>
     </div>
   );
}
export default ResMenu;
