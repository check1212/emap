function wmsWeatherInit(){
	make_sld("rivers", "Polygon1", "0089ff", null); // 강 색상 최초 1회 적용

	var apiKey1 = '874718354841f0e0250b4b06a05a971e';

    // openweathermap 온도
    /*var weatherTemp = new ol.layer.Tile({
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
	//map.addLayer(weatherTemp);

    // openweathermap 풍속
    var weatherWind = new ol.layer.Tile({
    	id : 'weatherWind',
    	title : 'weatherWind',
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
	//map.addLayer(weatherWind);

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
	});*/



	// CSV에서 JSON 데이터를 가져오는 함수
	function fetchCSVData(url, callback) {
		fetch('/getCSV.do?url=' + url)
		//fetch('/emap/getCSV.do?url=' + url)
		    .then(response => {
		        if (response.ok) {
		            return response.text(); // 텍스트 형태로 읽음
		        } else {
		            throw new Error('데이터 로드 실패');
		        }
		    })
		    .then(csvData => {
		        // CSV 데이터를 JSON으로 파싱
		        Papa.parse(csvData, {
		            header: true, // CSV 파일의 첫 번째 행을 헤더로 사용
		            dynamicTyping: true, // 데이터 형식을 자동으로 탐지
		            complete: function(results) {
		                // 결과로 얻은 JSON 데이터
	      				callback(results.data);
						//length(results.data.length);
		                //const jsonData = results.data;
                		//console.log(jsonData);
		            },
		            error: function(error) {
		        		console.error('CSV 파싱 에러 :', error);
		            }
		        });
		    })
		    .catch(error => {
		        console.error('CSV 파싱 에러 :', error);
		    });
	}

	// 웹 링크에서 JSON 데이터를 가져오는 함수
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
	}

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

	function formatDate(date) {
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}${month}${day}`;
	}

	const pre1 = new Date();
	pre1.setDate(pre1.getDate() - 1);
	const formattedDatePre1 = formatDate(pre1);

	const pre2 = new Date();
	pre2.setDate(pre2.getDate() - 2);
	const formattedDatePre2 = formatDate(pre2);

	const pre3 = new Date();
	pre3.setDate(pre3.getDate() - 3);
	const formattedDatePre3 = formatDate(pre3);

	const pre4 = new Date();
	pre4.setDate(pre4.getDate() - 4);
	const formattedDatePre4 = formatDate(pre4);

	const pre5 = new Date();
	pre5.setDate(pre5.getDate() - 5);
	const formattedDatePre5 = formatDate(pre5);

	const pre6 = new Date();
	pre6.setDate(pre6.getDate() - 6);
	const formattedDatePre6 = formatDate(pre6);
	
	var apiKey2 = 'IV5u7Csj0eYoPVmjycfjSw==';
	
	// JSON 데이터에서 파싱
	// 수치조류도
	//var jsonURL = 'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=20190105&Hour=15&Minute=20%20&MaxX=130&MinX=120&MaxY=38&MinY=32&%20ResultType=json';
	//var jsonURL = 'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDate + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json';



//	var jsonUrlHead = https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=


	var formattedDatePreS = [
		formattedDatePre1,
		formattedDatePre2,
		formattedDatePre3,
		formattedDatePre4,
		formattedDatePre5,
		formattedDatePre6
	];

	var jsonURLs = [];
	for (var i=6; i>=0; i--) {
		var date = (i === 0) ? formattedDate : formattedDatePreS[i-1];
		var url = 'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + date + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json';
		jsonURLs.push(url);
	}

	/*var jsonURLs = [
		'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDatePre6 + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json',
		'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDatePre5 + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json',
		'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDatePre4 + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json',
		'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDatePre3 + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json',
		'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDatePre2 + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json',
		'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDatePre1 + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json',
		'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDate + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json'
	];*/

	var csvURLs = 
		[
		'0',
		'1',
		'2',
		'3',
		'4',
		'5',
		'6'
		];

	// select option 변경시 적용
	var daySelect = document.getElementById("daySelect");

	daySelect.addEventListener("change", function() {
		var dayRange = daySelect.value;

		csvURLs = [];
		for (var i=dayRange-1; i>=0; i--) {
			var url = i;
			csvURLs.push(url);
		}
	});

	var brightSelect = document.getElementById("brightSelect");

	brightSelect.addEventListener("change", function() {
		var brightRange = brightSelect.value;

		if (brightRange == 1) {
			make_sld("ocean", "Polygon1", "d3e9ed", null);
			make_sld("DEPAREA", "Polygon2", "73b5ee", "d3e9ed");
			make_sld("worldcountries", "Polygon1", "c5b578", null);
			make_sld("LNDAREA_A", "Polygon1", "c5b578", null);
			make_sld("rivers", "Polygon1", "0089ff", null);
		} else if (brightRange == 2) {
			//make_sld("ocean", "Polygon1", "070707", null);
			make_sld("DAY", "Polygon1", "070707", null);
			//make_sld("DEPAREA", "Polygon2", "16232f", "070707");
			//make_sld("worldcountries", "Polygon1", "2c291b", null);
			//make_sld("LNDAREA_A", "Polygon1", "2c291b", null);
			//make_sld("rivers", "Polygon1", "292e2e", null);
		} else {
			make_sld("ocean", "Polygon1", "070707", null);
			make_sld("DEPAREA", "Polygon2", "030413", "070707");
			make_sld("worldcountries", "Polygon1", "0d0a08", null);
			make_sld("LNDAREA_A", "Polygon1", "0d0a08", null);
			make_sld("rivers", "Polygon1", "292e2e", null);
		}
	});

	/*daySelect.addEventListener("change", function() {
		var dayRange = daySelect.value;

		if (dayRange == 2) {
			jsonURLs = [];
			for (var i=1; i>=0; i--) {
				var date = (i === 0) ? formattedDate : formattedDatePreS[i-1];
				var url = 'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + date + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json';
				jsonURLs.push(url);
			}
		} else if (dayRange == 3) {
			jsonURLs = [];
			for (var i=2; i>=0; i--) {
				var date = (i === 0) ? formattedDate : formattedDatePreS[i-1];
				var url = 'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + date + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json';
				jsonURLs.push(url);
			}
		} else if (dayRange == 4) {
			jsonURLs = [];
			for (var i=3; i>=0; i--) {
				var date = (i === 0) ? formattedDate : formattedDatePreS[i-1];
				var url = 'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + date + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json';
				jsonURLs.push(url);
			}
		} else if (dayRange == 5) {
			jsonURLs = [];
			for (var i=4; i>=0; i--) {
				var date = (i === 0) ? formattedDate : formattedDatePreS[i-1];
				var url = 'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + date + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json';
				jsonURLs.push(url);
			}
		} else if (dayRange == 6) {
			jsonURLs = [];
			for (var i=5; i>=0; i--) {
				var date = (i === 0) ? formattedDate : formattedDatePreS[i-1];
				var url = 'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + date + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json';
				jsonURLs.push(url);
			}
		} else {
			jsonURLs = [];
			for (var i=6; i>=0; i--) {
				var date = (i === 0) ? formattedDate : formattedDatePreS[i-1];
				var url = 'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + date + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json';
				jsonURLs.push(url);
			}
		}
	});*/


/*	const jsonURLs = [
		'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDatePre6 + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json',
		'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDatePre5 + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json',
		'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDatePre4 + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json',
		'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDatePre3 + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json',
		'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDatePre2 + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json',
		'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDatePre1 + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json',
		'https://www.khoa.go.kr/api/oceangrid/tidalCurrentArea/search.do?ServiceKey=' + apiKey2 + '&Date=' + formattedDate + '&Hour=' + hour + '&Minute=' + minute + '&MaxX=140&MinX=120&MaxY=40&MinY=32&ResultType=json'
	];*/

	let currentCSVIndex = 0; // 현재 표시할 JSON 데이터 인덱스
	let currentJSONIndex = 0; // 현재 표시할 JSON 데이터 인덱스
	let windLayer = null; // 풍향/풍속 레이어
	let flowLayer = null; // 유향/유속 레이어
	let tempLayer = null; // 기온 레이어

	let addLayerWind = 1;
	let addLayerFlow = 1;
	let addLayerTemp = 1;
	
	// 애니메이션 시작
	updateAnimation();

	var stopNow;

	// 애니메이션 업데이트 함수
	function updateAnimation() {

		//fetchCSVData(function(jsonData) {
		fetchCSVData(csvURLs[currentCSVIndex], function(jsonData) {
		    if (windLayer)
		    	map.removeLayer(windLayer); // 이전 레이어 제거
		    if (flowLayer)
		    	map.removeLayer(flowLayer);
		    if (tempLayer)
		    	map.removeLayer(tempLayer);

		    const featuresWind = [];
		    const featuresFlow = [];
		    const featuresTemp = [];
const tempClusters = {};
var tempFlag = false;

			jsonData.slice(0, -1).forEach(function(data) { // CSV to Json 과정에서 맨 마지막 배열에 쓰레기값 있으므로 제거
				var lon = parseFloat(data.Longitude); // 경도
				var lat = parseFloat(data.Latitude); // 위도
				var windDeg = parseInt(data.winddirecttion); // 풍향
				var windSpeed = parseFloat(data.windspeed); // 풍속
				var flowDeg = parseInt(data.waterdirecttion); // 유향
				//var currentSpeed = parseInt(data.waterspeed); // 유속
				var flowSpeed = parseFloat(data.waterspeed); // 유속
				var temp = parseFloat(data.temp); // 기온
				/*var tempImg;
				if (temp <= 0)
					tempImg = 'images/sk/icon_temp0.png';
				else if (temp < 10)
					tempImg = 'images/sk/icon_temp1.png';
				else if (temp < 20)
					tempImg = 'images/sk/icon_temp10.png';
				else if (temp < 30)
					tempImg = 'images/sk/icon_temp20.png';
				else // 30도 이상
					tempImg = 'images/sk/icon_temp30.png';*/
					
					

				var windOpacity = windSpeed / 100;
				var flowOpacity = flowSpeed / 100;

				// 풍향 아이콘 스타일 정의
				var windStyle = new ol.style.Style({
					image: new ol.style.Icon({
						src: 'images/sk/icon_arrow_wind.png', // 풍향 아이콘 이미지 경로
						anchor: [0.5, 0.5],
						rotateWithView: false, // 뷰와 관계없이 각도 설정
						rotation: (windDeg - 90) * (Math.PI / 180), // 풍향 값을 라디안으로 설정
						opacity: windOpacity,
						scale: 0.2
					})
				});

				// 유향 아이콘 스타일 정의
				var flowStyle = new ol.style.Style({
					image: new ol.style.Icon({
						src: 'images/sk/icon_arrow_flow.png',
						anchor: [0.5, 0.5],
						rotateWithView: false, // 뷰와 관계없이 각도 설정
						rotation: (flowDeg - 90) * (Math.PI / 180),
						opacity: flowOpacity,
						scale: 0.2
					})
				});

				// 기온 아이콘 스타일 정의
				/*var tempStyle = new ol.style.Style({
					image: new ol.style.Icon({
						src: tempImg,
						anchor: [0.5, 0.5],
						opacity: 0.01,
						scale: 10
					})
				});*/

				// 풍향/풍속 아이콘 위치 설정
				var windFeature = new ol.Feature({
		            geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])) // 경도와 위도로 위치 설정
		        });

				// 유향/유속 아이콘 위치 설정
				var flowFeature = new ol.Feature({
		            geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
		        });

				// 기온 포인트 위치 설정
				/*var tempFeature = new ol.Feature({
		            geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat]))
		        });*/

		        windFeature.setStyle(windStyle);
		        flowFeature.setStyle(flowStyle);
		        //tempFeature.setStyle(tempStyle);

		        featuresWind.push(windFeature);
		        featuresFlow.push(flowFeature);
		        //featuresTemp.push(tempFeature);

				if (!isNaN(temp)) {
					tempFlag = true;
				
					// 클러스터 키를 기온 값에 따라 생성. 10도 간격
					var tempClusterKey = Math.floor(temp / 10) * 10;
					
					// 클러스터 객체가 없으면 새로 생성합니다.
					if (!tempClusters[tempClusterKey]) {
					    tempClusters[tempClusterKey] = [];
					}
					
					// 데이터 포인트를 클러스터에 추가합니다.
					tempClusters[tempClusterKey].push(data);
				}
			});

			// 풍향/풍속 레이어 생성
			windLayer = new ol.layer.Vector({
	        	source: new ol.source.Vector({
	            	features: featuresWind
				})
			});

			// 유향/유속 레이어 생성
			flowLayer = new ol.layer.Vector({
	        	source: new ol.source.Vector({
	            	features: featuresFlow
				})
			});

			// 기온 레이어 생성
			/*tempLayer = new ol.layer.Vector({
	        	source: new ol.source.Vector({
	            	features: featuresTemp
				})
			});*/

			//var iconSize;
			if (tempFlag) {
				// 클러스터 레이어 생성
				tempLayer = new ol.layer.Vector({
				    source: new ol.source.Vector(),
				});
			
				// 클러스터 아이콘 스타일 정의
				const clusterStyle = function(feature) {
				    //const tempClusterKey = feature.get('tempClusterKey');
				    const clusterSize = feature.get('features').length;
				
				    // 클러스터 기온 평균값 계산
				    const tempSum = feature.get('features').reduce((acc, data) => acc + parseFloat(data.temp), 0);
				    const tempAverage = tempSum / clusterSize;
				
				    // 클러스터 내의 데이터 포인트 수에 따라 클러스터 아이콘 크기 조절
					//const iconSize = clusterSize > 1 ? clusterSize * 0.2 : 1;
					//const iconSize = Math.min(clusterSize * 0.1, 1);
					const maxIconSize = 30.0; // 최대 아이콘 크기
					//const iconSize = clusterSize * 0.005;
					const iconSize = Math.min(clusterSize * 0.5, maxIconSize);
				    // 클러스터 아이콘 색상을 기온에 따라 조절
					//const tempColor = 'rgb(' + (255 - tempClusterKey) + ', 0, ' + tempClusterKey + ')';
					var tempColor;
					if (tempAverage <= 0)
						tempColor = "#1c68f2";
					else if (tempAverage < 10)
						tempColor = "#61c9fa";
					else if (tempAverage < 20)
						tempColor = "#e8dd24";
					else if (tempAverage < 30)
						tempColor = "#fd6001";
					else
						tempColor = "#ff0022";
				
				    return new ol.style.Style({
				        image: new ol.style.Circle({
				            radius: iconSize,
				            fill: new ol.style.Fill({
				                color: tempColor,
				            }),
				            stroke: new ol.style.Stroke({
				                color: 'white',
				                width: 2,
				            }),
				        }),
				        text: new ol.style.Text({
							//text: clusterSize.toString(),
							text: tempAverage.toFixed(1),
				            fill: new ol.style.Fill({
				                color: '#fff',
				            }),
				        }),
				    });
				};
				
				// 클러스터 레이어에 클러스터 생성
				for (const tempClusterKey in tempClusters) {
				    const tempCluster = tempClusters[tempClusterKey];
				    const clusterFeature = new ol.Feature({
				        geometry: new ol.geom.Point(ol.proj.fromLonLat([parseFloat(tempCluster[0].Longitude), parseFloat(tempCluster[0].Latitude)])),
				    });
				    clusterFeature.set('tempClusterKey', parseInt(tempClusterKey));
				    clusterFeature.set('features', tempCluster);
				    tempLayer.getSource().addFeature(clusterFeature);
				}
				
				// 클러스터 레이어 스타일 설정
				tempLayer.setStyle(clusterStyle);
			}

			// 레이어 추가
			if (addLayerWind == 1)
				if (addLayerFlow == 1)
					map.addLayer(flowLayer); // 속도 향상을 위해 둘 모두의 레이어 On 일 때 유향/유속만 보여줌
				else
					map.addLayer(windLayer);
			/*if (addLayerFlow == 1)
				map.addLayer(flowLayer);*/
			//console.log(iconSize);
			if (tempFlag && addLayerTemp == 1)
				map.addLayer(tempLayer);

			// 클릭시 정보 레이어 팝업
			var popup = new ol.Overlay({
				element: document.getElementById('popup'),
			});
			map.addOverlay(popup);
			
			map.on('click', function (event) {
				var coordinate_ = event.coordinate; // 클릭한 좌표
				var coordinate = ol.proj.transform(coordinate_, 'EPSG:3857', 'EPSG:4326');

				fetchCSVData(0, function(data) {
					//var goPopup = false;
					var tolerance = 0.01; // 허용 오차
					for (var i=0; i < data.length-1; i++) { // CSV 구조상 맨 마지막 배열은 쓰레기값이 들어옴. -1은 파싱 에러 발생 방지
						//console.log(Math.abs(coordinate[1] - parseFloat(data[i].Latitude)));
						if (Math.abs(coordinate[1] - parseFloat(data[i].Latitude)) <= tolerance && Math.abs(coordinate[0] - parseFloat(data[i].Longitude)) <= tolerance) {
							var content =
										'<p>위도 : ' + parseFloat(data[i].Latitude).toFixed(2) + '</p>' +
										'<p>경도 : ' + parseFloat(data[i].Longitude).toFixed(2) + '</p>' +
										'<p>풍향 : ' + parseFloat(data[i].winddirecttion) + '</p>' +
										'<p>풍속 : ' + parseFloat(data[i].windspeed) + '</p>' +
										'<p>유향 : ' + parseFloat(data[i].waterdirecttion) + '</p>' +
										'<p>유속 : ' + parseFloat(data[i].waterspeed) + '</p>' +
										'<p>기온 : ' + parseFloat(data[i].temp) + '</p>'
										;
							popup.setPosition(coordinate_);
							document.getElementById('popup-content').innerHTML = content;
							//goPopup = true;
							isPopupOpen = true; // 다른 팝업이 실행되지 않도록 처리
							setTimeout(function() { // 팝업 닫은 이후 다른 위치 클릭시 기존 팝업 노출 후 이동되는 현상 해결
								$("#popup").show();
							}, 500);
							break;
						}
					};
				});
				setTimeout(function() { // 추후 클릭시 다른 팝업이 실행될 수도 있도록 초기화
					isPopupOpen = false;
				}, 500);
				//event.stopPropagation();
			});
			//}, null, 1);

		    // 애니메이션 업데이트 함수를 반복 호출하여 번갈아가며 표시
		    currentCSVIndex = (currentCSVIndex + 1) % csvURLs.length;

			if (currentCSVIndex === 0)
				cancelAnimationFrame(animationId); // 애니메이션 멈춤
			else if (stopNow != 1)
				animationId = requestAnimationFrame(updateAnimation); // 애니메이션 지속
		});
	}

	// 애니메이션 업데이트 함수 (JSON)
	function updateAnimationJson() {
		// 현재 JSON 데이터를 가져오고 처리
		fetchJSONData(jsonURLs[currentJSONIndex], function(jsonData) {
		    if (flowLayer) {
		      // 이전 레이어 제거
		      map.removeLayer(flowLayer);
		    }
	
		    const features = [];
			
			jsonData.result.data.forEach(function(data) {
				var lon = parseFloat(data.pre_lon); // 경도
				var lat = parseFloat(data.pre_lat); // 위도
				var flowDeg = parseInt(data.current_dir); // 유향
				//var currentSpeed = parseInt(data.current_speed); // 유속
				var currentSpeed = parseFloat(data.current_speed); // 유속
	
				// current_speed 값을 0-99에서 1-100으로 변환
				var opacity = currentSpeed / 100;
	
				// 풍향 아이콘 스타일 정의
				var flowStyle = new ol.style.Style({
				  image: new ol.style.Icon({
				    src: 'images/sk/icon_arrow.png', // 풍향 아이콘 이미지 경로
				    anchor: [0.5, 0.5],
				    rotateWithView: false, // 뷰와 관계없이 각도 설정
				    rotation: (flowDeg - 90) * (Math.PI / 180), // 풍향 값을 라디안으로 설정
					opacity: opacity
				  })
				});
			
				// 풍향 아이콘 위치 설정
				var flowFeature = new ol.Feature({
		            geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])) // 경도와 위도로 위치 설정
		        });
		        flowFeature.setStyle(flowStyle);
		
		        features.push(flowFeature);
			});

			// 유향/유속 레이어 생성
			flowLayer = new ol.layer.Vector({
	        	source: new ol.source.Vector({
	            	features: features
				})
			});
			
			// 지도에 유향/유속 레이어 추가
			map.addLayer(flowLayer);
	
		    // 애니메이션 업데이트 함수를 반복 호출하여 번갈아가며 표시
		    currentJSONIndex = (currentJSONIndex + 1) % jsonURLs.length;
		    
			if (currentJSONIndex === 0)
				cancelAnimationFrame(animationId); // 애니메이션 멈춤
			else if (stopNow != 1)
				animationId = requestAnimationFrame(updateAnimation); // 애니메이션 지속
		});
	}

	// 애니메이션 멈춤 버튼 클릭 이벤트
	document.getElementById("stopAnimation").addEventListener("click", function() {
	    cancelAnimationFrame(animationId);
		stopNow = 1;
	});

	// 애니메이션 시작 버튼 클릭 이벤트
	document.getElementById("startAnimation").addEventListener("click", function() {
		stopNow = 0;
		animationId = requestAnimationFrame(updateAnimation);
	});


	
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
	//map.addLayer(weatherFlowspeed);




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
	var windCheckbox = document.getElementById('checkWind');
	var flowCheckbox = document.getElementById('checkFlow');
	var waveheightCheckbox = document.getElementById('checkWaveheight');
	var tempCheckbox = document.getElementById('checkTemp');

	windCheckbox.addEventListener('change', function() {
	    if (windCheckbox.checked) {
			addLayerWind = 1;
			if (addLayerFlow == 1)
				map.removeLayer(flowLayer); // 속도 향상을 위해 유향/유속 레이어 On 일 때 삭제
			map.addLayer(windLayer);
	    } else {
			map.removeLayer(windLayer);
			addLayerWind = 0;
			if (addLayerFlow == 1)
				map.addLayer(flowLayer); // 유향/유속 레이어 원복
	    }
	});

	flowCheckbox.addEventListener('change', function() {
	    if (flowCheckbox.checked) {
			addLayerFlow = 1;
			if (addLayerWind == 1)
				map.removeLayer(windLayer); // 속도 향상을 위해 풍향/풍속 레이어 On 일 때 삭제
			map.addLayer(flowLayer);
	    } else {
			addLayerFlow = 0;
			map.removeLayer(flowLayer);
			if (addLayerWind == 1)
				map.addLayer(windLayer); // 풍향/풍속 레이어 원복
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
			addLayerTemp = 1;
			map.addLayer(tempLayer);
	    } else {
			addLayerTemp = 0;
			map.removeLayer(tempLayer);
	    }
	});
}