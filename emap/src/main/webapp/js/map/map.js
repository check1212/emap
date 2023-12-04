var googlemap;
var drawInteration_route = null;
var drawInteration_search = null;
var choice_idx="";
var date = new Date();
var year = date.getFullYear();
var month = ("0" + (1 + date.getMonth())).slice(-2);
var day = ("0" + date.getDate()).slice(-2);

var route_list = [];

var ColorPickerValue = "#ff0000";
var shipStyle={
	font : "12",
	color : "#ff0000"
};

//항적조회 범위값 저장 
var searchBox = {
	lon1 : "",
	lat1 : "",
	lon2 : "",
	lat2 : "",
	date1 : "",
	date2 : "",
	kind : "",
	text : ""
};
var shipList = [];		//선박리스트
var choose_shipList = [];		//선택 선박	
var shipMoveList = [];		//선박항적리스트			
var chocieShipMmsi="";  //상세선박정보 id
var featTest;

var animationId; // 애니메이션 식별자
var isPopupOpen;
var Day1_Base1;
var Day1_Base4;
var Day1_Base7;
var Day1_Base10;
var Day1_Base12;
var Day1_Base13;
var Day1_Base14;
var Day1_Standard1;
var Day1_Standard4;
var Day1_Standard7;
var Day1_Standard10;
var Day1_Standard12;
var Day1_Standard13;
var Day1_Standard14;
var Day1_Detail1;
var Day1_Detail4;
var Day1_Detail7;
var Day1_Detail10;
var Day1_Detail12;
var Day1_Detail13;
var Day1_Detail14;
var DAY2;
var DAY3;

var layerMode = 1; // Base, Standard, Detail
var brightMode = 1; // 주간
var layerWind; // 풍향/풍속 레이어
var layerFlow; // 유향/유속 레이어
var layerWaveheight; // 파향/파고
var layerTempair; // 기온
var layerTempwater; // 수온



