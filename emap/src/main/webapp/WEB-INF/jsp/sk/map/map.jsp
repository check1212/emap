<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/taglib/taglib.jsp"%>
<jsp:useBean id="today" class="java.util.Date" />
<fmt:formatDate value="${today}" pattern="yyyyMMddHHmmss" var="nowDate"/>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width" />
<title>Map</title>
<!-- css -->
<link rel="stylesheet" type="text/css" href="<c:url value="/js/libs/colorpicker/css/colorpicker.css"/>"/>
<link rel="stylesheet" type="text/css" href="<c:url value="/js/libs/colorpicker/css/layout.css"/>"/>
<link rel="stylesheet" href="<c:url value="/js/libs/openlayers/ol-v5.30/ol.css"/>">
<link rel="stylesheet" href="<c:url value="/js/libs/openlayers/ol-ext/ol-ext.min.css"/>"/>
<link rel="stylesheet" href="<c:url value="/css/common.css?version=${nowDate}"/>"/>
<link type="text/css" href="<c:url value="/css/perfect-scrollbar.css"/>" rel="stylesheet"/>


<!-- 지도 스크립트 -->
<!-- JS -->
<!-- jquery -->
<script type="text/javascript" src="<c:url value="/js/libs/jquery/jquery-3.4.1.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/libs/jquery/jquery.migrate-3.0.0.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/libs/jquery/jquery-ui-1.11.4.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/libs/jquery/jquery.tablescroll.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/libs/jquery/jquery.blockUI.js"/>"></script>
<!-- jquery fileUpload -->
<script type="text/javascript" src="<c:url value="/js/libs/jquery/jquery.form.min.js"/>"></script>

<!-- underscore -->
<script type="text/javascript" src="<c:url value="/js/libs/underscoreJs/underscore-umd-min.js"/>"></script>

<!-- fileSaver -->
<script type="text/javascript" src="<c:url value="/js/libs/jquery/FileSaver.js"/>"></script>

<!-- openlayers -->
<script type="text/javascript" src="<c:url value="/js/libs/openlayers/ol-v5.30/ol.js"/>"></script>
<!-- openlayers -->
<script type="text/javascript" src="<c:url value="/js/libs/openlayers/ol-ext/ol-ext.min.js"/>"></script>

<!-- proj -->
<script type="text/javascript" src="<c:url value="/js/libs/proj4/proj4.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/libs/proj4/epsg.js"/>"></script>

<!-- 이미지저장용 -->
<script type="text/javascript" src="<c:url value="/js/libs/html2canvas/html2canvas.min.js"/>"></script>

<!-- 작업파일 -->
<script type="text/javascript" src="<c:url value="/js/map/customDragInteraction.js?version=${nowDate}"/>"></script>
<script type="text/javascript" src="<c:url value="/js/libs/perfect-scrollbar.min.js"/>"></script>

<script>    
	var ctx = "${ctx}";
</script>
<script type="text/javascript" src="<c:url value="/js/map/mapOptions.js?version=${nowDate}"/>"></script>
<script type="text/javascript" src="<c:url value="/js/map/style.js?version=${nowDate}"/>"></script>
<script type="text/javascript" src="<c:url value="/js/map/map.js?version=${nowDate}"/>"></script>
<script type="text/javascript" src="<c:url value="/js/map/layer.js?version=${nowDate}"/>"></script>
<script type="text/javascript" src="<c:url value="/js/map/wfsLayer.js?version=${nowDate}"/>"></script>
<script type="text/javascript" src="<c:url value="/js/map/interaction.js?version=${nowDate}"/>"></script>
<script type="text/javascript" src="<c:url value="/js/map/measure.js?version=${nowDate}"/>"></script>
<script type="text/javascript" src="<c:url value="/js/map/mapEvent.js?version=${nowDate}"/>"></script>
<script type="text/javascript" src="<c:url value="/js/map/layer_style.js?version=${nowDate}"/>"></script>

