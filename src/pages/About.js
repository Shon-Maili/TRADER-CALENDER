import "./About.css"
import React from "react"

export default function About(props) {
console.log(props.FormData)

function prevent() {

}
    return(
        <div id="AboutPage">
        <form className="form" onSubmit={props.handleFormSubmit}>
            <img className="avatarLogo" src="./images/avatarPage.png" alt=""/>
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