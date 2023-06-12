import "./About.css"
import React from "react"


export default function About(props) {

   const [selectedPhoto, setSelectedPhoto] = React.useState("");

   React.useEffect(() => {
    const savedPhoto = localStorage.getItem("avatarPhoto");
    if (savedPhoto) {
      setSelectedPhoto(savedPhoto);
    }
  }, []);

   function handlePhotoChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const photoDataUrl = e.target.result;
        setSelectedPhoto(photoDataUrl);
        localStorage.setItem("avatarPhoto", photoDataUrl)
      };
      reader.readAsDataURL(file);
    }
  };


   
  
    return(
        <div id="AboutPage">
        <form className="form" onSubmit={props.handleFormSubmit}>
        <label htmlFor="fileInput" id="customFileLabel">
            <div className="avatarContainer">
            {selectedPhoto ? <img className="avatarLogo1" src={selectedPhoto} alt="avatarLogo"/>
            : <img className="avatarLogo" src="./images/avatarPage.png" alt="avatarLogo"/> }
            </div>
            </label>
            <input  type="file" id="fileInput" style={{ display: 'none' }} onChange={handlePhotoChange} />
           
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

   
   
   
   
   
    //<img className="avatarLogo" src="./images/avatarPage.png" alt=""/>