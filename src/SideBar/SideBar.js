
import React from "react"
import "./SideBar.css"

import {Link} from "react-router-dom"

export default function SideBar() {
  
    const [isHovered, setIsHovered] = React.useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

    
    return(
        <nav className="sidebar--shape">
            <ul className="list">
            <li><Link 
                    className="link"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleMouseLeave}
                    to="/">
                    <img id="tradesLogo" className={isHovered ? "hoverImg" : ""} src={isHovered ? "./images/arrowsModified.png" : "./images/collapse-svgrepo-com.png"} alt="tades" />

                 </Link>
            </li>
            <li> <Link className="link" to="/TradeCreationForm"><img id="addTradeLogo" src="./images/addRow.png" alt="creationForm" /></Link></li>
            <li><Link className="link" to="/About" ><img id="avatarLogo" src="./images/avatar.png" alt="avatar" /></Link></li>
            </ul>
        </nav>
    )
}