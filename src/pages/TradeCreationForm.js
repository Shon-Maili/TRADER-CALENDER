import "./TradeCreationForm.css"
import React from "react"
import {v4 as uuidv4} from "uuid"

export default function TradeCreationForm() {

   
   const [selectedSnap,setSelectedSnap] = React.useState("");
  
  
   const [formData1, setformData1] = React.useState({
      tradeEntryDate:"",
      tradeExitDate:"",
      positionType:"",
      stockTicker:"",
      entryPrice:"",
      positionSize:"",
      reasonForEntry:"",
      listOfExitPrices:"",
      listOfExitExercises:"",
      //exitPrice2:"",
      //positionSize2:"",
      reasonForExit:"",
      fundumentals:"",
      again:"",
      summary:""
   })

   console.log(selectedSnap);
  console.log(formData1)



   function handleSnapshotChange(event) {
      
      const file=event.target.files[0];
      if(file){
            
         const reader = new FileReader();
         reader.onload = (event) => {
           const url= event.target.result;
           setSelectedSnap(url);
           }
           reader.readAsDataURL(file);
         }

   }
   
   function handleChange(event) {
    const {value,name} = event.target;
    setformData1(prev => {
            return {
            ...prev,
            [name]:value
            }
    })
   }
   
 function handleTradeSubmit(event) {
   console.log("clicked");
   (async () => {
      try {
        const response = await fetch(`https://api.polygon.io/v3/reference/tickers?ticker=${formData1.stockTicker}&active=true&sort=name&apiKey=qr4EPORW8l63hkc9aEjrFXpdcwBbdu2G`);
        const jsonData = await response.json();
        console.log(jsonData.results[0].name);
        const tradeFormContent = {
         tradeUUID:uuidv4(),
         ...formData1,
         snapshot:selectedSnap,
         compName:jsonData.results[0].name
      }
      console.log(tradeFormContent.tradeUUID);
       console.log(JSON.stringify(tradeFormContent));
      const postResponse = await fetch("http://localhost:5000/addTrade", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({ tradeFormContent }),
       });
       
        
      //console.log(tradeFormContent);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
    
}

    
    return (
         <div id="TradeCreationFormPage">
        <h1 id="header">Add trade</h1> 
        <form onSubmit={handleTradeSubmit}>
        
        <div className="group box1">
        <label htmlFor="tradeEntryDate">
            Entry date 
         <input type="date" id="tradeEntryDate" name="tradeEntryDate" 
                value={formData1.tradeEntryDate}  onChange={handleChange}/>  
         </label>
         <img id="calender1" src="./images/calender.png" />
         <label htmlFor="tradeExitDate">
            Exit date
         <input type="date" id="tradeExitDate" name="tradeExitDate"
                value={formData1.tradeExitDate} onChange={handleChange}/>
         </label>
         <img id="calender2" src="./images/calender.png" />
         </div>

      
         <div className="group box2">
        <label htmlFor="positionType">
            Position type
         <select id="positionType" name="positionType" 
           value={formData1.positionType} onChange={handleChange}>
            <option value="">Choose</option>
            <option id="op1" value="LONG">LONG</option>
            <option id="op2" value="SHORT">SHORT</option>
         </select>
         </label>
         <label htmlFor="stockTicker">
            Ticker
         <input type="text" id="stockTicker" name="stockTicker" 
             value={formData1.stockTicker} onChange={handleChange} />
         </label>
         </div>

         <div className="group box3">
            <div id="enteriesInputs">
        <label htmlFor="entryPrice">
            Entry price
         <input type="text" id="entryPrice" name="entryPrice" 
               value={formData1.entryPrice} onChange={handleChange} />
         </label>
         <label htmlFor="positionSize">
            Position size
         <input type="number" id="positionSize" step="100" name="positionSize" 
                 value={formData1.positionSize} onChange={handleChange} />
         </label>
         </div>
         <label htmlFor="reasonForEntry">
            Reason for entry
           <textarea id="reasonForEntry" placeholder="Write here..." name="reasonForEntry" 
                     value={formData1.reasonForEntry} onChange={handleChange}>
           </textarea>
         </label>
         </div>

         
         <div className="group box4">
        <div id="exitInputs">
        <div id="column1">
         
         
        <label htmlFor="listOfExitPrices">
              exit prices
         <input type="text" id="listOfExitPrices" name="listOfExitPrices"
                value={formData1.listOfExitPrices} onChange={handleChange} width="191px" pattern="^(?:\d+(?:\.\d+)?(?:,|$)){0,2}\d+(?:\.\d+)?$"
                 title="Please enter numbers separated by commas. Max of 3 values"/>
         </label>
         
         <label htmlFor="listOfExitExercises">
              amounts of shares exercise 
         <input type="text" id="listOfExitExercises" step="100" name="listOfExitExercises" 
                value={formData1.listOfExitExercises} onChange={handleChange} width="216px" pattern="^(?:\d+(?:,|$)){0,2}\d+$"
                 title="Please enter numbers separated by commas. Max of 3 values"/>
         </label>
         </div>
         </div>
         <label htmlFor="reasonForExit">
            Reason for exit
           <textarea id="reasonForExit" placeholder="Write here..." name="reasonForExit"
                     value={formData1.reasonForExit} onChange={handleChange}>
           </textarea>
         </label>
         </div>

         <div className="group box5">
        <label htmlFor="fundumentals">
         any fundumentals?
         <textarea id="fundumentals" placeholder="Write here..." name="fundumentals"
                   value={formData1.fundumentals} onChange={handleChange}>
         </textarea>
         </label>
         </div>

         <div className="group box6">
        <label htmlFor="snapshot">
         snapshot
         <img src="./images/addSnapshot.png" alt="addSnapshot"/>
         <input type="file" id="snapshot" style={{ display: 'none' }}
                  onChange={handleSnapshotChange}/>
         </label>
         </div>

         <div className="group box7">
        <label htmlFor="again">
         Would you take this trade again? and why?
         <textarea id="again" placeholder="Write here..." name="again"
                   value={formData1.again} onChange={handleChange}>
                   </textarea>
         </label>
         <label htmlFor="summary">
         Trade summary
         <textarea id="summary" placeholder="Write here..." name="summary"
                   value={formData1.summary} onChange={handleChange}>  
                   </textarea>
         </label>
         </div>

         <button type="submit">Add+</button>
         
         
        </form>
        </div>
        
    )
}

{/* 
         
      */}