// NOTE: Fetch Methods
function fetchTemperature(lat,long){
    myMessage()
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
        Current Temperature: ${data.main.temp} <br>
        Feels Like: ${data.main.feels_like}`;
        chatArea.appendChild(postQuery);

        chatMore();
    })
}
function fetchWind(lat, long){
    myMessage()
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
        Wind speed: ${data.wind.speed}<br>
        Gust: ${data.wind.gust}<br>
        Deg: ${data.wind.deg}`;
        chatArea.appendChild(postQuery);

        chatMore();
    })
}
function fetchWeather(lat, long){
    myMessage()
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
        Wind speed: ${data.weather[0].main}<br>
        Description: ${data.weather[0].description}`;
        chatArea.appendChild(postQuery);

        chatMore();
    })
}
function fetchTime(){
    myMessage()
    fetch(`https://api.api-ninjas.com/v1/worldtime?lat=${lat}&lon=${long}&X-Api-Key=${ninjaAPI}`)
    .then(response => response.json())
    .then(data => {
        console.log('Latitude',lat);
        console.log('Longitude',long);
        const postQuery = document.createElement('span');
        postQuery.classList.add('chat');
        postQuery.classList.add('incoming');
        postQuery.innerHTML =
        `Timezone: ${data.timezone}<br>
        Datetime: ${data.datetime}<br>
        Day: ${data.day_of_week}`;
        chatArea.appendChild(postQuery);

        chatMore();
    })
}

function myMessage(){
    const chatArea = document.querySelector('.chatArea');
    const cityName = document.querySelector('.typed-txt').value;
    if(cityName == ''){

    }else{
        const postQuery = document.createElement('span');
        postQuery.classList.add('chat');
        postQuery.classList.add('outgoing');
        postQuery.innerText =`${cityName}`;
        chatArea.appendChild(postQuery);
    }
}