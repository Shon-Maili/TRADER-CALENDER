import './App.css';
import React from "react";
import TradesTable from "./pages/TradesTable"
import TradeCreationForm from "./pages/TradeCreationForm"
import About from "./pages/About"
import { Routes,Route } from 'react-router-dom';
import SideBar from './SideBar/SideBar';
import {v4 as uuidv4} from "uuid"



function App() {
  
  const [FormData,setFormData] = React.useState({
    firstName:"",
    lastName:"",
    desc:""

})



React.useEffect(()=> {

  setFormData(JSON.parse(localStorage.getItem("user")));

},[]);




function handleChange(event) {
    const {name,value} = event.target
    setFormData (prev => {
        return {
            ...prev,
            [name]:value
        }
    })
}

function handleSubmit(event) 
{
  event.preventDefault();
  console.log("clicked");
 
  const item = {
    id:uuidv4(),
    firstName:FormData.firstName,
    lastName:FormData.lastName,
    desc:FormData.desc
  }
 
   
   localStorage.setItem("user" , JSON.stringify(item));
}
  

function handleFormSubmit(event)
{
  event.preventDefault();
  handleSubmit(event);
 
}

/*
function handleFileChange(event) {
  const selectedFile = event.target.files[0];
  // Handle the selected file here
  console.log('File selected:', selectedFile);

};
 
*/

  return (
    <>
     <SideBar />
    <Routes>
      <Route path="/" element={<TradesTable FormData={FormData} />} />
      <Route path="/TradeCreationForm" element={<TradeCreationForm />} />
      <Route path="/About" element={<About FormData={FormData} handleChange={handleChange} handleFormSubmit={handleFormSubmit} />} />
    </Routes>
    </>
  );
  }

export default App; 
