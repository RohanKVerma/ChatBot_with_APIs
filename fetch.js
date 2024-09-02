// NOTE: Fetch Methods
function fetchTemperature(lat,long){
    const cityName = document.querySelector('#inputValue').value;
    myMessage(cityName)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherAPI}&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log('Latitude',lat);
        console.log('Longitude',long);

        const postQuery = document.createElement('span');
        postQuery.classList.add('chat');
        postQuery.classList.add('incoming');
        postQuery.innerHTML =
        `Location: ${data.name} <br><br>
        🌡️
        Current Temperature: ${data.main.temp}°C<br>
        Feels Like: ${data.main.feels_like}°C`;
        chatArea.appendChild(postQuery);

        chatMore();
        autoScroll();
    })
}
function fetchWind(lat, long){
    const cityName = document.querySelector('#inputValue').value;
    myMessage(cityName)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherAPI}&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log('Latitude',lat);
        console.log('Longitude',long);
        const postQuery = document.createElement('span');
        postQuery.classList.add('chat');
        postQuery.classList.add('incoming');
        postQuery.innerHTML =
        `Location: ${data.name} <br><br>
        🍃
        Wind speed: ${data.wind.speed}<br>
        Gust: ${data.wind.gust}<br>
        Deg: ${data.wind.deg}`;
        chatArea.appendChild(postQuery);

        chatMore();
        autoScroll();
    })
}
function fetchWeather(lat, long){
    const cityName = document.querySelector('#inputValue').value;
    myMessage(cityName)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherAPI}&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log('Latitude',lat);
        console.log('Longitude',long);
        const postQuery = document.createElement('span');
        postQuery.classList.add('chat');
        postQuery.classList.add('incoming');
        postQuery.innerHTML =
        `Location: ${data.name} <br><br>
        🌤️
        Weather: ${data.weather[0].main}<br>
        Description: ${data.weather[0].description}`;
        chatArea.appendChild(postQuery);

        chatMore();
        autoScroll();
    })
}
function fetchTime(){
    const cityName = document.querySelector('#inputValue').value;
    myMessage(cityName)
    fetch(`https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${long}&X-Api-Key=${ninjaAPI}`)
    .then(response => response.json())
    .then(data => {
        console.log('Latitude',lat);
        console.log('Longitude',long);
        const postQuery = document.createElement('span');
        postQuery.classList.add('chat');
        postQuery.classList.add('incoming');
        postQuery.innerHTML =
        `Timezone: ${data.timezone}<br><br>
        🕛
        Time: ${data.time}<br>
        Datetime: ${data.datetime}<br>
        Day: ${data.day_of_week}`;
        chatArea.appendChild(postQuery);

        chatMore();
        autoScroll();
    })
}

function myMessage(message){
    const chatArea = document.querySelector('.chatArea');
    if(message == ''){
        
    }else{
        const postQuery = document.createElement('span');
        postQuery.classList.add('chat');
        postQuery.classList.add('outgoing');
        postQuery.innerText =`${message}`;
        chatArea.appendChild(postQuery);
        document.querySelector('.typed-txt').value ='';
    }
}