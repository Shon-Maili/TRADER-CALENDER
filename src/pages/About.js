import "./About.css"
import React from "react"
import UploadAvatar from "./avatar/UploadAvatar";

export default function About(props) {
    
    function handleFileChange(event) {
      const selectedFile = event.target.files[0];
      // Handle the selected file here
      console.log('File selected:', selectedFile);
     
    };
  
    return(
        <div id="AboutPage">
        <form className="form" onSubmit={props.handleFormSubmit}>
        <label htmlFor="fileInput" id="customFileLabel">
            <img className="avatarLogo" src="./images/avatarPage.png" alt=""/>
            </label>
            <input  type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
            
            <div className="inputsFields">
            <div className="group">
            
            <input type="text" placeholder="first name" name="firstName" value={props.FormData.firstName} onChange={props.handleChange} />
            </div>
            <div className="group">
           
            <input type="text" placeholder="last name" name="lastName" value={props.FormData.lastName} onChange={props.handleChange} />
            </div>
            <textarea placeholder="Write about yourself" name="desc" value={props.FormData.desc} onChange={props.handleChange}></textarea>
            <button type="submit">Save</button>
            </div>
        </form>
        </div>
    )
       
    }