//35.5468629,129.3005359 울산
// 중앙
function mapInit(){
	var view = new ol.View({
		//center: ol.proj.fromLonLat([129.567,35.448
		center: ol.proj.fromLonLat([128.100,36.000
		]),
		//zoom: 12,
		zoom: 7,
	});
	
	googlemap = new ol.layer.Tile({
		source: new ol.source.OSM(),
	});

    //마우스 좌표
    var mouseControlCoordinate = new ol.control.MousePosition({        
        coordinateFormat: function(coordinate) {
			return ol.coordinate.format(coordinate, '위도: {y}, 경도: {x}', 3);
        },
        projection: 'EPSG:4326',//좌표계 설정
        className: 'scale1', //css 클래스 이름
        target: document.getElementById('mouseLocationStat'),//좌표를 뿌릴 element
    });

	map = new ol.Map({
		layers: [
			googlemap
		],
		target: 'dvMap',
		view: view,
		controls: new ol.control.defaults().extend([mouseControlCoordinate]),
		//controls: ol.control.defaults.defaults().extend([mouseControlCoordinate]), // OpenLayers 최신 버전으로 업그레이드시 수정 필요
  		//renderer: 'webgl' // WebGL 렌더러 사용 설정
	});
    map.on('moveend', onMoveEnd);

    // 배율 변경 이벤트에 따라 레이어 변경
    //var previousScale = 34466743;
	map.getView().on('change:resolution', function() {
		var allLayers = map.getLayers().getArray(); // 모든 추가된 레이어 정보 확인

		if (!allLayers.includes(DAY2) && !allLayers.includes(DAY3)) { // 밝기가 주간인 경우에만 동작
			var lev = map.getView().getZoom();
			var layerMap;

			if (lev < 4) { // 특정 레벨 이상일 때 레이어 추가
		        if (map.getLayers().getArray().includes(layerTempair)) {
					if (lev == 3)
		            	layerTempair.setRadius(5);
		            else if (lev == 2)
		            	layerTempair.setRadius(3.5);
		            else if (lev == 1)
		            	layerTempair.setRadius(2.5);
		            else if (lev == 0) // else if가 아닌 else 처리시 레벨 변화 중간 단계에서 else로 처리됨
		            	layerTempair.setRadius(1.5);
		            layerTempair.changed();
		        }
		        if (map.getLayers().getArray().includes(layerTempwater)) {
					if (lev == 3)
		            	layerTempwater.setRadius(5);
		            else if (lev == 2)
		            	layerTempwater.setRadius(3.5);
		            else if (lev == 1)
		            	layerTempwater.setRadius(2.5);
		            else if (lev == 0) // else if가 아닌 else 처리시 레벨 변화 중간 단계에서 else로 처리됨
		            	layerTempwater.setRadius(1.5);
		            layerTempwater.changed();
		        }
		        /*if (map.getLayers().getArray().includes(Day1_Base4)) {
		            map.removeLayer(Day1_Base4);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base7)) {
		            map.removeLayer(Day1_Base7);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base10)) {
		            map.removeLayer(Day1_Base10);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base12)) {
		            map.removeLayer(Day1_Base12);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base13)) {
		            map.removeLayer(Day1_Base13);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base14)) {
		            map.removeLayer(Day1_Base14);
		        }*/

		        layerMap = {
					1: {
						layerRemove: [Day1_Base4, Day1_Base7, Day1_Base10, Day1_Base12, Day1_Base13, Day1_Base14],
						layerGroup: Day1_Base1
					},
					2: {
						layerRemove: [Day1_Standard4, Day1_Standard7, Day1_Standard10, Day1_Standard12, Day1_Standard13, Day1_Standard14],
						layerGroup: Day1_Standard1
					},
					3: {
						layerRemove: [Day1_Detail4, Day1_Detail7, Day1_Detail10, Day1_Detail12, Day1_Detail13, Day1_Detail14],
						layerGroup: Day1_Detail1
					}
				}
			} else if (lev < 7) {
		        if (map.getLayers().getArray().includes(layerTempair)) {
					if (lev == 6)
		            	layerTempair.setRadius(30);
		            else if (lev == 5)
		            	layerTempair.setRadius(17);
		            else if (lev == 4)
		            	layerTempair.setRadius(10);
		            layerTempair.changed();
		        }
		        if (map.getLayers().getArray().includes(layerTempwater)) {
					if (lev == 6)
		            	layerTempwater.setRadius(30);
		            else if (lev == 5)
		            	layerTempwater.setRadius(17);
		            else if (lev == 4)
		            	layerTempwater.setRadius(10);
		            layerTempwater.changed();
		        }
		        /*if (map.getLayers().getArray().includes(Day1_Base1)) {
		            map.removeLayer(Day1_Base1);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base7)) {
		            map.removeLayer(Day1_Base7);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base10)) {
		            map.removeLayer(Day1_Base10);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base12)) {
		            map.removeLayer(Day1_Base12);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base13)) {
		            map.removeLayer(Day1_Base13);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base14)) {
		            map.removeLayer(Day1_Base14);
		        }
		        
		        if (!map.getLayers().getArray().includes(Day1_Base4)) {
		            map.addLayer(Day1_Base4);
					Day1_Base4.setZIndex(-1);
		        }*/

		        layerMap = {
					1: {
						layerRemove: [Day1_Base1, Day1_Base7, Day1_Base10, Day1_Base12, Day1_Base13, Day1_Base14],
						layerGroup: Day1_Base4
					},
					2: {
						layerRemove: [Day1_Standard1, Day1_Standard7, Day1_Standard10, Day1_Standard12, Day1_Standard13, Day1_Standard14],
						layerGroup: Day1_Standard4
					},
					3: {
						layerRemove: [Day1_Detail1, Day1_Detail7, Day1_Detail10, Day1_Detail12, Day1_Detail13, Day1_Detail14],
						layerGroup: Day1_Detail4
					}
				}
			} else if (lev < 10) {
		        if (map.getLayers().getArray().includes(layerTempair)) {
					if (lev == 7)
		            	layerTempair.setRadius(50);
		            else if (lev == 8)
		            	layerTempair.setRadius(100);
					else if (lev == 9)
		            	layerTempair.setRadius(200);
		            layerTempair.changed();
		        }
		        if (map.getLayers().getArray().includes(layerTempwater)) {
					if (lev == 7)
		            	layerTempwater.setRadius(50);
		            else if (lev == 8)
		            	layerTempwater.setRadius(100);
					else if (lev == 9)
		            	layerTempwater.setRadius(200);
		            layerTempwater.changed();
		        }
		        /*if (map.getLayers().getArray().includes(Day1_Base1)) {
		            map.removeLayer(Day1_Base1);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base4)) {
		            map.removeLayer(Day1_Base4);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base10)) {
		            map.removeLayer(Day1_Base10);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base12)) {
		            map.removeLayer(Day1_Base12);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base13)) {
		            map.removeLayer(Day1_Base13);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base14)) {
		            map.removeLayer(Day1_Base14);
		        }

		        if (!map.getLayers().getArray().includes(Day1_Base7)) {
		            map.addLayer(Day1_Base7);
					Day1_Base7.setZIndex(-1);
		        }*/

		        layerMap = {
					1: {
						layerRemove: [Day1_Base1, Day1_Base4, Day1_Base10, Day1_Base12, Day1_Base13, Day1_Base14],
						layerGroup: Day1_Base7
					},
					2: {
						layerRemove: [Day1_Standard1, Day1_Standard4, Day1_Standard10, Day1_Standard12, Day1_Standard13, Day1_Standard14],
						layerGroup: Day1_Standard7
					},
					3: {
						layerRemove: [Day1_Detail1, Day1_Detail4, Day1_Detail10, Day1_Detail12, Day1_Detail13, Day1_Detail14],
						layerGroup: Day1_Detail7
					}
				}
			} else if (lev < 12) {
		        if (map.getLayers().getArray().includes(layerTempair)) {
					if (lev == 10)
		            	layerTempair.setRadius(400);
					else if (lev == 11)
		            	layerTempair.setRadius(700);
		            layerTempair.changed();
		        }
		        if (map.getLayers().getArray().includes(layerTempwater)) {
		            if (lev == 10)
		            	layerTempwater.setRadius(400);
					else if (lev == 11)
		            	layerTempwater.setRadius(700);
		            layerTempwater.changed();
		        }
		        /*if (map.getLayers().getArray().includes(Day1_Base1)) {
		            map.removeLayer(Day1_Base1);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base4)) {
		            map.removeLayer(Day1_Base4);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base7)) {
		            map.removeLayer(Day1_Base7);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base12)) {
		            map.removeLayer(Day1_Base12);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base13)) {
		            map.removeLayer(Day1_Base13);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base14)) {
		            map.removeLayer(Day1_Base14);
		        }
		        
		        if (!map.getLayers().getArray().includes(Day1_Base10)) {
		            map.addLayer(Day1_Base10);
					Day1_Base10.setZIndex(-1);
		        }*/
		        
		        
		        layerMap = {
					1: {
						layerRemove: [Day1_Base1, Day1_Base4, Day1_Base7, Day1_Base12, Day1_Base13, Day1_Base14],
						layerGroup: Day1_Base10
					},
					2: {
						layerRemove: [Day1_Standard1, Day1_Standard4, Day1_Standard7, Day1_Standard12, Day1_Standard13, Day1_Standard14],
						layerGroup: Day1_Standard10
					},
					3: {
						layerRemove: [Day1_Detail1, Day1_Detail4, Day1_Detail7, Day1_Detail12, Day1_Detail13, Day1_Detail14],
						layerGroup: Day1_Detail10
					}
				}
			} else if (lev == 12) {
		        if (map.getLayers().getArray().includes(layerTempair)) {
		            layerTempair.setRadius(1300);
		            layerTempair.changed();
		        }
		        if (map.getLayers().getArray().includes(layerTempwater)) {
		            layerTempwater.setRadius(1300);
		            layerTempwater.changed();
		        }
		        /*if (map.getLayers().getArray().includes(Day1_Base1)) {
		            map.removeLayer(Day1_Base1);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base4)) {
		            map.removeLayer(Day1_Base4);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base7)) {
		            map.removeLayer(Day1_Base7);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base10)) {
		            map.removeLayer(Day1_Base10);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base13)) {
		            map.removeLayer(Day1_Base13);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base14)) {
		            map.removeLayer(Day1_Base14);
		        }
		        
		        if (!map.getLayers().getArray().includes(Day1_Base12)) {
		            map.addLayer(Day1_Base12);
					Day1_Base12.setZIndex(-1);
		        }*/
		        
		        
		        layerMap = {
					1: {
						layerRemove: [Day1_Base1, Day1_Base4, Day1_Base7, Day1_Base10, Day1_Base13, Day1_Base14],
						layerGroup: Day1_Base12
					},
					2: {
						layerRemove: [Day1_Standard1, Day1_Standard4, Day1_Standard7, Day1_Standard10, Day1_Standard13, Day1_Standard14],
						layerGroup: Day1_Standard12
					},
					3: {
						layerRemove: [Day1_Detail1, Day1_Detail4, Day1_Detail7, Day1_Detail10, Day1_Detail13, Day1_Detail14],
						layerGroup: Day1_Detail12
					}
				}
			} else if (lev == 13) {
		        if (map.getLayers().getArray().includes(layerTempair)) {
		            layerTempair.setRadius(2000); // 일정 수치 넘어서면 처리 안될 수 있음
		            layerTempair.changed();
		        }
		        if (map.getLayers().getArray().includes(layerTempwater)) {
		            layerTempwater.setRadius(2000);
		            layerTempwater.changed();
		        }
		        /*if (map.getLayers().getArray().includes(Day1_Base1)) {
		            map.removeLayer(Day1_Base1);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base4)) {
		            map.removeLayer(Day1_Base4);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base7)) {
		            map.removeLayer(Day1_Base7);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base10)) {
		            map.removeLayer(Day1_Base10);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base12)) {
		            map.removeLayer(Day1_Base12);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base14)) {
		            map.removeLayer(Day1_Base14);
		        }
		        
		        if (!map.getLayers().getArray().includes(Day1_Base13)) {
		            map.addLayer(Day1_Base13);
					Day1_Base13.setZIndex(-1);
		        }*/
		        
		        
		        layerMap = {
					1: {
						layerRemove: [Day1_Base1, Day1_Base4, Day1_Base7, Day1_Base10, Day1_Base12, Day1_Base14],
						layerGroup: Day1_Base13
					},
					2: {
						layerRemove: [Day1_Standard1, Day1_Standard4, Day1_Standard7, Day1_Standard10, Day1_Standard12, Day1_Standard14],
						layerGroup: Day1_Standard13
					},
					3: {
						layerRemove: [Day1_Detail1, Day1_Detail4, Day1_Detail7, Day1_Detail10, Day1_Detail12, Day1_Detail14],
						layerGroup: Day1_Detail13
					}
				}
			} else {
		        if (map.getLayers().getArray().includes(layerTempair)) {
		            layerTempair.setRadius(2000);
		            layerTempair.changed();
		        }
		        if (map.getLayers().getArray().includes(layerTempwater)) {
		            layerTempwater.setRadius(2000);
		            layerTempwater.changed();
		        }
		        /*if (map.getLayers().getArray().includes(Day1_Base1)) {
		            map.removeLayer(Day1_Base1);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base4)) {
		            map.removeLayer(Day1_Base4);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base7)) {
		            map.removeLayer(Day1_Base7);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base10)) {
		            map.removeLayer(Day1_Base10);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base12)) {
		            map.removeLayer(Day1_Base12);
		        }
		        if (map.getLayers().getArray().includes(Day1_Base13)) {
		            map.removeLayer(Day1_Base13);
		        }
		        
		        if (!map.getLayers().getArray().includes(Day1_Base14)) {
		            map.addLayer(Day1_Base14);
					Day1_Base14.setZIndex(-1);
		        }*/
		        
		        
		        layerMap = {
					1: {
						layerRemove: [Day1_Base1, Day1_Base4, Day1_Base7, Day1_Base10, Day1_Base12, Day1_Base13],
						layerGroup: Day1_Base14
					},
					2: {
						layerRemove: [Day1_Standard1, Day1_Standard4, Day1_Standard7, Day1_Standard10, Day1_Standard12, Day1_Standard13],
						layerGroup: Day1_Standard14
					},
					3: {
						layerRemove: [Day1_Detail1, Day1_Detail4, Day1_Detail7, Day1_Detail10, Day1_Detail12, Day1_Detail13],
						layerGroup: Day1_Detail14
					}
				}
			}
			layerChange(layerMap, layerMode);
		}
	});

	map.on('singleclick', function (evt) {
		if($("#div_route_detail").css("display") != "block" && drawInteration_route == null && drawInteration_search == null && isPopupOpen == false){
			var str_html = "<table class='featureInfo'>";
		    var viewResolution = view.getResolution();
		    for(var i=0; i<map.getLayers().getArray().length; i++) {
		    	var layer = map.getLayers().getArray()[i]
		    	if (layer.type == "TILE" && layer.getSource().serverType_ == "geoserver") {
			    	//console.log(url);
				    var url = layer.getSource().getGetFeatureInfoUrl(
				        evt.coordinate, viewResolution, 'EPSG:4326',
				        { 'INFO_FORMAT': 'text/html' }
				    );
				    if (url) {
				    	fetch(url)
				        	.then((response) => response.text())
				        	.then((html) => {
				        		//console.log(html);
				        		var s = html.indexOf('<tr>');
				        		var e = html.lastIndexOf('</tr>');
				        		if(s > -1) {
				        			str_html += html.substring(s, e);
				        		}
				        		
				        		document.getElementById('detail_table').innerHTML = str_html;
				            	$("#div_detail").show();
				        	});
				    }
		    	}
		    }
		}
	});

	// 해도 레이어
	wmsInit();
	map.removeLayer(googlemap); //배경맵 삭제
    vectorInit(); //베이스 vector레이어
    mapEvent(); //맵 버튼이벤트 설정

	// 날씨 레이어
	//wmsWeatherInit();

	//선박 선택 이벤트
	shipSelectEvent();
	modStyleSelectInteraction.setActive(true);
	
	getShipSearch(); //선박정보
}

