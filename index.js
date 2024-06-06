import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app= express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));

const API_KEY ="429f74a0393f4b9e6aa858669310e20e"

app.use(express.static('public'));


app.get("/",(req,res)=>
{
    res.render("index.ejs",{ temp : null,
        cityn : null,
        humidity :null,
        windSpeed: null});
});

app.post("/", async (req,res)=>
{
    const city = req.body.cityName;
    try{
        const result= await axios.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+API_KEY);
        const weather = JSON.stringify(result.data);
        const temperature = JSON.stringify(result.data.main.temp);
        const humidityL = JSON.stringify(result.data.main.humidity);
        const windSpeedL = JSON.stringify(result.data.wind.speed);
        res.render("index.ejs",{
            temp : temperature,
            cityn : city,
            humidity : humidityL,
            windSpeed: windSpeedL
               })
    }
    catch(error){
        res.status(404).send(error.message);
    }
})

app.listen(port,(req,res)=>{
    console.log(`Server started at port ${port}`);
});