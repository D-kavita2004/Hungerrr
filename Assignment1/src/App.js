import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter,Routes,Route } from "react-router-dom";

// import { createBrowserRouter,RouterProvider } from "react-router-dom";

const AppRouterComponent = () =>{
   return(
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/Home" element={<Home/>}></Route>
            <Route path="/About" element={<About/>}></Route>
         </Routes>
      </BrowserRouter>
   )
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppRouterComponent/>);
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
