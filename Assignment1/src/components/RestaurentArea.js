import { MyCard } from "./RestaurentCard";
import cardDataList from "../utils/MockData";
import { useEffect,useState } from "react";
import ShimmerUI from "./shimmerUI";
import "../styles/RestaurentArea.css";
import {Link} from "react-router-dom";
// import { useContext } from "react";
// import { userContext } from "../ContextAPI/UserContextProvider";

const RestaurentArea = ()=>{
  const [ListOfRestaurents , setListOfRestaurents] = useState([]);
  const [UpdateList, setUpdateList] = useState([]);
  const [SearchText,setSearchText] = useState("");
  // const {setUserName,UserName} = useContext(userContext);

  useEffect(() => {
    setListOfRestaurents(cardDataList);
    setUpdateList(cardDataList);
  }, []);
  //Top rated Restaurents
  function topRatedRestaurents(){
    const filtered_list = ListOfRestaurents.filter((res)=>{
      return res.info.avgRating>=4.5;
    })
    setUpdateList(filtered_list);
  }

  //search functionality
  const search = ()=>{
    const filtered_list = ListOfRestaurents.filter((res)=>{
      return res.info.name.toLowerCase().includes(SearchText.toLowerCase()) || res.info.cuisines.join(", ").toLowerCase().includes(SearchText.toLowerCase())
    })
   console.log("searching is done");
    setUpdateList(filtered_list);
  }

  //Pure Veg
  const pureVegRes = ()=>{
    const filtered_list = ListOfRestaurents.filter((res)=>{
      return res?.info?.veg == true;
    })
    setUpdateList(filtered_list);
  }

  //Non Veg
  const nonVegRes = ()=>{
    const filtered_list = ListOfRestaurents.filter((res)=>{
      return res?.info?.veg != true;
    })
    setUpdateList(filtered_list);
  }
  // useEffect(() => {
  //   // console.log("UpdateList:", UpdateList);
  //   // console.log(ListOfRestaurents);
  // }, [UpdateList]);

  // async function fetchData(){
  //     try{
  //       const response = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.7040592&lng=77.10249019999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
  //       const formatted = await response.json();
  //       console.log(formatted);
  //       const contentType = response.headers.get('content-type');

  //       if(contentType.includes('application/json')){
  //         const res = await response.json();
  //         console.log(response);
  //         const cards = res?.data?.success?.cards;
  //         const lastIndex = cards?.length - 1;
  //         // console.log(lastIndex);
          
  //         const restaurents = cards[lastIndex]?.gridWidget?.gridElements?.infoWithStyle?.restaurants;
  //         setListOfRestaurents(restaurents);
  //         setUpdateList(restaurents);
  //       }
  //       else{
  //         setListOfRestaurents(cardDataList);
  //         setUpdateList(cardDataList);
  //         console.log(cardDataList);
  //       }

  //       }
  //     catch{
  //       console.log("failed to fetch");
  //     }
  // }

    // useEffect(()=>{

    //   // fetchData();
    // },[])

   return (

    <div id ="res-area">
          <div id="filter-section">
                <div id="search">
                      <input type="text"  placeholder="Restaurants, cuisines" value={SearchText} onChange={(e)=>{setSearchText(e.target.value)}}></input>
                      <button id="search-btn" onClick={search}>Search</button>
                </div>
                {/* <div id="search">
                    <lable>UserName : </lable>
                      <input type="text"  placeholder="Enter user Name" value={UserName} onChange={(e)=>{setUserName(e.target.value)}}></input>
                </div> */}
                <div className="filter-me">
                      <div id="pure-veg">
                            <button className="filter" onClick={pureVegRes}>Pure Veg</button>
                      </div>
                      <div id="Non-veg">
                            <button className="filter" onClick={nonVegRes}>Non Veg</button>
                      </div>
                    <div id="Top-Rated">
                            <button className="filter" onClick={topRatedRestaurents}>Top Rated Restaurents</button>
                    </div>
                </div>
          </div>
        <div id="res-container">
            {
             (ListOfRestaurents.length)===0 ? 
             (<ShimmerUI />):(UpdateList.map((res,index)=>{
              return (
                <Link id="cardLink" to = {"/Restaurents/" + res.info.id}  key={res.info.id} ><MyCard resData={res.info}/></Link>
              )
              }) )             
            }
      </div>
    </div>
   )
}
export default RestaurentArea;