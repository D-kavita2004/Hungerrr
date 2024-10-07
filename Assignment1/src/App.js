import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
// import Contact from "./components/Contact";
import ErrorPage from "./components/ErrorPage";
import HeaderComponent from "./components/HeaderComponent";
import Mycart from "./components/MyCart";
import ResMenu from "./components/ResMenu";
import { CartProvider } from "./components/CartContext";
import { BrowserRouter,Routes,Route,Outlet } from "react-router-dom";
import { useOnlineStatus } from "./utils/useOnlineStatus";
import { lazy,Suspense } from "react";
// import Grocery from "./components/Grocery";

const AppLayout = ()=>{
   const status = useOnlineStatus();
   return(
      <div id = "app">
         <CartProvider>
            <HeaderComponent/>
            {status?<Outlet/>:<h2>Looks like you are offline</h2>}
         </CartProvider>
      </div>
   )
}
const AppRouterComponent = () =>{
   const Contact = lazy(()=>import("./components/Contact"));
   return(
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<AppLayout/>} >
               <Route path="/" element={<Home/>}></Route>
               <Route path="/Home" element={<Home/>}></Route>
               <Route path="/Contact" element={<Suspense fallback={<h2>Loading.....</h2>}><Contact/></Suspense>}></Route>
               <Route path="/My-Cart" element={<Mycart/>}></Route>
               <Route path="/Restaurents/:resId" element={<ResMenu/>}></Route>
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