//맵 버튼이벤트 설정
function mapEvent(){
	//기본
	$("#mapDefalt").on('click',function(e){
		deactiveInteractions();
		//modStyleSelectInteraction.setActive(true);
	});
	 
	//확대
	$("#mapZoomIn").on('click',function(e){
		deactiveInteractions();
		see_zoomControl(false);	 	
	});
	 
	//축소
	$("#mapZoomOut").on('click',function(e){
		deactiveInteractions();
		see_zoomControl(true);	 	
	});
	 
	//move
	$("#mapMove").on('click',function(e){
	 	deactiveInteractions();
	});
	 
	//선박정보
	$("#mapSearch1").on('click',function(e){	
	 	deactiveInteractions();
	 	let dis = $("#div_left_ship").css("display");
		if(dis == "block") {
			$("#div_left_ship").hide();
			$(".div_left").hide();
			$("#div_left_mapSetting").hide();
		} else {
			$("#div_left_route").hide();
			$(".div_left").show();
			$("#div_left_ship").show();
			getShipList();
		}
		setSize();
	});
	
	//항로범위
	$("#mapSearch2").on('click',function(e){	
	 	deactiveInteractions(); 	
	 	setActiveDrawToolSearch('circle');
	});

	//기상정보
	$("#mapWeather").on('click',function(e){	
	 	deactiveInteractions();
	 	let dis = $("#div_left_weather").css("display");
		if(dis == "block") {
			$("#div_left_weather").hide();
			$(".div_left2").hide();
		} else {
			$(".div_left2").show();
			$("#div_left_weather").show();
		}
		setSize();
	});
	
	//선박상세정보 닫기
	$("#close_ship_detail").on('click',function(e){
		$("#div_ship_detail").hide();
	});
	
	//tile layer 상세 정보 닫기
	$("#close_detail").on('click',function(e){
		$("#div_detail").hide();
	});

	//레이어 설정
	$("#mapSetting").on('click',function(e){
		//deactiveInteractions();		
		wfs_layer.getSource().clear();
		let dis = $("#div_left_mapSetting").css("display");
		let disShip = $("#div_left_ship").css("display");
		let disRoute = $("#div_left_route").css("display");
		if(dis == "block" && disShip != "block" && disRoute != "block") {
			$("#div_left_ship").hide();
			$("#div_left_route").hide();
			//$("#div_route_detail").hide();
			$("#div_left_mapSetting").hide();
			$(".div_left").hide();
			$("#mapSetting img").attr("src",$("#mapSetting img").attr("src").replace("_on.jpg",".jpg"));
		} else {
			$("#div_left_ship").hide();
			$("#div_left_route").hide();
			//$("#div_route_detail").hide();
			$(".div_left").show();
			$("#div_left_mapSetting").show();
			$("#mapSetting img").attr("src",$("#mapSetting img").attr("src").replace(".jpg","_on.jpg"));
			for(let i=0; i<$(".map_tool li img").length; i++) {
				$(".map_tool li img").eq(i).attr("src",$(".map_tool li img").eq(i).attr("src").replace("_on.jpg",".jpg"));
			}
		}
		setSize();	
	});
	
	//프린트
	$("#mapPrint").on('click',function(e){	
	 	fn_printPopup();
	});

	//항로계획
	$("#mapSearch3").on('click',function(e){
		deactiveInteractions();
		let dis = $("#div_left_route").css("display");
		if(dis == "block") {
			route_reset();			
			//$("#mapSearch3 img").attr("src","images/sk/maptool/btn7.jpg");
			$("#div_left_route").hide();
			$("#div_route_detail").hide();
			$(".div_left").hide();
			$('#div_route_detail').hide();
			$("#div_left_mapSetting").hide();
		} else {
			$("#div_left_ship").hide();
			$("#div_left_route").show();
			$(".div_left").show();
			$("#route_detail_list").html("");
			search_plan();
			//$("#mapSearch3 img").attr("src","images/sk/maptool/btn7_on.jpg");
		}
		setSize();		
	});
	
	//항로계획 상세 저장
	$("#route_detail_save").on('click',function(e){
		route_save();
	});
	
	//항로계획 상세 닫기
	$("#route_detail_close").on('click',function(e){
		route_reset();
		$('#div_route_detail').hide();
		DrawRoute();
	});

	//항로계획 상세  wp 추가
	$("#wp_add").on('click',function(e){
		detail_add();		
	});
	
	//항로계획 상세  wp 수정
	$("#wp_update").on('click',function(e){
		let data = $("#select_detail").val();
		if(data == "") alert("WP 선택 후 사용 바랍니다.");
		else route_update();
	});
	
	//항로계획 상세 wp 삭제
	$("#wp_delete").on('click',function(e){
		let data = $("#select_detail").val();
		if(data == "") alert("WP 선택 후 삭제 바랍니다.");
		else {
			$("#detail_tr_"+$("#select_detail").val()).remove();
			var rt_info = getRouteInfo($("#hd_routeid").val());
			var arr = new Array();
			for(var i=0; i<$("#route_detail_list table tr").length; i++) {
				var tr = $("#route_detail_list table tr")[i];
				var tds = $(tr).children();
				arr.push({lon : Number($(tds[3]).children().val()), lat : Number($(tds[2]).children().val())});
			}
			rt_info.lonlat = arr;
			DrawRoute();
		}
	});
	
	//항로계획 상세삭제
	$("#route_detail_delete").on('click',function(e){
		route_delete();
	});
	
	//항로 조회
	$("#ship_search").on('click',function(e){
		if(choose_shipList.length == 0) alert("선박 선택 후 사용 바랍니다.");
		else drawShipRoute();
	});
	
	//항로 초기화
	$("#ship_clean").on('click',function(e){
		for(var i=0; i<$("#ship_resultlist table tr").length; i++) {
			var tr = $("#ship_resultlist table tr")[i];
			$(tr).css("background","#ffffff");
		}
		wfs_layer.getSource().clear();	
	});
}

