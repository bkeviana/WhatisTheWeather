$(document).ready(function() {
{let  locationBtn = document.getElementById('deviceLoco');

    function getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        locationBtn.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
    
    function showPosition(position) {
      locationBtn.innerHTML = "Latitude: " + position.coords.latitude + 
      "<br>Longitude: " + position.coords.longitude;
    }
}
  
    //   }
    //   const cityName = '';
    //   const searchHistoryList = document.querySelector('#searchHistoryList');
    //   let searchedCities = [];
    
    
	 
	
	  // Moment.js to display date
	  const currentDay = moment().format('MMMM Do, YYYY');
	  $('#currentDay').text(currentDay);
	
	  const dayTwo = moment()
		.add(1, 'days')
		.format('l');
	  $('#dayTwo').text(dayTwo.slice(0, 9));
	
	  const dayThree = moment()
		.add(2, 'days')
		.format('l');
	  $('#dayThree').text(dayThree.slice(0, 9));
	
	  const dayFour = moment()
		.add(3, 'days')
		.format('l');
	  $('#dayFour').text(dayFour.slice(0, 9));
	
	  const dayFive = moment()
		.add(4, 'days')
		.format('l');
	  $('#dayFive').text(dayFive.slice(0, 9));
	
	  const daySix = moment()
		.add(5, 'days')
		.format('l');
	  $('#daySix').text(daySix.slice(0, 9));
	
	  init();
	
	  // Display Searched Cities
	  function rendersearchedCities() {
		// Clear searchHistoryList element
		searchHistoryList.innerHTML = '';
	
		// Empty current city list before displaying next city name button
		$('#searchHistoryList').empty();
	
		// Loop through the array of cities entered, then generate list items for each city in the array
		for (let i = 0; i < searchedCities.length; i++) {
		  const newCity = $('<button>');
		  newCity.addClass('newCityBtn');
		  newCity.text(searchedCities[i]);
		  newCity.attr('data-name', searchedCities[i]);
		  $('#searchHistoryList').append(newCity);
		  $('#searchHistoryList').attr('style', 'display:block');
		}
	  }
	
	  // Click Searched Cities
	  $(document).on('click', '.newCityBtn', function() {
		currentWeather($(this).text());
	  });
	
	  function init() {
		// Get stored searchedCities from localStorage
		// Parsing the JSON string to an object
		const storedsearchedCities = JSON.parse(
		  localStorage.getItem('searchedCities')
		);
	
		// If searchedCities were retrieved from localStorage, update the searchedCities array to it
		if (storedsearchedCities !== null) {
		  searchedCities = storedsearchedCities;
		}
		// Render searchedCities to the DOM
		rendersearchedCities();
	  }
	
	  function storesearchedCities() {
		// Stringify and set "searchedCities" key in localStorage to searchedCities array
		localStorage.setItem('searchedCities', JSON.stringify(searchedCities));
	  }
	
	  // When form is submitted (API Request)
	  $('#searchBtn').on('click', function(event) {
		event.preventDefault();

	
		let cityName = $('#cityNameSearch')
		  .val()
		  .trim();
		cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1); // First letter of char capitalized
		currentWeather(cityName);
	
		$('#searchHistoryList').on('click', function(event) {
		  event.preventDefault();
	
		  const cityName = $(this).text();
		  currentWeather(cityName);
	
		  // Return from function early if submitted cityNameSearchText is blank
		  if (cityName !== null) {
			city = cityName[0].name;
		  }
		});
	
		// Add new cityNameSearchText to searchedCities array, clear the input
		searchedCities.push(cityName);
		cityName.value = '';
	
		// Store updated searchedCities in localStorage, re-render the list
		storesearchedCities();
		rendersearchedCities();
	  });
	
	  // Click on previous city button
	  $(document).on('click', 'newCity', function() {
		currentWeather($(this).text());
	  });
	
	  // Display Current Weather
	  function currentWeather(cityName,stateCode,zipCode) {
		apiKey = '5f605efeed222d3ed829b20c6578f201';
		const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${stateCode}&zip=${zipCode}&units=imperial&appid=${apiKey}`;
		const fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName},${stateCode}&zip=${zipCode}&units=imperial&appid=${apiKey}`;

        https://api.openweathermap.org/data/2.5/weather?q=columbia&units=imperial&appid=5f605efeed222d3ed829b20c6578f201
	   
		$.ajax({
		  url: queryURL,
		  method: 'GET',
		}).then(function(response) {
		  const iconCode = response.weather[0].icon;
		  const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
		  const city = response.name;
		  const description = response.weather[0].description;
		  const temp = Math.round(response.main.temp);
		  const { humidity } = response.main;
		  const windSpeed = response.wind.speed;
		  const { lat } = response.coord;
		  const { lon } = response.coord;
		  const indexQueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
          let imgData = description
          const timeImage = document.querySelector('.card-top img');
	
	
		  $('#city').text(city);
		  $("#wrapper-description").text(description);
		  $('#temp').text(`Temperature: ${temp}° F`);
		  $('#humidity').text(`Humidity: ${humidity} %`);
		  $('#windSpeed').text(`Wind Speed: ${windSpeed} MPH`);
		  $('#weatherIcon').attr('src', iconURL);
	
		  switch (description) {
			case "snow":
			  document.getElementById("wrapper-bg").style.backgroundImage =
				"url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
			  break;
			case "clouds, cloudy, overcast clouds":
			  document.getElementById("wrapper-bg").style.backgroundImage =
				"url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
			  break;
			case "fog":
			  document.getElementById("wrapper-bg").style.backgroundImage =
				"url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
			  break;
			case "rain, moderate rain, heavy intensity rain, light rain":
			  document.getElementById("wrapper-bg").style.backgroundImage =
				"url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
			  break;
			case "clear":
			  document.getElementById("wrapper-bg").style.backgroundImage =
				"url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
			  break;
			case "thunderstorm":
			  document.getElementById("wrapper-bg").style.backgroundImage =
				"url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";
			  break;
			default:
			  document.getElementById("wrapper-bg").style.backgroundImage =
				"url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";
			  break;
		  }
	
	

          $.ajax({
            url: indexQueryURL,
            method: 'GET',
          }).then(function(resp) {
            $('#uvIndex').text(`UV Index: ${resp.value}`);
              let uvValue = resp.value;
              let uvBtn = $('<button>').attr('type','button').text(uvValue);
              if(uvValue >= 0 && uvValue <= 3){
            
                //low : green
                $("#uvIndex").text("UV : Low, ").append(uvBtn);
                uvBtn.addClass("btn bg-success");
            }
            else if(uvValue >= 3 && uvValue <= 6){
                
                //moderate : yellow
                $("#uvIndex").text("UV : Moderate, ").append(uvBtn);
                uvBtn.addClass("btn yellowBtn");
            } 
            else if(uvValue >= 6 && uvValue <= 8){
                
                //high : orange
                $("#uvIndex").text("UV : High, ").append(uvBtn);
                uvBtn.addClass("btn orangeBtn");
            }
            else if(uvValue >= 8 && uvValue <= 10){
                
                //very high : red
                $("#uvIndex").text("UV : Very high, ").append(uvBtn);
                uvBtn.addClass("btn bg-danger");
            }
            else if(uvValue >= 10){
                
                //extreme : violet
                $("#uvIndex").text("UV : Extreme, ").append(uvBtn);
                uvBtn.addClass("btn violetBtn");
            }
        });
    
       
              
   
		
	
		// 5 Day Forecast
		$.ajax({
		  url: fiveDayQueryURL,
		  method: 'GET',
		}).then(function(response) {
		  // Day 1
		  var iconCode = response.list[0].weather[0].icon;
		  var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
		  $('#tempTwo').text(`Temp: ${parseInt(response.list[0].main.temp)}° F`);
		  $('#iconTwo').attr('src', iconURL);
		  $('#humidTwo').text(`Humidity: ${response.list[0].main.humidity}%`);
		  $('#weatherIconTwo').attr('src', iconURL);
		  $('#windSpeed1').text(`Wind Speed: ${windSpeed} MPH`);
	
		  // Day 2
		  var iconCode = response.list[8].weather[0].icon;
		  var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
		  $('#tempThree').text(`Temp: ${parseInt(response.list[8].main.temp)}° F`);
		  $('#iconThree').attr('src', iconURL);
		  $('#humidThree').text(`Humidity: ${response.list[8].main.humidity}%`);
		  $('#weatherIconThree').attr('src', iconURL);
	
		  // Day 3
		  var iconCode = response.list[16].weather[0].icon;
		  var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
		  $('#tempFour').text(`Temp: ${parseInt(response.list[16].main.temp)}° F`);
		  $('#iconFour').attr('src', iconURL);
		  $('#humidFour').text(`Humidity: ${response.list[16].main.humidity}%`);
		  $('#weatherIconFour').attr('src', iconURL);
	
		  // Day 4
		  var iconCode = response.list[24].weather[0].icon;
		  var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
		  $('#tempFive').text(`Temp: ${parseInt(response.list[24].main.temp)}° F`);
		  $('#iconFive').attr('src', iconURL);
		  $('#humidFive').text(`Humidity: ${response.list[24].main.humidity}%`);
		  $('#weatherIconFive').attr('src', iconURL);
	
		  // Day 5
		  var iconCode = response.list[32].weather[0].icon;
		  var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
		  $('#tempSix').text(`Temp: ${parseInt(response.list[32].main.temp)}° F`);
		  $('#iconSix').attr('src', iconURL);
		  $('#humidSix').text(`Humidity: ${response.list[32].main.humidity}%`);
		  $('#weatherIconSix').attr('src', iconURL);
		});
	  
	  // Geolocation
	  navigator.geolocation.getCurrentPosition(function(position) {
		const lat = position.coords.latitude;
		const lon = position.coords.longitude;
		apiKey = '5f605efeed222d3ed829b20c6578f201';
		const queryLocationURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
		const fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
	
		// Current Weather
		$.ajax({
		  url: queryLocationURL,
		  method: 'GET',
		}).then(function(response) {
		  // console.log(response);
		  const iconCode = response.weather[0].icon;
		  const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
		  const city = response.name;
		  const temp = parseInt(response.main.temp);
		  const humidity = parseInt(response.main.humidity);
		  const windSpeed = parseInt(response.wind.speed);
		  const { lat } = response.coord;
		  const { lon } = response.coord;

          const isDayTime = (icon) => {
            if (icon.includes('d')) { return true }
            else { return false }
        }
	
		  $('#city').text(city);
		  $('#temp').text(`Temperature: ${temp}° F`);
		  $('#humidity').text(`Humidity: ${humidity} %`);
		  $('#windSpeed').text(`Wind Speed: ${windSpeed} MPH`);
		  $('#weatherIcon').attr('src', iconURL);
	
		  $.ajax({
			url: `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`,
			method: 'GET',
		  }).then(function(response) {
			$('#uvIndex').html(`UV Index: ${response.value}`);
		  });
	
		  // 5 Day Forecast
		  $.ajax({
			url: fiveDayQueryURL,
			method: 'GET',
		  }).then(function(response) {
			// Day 1
			var iconCode = response.list[0].weather[0].icon;
			var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
			$('#tempTwo').text(`Temp: ${parseInt(response.list[0].main.temp)}° F`);
			$('#iconTwo').attr('src', iconURL);
			$('#humidTwo').text(`Humidity: ${response.list[0].main.humidity}%`);
			$('#weatherIconTwo').attr('src', iconURL);
	
			// Day 2
			var iconCode = response.list[8].weather[0].icon;
			var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
			$('#tempThree').text(
			  `Temp: ${parseInt(response.list[8].main.temp)}° F`
			);
			$('#iconThree').attr('src', iconURL);
			$('#humidThree').text(`Humidity: ${response.list[8].main.humidity}%`);
			$('#weatherIconThree').attr('src', iconURL);
	
			// Day 3
			var iconCode = response.list[16].weather[0].icon;
			var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
			$('#tempFour').text(
			  `Temp: ${parseInt(response.list[16].main.temp)}° F`
			);
			$('#iconFour').attr('src', iconURL);
			$('#humidFour').text(`Humidity: ${response.list[16].main.humidity}%`);
			$('#weatherIconFour').attr('src', iconURL);
	
			// Day 4
			var iconCode = response.list[24].weather[0].icon;
			var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
			$('#tempFive').text(
			  `Temp: ${parseInt(response.list[24].main.temp)}° F`
			);
			$('#iconFive').attr('src', iconURL);
			$('#humidFive').text(`Humidity: ${response.list[24].main.humidity}%`);
			$('#weatherIconFive').attr('src', iconURL);
	
			// Day 5
			var iconCode = response.list[32].weather[0].icon;
			var iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
			$('#tempSix').text(`Temp: ${parseInt(response.list[32].main.temp)}° F`);
			$('#iconSix').attr('src', iconURL);
			$('#humidSix').text(`Humidity: ${response.list[32].main.humidity}%`);
			$('#weatherIconSix').attr('src', iconURL);
	
           
            $('#weatherIcon').attr('src', iconURL);
	

			if (isDayTime(iconCode)) {
			  console.log('day');
			  $('timeImage').attr('src', 'day_image.svg');
			
		  
		  } else {
			  console.log('night');
              $('timeImage').attr('src', 'night_image.svg');
			 
		  }
        });
		});
	  });
    });
}
        });
	
	
	
