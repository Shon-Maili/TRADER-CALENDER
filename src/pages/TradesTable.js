
import "./TradesTable.css"
import React from "react"


export default function TradesTable(props) {
    

   let accountData;
   
   if (props.submittedData === "new") {
    const storedUsersData = localStorage.getItem("usersData");
    const usersDataArray = storedUsersData ? JSON.parse(storedUsersData) : [];
    accountData = usersDataArray[usersDataArray.length - 1];
  } else {
    const storedUsersData = localStorage.getItem("usersData");
    const usersDataArray = storedUsersData ? JSON.parse(storedUsersData) : [];
    accountData = usersDataArray.find((item) => item.id === props.submittedData);
  }

    console.log(accountData);

    return(
       
        <div id="TradesTablePage" >
       <div id="div2">
        <h1 id="helloHeader">{!accountData ? "Hello!" :`Hello ${accountData.firstName} ${accountData.lastName}!`}</h1>
        <h1 id="h1">this is the tradesTable section</h1> 
        </div>
        </div>
        
    )
}

// {props.FormData.firstName && props.FormData.lastName ? `Hello, ${props.FormData.firstName} ${props.FormData.lastName}!`: "Hello!"}