const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname + "/index.html");



});


app.post("/", function(req, res){

  const city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=fb46d544b3774f3e8e8f9add24af9653";
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      console.log(weatherData);
      const temp = weatherData.main.temp;
      console.log("Temperature = "+ temp);
      res.write("Server is running.");
      res.write(" Temperature = "+temp+"K");
      res.send();
    })
  });


  console.log(req.body.cityName);
  console.log("Post done");
});
app.listen(3000, function(){
  console.log('Server is running on port 3000');
});
