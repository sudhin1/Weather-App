let input=document.querySelector('input');
let send=document.getElementById('send');
let place=document.querySelector('.place')
let temp=document.querySelector('.text')
let date=document.querySelector('.date')
let img=document.getElementById('img')

let main=document.getElementById('main')
let temp_max=document.getElementById('temp_max')
let temp_min=document.getElementById('temp_min')
let speed=document.getElementById('speed')
let deg=document.getElementById('deg')
let sunrise=document.getElementById('sunrise')
let sunset=document.getElementById('sunset')
let humidity=document.getElementById('humidity')
let visibility=document.getElementById('visibility')

let city=''
let unixTimestamp;

const apiKey="1bc04603e4cce2eb6618787a0ffa6d2f";

window.onload=()=>{
    call("India",apiKey)
    place.innerText="India";
    function updateTime(){
        date.innerText=getFormattedDateTime();
    }
    updateTime()
    setInterval(updateTime, 1000)
}

function getFormattedDateTime() {
    const now = new Date();
    const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "June",
        "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${dayName}, ${monthName} ${date}, ${year} ${hours}:${minutes}`;
}

function convertTimestamptoTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const utcHours = date.getUTCHours();
    const utcMinutes = date.getUTCMinutes();
    const istHours = (utcHours + 5 + Math.floor((utcMinutes + 30) / 60)) % 24;
    const istMinutes = (utcMinutes + 30) % 60;
    const formattedTime = `${istHours}:${String(istMinutes).padStart(2, '0')}`;
    return formattedTime;
}

send.addEventListener('click', (event)=> {
    event.preventDefault();
    city=input.value;
    place.innerTextL=city;
    call(city,apiKey)
});

input.addEventListener('keydown', (event)=> {
    if (event.key === 'Enter') {
        event.preventDefault();
        city=input.value;
        place.innerText=city;
        call(city,apiKey)
    }
});
function changeImg(weatherCondition){
    if(weatherCondition=="rain"){
        img.src="Images/rain.png"
    }
    if(weatherCondition=="clouds"){
        img.src="Images/cloud.png"
    }
    if(weatherCondition=="snow"){
        img.src="Images/snow.png"
    }
    if(weatherCondition=="sunny"){
        img.src="Images/sunny.png"
    }
    if(weatherCondition=="thunderstorm"){
        img.src="Images/thunderstorm.png"
    }
    if(weatherCondition=="haze"||weatherCondition=="mist"||weatherCondition=="dust"||weatherCondition=="fog"||weatherCondition=="sand"||weatherCondition=="ash"||weatherCondition=="squall"||weatherCondition=="tornado"){
        img.src="Images/haze.png"
    }
}

async function call(city,apiKey){
    response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    data=await response.json()
    main.innerText=data.weather[0].main.charAt(0).toUpperCase() + data.weather[0].main.slice(1);
    changeImg(data.weather[0].main.toLowerCase())

    temp.innerText=`${data.main.temp.toFixed(1)}°C`
    temp_max.innerText=`: ${data.main.temp_max.toFixed(1)} °C`
    temp_min.innerText=`: ${data.main.temp_min.toFixed(1)} °C`
    speed.innerText=`: ${data.wind.speed} m/s`
    deg.innerText=`: ${data.wind.deg} deg`
    sunrise.innerText=`: ${convertTimestamptoTime(data.sys.sunrise)} AM`
    sunset.innerText=`: ${convertTimestamptoTime(data.sys.sunset)} PM`
    humidity.innerText=`: ${data.main.humidity} %`
    visibility.innerText=`: ${data.visibility} m`
}