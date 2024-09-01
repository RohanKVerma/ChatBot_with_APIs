const chatbot = document.querySelector('.chatbotContainer');
const chatInput = document.querySelector('.typed-txt');
const chatbotLogo = document.querySelector('.chatbotLogo');
const closeBtn = document.querySelector('.close_btn');


closeBtn.addEventListener('click', function(){
    chatbot.classList.remove("active");
    console.log('Closed chatbox')
})

chatbotLogo.addEventListener('click', function(){
    chatbot.classList.toggle("active");
    console.log('Clicked chatbot logo')
})

const api = APIKey; 
const sendBtn = document.querySelector('.sendBtn');

sendBtn.addEventListener('click', function(){
    const cityName = document.querySelector('.typed-txt').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api}`)
    .then(response => response.json())
    .then(data => console.log(data))
})