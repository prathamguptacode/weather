let city=`London`;
let lat;
let long;


async function coordinates() {
    let response=fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=3&appid=1615b52847087b979493ddedfe3d1b3a`);
    let log1=await response;
    let json1=await log1.json();
    lat=json1[0].lat;
    long=json1[0].lon;
}

async function contact() {
    await coordinates();
    let response=fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1615b52847087b979493ddedfe3d1b3a&units=metric`)
    console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=1615b52847087b979493ddedfe3d1b3a&units=metric`)
    let log1=await response;
    let json1=await log1.json();
    let server=await json1;
    console.log(server);
    return server;
}


async function main(){
    city=prompt("enter your city name to get the weather report");
    let server=await contact();
    let cityname=server.name;
    cttitle.innerHTML=city;
    document.querySelector(".city .description").innerHTML=server.weather[0].main;  
    document.querySelector(".temp .description").innerHTML=`${server.main.temp} degree celsius`; 
    document.querySelector(".humidity .description").innerHTML=`${server.main.humidity}%`; 
    document.querySelector(".pressure .description").innerHTML=`${server.main.pressure} Pa`; 
    document.querySelector(".wind .description").innerHTML=`${server.wind.speed} km/h`; 
    let sunrise=server.sys.sunrise;
    sunrise=new Date(sunrise*1000);
    st=sunrise.toUTCString()
    let sunset=server.sys.sunset;
    sunset=new Date(sunset*1000);
    ss=sunset.toUTCString();
    document.querySelector(".sunset .description").innerHTML=ss; 
    document.querySelector(".sunrise .description").innerHTML=st; 
    let hum=server.main.humidity;
    if (hum>88){
        document.getElementsByClassName("bgimg")[0].src="source/rain.jpg";
    }
}

main()