var realtime_stack = 0;
//선박위치보여주기..(주기적으로 부르게하는 펀션)
function scheduleShipInfo(){	
	realtime_stack ++;
	setTimeout(function(){		
		if(realtime_stack==1){
			if(realtime_stack != 0){
				realtime_stack = realtime_stack -1;
			}
			getShipSearch(); //선박리스트 조회		
		}else{
			if(realtime_stack == 0)realtime_stack = 0;
			else realtime_stack = realtime_stack -1;
		}
    }, 10000);	
}

//WP Control
function fn_addInteractions() {
	map.removeInteraction(modStyleSelectInteraction);
	let lyr=getLayer("route_p");
	var source = lyr.getSource();
	drawInteration_route = new ol.interaction.Draw({
		source: source,
	    type: 'Point'
	});
	
	drawInteration_route.on('drawend', function(f){
		let lyr=null;
		var layers = map.getLayers().getArray();
		for(let i in layers) {
	        const l = layers[i];
	        const thisLayerId = layers[i].get('id');

	        if("route_l" === thisLayerId) {
	            lyr = l;
	            break;
	        }
	    }
		f.feature.id = "rt_"+$("#hd_routeid").val()+"_"+$("#select_detail").val();
		var xy = f.feature.getGeometry().transform( 'EPSG:3857',  'EPSG:4326').getCoordinates();
		var x = xy[1];
		var y = xy[0];
		$("#"+f.feature.id+"_lat").val(x.toFixed(3));
		$("#"+f.feature.id+"_lon").val(y.toFixed(3));
		
		var rt_info = getRouteInfo($("#hd_routeid").val());
		var arr = new Array();
		for(var i=0; i<$("#route_detail_list table tr").length; i++) {
			var tr = $("#route_detail_list table tr")[i];
			var tds = $(tr).children();
			arr.push({lon : Number($(tds[3]).children().val()), lat : Number($(tds[2]).children().val())});
		}
		rt_info.lonlat = arr;
		f.feature.getGeometry().transform( 'EPSG:4326',  'EPSG:3857');
		
		DrawRoute();
		deactiveInteractions();
	});
	map.addInteraction(drawInteration_route);
}

