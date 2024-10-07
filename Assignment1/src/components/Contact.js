import "../styles/Contact.css";
import emailjs from "@emailjs/browser";

import {useState} from "react";
const Contact = ()=>{
   const [Name,setName] = useState("");
   const [Email,setEmail] = useState("");
   const [Query,setQuery] = useState("");
   const [Loading,setLoading] = useState(false);

   const handleSubmit = (e)=>{
      e.preventDefault();
      setLoading(true);

      const template_params = {
         from_name:Name,
         message:Query,
         to_name:" D kavita",
         user_email:Email
      };

      // Sending mail to the Hungerrr team
      emailjs.send("service_1hehq0r","template_bi3clyj",template_params,"BvxECuN00kh9IfhZy")
         .then((response)=>{
            console.log("Successfull",response.status,response.text);
            alert("Eamil sent succesfully");
         })
         .catch((err)=>{
            console("Sorry!!! could not send the email");
            alert("Sorry!!! could not send the email");
         })
         .finally(()=>{
            setLoading(false);
         })
      e.target.reset();

      // Sending mail to the user
      emailjs.send("service_1hehq0r","template_czwgh59",template_params,"BvxECuN00kh9IfhZy")
      .then((response)=>{
         console.log("Successfull",response.status,response.text);
      })
      .catch((err)=>{
         console("Sorry!!! could not send the email");;
      })
      .finally(()=>{
         setLoading(false);
      })
   }

   return(
      <div className="contact-page">
         <div className="contact-container">
            <h1 className="contact-heading">Get In Touch</h1>
            <form id="my-form" onSubmit={handleSubmit}>
               <div className="field">
                  <label htmlFor="name">Name : </label><br></br>
                  <input type="text" name="name" id="name" required onChange={(e)=>{setName(e.target.value)}}></input>
               </div>
               <div className="field">
                  <label htmlFor="email">Email : </label><br></br>
                  <input id="email" name="email" type="email" required onChange={(e)=>{setEmail(e.target.value)}}></input>
               </div>
               <div className="field">
                  <label htmlFor="text">Ask Your query ?</label><br></br>
                  <textarea name="query" id="text" required onChange={(e)=>{setQuery(e.target.value)}}></textarea>
               </div>
               <button type="submit" className="filter" disabled = {Loading}>submit</button>
            </form>
         </div>
      </div>
   )
}
export default Contact;