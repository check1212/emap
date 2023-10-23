function wmsWeatherInit(){
	var apiKey1 = '874718354841f0e0250b4b06a05a971e';

    // openweathermap 온도
    var weatherTemp = new ol.layer.Tile({
    	id : 'weatherTemp',
    	title : 'weatherTemp',
	    source: new ol.source.XYZ({
	        url: 'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=' + apiKey1,
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
	        url: 'https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=' + apiKey1,
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
		fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + city.lat + '&lon=' + city.lon + '&appid=' + apiKey1)
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



/*	// 웹 링크에서 JSON 데이터를 가져오는 함수
	function fetchJSONData(url, callback) {
	  fetch(url)
	    .then(response => {
	      if (!response.ok) {
	        throw new Error('네트워크 응답 없음');
	      }
	      return response.json();
	    })
	    .then(jsonData => {
	      callback(jsonData);
	    })
	    .catch(error => {
	      console.error('JSON 파싱 에러 :', error);
	    });
	}*/

	// 현재시각
	const now = new Date();

	// 연, 월, 일, 시간 및 분을 가져오기
	const year = now.getFullYear();
	const month = (now.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷팅
	const day = now.getDate().toString().padStart(2, '0');
	const hour = now.getHours().toString().padStart(2, '0');
	const minute = now.getMinutes().toString().padStart(2, '0');
	
	// 원하는 형식으로 날짜와 시간 조합
	const formattedDate = `${year}${month}${day}`;
	
	var apiKey2 = 'IV5u7Csj0eYoPVmjycfjSw==';

/*	// JSON 데이터에서 파싱
	// 수치조류도
	//var jsonURL = 'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=20190105&Hour=15&Minute=20%20&MaxX=130&MinX=120&MaxY=38&MinY=32&%20ResultType=json';
	var jsonURL = 'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDate + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json';

	fetchJSONData(jsonURL, function(jsonData) {
		var features = [];
		
		jsonData.result.data.forEach(function(data) {
			var lon = parseFloat(data.pre_lon); // 경도
			var lat = parseFloat(data.pre_lat); // 위도
			var windDeg = parseInt(data.current_dir); // 풍향
			//var currentSpeed = parseInt(data.current_speed); // 풍속
			var currentSpeed = parseFloat(data.current_speed); // 풍속

			// current_speed 값을 0-99에서 1-100으로 변환
			var opacity = currentSpeed / 100;

			// 풍향 아이콘 스타일 정의
			var windStyle = new ol.style.Style({
			  image: new ol.style.Icon({
			    src: 'images/sk/icon_arrow.png', // 풍향 아이콘 이미지 경로
			    anchor: [0.5, 0.5],
			    rotateWithView: false, // 뷰와 관계없이 각도 설정
			    rotation: (windDeg - 90) * (Math.PI / 180), // 풍향 값을 라디안으로 설정
				opacity: opacity
			  })
			});
		
			// 풍향 아이콘 위치 설정
			var windFeature = new ol.Feature({
	            geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])) // 경도와 위도로 위치 설정
	        });
	        windFeature.setStyle(windStyle);
	
	        features.push(windFeature);
		});
	
		// 풍향 레이어 생성
		var windLayer = new ol.layer.Vector({
        	source: new ol.source.Vector({
            	features: features
			})
		});
		
		// 지도에 풍향 레이어 추가
		map.addLayer(windLayer);
	});*/
	
	
	
	
	// GeoJSON 데이터 로드
	var vectorSource = new ol.source.Vector({
	  format: new ol.format.GeoJSON(),
	  url: 'http://www.khoa.go.kr/api/oceangrid/tidalCurrentAreaGeoJson/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDate + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&Scale=4000000' // GeoJSON 파일 경로
	});

	// 스타일을 동적으로 설정하는 함수를 정의
	var styleFunction = function(feature) {
	  return new ol.style.Style({
	    fill: new ol.style.Fill({
	      color: feature.get('fillColor') // GeoJSON의 fillColor 속성 값 사용
	    }),
	    stroke: new ol.style.Stroke({
	      color: feature.get('strokeColor'), // GeoJSON의 strokeColor 속성 값 사용
	      width: feature.get('strokeWidth') // GeoJSON의 strokeWidth 속성 값 사용
	    }),
	    image: new ol.style.Circle({
	      radius: feature.get('pointRadius'), // GeoJSON의 pointRadius 속성 값 사용
	      fill: new ol.style.Fill({
	        color: feature.get('fillColor') // GeoJSON의 fillColor 속성 값 사용
	      }),
	      stroke: new ol.style.Stroke({
	        color: feature.get('strokeColor'), // GeoJSON의 strokeColor 속성 값 사용
	        width: feature.get('strokeWidth') // GeoJSON의 strokeWidth 속성 값 사용
	      })
	    })
	  });
	};
	
	// GeoJSON 레이어 생성
	var weatherFlowspeed = new ol.layer.Vector({
	  source: vectorSource,
	  style: styleFunction // 스타일 함수 설정
	});
	
	// 유향/유속 레이어 추가
	map.addLayer(weatherFlowspeed);




	// 도시의 위경도 - 파고
	var cities2 = [
	  { no: 'TW_0088', name: '감천항', lat: 35.052, lon: 129.003 },
	  { no: 'TW_0089', name: '경포대해수욕장', lat: 37.808, lon: 128.931 },
	  { no: 'TW_0095', name: '고래불해수욕장', lat: 36.58, lon: 129.454 },
	  { no: 'DT_0042', name: '교본초', lat: 34.704, lon: 128.306 },
	  { no: 'TW_0091', name: '낙산해수욕장', lat: 38.122, lon: 128.65 },
	  { no: 'KG_0025', name: '남해동부', lat: 34.222, lon: 128.419 },
	  { no: 'TW_0069', name: '대천해수욕장', lat: 36.274, lon: 126.457 },
	  { no: 'KG_0024', name: '대한해협', lat: 34.919, lon: .121 },
	  { no: 'TW_0094', name: '망상해수욕장', lat: 37.616, lon: 129.103 },
	  { no: 'DT_0041', name: '복사초', lat: 34.098, lon: 126.168 },
	  { no: 'TW_0079', name: '상왕등도', lat: 35.652, lon: 126.194 },
	  { no: 'TW_0081', name: '생일도', lat: 34.258, lon: 126.96 },
	  { no: 'TW_0093', name: '속초해수욕장', lat: 38.198, lon: 128.631 },
	  { no: 'TW_0090', name: '송정해수욕장', lat: 35.164, lon: 129.219 },
	  { no: 'IE_0061', name: '신안가거초', lat: 33.941, lon: 124.592 },
	  { no: 'IE_0062', name: '옹진소청초', lat: 37.423, lon: 124.738 },
	  { no: 'DT_0039', name: '왕돌초', lat:36.719, lon: 129.732 },
	  { no: 'TW_0080', name: '우이도', lat:34.543, lon: 125.802 },
	  { no: 'KG_0101', name: '울릉도북동', lat: 38.007, lon: 131.552 },
	  { no: 'KG_0102', name: '울릉도북서', lat: 37.742, lon: 130.601 },
	  { no: 'IE_0060', name: '이어도', lat: 32.122, lon: 125.182 },
	  { no: 'TW_0092', name: '임랑해수욕장', lat: 35.302, lon: 129.292 },
	  { no: 'KG_0021', name: '제주남부', lat: 32.09, lon: 126.965 },
	  { no: 'KG_0028', name: '제주해협', lat: 33.7, lon: 126.59 },
	  { no: 'TW_0075', name: '중문해수욕장', lat: 33.234, lon: 126.409 },
	  { no: 'TW_0062', name: '해운대해수욕장', lat: 35.148, lon: 129.17 },
	];

	var overlayWaveheight;
	var overlayWaveheights = [];
	cities2.forEach(function(city) {
		//fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + city.lat + '&lon=' + city.lon + '&appid=' + apiKey2)
		fetch('https://www.khoa.go.kr/api/oceangrid/obsWaveHight/search.do?ServiceKey=' + apiKey2 + '&ObsCode=' + city.no + '&Date=' + formattedDate + '&ResultType=json')
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				var waveHeightData = data.result.data;
				var lastIndex = waveHeightData.length - 1;

				//alert(lastIndex);
				
				if (lastIndex >= 0)
			    	var waveHeight = waveHeightData[lastIndex].wave_height; // 파고
				
				// 날씨 정보 처리
			    //var waveHeight = data.result.data[0].wave_height; // 파고
			
			    // 레이어에 보여줄 내용
			    var weatherText = '<b>' + city.name + '</b> : ' + waveHeight + 'm';
			
			    overlayWaveheight = new ol.Overlay({
	        		element: document.createElement('div'),
					positioning: 'bottom-center',
					offset: [0, -20]
			    });
	
				var overlayElement = overlayWaveheight.getElement();
				
				// 스타일 설정
				overlayElement.style.backgroundColor = 'rgba(0, 132, 255, 0.5)';
				overlayElement.style.color = 'white';
				overlayElement.style.fontSize = '8pt';

				overlayWaveheight.getElement().innerHTML = weatherText;
				overlayWaveheight.setPosition(ol.proj.fromLonLat([city.lon, city.lat]));
				
			    map.addOverlay(overlayWaveheight);
    
			    overlayWaveheights.push(overlayWaveheight); // 모든 오버레이를 배열에 추가
	    	});
	});


	// 기상정보 체크박스
	var windspeedCheckbox = document.getElementById('checkWindspeed');
	var flowspeedCheckbox = document.getElementById('checkFlowspeed');
	var waveheightCheckbox = document.getElementById('checkWaveheight');
	var tempCheckbox = document.getElementById('checkTemp');

	windspeedCheckbox.addEventListener('change', function() {
	    if (windspeedCheckbox.checked) {
			map.addLayer(weatherWindspeed);
	    } else {
			map.removeLayer(weatherWindspeed);
	    }
	});

	flowspeedCheckbox.addEventListener('change', function() {
	    if (flowspeedCheckbox.checked) {
			map.addLayer(weatherFlowspeed);
	    } else {
			map.removeLayer(weatherFlowspeed);
	    }
	});

	waveheightCheckbox.addEventListener('change', function() {
	    if (waveheightCheckbox.checked) {
			//map.addLayer(weatherWave);
			//map.addOverlay(overlayWaveheight);
		    overlayWaveheights.forEach(function(overlay) {
		        map.addOverlay(overlay);
		    });
	    } else {
			//map.removeLayer(weatherFlowspeed);
			//map.removeOverlay(overlayWaveheight);
		    overlayWaveheights.forEach(function(overlay) {
		        map.removeOverlay(overlay);
		    });
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