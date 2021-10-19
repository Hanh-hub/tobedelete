import './App.css';
import React,{useState} from 'react'
import { isElementOfType } from 'react-dom/test-utils';
function App() {
  const api={
    key: "ef0e0909853e364737e15ee63ad21cf6",
    base: "https://api.openweathermap.org/data/2.5/"
  } 
  
  

  const dateBuilder=(d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  const calcTime=(d) =>{
    // create Date object for current location
        
    let localTime = d.getTime()
    let localOffset = d.getTimezoneOffset() * 60000
    let utc = localTime + localOffset
    let city = utc + (1000 * weather.timezone)
    let nd = new Date(city)
    return "Local time: "+ nd;
}
 const autoAddress=() =>{
   if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      var xhttp= new XMLHttpRequest();
      xhttp.onreadystatechange=function(){
        if (this.readyState==4 && this.status ==200){
          var address =JSON.parse(this.responseText)
          var input=document.getElementById("autocomplete")
          //input.value=address.results[5].formatted_address
          // hello=address.result[5].postcode_localities[0]+"+"+address.result[5].address_components[4].short_name
          //input.value=hello
          input.value=address.results[5].postcode_localities[0] +","+ address.results[5].address_components[4].short_name
          console.log(address.results[0].formatted_address)
          console.log(address)
          console.log(address.results[5].postcode_localities[0])
          console.log(address.results[5].address_components[4].short_name)
          //setAddress(address.results[5].postcode_localities[0] +","+address.results[5].address_components[4].short_name)

        } //closing if statement

      };
      xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," 
      + position.coords.longitude + "&key=AIzaSyBRzU6Dcl8VKMmTVAXWZ50VztX6zetQmag", true);
      xhttp.send();
    })
   }
   
 }
//REact
  const [query,setQuery]=useState('');
  const [weather,setWeather]=useState({}); 
  const [address,setAddress]=useState("");
  
  const search =evt =>{
    if (evt.key==='Enter'){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res =>res.json())
      .then(result =>{
        setWeather(result);
        
        setQuery('');
        console.log(query);
        console.log(result);
                      //console.log(weather);
        
      });
    }
  }

  return (
    <html>
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.0/semantic.min.css" />
      </head>

      <body>
    <div className="app" 
    /*
    {
      (typeof weather.main!="undefined")? 
        ( (weather.weather[0].main=='Sunny')? 'app sunny'
        :(weather.weather[0].main=="Clouds")?'app clouds'
        :(weather.weather[0].main=='Thunderstorm')? 'app thunderstorm'
        :(weather.weather[0].main=="Rain")? 'app rainny': 'app')
      :'app'

    }*/> 
    <img src="/mainpic.png" alt="girl"  width="500" height="600"></img>

      <main>
        <div className='search-box' id="location-input-section">
          <input
          type='text'
          className='search-bar'
          id="autocomplete"
          placeholder='Search...'
          
          onChange={event=>setQuery(event.target.value )} //input =houston =>event target value
          value={query}
          
          onKeyPress={search}> 

          </input>
          

          <button classname="btn" type="button" id="location-button"   onClick={autoAddress} ><img url="assets/button.png"></img>  </button>
          
          <script>
          document.getElementById("location-button").addEventListener("click")
          </script>
          
      
        </div>

        {(typeof weather.main!="undefined")? (
          <div className="location and weather"> 
            <div className='location-box'>
                <div className='location'>
                  {weather.name},{weather.sys.country}
                </div>
                <div className='date'>
                  
                  {calcTime(new Date())}
                </div>
            </div>

            <div className='weather-box'>
                <div className='temp'>{Math.round((weather.main.temp*(9/5))+32)} F
                
                        <div className='tempmax' id='maxtemp'>
                        Max: {Math.round((weather.main.temp_max*(9/5))+32)} F
                        </div>

                        <div className='tempmin'>
                        Min: {Math.round((weather.main.temp_min*(9/5))+32)} F
                        </div>
                </div>           
                <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>):('')}
      </main>
             
    </div>
    </body>
    </html>
  );
}

export default App;
