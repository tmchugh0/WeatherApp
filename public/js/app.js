//console.log('Client Side Content loaded from app.js');

//fetch
let weatherForm = document.querySelector('form');
let search = document.querySelector('input');

let message1 = document.querySelector('#message1');
let message2 = document.querySelector('#message2');
let message3 = document.querySelector('#message3');
let message4 = document.querySelector('#message4');


let cityState = document.querySelector('#cityState');
let currentWeather = document.querySelector('#currentWeather');
let currentTemp = document.querySelector('#currentTemp');
let feelsLikeTemp = document.querySelector('#feelsLikeTemp');
let currentTime = document.querySelector('#currentTime');


weatherForm.addEventListener('submit', (e) => {
	e.preventDefault(); //keeps from refreshing
	//console.log('testing');

	let city = search.value;

	//console.log(city);
	message1.textContent = 'Loading..';
	message2.textContent = '';
	message3.textContent = '';
	message4.textContent = '';
	cityState.textContent = '';
	currentWeather.textContent = '';
	currentTemp.textContent = '';
	feelsLikeTemp.textContent = '';
	currentTime.textContent = '';


	fetch('/weather?city='+city).then((response) => {
	response.json().then((data) => {
		//console.log(data);
		if(data.error)
			console.log(error);
		else
		{
			message1.textContent = "Current Weather Conditions:";
			cityState.textContent = data.weather.currentCity + ", " + data.weather.currentState;
			currentWeather.textContent = data.weather.currentDescription;
			message2.textContent = "Current Temperature: ";
			currentTemp.textContent = data.weather.currentTemp + "° F";
			message3.textContent = "Feels Like Temperature: ";
			feelsLikeTemp.textContent = data.weather.feelsLikeTemp + "° F";
			message4.textContent = "Local " + data.weather.currentCity + ", " + data.weather.currentState + " time: ";
			currentTime.textContent = data.weather.time;
		
			
		

		}
	});
});
});

