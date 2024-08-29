import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import HeaderComponent from "./components/HeaderComponent";
import ResMenu from "./components/ResMenu";
import { BrowserRouter,Routes,Route,Outlet } from "react-router-dom";

const AppLayout = ()=>{
   return(
      <div id = "app">
         <HeaderComponent/>
         <Outlet/>
      </div>
   )
}
const AppRouterComponent = () =>{
   return(
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<AppLayout/>} >
               <Route path="/" element={<Home/>}></Route>
               <Route path="/Home" element={<Home/>}></Route>
               <Route path="/About" element={<About/>}></Route>
               <Route path="/restaurents/:resId" element={<ResMenu/>}></Route>
            </Route>
            <Route path="*" element={<ErrorPage/>} ></Route>
         </Routes>
      </BrowserRouter>
   )
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppRouterComponent/>);


//Alternatively

// import { createBrowserRouter,RouterProvider } from "react-router-dom";
// const appRouter = createBrowserRouter(
//    [
//       {
//          path:"/",
//          element:<Home/>,
//       },
//       {
//          path:"/Home",
//          element:<Home/>,
//       },
//       {
//          path:"/About",
//          element:<About/>,
//       },
//    ]
// )
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<RouterProvider router={appRouter}/>);
