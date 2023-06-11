
import "./TradesTable.css"
import React from "react"


export default function TradesTable(props) {
    

   let accountData= JSON.parse(localStorage.getItem("user"));
   

   

    return(
       
        <div id="TradesTablePage" >
       <div id="div2">
        <h1 id="helloHeader">{!accountData ? "Hello!" :`Hello ${accountData.firstName} ${accountData.lastName}!`}</h1>
        <h1 id="h1">this is the tradesTable section</h1> 
        </div>
        </div>
        
    )
}