//항로계획 리스트
function search_plan(){
	route_list = [];
	setSize();
	
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "getPlanList.do",
		async : false,
		success: function(data) {
			if(data != null){
				var str = "<table><colgroup><col width='60%'><col width='40%'></colgroup>";
				for(var i=0;i<data.length;i++){
					str += "<tr onclick='plan_detail(\""+ data[i].routeid +"\")'><td>"+data[i].routename+"</td><td>"+data[i].modifydate+"</td></tr>";				

					var route_info = {
							id : data[i].routeid,
							lonlat : []
					}
					route_list.push(route_info);
					RouteDetailList(data[i].routeid,route_info);
					DrawRoute();
				}
				str += "</table>";
				$("#route_resultlist").html(str);
			}
		}
	});
}

//항로계획 상세정보 리스트
function RouteDetailList(id, info) {
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "RouteDetailList.do",			
		data : {
			id : id
		},
		async : false,
		success: function(data) {
			var lonlat = new Array();
			for(var i=0;i<data.length;i++){
				lonlat.push({lon : data[i].lon, lat : data[i].lat});
			}
			info.lonlat = lonlat;			
		}
	});
}

//항로계획 feature 그리기
function DrawRoute() {
	let lyr_p =getLayer("route_p");
	let lyr_l =getLayer("route_l");
	lyr_p.getSource().clear();
	lyr_l.getSource().clear();
	
	for(var i=0; i<route_list.length; i++) {
		var r = route_list[i];
		var arr_line = new Array();
		for(var j=0; j<r.lonlat.length; j++) {
			var point = [Number(r.lonlat[j].lon),Number(r.lonlat[j].lat)];
			var feat_p = new ol.Feature({
				id:"rt_"+r.id+"_"+j,
				geometry:new ol.geom.Point(point)
			});	
			feat_p.getGeometry().transform( 'EPSG:4326',  'EPSG:3857');
			
			lyr_p.getSource().addFeature(feat_p);
			
			arr_line.push([Number(r.lonlat[j].lon),Number(r.lonlat[j].lat)]);
		}
		var feat_line = new ol.Feature({
			id:"rt_"+r.id,
			geometry:new ol.geom.LineString(arr_line)
		});
		let c_geometry = feat_line.getGeometry().transform( 'EPSG:4326',  'EPSG:3857');
		lyr_l.getSource().addFeature(feat_line);
	}
}