<!-- RGB색상표 -->
<script type="text/javascript" src="<c:url value="/js/libs/colorpicker/js/colorpicker.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/libs/colorpicker/js/eye.js"/>"></script>
<script type="text/javascript" src="<c:url value="/js/libs/colorpicker/js/utils.js"/>"></script>

<script type="text/javascript" src="<c:url value="/js/script.js?version=${nowDate}"/>"></script>

<!-- TTEST -->
<!-- OpenSeaMap Harbour -->
<script type="text/javascript" src="<c:url value="/js/map/openseamap/layer_osm.js?version=${nowDate}"/>"></script>
<script type="text/javascript" src="<c:url value="/js/map/openseamap/harbours.js?version=${nowDate}"/>"></script>
<script type="text/javascript" src="<c:url value="/js/map/openseamap/map_utils.js?version=${nowDate}"/>"></script>
<script type="text/javascript" src="<c:url value="/js/map/openseamap/tidal_scale.js?version=${nowDate}"/>"></script>
<script type="text/javascript" src="<c:url value="/js/map/openseamap/utilities.js?version=${nowDate}"/>"></script>

<script>
let map;
window.onload = function(){
	mapInit();
	// bundle.js가 먼저 로드되어 map 오류 발생 해결
    const bundleScript = document.createElement('script');
    bundleScript.src = 'js/map/canvasLayer/bundle.js';
    document.head.appendChild(bundleScript);
}
</script>
</head>
<body>
<!-- 애니메이션 프로그래스 바 -->
<div id="animationContainer" style="display: none">
  <div class="progressBar">
    <div class="progress" id="progress"><span id="currentPositionLabel" class="progressLabel"></span></div>
  </div>
</div>

