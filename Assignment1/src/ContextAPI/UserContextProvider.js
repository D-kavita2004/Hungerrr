import { createContext, useState } from "react";

export const userContext = createContext();

export const UserContextProvider = ({children})=>{
   const [UserName,setUserName] = useState();

   return(
      <userContext.Provider value={{UserName,setUserName}}>
         {children}
      </userContext.Provider>
   )
}