//항로계획 상세정보
function plan_detail(id) {
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "getRouteList.do",
		data : {
			id : id
		},
		success: function(data) {
			if(data != null){				
				$("#hd_routeid").val(data[0].routeid);
				$("#txt_routename").val(data[0].routename);
				$("#txt_makename").val(data[0].makename);
				$("#txt_modifydate").text(data[0].modifydate);
				
				var route_info = getRouteInfo(data[0].routeid);				
				var str = "<table style='width: 100%'  border='1' cellspacing='0'><colgroup><col width='15%'><col width='25%'><col width='30%'><col width='30%'></colgroup>";
				for(var j=0; j<route_info.lonlat.length; j++) {
					str += "<tr id='detail_tr_"+j+"'><td style='padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;'>"+(j+1)+"</td>";
					str += "<td style='padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;'><input type='text' style='width: 105px;' value=''></td>";
					str += "<td style='padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;'><input type='text' style='width: 128px;' id='rt_"+route_info.id+"_"+j+"_lat' value='"+route_info.lonlat[j].lat+"'></td>";
					str += "<td style='padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;'><input type='text' style='width: 128px;' id='rt_"+route_info.id+"_"+j+"_lon'value='"+route_info.lonlat[j].lon+"'></td>";
					str += "</tr>";
					let lyr_l =getLayer("route_l");
					var f = getFeatureId(lyr_l, "rt_"+data[0].routeid);
					var lyrCenter = ol.extent.getCenter(f.getGeometry().getExtent());			
					//zoom, center 설정
				    map.getView().setCenter(lyrCenter);
				    map.getView().setZoom(13);	
				}
				$("#route_detail_list").html(str);
						
				$("#route_detail_list table tr").on('click',function(e){
					for(var i=0; i<$("#route_detail_list table tr").length; i++) {
						var tr = $("#route_detail_list table tr")[i];
						$(tr).css("background","#ffffff");
						if(tr.id == this.id) {
							$("#select_detail").val(i);
						}
					}
					$(this).css("background","#d4d4d4");				
				});
				$("#div_route_detail").show();
			}
		}
	});
}

//항로계획 초기화
function route_reset() {
	$("#hd_routeid").val("");
	$("#txt_routename").val("");
	$("#txt_makename").val("");
	$("#txt_modifydate").text("");
	$("#route_detail_list").html("");
	
	$("#div_route_detail").show();
	
	let lyr_p =getLayer("route_p");
	let lyr_l =getLayer("route_l");
	lyr_p.getSource().clear();
	lyr_l.getSource().clear();
}

//항로계획 저장
function route_save() {
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "RouteSave.do",			
		data : {
			rt_id : $("#hd_routeid").val(),
			rt_rname : $("#txt_routename").val(),
			rt_mkname : $("#txt_makename").val()
		},
		success: function(data) {
			if($("#route_detail_list table tr").length > 0) route_detail_save();
			search_plan();
		}
	});
}

//항로계획 상세 저장
function route_detail_save() {
	var arr_num = new Array();
	var arr_lon = new Array();
	var arr_lat = new Array();
	for(var i=0; i<$("#route_detail_list table tr").length; i++) {
		var tr = $("#route_detail_list table tr")[i];
		var tds = $(tr).children();
		
		var num = $(tds[0]).children().val();
		if(num == undefined){
			num = 0;
		}
		arr_num.push(num);
		arr_lat.push($(tds[2]).children().val());
		arr_lon.push($(tds[3]).children().val());
	}
	
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "RouteDetailSave.do",			
		data : {
			cnt : $("#route_detail_list table tr").length,
			id : $("#hd_routeid").val(),
			arr_num : arr_num.toString(),
			arr_lon : arr_lon.toString(),
			arr_lat : arr_lat.toString()
		},
		success: function(data) {
			plan_detail($("#hd_routeid").val());
		}
	});
}

