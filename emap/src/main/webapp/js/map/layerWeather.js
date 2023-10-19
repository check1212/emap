function wmsWeatherInit(){
	var apiKey = '874718354841f0e0250b4b06a05a971e';

    // openweathermap 온도
    var weatherTemp = new ol.layer.Tile({
    	id : 'weatherTemp',
    	title : 'weatherTemp',
	    source: new ol.source.XYZ({
	        url: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=' + apiKey,
	        //url: 'http://maps.openweathermap.org/maps/2.0/weather/TA2/{z}/{x}/{y}?date=&opacity=0.9&fill_bound=true&appid=' + apiKey,
	        tileOptions: {
	            crossOriginKeyword: 'anonymous'
	        },
	        crossOrigin: null
	    })
	});
	map.addLayer(weatherTemp);

    // openweathermap 풍속
    var weatherWindspeed = new ol.layer.Tile({
    	id : 'weatherWindspeed',
    	title : 'weatherWindspeed',
	    source: new ol.source.XYZ({
	        url: 'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=' + apiKey,
	        //url: 'http://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?date=&use_norm=true&arrow_step=16&appid=' + apiKey,
			//url: 'http://maps.openweathermap.org/maps/2.0/weather/WND/{z}/{x}/{y}?date=1552861800&use_norm=true&arrow_step=16&appid=' + apiKey,
	        tileOptions: {
	            crossOriginKeyword: 'anonymous'
	        },
	        crossOrigin: null
	    })
	});
	map.addLayer(weatherWindspeed);



	// 도시의 위경도
	var cities = [
	  { name: '부산', lat: 35.166668, lon: 129.066666 },
	  { name: '서울', lat: 37.5665, lon: 126.9780 },
	  { name: '목포', lat: 34.811835, lon: 126.392166 },
	  { name: '동해1', lat: 36.532, lon: 130.347 },
	  { name: '남해1', lat: 34.103, lon: 127.875 },
	  { name: '서해1', lat: 36.054, lon: 125.403 },
	];
	
	cities.forEach(function(city) {
		fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + city.lat + '&lon=' + city.lon + '&appid=' + apiKey)
		  .then(function (response) {
		    return response.json();
		  })
		  .then(function (data) {
		    // 날씨 정보 처리
		    var temperature = (data.main.temp - 273.15).toFixed(1); // 온도
		    //var weatherDescription = data.weather[0].description; // 날씨 설명
		
		    // 레이어에 보여줄 내용
		    var weatherText = '<b>' + city.name + '</b> : ' + temperature + '°C';
		    //var weatherText = '<b>부산</b> : ' + temperature + '°C<br>날씨: ' + weatherDescription;
		
		    var overlay = new ol.Overlay({
        		element: document.createElement('div'),
				positioning: 'bottom-center',
				offset: [0, -20]
		    });

			var overlayElement = overlay.getElement();
			
			// 스타일 설정
			overlayElement.style.backgroundColor = 'rgba(0, 11, 121, 0.5)';
			overlayElement.style.color = 'white';
			overlayElement.style.fontSize = '8pt';
		
		    map.addOverlay(overlay);
		
			overlay.getElement().innerHTML = weatherText;
			overlay.setPosition(ol.proj.fromLonLat([city.lon, city.lat]));
	    });
	});



	// 기상정보 체크박스
	var windspeedCheckbox = document.getElementById('checkWindspeed');
	var tempCheckbox = document.getElementById('checkTemp');

	windspeedCheckbox.addEventListener('change', function() {
	    if (windspeedCheckbox.checked) {
			map.addLayer(weatherWindspeed);
	    } else {
			map.removeLayer(weatherWindspeed);
	    }
	});

	tempCheckbox.addEventListener('change', function() {
	    if (tempCheckbox.checked) {
			map.addLayer(weatherTemp);
	    } else {
			map.removeLayer(weatherTemp);
	    }
	});

}