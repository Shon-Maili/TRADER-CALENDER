import './App.css';
import React from "react";
import TradesTable from "./pages/TradesTable"
import TradeCreationForm from "./pages/TradeCreationForm"
import About from "./pages/About"
import { Routes,Route } from 'react-router-dom';
import SideBar from './SideBar/SideBar';
import {v4 as uuidv4} from "uuid"
import usersData from './usersData';


function App() {
  
  const [FormData,setFormData] = React.useState({
    firstName:"",
    lastName:"",
    desc:""

})

const [submittedData, setSubmittedData] = React.useState(null);



function handleChange(event) {
    const {name,value} = event.target
    setFormData (prev => {
        return {
            ...prev,
            [name]:value
        }
    })
}

function handleSubmit(event) {
  event.preventDefault();
  console.log("clicked");
 
  const item = {
    id:uuidv4(),
    firstName:FormData.firstName,
    lastName:FormData.lastName,
    desc:FormData.desc
  }
 
  
  const isExist = usersData.find((data) => data.firstName === item.firstName && data.lastName === item.lastName);

  if (isExist) 
  {
    setSubmittedData(isExist.id);
  }
  else
  {
     usersData.push(item);
     setSubmittedData("new");
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  handleSubmit(event);
 
}

  return (
    <>
     <SideBar />
    <Routes>
      <Route path="/" element={<TradesTable FormData={FormData} submittedData={submittedData} />} />
      <Route path="/TradeCreationForm" element={<TradeCreationForm />} />
      <Route path="/About" element={<About FormData={FormData} handleChange={handleChange} handleFormSubmit={handleFormSubmit} />} />
    </Routes>
    </>
  );
  }

export default App; 