//항로계획 상세 추가
function detail_add() {
	var str = "";
	if($("#hd_routeid").val() == "") {
		alert("저장 후 WP추가 하시기 바랍니다.");
	} else {
	if($("#route_detail_list table tr").length == 0) {
		str = "<table style='width: 100%' border='1' cellspacing='0'><colgroup><col width='15%'><col width='25%'><col width='30%'><col width='30%'></colgroup>";
		str += "<tr id='detail_tr_0'><td style='padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;'></td>";
		str += "<td style='padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;'><input type='text' style='width: 105px;'></td>";
		str += "<td style='padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;'><input type='text' id='rt_"+$("#hd_routeid").val()+"_0_lat' style='width: 128px;'></td>";
		str += "<td style='padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;'><input type='text' id='rt_"+$("#hd_routeid").val()+"_0_lon' style='width: 128px;'></td>";
		str += "</tr></table>";
		$("#route_detail_list").html(str);

		$("#route_detail_list table tr").on('click',function(e){
			for(var i=0; i<$("#route_detail_list table tr").length; i++) {
				var tr = $("#route_detail_list table tr")[i];
				$(tr).css("background","#ffffff");
				if(tr.id == this.id) {
					$("#select_detail").val(i);
				}
			}
			$(this).css("background","#d4d4d4");
		});
		$("#detail_tr_0").css("background","#d4d4d4");
		$("#select_detail").val(0);
		fn_addInteractions();
	} else {
		let data = $("#select_detail").val();
		if(data == "") alert("WP 선택 후 사용 바랍니다.");
		else {
			var select_id = $("#select_detail").val();
			var len = $("#route_detail_list table tr").length;
			str = "<tr id='detail_tr_"+(Number(select_id)+1)+"'><td style='padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;'></td>";
			str += "<td style='padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;'><input type='text' style='width: 105px;'></td>";
			str += "<td style='padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;'><input type='text' id='rt_"+$("#hd_routeid").val()+"_"+(Number(select_id)+1)+"_lat' style='width: 128px;'></td>";
			str += "<td style='padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;'><input type='text' id='rt_"+$("#hd_routeid").val()+"_"+(Number(select_id)+1)+"_lon' style='width: 128px;'></td>";
			str += "</tr>";
			if(select_id == "") {
				if(len != 0) select_id=len-1;
			}
			if(Number(select_id) <= len) {
				for(var i = len; i>Number(select_id); i--) {
					$("#rt_"+$("#hd_routeid").val()+"_"+i+"_lat").attr("id","rt_"+$("#hd_routeid").val()+"_"+(i+1)+"_lat");
					$("#rt_"+$("#hd_routeid").val()+"_"+i+"_lon").attr("id","rt_"+$("#hd_routeid").val()+"_"+(i+1)+"_lon");
					$("#detail_tr_"+i).attr("id","detail_tr_"+(i+1));
				}
			}
			$("#route_detail_list table tr:eq("+(select_id)+")").after(str);
		
			for(var i=0; i<$("#route_detail_list table tr").length; i++) {
				var tr = $("#route_detail_list table tr")[i];
				$(tr).css("background","#ffffff");
			}
		
			select_id = Number(select_id)+1;
			$("#detail_tr_"+select_id).css("background","#d4d4d4");
			$("#select_detail").val(select_id);
			fn_addInteractions();
		}
	}
	}
}

//WP 수정
function route_update() {
	fn_addInteractions();
}

//WP 삭제
function route_delete() {
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "RouteDelete.do",			
		data : {
			id : $("#hd_routeid").val()
		},
		success: function(data) {
			search_plan();
			$("#div_route_detail").hide();
		}
	});
}

function getRouteInfo(id) {
	for(var i=0; i<route_list.length; i++) {
		if(route_list[i].id == id) {
			return route_list[i];
		}
	}
}

//선박정보
function getShipSearch() {
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "getShipSearch.do",
		asyn: false,
		data : { },
		success: function(data) {		    
			shipList = [];
			ship_layer.getSource().clear();
			//console.log(data);		    
			if(data != null){
				shipList = data;
				makeShipFeature(); //선박리스트 feat만들기
				//scheduleShipInfo(); //스케쥴 다시 호출
			}
		}
	});
}

//선박리스트
function makeShipFeature() {
	//선박 레이어 라인 표시
	for(var i=0;i<shipList.length;i++){
		var item = shipList[i];
		var pointFeature = new ol.Feature({
			geometry: new ol.geom.Point([Number(item.lon),Number(item.lat)])
		});				
		let c_geometry = pointFeature.getGeometry().transform( 'EPSG:4326',  'EPSG:3857');
			
		shipNameText = shipList[i].mmsi+"\n"+shipList[i].shipname; //이름인경우
		
		pointFeature.id = "ship_"+shipList[i].mmsi;
		pointFeature.setStyle(
			new ol.style.Style({		            
					image: new ol.style.Icon({
					src: 'images/sk/shipIcon.png',
		        	anchor: [0.8, 0.8],		
		        	rotateWithView: true,
					rotation: item.theading!=null?item.theading:0,			          	
				}),
				text: new ol.style.Text({
					textAlign: 'center',
		            font:  'bold '+shipStyle.font+'px Arial',
		            fill: new ol.style.Fill({color: shipStyle.color}),
		            stroke: new ol.style.Stroke({color:'#ffffff', width:0}),
		            text: shipNameText,
		            offsetX: 0,
		            offsetY: -25,
		            overflow:true,
		        })
			})
		);		
		
		try{
			ship_layer.getSource().addFeature(pointFeature);
		}catch(e){
			console.log(e);
			console.log("shipList[i] error : "+shipList[i].mmsi);
		}
	}
}

function getShipList() {
	choose_shipList = [];
	var str = "<table style='width: 100%'  border='1' cellspacing='0'><colgroup><col width='50%'><col width='50%'></colgroup>";
	for(var i=0;i<shipList.length;i++){
		var item = shipList[i];
		str += "<tr onclick='getShipCenter("+item.mmsi+","+item.lon+","+item.lat+");'><td style='padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;'>"+item.shipname+"</td>";
		str += "<td style='padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;'>"+item.mmsi+"</td></tr>";
	}
	str += "</table>";

	$("#ship_resultlist").html(str);
	
	$("#ship_resultlist table tr").on('click',function(e){		
		$(this).css("background","#d4d4d4");
	});
	
	
}

