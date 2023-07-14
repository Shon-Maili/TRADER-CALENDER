
import "./TradesTable.css"
import React from "react"


export default function TradesTable(props) {
    
    let accountData= JSON.parse(localStorage.getItem("user"));
   
    const [trades,setTrades] = React.useState([]);

  async function getTradesData() {
    try{
      const res = await fetch("http://localhost:5000/getTrades");
      const resJsonData = await res.json();
      setTrades(resJsonData);
    }
    catch(error){
     console.error(error.message);
    }
  }
 
   React.useEffect(() => {
    getTradesData();
  },[])

  

  async function deleteTrade(id) {
    try{
      await fetch(`http://localhost:5000/deleteTrade/${id}` , {
        method:"DELETE"
      });
      setTrades(trades.filter( tradeCell => tradeCell.trade_uuid!=id));
    }
    catch(error) {
      console.error(error.message);
    }
  }
  
   
  const tradesElements =trades && trades.length > 0 ? ( trades.map(trade => {

    
   let exitPricesArray = trade.listofexitprices.split(",");
   const count = exitPricesArray.length;
   let  exitQuantities = trade.listofexitexercises.split(",");
   const entryDateArray = trade.tradeentrydate.split("-");
   const fixedEntryDate = entryDateArray[2].slice(0,2) + "/" + entryDateArray[1] + "/" + entryDateArray[0];
   const exitDateArray = trade.tradeexitdate.split("-");
   const fixedExitDate = exitDateArray[2].slice(0,2) + "/" + exitDateArray[1] + "/" + exitDateArray[0];
   let sum=0;
   let calc;

   trade.entryPrice=parseInt(trade.entryPrice);
   exitPricesArray=exitPricesArray.map(Number);
   exitQuantities=exitQuantities.map(Number);

    if(trade.positiontype==="LONG"){
       for(let i=0;i<count;i++){
        calc=(exitPricesArray[i]-trade.entryprice)*exitQuantities[i];
        sum+=calc;
       }
       sum = sum.toFixed(2);
      }
    else{
      for(let i=0;i<count;i++){
        calc=(trade.entryprice-exitPricesArray[i])*exitQuantities[i];
        sum+=calc;
    }
    sum= sum.toFixed(2);
  }
  
   
  function b64toBlob(b64Data) {
    const byteCharacters = atob(b64Data.split(",")[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: "image/jpeg" });
  }


  function openPhotoInNewTab(url) {
    // Create a Blob from the base64-encoded image data
    const blob = b64toBlob(url);
    // Create a Blob URL for the image
    const imageUrl = URL.createObjectURL(blob);
    // Open the Blob URL in a new tab
    window.open(imageUrl, "_blank");
  }

  

    return (
    <tr key={trade.trade_uuid}>
    <td>{fixedEntryDate}</td>
     <td>{fixedExitDate}</td>
     <td>{trade.compname}</td>
     <td>{trade.stockticker}</td>
     { trade.positiontype === "LONG" ? <td><div className="LONG"><div>{trade.positiontype}</div></div></td> : <td><div className="SHORT"><div>{trade.positiontype}</div></div></td>}
     <td>{trade.entryprice}</td>
     <td>{trade.entrypositionsize}</td>
     <td><div className="bigText">{trade.reasonforentry}</div></td>
     <td>{exitPricesArray[0]}</td>
     <td>{exitQuantities[0]}</td>
     {count > 1 ? <td>{exitPricesArray[1]}</td> : <td>-</td>}
     {count > 1 ? <td>{exitQuantities[1]}</td> : <td>-</td>}
     {count > 2 ? <td>{exitPricesArray[2]}</td> : <td>-</td>}
     {count > 2 ? <td>{exitQuantities[2]}</td> : <td>-</td>}
     <td><div className="bigText">{trade.reasonforexit}</div></td>
     { sum != 0 ? <td className={sum > 0 ? "positive" : "negative"} >{sum}$</td> : <td>{sum}$</td> }
     <td>{trade.fundumentals}</td>
     <td><div className="bigText">{trade.again}</div></td>
     <td><div className="bigText scroller">{trade.summary}</div></td>
     <td>  <button
                  onClick={() => openPhotoInNewTab(trade.img_snapshot)}
                >
                  <img src="../images/eye.png" id="eyeimg" alt="Snapshot" />
          </button>
    </td>
     <td><button><img id="garbageimg" src="../images/garbage.png" onClick={() => deleteTrade(trade.trade_uuid)} value={trade.trade_uuid}/></button></td>
     </tr>
    )
  }) 
  ):null;

    return(
       
        <div id="TradesTablePage" >
       <div id="div2">
        <h1 id="helloHeader">{!accountData ? "Hello!" :`Hello ${accountData.firstName} ${accountData.lastName}!`}</h1>
        <div id="tableWrapper">
        <table id="tradesTable"> 
        <thead>
          <tr>
         
              <th>Entry date</th>
              <th>Exit date</th>
              <th id="compNameTH">Company Name</th>
              <th>Stock ticker</th>
              <th>Type of position</th>
              <th>Entry price</th>
              <th>Entry position size</th>
              <th id="reasonForEntryTH">Reason for entry</th>
              <th>Exit price 1</th>
              <th>shares exercised</th>
              <th>Exit price 2</th>
              <th>shares exercised</th>
              <th>Exit price 3</th>
              <th>shares exercised</th>
              <th id="reasonForExitTH">Reason for exit</th>
              <th>Profit or Loss</th>
              <th id="fundumentalsTH">Fundumentals</th>
              <th id="againTH">Would you take this trade again? and why?</th>
              <th id="summaryTH">Trade summary</th>
              <th>Trade snapshot</th>
              <th id="delete"></th>
              </tr>
             </thead>
             <tbody>
            {/*
              <tr>
             <td>1/1/22</td>
              <td>1/1/22</td>
              <td>Tesla, Inc. Common Stock</td>
              <td>TSLA</td>
              <td>LONG</td>
              <td>11.2</td>
              <td>100</td>
              <td><div className="bigText">i saw that head and shoulders pattern so i was sure and the volume was a very good fuel to my entry</div></td>
              <td>13</td>
              <td>50</td>
              <td>13.5</td>
              <td>50</td>
              <td>-</td>
              <td>-</td>
              <td><div className="bigText">i hit my target 1:1 and in the second attempt the volume decreased so i got out with the rest</div></td>
              <td>top gainers &amp; gap up</td>
              <td><div className="bigText">i think i would enter again becuase bla bla bla bla bla bla bla bla bla bla bla bla</div></td>
              <td><div className="bigText scroller">i think it was a good trade we took nice profit and we take advantage of 90% of the movement and it is nice to see such a progress</div></td>
              <td>url</td>
              <td><button><img src="../images/garbage.png" width="30px" height="30px" /></button></td>
              </tr>
                     */}
              {tradesElements}
              </tbody>
             
        </table>
        </div>
        </div>
        </div>
        
    )
}

// {props.FormData.firstName && props.FormData.lastName ? `Hello, ${props.FormData.firstName} ${props.FormData.lastName}!`: "Hello!"}