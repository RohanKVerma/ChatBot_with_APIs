var lat;
var long;

function gotLocation(location){
    // console.log('Latitude:',location.coords.latitude)
    // console.log('Longitude:',location.coords.longitude)
    lat = location.coords.latitude;
    long = location.coords.longitude;
}

function failedLocation(){
    console.log("Unable to retrieve location")
}

navigator.geolocation.getCurrentPosition(gotLocation ,failedLocation);

const chatbot = document.querySelector('.chatbotContainer');
const chatInput = document.querySelector('.typed-txt');
const chatbotLogo = document.querySelector('.chatbotLogo');
const closeBtn = document.querySelector('.close_btn');
const sendBtn = document.querySelector('.sendBtn');
const chatArea = document.querySelector('.chatArea');
const cityName = document.querySelector('.typed-txt').value;
var requestedData;
var locationType;


closeBtn.addEventListener('click', function(){
    chatbot.classList.remove("active");
    // console.log('Closed chatbox')
})
chatbotLogo.addEventListener('click', function(){
    chatbot.classList.toggle("active");
    // console.log('Clicked chatbot logo')
})


// sendBtn.addEventListener('click', function(){
//     const cityName = document.querySelector('.typed-txt').value;
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`)
//     .then(response => response.json())
//     .then(data => console.log(data))


//     fetch(`https://timezone.abstractapi.com/v1/current_time/?api_key=${timeAPI}&location=${cityName}`)
//     .then(response => response.json())
//     .then(data => console.log(data))
// })

const getInfo = document.querySelector('.getInfo');
getInfo.addEventListener('click', function(e){
    
    requestedData = e.target.innerText;

    const postQuery = document.createElement('span');
    postQuery.classList.add('chat');
    postQuery.classList.add('incoming');
    postQuery.innerHTML = 
    `<div class="askLocation">
    <p class="askLocationText">Select the location for your results</p>
    <button type="button" class="getBtn">Current</button>
    <button type="button" class="getBtn">Other location</button>
    </div>`;
    chatArea.appendChild(postQuery);
    
    const askLocation = document.querySelector('.askLocation');
    askLocation.addEventListener('click', function(e){
        locationType = e.target.innerText;

        if(locationType == 'Other location'){
            chatInput.removeAttribute('disabled');
            const postQuery = document.createElement('span');
            postQuery.classList.add('chat');
            postQuery.classList.add('incoming');
            postQuery.innerText = 
            `Enter the specific location...`;
            chatArea.appendChild(postQuery);

            sendBtn.addEventListener('click', function(){
                chatInput.setAttribute('disabled', '');
                fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${weatherAPI}`)
                .then(response => response.json())
                .then(data => 
                        {
                            lat = data[0].lat;
                            long = data[0].lon;
    
                            console.log(requestedData);
                            console.log(locationType + lat + long);
                        }
                    )
            })


        }else{
            if(requestedData == 'Temperature'){
                getTemperature(lat, long)
            }else if(requestedData == 'Time'){
                fetch(`https://timezone.abstractapi.com/v1/current_time/?api_key=${timeAPI}&location=${cityName}`)
                .then(response => response.json())
                .then(data => console.log(data))
            }else if(requestedData == 'Wind Speed'){
                getWind(lat, long);
            }else if(requestedData == 'Weather'){
                getWeather(lat, long);
            }
        }
    })
})

function getTemperature(lat,long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherAPI}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    const postQuery = document.createElement('span');
                    postQuery.classList.add('chat');
                    postQuery.classList.add('incoming');
                    postQuery.innerHTML =
                    `Location: ${data.name} <br><br>
                    Current Temperature: ${data.main.temp} <br>
                    Feels Like: ${data.main.feels_like}`;
                    chatArea.appendChild(postQuery);
                })
}
function getWind(lat, long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherAPI}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    const postQuery = document.createElement('span');
                    postQuery.classList.add('chat');
                    postQuery.classList.add('incoming');
                    postQuery.innerHTML =
                    `Location: ${data.name} <br><br>
                    Wind speed: ${data.wind.speed}<br>
                    Gust: ${data.wind.gust}<br>
                    Deg: ${data.wind.deg}`;
                    chatArea.appendChild(postQuery);
                })
}
function getWeather(lat, long){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${weatherAPI}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    const postQuery = document.createElement('span');
                    postQuery.classList.add('chat');
                    postQuery.classList.add('incoming');
                    postQuery.innerHTML =
                    `Location: ${data.name} <br><br>
                    Wind speed: ${data.weather[0].main}<br>
                    Description: ${data.weather[0].description}`;
                    chatArea.appendChild(postQuery);
                })
}