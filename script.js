var lat;
var long;
var locale_lat;
var locale_long;
var requestedData;
var locationType;

function requestCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    locale_lat = position.coords.latitude;
    locale_long = position.coords.longitude;
}

const chatbot = document.querySelector('.chatbotContainer');
const chatInput = document.querySelector('.typed-txt');
const chatbotLogo = document.querySelector('.chatbotLogo');
const closeBtn = document.querySelector('.close_btn');
const sendBtn = document.querySelector('.sendBtn');
const chatArea = document.querySelector('.chatArea');

closeBtn.addEventListener('click', function(){
    chatbot.classList.remove("active");
    chatArea.innerHTML = '';
})
chatbotLogo.addEventListener('click', function(e){
    chatbot.classList.toggle("active");
    startChat();
})

function startChat(){
    const postQuery = document.createElement('span');
    postQuery.textContent = "What can I help you with today?";
    postQuery.classList.add('chat');
    postQuery.classList.add('incoming');
    const div = document.createElement('div');
    div.classList.add('select_requestType');
    div.innerHTML = '<p>Select one option.</p>'

    const tempBtn = document.createElement('button');
    tempBtn.classList.add('getBtn');
    tempBtn.classList.add('temp');
    tempBtn.textContent = "Temperature";

    const timeBtn = document.createElement('button');
    timeBtn.classList.add('getBtn');
    timeBtn.classList.add('time');
    timeBtn.textContent = "Time";

    const windBtn = document.createElement('button');
    windBtn.classList.add('getBtn');
    windBtn.classList.add('wind');
    windBtn.textContent = "Wind";

    const weatherBtn = document.createElement('button');
    weatherBtn.classList.add('getBtn');
    weatherBtn.classList.add('weather');
    weatherBtn.textContent = "Weather";

    div.appendChild(tempBtn);
    div.appendChild(timeBtn);
    div.appendChild(windBtn);
    div.appendChild(weatherBtn);

    postQuery.appendChild(div);
    chatArea.appendChild(postQuery);

    const select_requestType = document.querySelector('.select_requestType')
    select_requestType.addEventListener('click', function(e){
        e.stopPropagation();
        selectedBtn = e.target.textContent;
        myMessage(selectedBtn);
        requestLocation();
    })
}

function requestLocation(){
    const postQuery = document.createElement('span');
    postQuery.classList.add('chat');
    postQuery.classList.add('incoming');
    const div = document.createElement('div');
    div.classList.add('select_locationType');
    div.innerHTML = '<p>Select location type</p>';
    const currentBtn = document.createElement('button');
    currentBtn.classList.add('getBtn');
    currentBtn.textContent = "Current"
    const otherBtn = document.createElement('button');
    otherBtn.classList.add('getBtn');
    otherBtn.textContent = "Other"
    div.appendChild(currentBtn);
    div.appendChild(otherBtn);

    postQuery.appendChild(div);
    chatArea.appendChild(postQuery);

    const select_locationType = document.querySelector('.select_locationType');
    select_locationType.addEventListener('click', function(e){
        e.stopPropagation();
        locationType = e.target.textContent;
        myMessage(locationType);

        if(locationType == "Current"){
            requestCurrentLocation();
            if(selectedBtn == 'Temperature'){
                fetchTemperature(locale_lat, locale_long)
            }else if(selectedBtn == 'Time'){
                fetchTime(locale_lat, locale_long)
            }else if(selectedBtn == 'Wind'){
                fetchWind(locale_lat, locale_long)
            }else if(selectedBtn == 'Weather'){
                fetchWeather(locale_lat, locale_long)
            }
        }
        else{
            requestOtherLocation();
        }
    })

}

function requestOtherLocation(){
    const postQuery = document.createElement('span');
    postQuery.classList.add('chat');
    postQuery.classList.add('incoming');
    postQuery.textContent = "Enter location";
    chatArea.appendChild(postQuery);

    chatInput.removeAttribute('disabled');
    chatInput.focus();
    sendBtn.addEventListener('click', function(e){
        e.stopPropagation();
        chatInput.setAttribute('disabled', '');
        const cityName = document.querySelector('.typed-txt').value;
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${weatherAPI}`)
        .then(response => response.json())
        .then(data => 
            {
                lat = data[0].lat;
                long = data[0].lon;

                if(selectedBtn == 'Temperature'){
                    fetchTemperature(lat, long)
                }else if(selectedBtn == 'Time'){
                    fetchTime(lat, long)
                }else if(selectedBtn == 'Wind'){
                    fetchWind(lat, long);
                }else if(selectedBtn == 'Weather'){
                    fetchWeather(lat, long);
                }
            })
    })
}

function chatMore(){
    const chatArea = document.querySelector('.chatArea');
    const postQuery = document.createElement('span');
    postQuery.classList.add('chat');
    postQuery.classList.add('incoming');
    postQuery.innerText = ' Chat More?';
    const yesBtn = document.createElement('button');
    yesBtn.classList.add('getBtn');
    yesBtn.classList.add('yes');
    yesBtn.innerText = 'Yes';
    const noBtn = document.createElement('button');
    noBtn.classList.add('getBtn');
    noBtn.classList.add('no');
    noBtn.innerText = 'No';
    postQuery.appendChild(yesBtn);
    postQuery.appendChild(noBtn);
    chatArea.appendChild(postQuery);

    yesBtn.addEventListener('click', function(){
        startChat();
    })
    noBtn.addEventListener('click', function(){
        chatbot.classList.remove("active");
        chatArea.innerHTML = '';
    })
}


// Auto=scroll to bottom when more content is added
// window.setInterval(function() {
//     var elem = document.getElementById('data');
//     elem.scrollTop = elem.scrollHeight;
//   }, 1000);

  function autoScroll(){
    var elem = document.getElementById('data');
    elem.scrollTop = elem.scrollHeight;
  }