<div id="wrapper">
		<div id="container">
			<div class="con_left">
				<div class="logo"></div>
				<div class="nav">
					<div class="map_tool">
						<ul>
							<li class="tool1" id="mapDefalt"><img alt="" src="images/sk/maptool/btn1.jpg"></li>
							<li class="tool2" id="mapZoomIn"><img alt="" src="images/sk/maptool/btn2.jpg"></li>
							<li class="tool3" id="mapZoomOut"><img alt="" src="images/sk/maptool/btn3.jpg"></li>
							<li class="tool4" id="mapMove"><img alt="" src="images/sk/maptool/btn4.jpg"></li>
							<li class="tool5" id="mapSearch1"><img alt="" src="images/sk/maptool/btn5.jpg"></li> -
							<!-- <li class="toolweather" id="mapWeather"><img alt="" src="images/sk/maptool/btn_weather.png"></li>-->
							<li class="tool6" id="mapSearch2"><img alt="" src="images/sk/maptool/btn6.jpg"></li>
							<li class="tool7" id="mapSearch3"><img alt="" src="images/sk/maptool/btn7.jpg"></li>
							<!-- <li class="tool6" id="mapSearch2">항로계획</li> -->
						</ul>
					</div>
					<div class="option">
						<ul>
							<li class="opt_tool1"><img alt="" src="images/sk/maptool/opt1.jpg"></li>
							<li class="opt_tool2" id="mapSetting"><img alt="" src="images/sk/maptool/opt2.jpg"></li>
							<li class="opt_tool3" id="mapPrint"><img alt="" src="images/sk/maptool/opt3.jpg"></li>
							<li class="opt_tool4"><img alt="" src="images/sk/maptool/opt4.jpg"></li>
						</ul>
					</div>
				</div>
				<!-- <div class="slide1" id="slide1"><img alt="" src="images/sk/slide.jpg"></div> -->
			</div>
			<div class="div_left">
				<div id="div_left_route" style="display: none;">
					<table style="margin: 10px 10px 0;">
						<colgroup><col width="60%"><col width="40%"></colgroup>
						<tr>
							<th style="padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;">계획명</th>
							<th style="padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;">편집일자</th>
						</tr>
					</table>
					<div id="route_resultlist"></div>
					<button onclick="route_reset();">추가</button>
					<!-- <button>수정</button>
					<button>삭제</button> -->
					<div style="margin: 10px; height: 25px;">
						기본 이탈허용거리
						<select name="select1">
							<option value="0.5">0.5NM</option>
						</select>
					</div>
				</div>
				<div id="div_left_ship" style="display: none;">
					<table style="margin: 10px 10px 0;">
						<colgroup><col width="50%"><col width="50%"></colgroup>
						<tr>
							<th style="padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;">선명</th>
							<th style="padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;">IMO 번호</th>
						</tr>
					</table>
					<div id="ship_resultlist"></div>
					<button id="ship_search">항적 조회</button>
					<button id="ship_clean">초기화</button>					
					<input type="hidden" id="select_ship">
				</div>
				<div id="div_left_mapSetting" style="display: none">
					<form id="radioSetting">
						<table style="width: 100%">
							<tr height="50px">
								<td></td>
							<tr>
								<td>보기 설정</td>
							</tr>
							<tr height="10px">
								<td></td>
							<tr>
							<tr height="1px">
								<td style="background-color: black"></td>
							<tr>
							<tr height="10px">
								<td></td>
							<tr>
							<tr>
								<td>Base <input type="radio" id="mapBase" name="mapSetting" value="1"></td>
							</tr>
							<tr height="5px">
								<td></td>
							<tr>
							<tr>
								<td>Standard <input type="radio" id="mapStandard" name="mapSetting" value="2"></td>
							</tr>
							<tr height="5px">
								<td></td>
							<tr>
							<tr>
								<td>Detail <input type="radio" id="mapDetail" name="mapSetting" value="3"></td>
							</tr>
						</table>
					</form>
					<script>
					</script>
				</div>
			</div>
			<div class="con_center">
				<div class="menuBar">
					<table>
						<tr>
							<td width="20px"></td>
							<td style="color: white;">
								&nbsp;<input type="checkbox" id="checkWind"> 풍향/풍속&nbsp;
								&nbsp;<input type="checkbox" id="checkFlow"> 유향/유속&nbsp;
								&nbsp;<input type="checkbox" id="checkWaveheight"> 파향/파고&nbsp;
								&nbsp;<input type="checkbox" id="checkTempair"> 기온&nbsp;
								&nbsp;<input type="checkbox" id="checkTempwater"> 수온&nbsp;
							</td>
							<td width="10px"></td>
							<td>
								<select id="daySelect">
									<option value=2>2일</option>
									<option value=3>3일</option>
									<option value=4>4일</option>
									<option value=5>5일</option>
									<option value=6>6일</option>
									<option value=7 selected>7일</option>
								</select>
							</td>
							<td width="10px"></td>
							<td>
								<table>
									<tr height="2px"><td></td></tr>
									<tr>
										<td>
											<button id="stopAnimation" style="width: 35px; height: 25px;">정지</button> <button id="startAnimation" style="width: 35px; height: 25px;">시작</button>
										</td>
									</tr>
								</table>
							</td>
							<td width="30px"></td>
							<td>
								<select id="brightSelect">
									<option value=1 selected>주간</option>
									<option value=2>야간</option>
									<option value=3>새벽/일몰</option>
								</select>
							</td>
						</tr>
					</table>
				</div>
				<div class="map" id="dvMap" style="width:100%; height:100%;"></div>
			</div>
			<div id="div_route_detail">
				<div style="margin: 5px;">
					<table style="width: 480px;">
						<colgroup><col width="20%"><col width="20%"><col width="20%"><col width="20%"><col width="10%"><col width="10%"></colgroup>
						<tr>
							<th style="text-align: right;">항로계획명 : </th>
							<th colspan="5"><input type="hidden" id="hd_routeid"><input type="text" id="txt_routename" style="width: 95%; margin: 0 7px;"></th>
						</tr>
						<tr>
							<th style="text-align: right;">편집자 : </th><th><input type="text" id="txt_makename" style="width: 95%; margin: 0 7px;"></th>
							<th style="text-align: right;">편집일자 : </th><th><span id="txt_modifydate"></span></th>
							<th style="text-align: right;"><button id="route_detail_save">저장</button></th><th style="text-align: right;"><button id="route_detail_close" >닫기</button></th>
						</tr>
					</table>
				</div>
				<div style="width: 480px;margin: 10px 10px 0;border: 1px solid;">
					<table style="width: 100%"  border="1" cellspacing="0">
						<colgroup><col width="15%"><col width="25%"><col width="30%"><col width="30%"></colgroup>
						<tr>
							<th style="padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;">순번</th>
							<th style="padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;">이탈허용거리(NM)</th>
							<th style="padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;">위도</th>
							<th style="padding: 5px; border-bottom: 1px solid #d4d4d4; font-size: 13px; text-align: center;">경도</th>
						</tr>
					</table>
				</div>
				<div id="route_detail_list" style="width: 480px;"></div>
				<input type="hidden" id="select_detail">
				<div style="float:right;width: 100%;margin: 0 10px 6px;">
					<button id="wp_delete" style="float:right;">WP 삭제</button>
					<button id="wp_update" style="float:right;margin-right:10px;">WP 수정</button>
					<button id="wp_add" style="float:right;margin-right:10px;">WP 추가</button>
				</div>
				<!-- <button id="route_detail_add">추가</button> -->
				<button id="route_detail_delete">삭제</button>
			</div>
			
			<div id="div_ship_detail">
				<table border='1' cellspacing='0'>
					<colgroup><col width="20%"><col width="30%"><col width="20%"><col width="30%"></colgroup>
					<tr>
						<th>MMSI</th>
						<td><span id="txt_mmsi"></span></td>
						<th>선박명</th>
						<td><span id="txt_shipname"></span></td>
					</tr>
					<tr>
						<th>위/경도</th>
						<td><span id="txt_latlot"></span></td>
						<th>수신시간</th>
						<td><span id="txt_gathertime"></span></td>
					</tr>
					<tr>
						<th>대지속력</th>
						<td><span id="txt_sog"></span></td>
						<th>대지방향</th>
						<td><span id="txt_cog"></span></td>
					</tr>
					<tr>
						<th>선수방위</th>
						<td><span id="txt_theading"></span></td>
						<th>회전각</th>
						<td><span id="txt_rateturn"></span></td>
					</tr>
					<tr>
						<th>선박크기</th>
						<td><span id="txt_shipton"></span></td>
						<th>항행상태</th>
						<td><span id="txt_navistatus"></span></td>
					</tr>
					<tr>
						<th>선박형태</th>
						<td><span id="txt_shiptype"></span></td>
						<th>도착정보</th>
						<td><span id="txt_ackname"></span></td>
					</tr>
				</table>
				<button id="close_ship_detail">닫기</button>
			</div>
			
			<div id="div_detail">
				<div id="detail_table" style="height: 295px;overflow: auto;"></div>
				<button id="close_detail">닫기</button>
			</div>		
			<div class="scale"> <span id="mouseLocationStat" style="width:210px;float:left;"></span>  <span id="mapZoomLevelStat" style="width:200px;float:left;">SCALE=>1:10.000[LEVEL:27]</span></div>
			<div id="popup" class="ol-popup">
				<a href="#" onclick="popupClose()" id="popup-closer" class="ol-popup-closer"></a>
				<div id="popup-content"></div>
			</div>
			<script>
				function popupClose() {
					//popup.style.display = 'none'; // 팝업 숨김
					$("#popup").hide();
				}
				
				isPopupOpen = false;
			</script>
		</div>
	</div>

</body>
</html>