//선박정보 위치 이동
function getShipCenter(id,lon, lat){
	var pointFeature = new ol.Feature({
		geometry: new ol.geom.Point([Number(lon),Number(lat)])
	});				
	let c_geometry = pointFeature.getGeometry().transform( 'EPSG:4326',  'EPSG:3857');
	var lyrCenter = ol.extent.getCenter(pointFeature.getGeometry().getExtent());
	map.getView().setCenter(lyrCenter);
    map.getView().setZoom(14);
    choose_shipList.push(id);
}

//선박정보 상세 정보
function getShipSearch_Detail(mmsi) {
	getShipClean();
	for(var i=0; i<shipList.length; i++) {
		if(shipList[i].mmsi == mmsi) {
			$("#txt_mmsi").text(shipList[i].mmsi);
			$("#txt_shipname").text(shipList[i].shipname);
			$("#txt_latlot").text(shipList[i].lat + " / " +shipList[i].lon);
			$("#txt_gathertime").text(shipList[i].gathertime);
			$("#txt_sog").text(shipList[i].sog);
			$("#txt_cog").text(shipList[i].cog);
			$("#txt_theading").text(shipList[i].theading);
			$("#txt_rateturn").text(shipList[i].rateturn);
			$("#txt_shipton").text(shipList[i].shipton);
			$("#txt_navistatus").text(shipList[i].navistatus);
			$("#txt_shiptype").text(shipList[i].shiptype);
			$("#txt_ackname").text(shipList[i].ackname);
			
			$("#div_ship_detail").show();
		}
	}
}

//선박정보 상세 정보 초기화
function getShipClean() {
	$("#txt_mmsi").text("");
	$("#txt_shipname").text("");
	$("#txt_latlot").text("");
	$("#txt_gathertime").text("");
	$("#txt_sog").text("");
	$("#txt_cog").text("");
	$("#txt_theading").text("");
	$("#txt_rateturn").text("");
	$("#txt_shipton").text("");
	$("#txt_navistatus").text("");
	$("#txt_shiptype").text("");
	$("#txt_ackname").text("");
}

function drawShipRoute() {
	for(var j=0; j<choose_shipList.length; j++) {
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "getShipOne.do",
		asyn: false,
		data : { mmsi : choose_shipList[j] },
		success: function(data) {    
			if(data != null){
				var arr_line = new Array();
				for(var i=0; i<data.length; i++) {				
					arr_line.push([Number(data[i].lon),Number(data[i].lat)]);
					var pointFeature = new ol.Feature({
						geometry: new ol.geom.Point([Number(data[i].lon),Number(data[i].lat)])
					});	
					let c_geometry2 = pointFeature.getGeometry().transform( 'EPSG:4326',  'EPSG:3857');
					var pointLabel = "";
					if(i != data.length-1){
						pointFeature.setStyle(
								new ol.style.Style({
									image: new ol.style.Circle({
							            radius: 4,
							            fill: new ol.style.Fill({
							                color: shipStyle.color
							            }),
							            stroke: new ol.style.Stroke({
								        	color: '#ffffff',
								        	width: 1,
								      	})
							        }),		            
						            text: new ol.style.Text({
						                textAlign: 'center',
						                font:  'bold '+shipStyle.font+'px Arial',
						                fill: new ol.style.Fill({color: shipStyle.color}),
						                stroke: new ol.style.Stroke({color:'#ffffff', width:0}),
						                text: data[i].gathertime,
						                offsetX: 70,
						                offsetY: 0,
						                overflow:true,
						            })
						      	})
							);
					}
					wfs_layer.getSource().addFeature(pointFeature);
				}
				styles = [
				    // linestring
				    new ol.style.Style({
				      stroke: new ol.style.Stroke({
				        color: '#ff0000',
				        width: 2,
				      })					      
				    }),
				];
				var feat_line = new ol.Feature({
					geometry:new ol.geom.LineString(arr_line)
				});
				feat_line.setStyle(styles);
				let c_geometry = feat_line.getGeometry().transform( 'EPSG:4326',  'EPSG:3857');
				
				try{
					wfs_layer.getSource().addFeature(feat_line);
					
					var lyrCenter = ol.extent.getCenter(feat_line.getGeometry().getExtent());			
					//zoom, center 설정
				    //map.getView().setCenter(lyrCenter);
				    //map.getView().setZoom(17);						
				}catch(e){
					console.log(e);
					console.log("error : "+item.mmsi);
				}
			}
		}
	});
	}
}

// 위도/경도를 도분초 단위로 변환
function convertToDMS(data) {
	const sign = (data < 0) ? 'W' : 'E'; // 부호 처리
	const absData = Math.abs(data); // 절대값 변환
	const degrees = Math.floor(absData); // 도
	const minutesDecimal = (absData - degrees) * 60; // 분
	const minutes = Math.floor(minutesDecimal);
	const seconds = ((minutesDecimal - minutes) * 60).toFixed(2); // 초
	return `${degrees}° ${minutes}' ${seconds}" ${sign}`;
}

// 레이어 변경
function layerChange(layerMap, layerMode) {
    if (layerMap[layerMode]) {
        const { layerRemove, layerGroup } = layerMap[layerMode];
        
        layerRemove.forEach(layer => {
            if (map.getLayers().getArray().includes(layer)) {
                map.removeLayer(layer);
            }
        });
        
        if (!map.getLayers().getArray().includes(layerGroup)) {
            map.addLayer(layerGroup);
            layerGroup.setZIndex(-1);
        }
    }
}
