import { useNavigate } from "react-router-dom";
import "../styles/ErrorPage.css"

const ErrorPage = ()=>{
   const navigate = useNavigate();

   const handleGoBack = ()=>{
      navigate("/");
   }
   return(
      <div id="error">
         <div id="err-msg">
            <h1>We'll be back shortly</h1>
            <p>We are fixing a temporary glitch. Sorry for the inconvenience</p>
            <p>The requested URL is not found</p>
            <button onClick={handleGoBack} id="err-btn">Go Back</button>
         </div>
      </div>
   )
}
export default ErrorPage;