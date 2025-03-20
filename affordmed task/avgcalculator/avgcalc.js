const express = require("express")
const axios = require("axios")

const app = express();

windowSize = 5;
windowNumbers = [];

const PORT = 3000;

app.get('/numbers/:numberid',async(req,res)=>{

    const {numberid}=req.params;

    let api_url = '';

    switch(numberid){
        case 'p':
            api_url="http://20.244.56.144/test/primes";
        case 'f':
            api_url="http://20.244.56.144/test/fibo"    
        case 'e':
            api_url="http://20.244.56.144/test/even"
        case 'r':
            api_url="http://20.244.56.144/test/rand"
        default:
            console.log("An error occured while fetching the url !");        
    }


   try{
    const response = await axios.get(api_url,{timeout:500});
    const newNumbers = response.data.numbers||[];


    const uniqueNumbers = newNumbers.filter((num)=>!windowNumbers.includes(num));

    const winPrevState = [...windowNumbers];

    windowNumbers = [...windowNumbers,...uniqueNumbers].slice(-windowSize);

    const avg = windowNumbers.length>0 ? (windowNumbers.reduce((a,b)=>a+b,0)/windowNumbers.length) : 0;


res.json({
    winPrevState,
        windowNumbers,
        uniqueNumbers,
        avg
})
   

   }catch(e){
    console.log("Error captured");
   }
})


app.listen(PORT,()=>{
    console.log(`App is running on ${PORT}`);
})