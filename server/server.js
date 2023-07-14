const express = require('express');
const cors =require ('cors');
const app = express();
const pool = require("./dbConnection");


app.use(cors());
app.use(express.json({ limit: '10mb' })); //req.body

//create a trade 
app.post("/addTrade" , async (req,res) => {
  try {
    const {
      tradeUUID,
      tradeEntryDate,
      tradeExitDate,
      compName,
      stockTicker,
      positionType,
      entryPrice,
      positionSize,
      reasonForEntry,
      listOfExitPrices,
      listOfExitExercises,
      reasonForExit,
      fundumentals,
      again,
      summary,
      snapshot
    } = req.body.tradeFormContent;
    const newTrade = await pool.query(
      "INSERT INTO trades_main (trade_uuid, tradeentrydate, tradeexitdate, compname, stockticker, positiontype, entryprice, entrypositionsize, reasonforentry, listofexitprices, listofexitexercises, reasonforexit, fundumentals, again, summary, img_snapshot) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)", [
        tradeUUID,
        tradeEntryDate,
        tradeExitDate,
        compName,
        stockTicker,
        positionType,
        entryPrice,
        positionSize,
        reasonForEntry,
        listOfExitPrices,
        listOfExitExercises,
        reasonForExit,
        fundumentals,
        again,
        summary,
        snapshot
      ])
      res.json(newTrade);
  }    
  catch(error){
    console.error(error.message);
  }
});

//get all trades 

app.get("/getTrades" , async(req,res) => {
     try{
        const allTrades = await pool.query("SELECT * FROM trades_main");
        res.json(allTrades.rows);
     }
     catch(error){
      console.error(error.message);
     }
});

//delete a trade 
app.delete("/deleteTrade/:uuid" ,async(req,res)=> {
  try{
   const { uuid } = req.params;
   const deletedTrade= await pool.query("DELETE FROM trades_main WHERE trade_uuid = $1" , [uuid]);
   res.json("trade deleted");
  }
  catch(error){
    console.error(error.message);
  }
});













app.listen(5000, () => {
    console.log("server started");
});

{/*app.post("/addTrade" , async(req,res) => {
    try{
   const {trade} =req.body;
   const newTrade = await pool.query("INSERT INTO trades_main(trade_uuid,tradeentrydate,tradeexitdate,compname,stockticker,positiontype,entryprice,entrypositionsize,reasonforentry,listofexitprices,listofexitexercises,reasonforexit,fundumentals,again,summary,img_snapshot) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)" , [tradeUUID,]);

   res.json(newTrade)
    }
    catch(error){
      console.error(error.message);
    }
})*/} 


{/*app.post("/addTrade", async (req, res) => {
    try {
      const { trade } = req.body;
      const {
        tradeUUID,
        tradeEntryDate,
        tradeExitDate,
        compName,
        stockTicker,
        positionType,
        entryPrice,
        entryPositionSize,
        reasonForEntry,
        listOfExitPrices,
        listOfExitExercises,
        reasonForExit,
        fundumentals,
        again,
        summary,
        imgSnapshot
      } = trade;
  
      const newTrade = await pool.query(
        "INSERT INTO trades_main (trade_uuid, tradeentrydate, tradeexitdate, compname, stockticker, positiontype, entryprice, entrypositionsize, reasonforentry, listofexitprices, listofexitexercises, reasonforexit, fundumentals, again, summary, img_snapshot) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)",
        [
          tradeUUID,
          tradeEntryDate,
          tradeExitDate,
          compName,
          stockTicker,
          positionType,
          entryPrice,
          entryPositionSize,
          reasonForEntry,
          listOfExitPrices,
          listOfExitExercises,
          reasonForExit,
          fundumentals,
          again,
          summary,
          imgSnapshot
        ]
      );
  
      res.json(newTrade);
    } catch (error) {
      console.error(error.message);
    }
  });

*/}
{/*{
  "tradeUUID": "39a61b90-ed57-47bf-969f-9c1cd06d5893",
  "again": "i would enter again",
  "entryPrice": "11",
  "fundumentals": "top gainers",
  "listOfExitExercises": "50,50,30",
  "listOfExitPrices": "12,13,15",
  "positionSize": "100",
  "positionType": "LONG",
  "reasonForEntry": "this is reason for entry",
  "reasonForExit": "this is reason for exit",
  "stockTicker": "TSLA",
  "summary": "this is summary",
  "tradeEntryDate": "2023-06-29",
  "tradeExitDate": "2023-06-29"
}
*/}