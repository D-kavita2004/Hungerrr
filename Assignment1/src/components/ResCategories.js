import "../styles/ResCategories.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faStar,faAngleDown,faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { CARD_IMAGE_URL } from "../utils/constants";
import { addItem } from "../Store/cartSlice.js";
import { useDispatch } from "react-redux";
import { useState } from "react";

const ResCategories = ({category,index,cloudImage,resName,showCategory,setIndex,expandIndex,SelectedOption})=>{

   const dispatch = useDispatch();
   const [PopUp,setPopUp] = useState(false);

   const handleAddButton = (itemInfo,resName)=>{
      dispatch(addItem({itemInfo,resName}));
      setPopUp(true);
      setTimeout(()=>{
         setPopUp(false);
      },800);
   }

     // filterItems is a function for filtering veg and non-veg items
   let filtered_list = [];
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

   useEffect(()=>{
      if(showCategory){
         const hideBtn = document.getElementById(`angle-up-${index}`);
         hideBtn.style.display="block";
   
         const showBtn = document.getElementById(`angle-down-${index}`);
         showBtn.style.display="none";
      }
      else{
         const hideBtn = document.getElementById(`angle-up-${index}`);
         hideBtn.style.display="none";
   
         const showBtn = document.getElementById(`angle-down-${index}`);
         showBtn.style.display="block";
      }

   },[showCategory]);

   //Display or hide menu items of certain category
   //dikhna chahiye
   const toggleShowBtn = (index)=>{
      if(expandIndex===index){
         setIndex(null);
      }
      else{
         setIndex(index);  
      }
        
      }
   return(
      <div className="category" key={index} >
         <div className="category-title"  onClick={() => toggleShowBtn(index)}>
            <h2>{category?.card?.card?.title + " "+"("+(category?.card?.card?.itemCards.length || (0))+")"} </h2>
            <div className="arrows">
                  <FontAwesomeIcon className="angleUp"  id={`angle-up-${index}`} icon={faAngleUp} style={{color: "#111212"}} /> :
                  <FontAwesomeIcon className="angleDown" id={`angle-down-${index}`} icon={faAngleDown}  style={{color: "#111212"}} />
            </div>
         </div>

      {/* we are destructuring only when the item cards are available */}
      {
         showCategory &&  <div  id={index}>
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
                                 <p><FontAwesomeIcon icon={faStar} style={{color: "#27b10b",}}/>{" "+(ratings?.
                                    aggregatedRating?.rating || 3 )+ "("+(ratings?.aggregatedRating?.ratingCountV2 || 0)+ ")"}</p>
                           </div>
   
                           <div className="item-image">
                                 <img className="item-pic" src={imageId?CARD_IMAGE_URL + imageId:CARD_IMAGE_URL + cloudImage} alt={name} />
                                 <button className="cart-btn" onClick={() => handleAddButton(item?.card?.info,resName)}>Add</button>
                                 {PopUp?<div className="popUp">Item added to Cart....</div>:null}
                                
                           </div>
                    </div>
                  )
               })}
            </div>
         ) : null}
         </div>
      }
      <br />
   </div>
   )
}
export default ResCategories;