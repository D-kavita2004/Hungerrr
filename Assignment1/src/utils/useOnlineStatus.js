import { useEffect, useState } from "react";

// This is a custom hook to check the online status of the user
export const useOnlineStatus = ()=>{
   const [OnlineStatus,SetOnlineStatus] = useState(true);

   useEffect(()=>{
      window.addEventListener("offline",()=>{
         SetOnlineStatus(false);
      })
      window.addEventListener("online",()=>{
         SetOnlineStatus(true);
      })
   },[]);

   return OnlineStatus;
}
