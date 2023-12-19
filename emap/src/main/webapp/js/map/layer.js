var geoserverWmsUrl = "http://141.164.59.52:8089/geoserver/wms";
var geoserverGwcUrl = "http://141.164.59.52:8089/geoserver/gwc/service/wmts";
function wmsInit(){
	const createLayer = (layerType, layerNo) => {
		return new ol.layer.Tile({
			id: `${layerType}${layerNo}`, // ` 미사용시 치환되지 않음
			title: `${layerType}${layerNo}`,
			opacity: 1,
			source: new ol.source.WMTS({
				url: geoserverGwcUrl,
				layer: `${layerType}${layerNo}`,
				matrixSet: 'EPSG:4326',
            	format: 'image/png',
            	projection: new ol.proj.Projection({
            		code: 'EPSG:4326',
            		units: 'degrees',
            		axisOrientation: 'neu'
            	}),
				tileGrid: new ol.tilegrid.WMTS({
        			tileSize: [256, 256],
			        extent: [-180.0, -90.0, 180.0, 90.0],
			        origin: [-180.0, 90.0],
			        resolutions: [
			          0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125,
			          0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125,
			          0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4,
			          1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5,
			          2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6,
			          2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7,
			          3.3527612686157227E-7
			        ],
			        matrixIds: Array.from({ length: 22 }, (_, i) => `EPSG:4326:${i}`)
      			}),
      			wrapX: true
			})
		});
	};
	
	const addLayers = (layerType) => {
  		const layerNo = [1, 4, 7, 10, 12, 13, 14];

		layerNo.forEach(layerNo => {
			window[`${layerType}${layerNo}`] = createLayer(layerType, layerNo);
		});
	};
	addLayers('Day1_Base');
	addLayers('Day1_Standard');
	addLayers('Day1_Detail');
	addLayers('Day2_Base');
	addLayers('Day2_Standard');
	addLayers('Day2_Detail');
	addLayers('Day3_Base');
	addLayers('Day3_Standard');
	addLayers('Day3_Detail');

    //map.addLayer(Day1_Base7); // 기본값이라 추가

    //wms Day 야간(기본맵처럼사용)
	/*DAY2 = new ol.layer.Tile({
		id : 'Day2',
    	title: 'Day2',
    	opacity: 1,
        source: new ol.source.WMTS({
            url: geoserverGwcUrl,
            layer: 'Day2',
            matrixSet: 'EPSG:4326',
            format: 'image/png',
            projection: new ol.proj.Projection({
            	code: 'EPSG:4326',
            	units: 'degrees',
            	axisOrientation: 'neu'
            	}),
            tileGrid: new ol.tilegrid.WMTS({
              tileSize: [256,256],
              extent: [-180.0,-90.0,180.0,90.0],
              origin: [-180.0, 90.0],
              resolutions: [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7],
              matrixIds: ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21']
            }),
            wrapX: true
          })
    });

    //wms Day 새벽/일몰(기본맵처럼사용)
	DAY3 = new ol.layer.Tile({
		id : 'Day3',
    	title: 'Day3',
    	opacity: 1,
        source: new ol.source.WMTS({
            url: geoserverGwcUrl,
            layer: 'Day3',
            matrixSet: 'EPSG:4326',
            format: 'image/png',
            projection: new ol.proj.Projection({
            	code: 'EPSG:4326',
            	units: 'degrees',
            	axisOrientation: 'neu'
            	}),
            tileGrid: new ol.tilegrid.WMTS({
              tileSize: [256,256],
              extent: [-180.0,-90.0,180.0,90.0],
              origin: [-180.0, 90.0],
              resolutions: [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7],
              matrixIds: ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21']
            }),
            wrapX: true
          })
    });*/

   //wms lev6_OILBAR_L(기본맵처럼사용)
    var lev6_OILBAR_L = new ol.layer.Tile({
		id : 'lev6_OILBAR_L',
    	title: 'lev6_OILBAR_L',
    	opacity: 0,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_OILBAR_L',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
	map.addLayer(lev6_OILBAR_L); // 없으면 팝업 동작 X


	// layerMode에 따라 라디오 버튼 체크
	if (layerMode === 1) {
	    document.querySelector('input[name="mapSetting"][value="1"]').checked = true;
	} else if (layerMode === 2) {
	    document.querySelector('input[name="mapSetting"][value="2"]').checked = true;
	} else if (layerMode === 3) {
	    document.querySelector('input[name="mapSetting"][value="3"]').checked = true;
	}

    // 라디오 버튼 선택 시
	radioSetting.addEventListener("change", function(event) {
		const baseLayers = [Day1_Base1, Day1_Base4, Day1_Base7, Day1_Base10, Day1_Base12, Day1_Base13, Day1_Base14, Day2_Base1, Day2_Base4, Day2_Base7, Day2_Base10, Day2_Base12, Day2_Base13, Day2_Base14, Day3_Base1, Day3_Base4, Day3_Base7, Day3_Base10, Day3_Base12, Day3_Base13, Day3_Base14];
		const standardLayers = [Day1_Standard1, Day1_Standard4, Day1_Standard7, Day1_Standard10, Day1_Standard12, Day1_Standard13, Day1_Standard14, Day2_Standard1, Day2_Standard4, Day2_Standard7, Day2_Standard10, Day2_Standard12, Day2_Standard13, Day2_Standard14, Day3_Standard1, Day3_Standard4, Day3_Standard7, Day3_Standard10, Day3_Standard12, Day3_Standard13, Day3_Standard14];
		const detailLayers = [Day1_Detail1, Day1_Detail4, Day1_Detail7, Day1_Detail10, Day1_Detail12, Day1_Detail13, Day1_Detail14, Day2_Detail1, Day2_Detail4, Day2_Detail7, Day2_Detail10, Day2_Detail12, Day2_Detail13, Day2_Detail14, Day3_Detail1, Day3_Detail4, Day3_Detail7, Day3_Detail10, Day3_Detail12, Day3_Detail13, Day3_Detail14];
		
		var allLayers = map.getLayers().getArray(); // 모든 추가된 레이어 정보 확인
		const removeLayerIfPresent = (layer) => {
			if (allLayers.includes(layer)) {
				map.removeLayer(layer);
			}
		};
		
		// 레이어들 삭제
		baseLayers.forEach(removeLayerIfPresent);
		standardLayers.forEach(removeLayerIfPresent);
		detailLayers.forEach(removeLayerIfPresent);

        var selectedValue = event.target.value;
        if (selectedValue === '1') {
        	layerMode = 1;
        } else if (selectedValue === '2') {
        	layerMode = 2;
        } else if (selectedValue === '3') {
        	layerMode = 3;
        }
		
		// 레벨 값 얻어오기
		var lev = map.getView().getZoom();
		
		/*var layerNo = lev;
		if (lev <= 4)
			layerNo = 1;
		else if (lev < 7)
			layerNo = 4;
		else if (lev < 10)
			layerNo = 7;
		else if (lev < 12)
			layerNo = 10;

		var layerModeStr;
		if (layerMode == 1)
			layerModeStr = 'Base';
		else if (layerMode ==2)
			layerModeStr = 'Standard';
		else
			layerModeStr = 'Detail';

var layerName = "Day" + brightMode + "_" + layerModeStr + layerNo;
var layer = map.getLayer(layerName);
alert(layer);

		//map.addLayer(Day1_Standard7);
   		map.addLayer(layer);
		//`Day${brightMode}_${layerModeStr}${layerNo}`.setZIndex(-1);*/


		if (brightMode == 1) {
			if (layerMode == 1) {
				if (lev < 4) {
		    		map.addLayer(Day1_Base1);
					Day1_Base1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day1_Base4);
					Day1_Base4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day1_Base7);
					Day1_Base7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day1_Base10);
					Day1_Base10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day1_Base12);
					Day1_Base12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day1_Base13);
					Day1_Base13.setZIndex(-1);
				} else {
		    		map.addLayer(Day1_Base14);
					Day1_Base14.setZIndex(-1);
				}
			} else if (layerMode == 2) {
				if (lev < 4) {
		    		map.addLayer(Day1_Standard1);
					Day1_Standard1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day1_Standard4);
					Day1_Standard4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day1_Standard7);
					Day1_Standard7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day1_Standard10);
					Day1_Standard10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day1_Standard12);
					Day1_Standard12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day1_Standard13);
					Day1_Standard13.setZIndex(-1);
				} else {
		    		map.addLayer(Day1_Standard14);
					Day1_Standard14.setZIndex(-1);
				}
			} else { // 3
				if (lev < 4) {
		    		map.addLayer(Day1_Detail1);
					Day1_Detail1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day1_Detail4);
					Day1_Detail4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day1_Detail7);
					Day1_Detail7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day1_Detail10);
					Day1_Detail10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day1_Detail12);
					Day1_Detail12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day1_Detail13);
					Day1_Detail13.setZIndex(-1);
				} else {
		    		map.addLayer(Day1_Detail14);
					Day1_Detail14.setZIndex(-1);
				}
			}
		} else if (brightMode == 2) {
			if (layerMode == 1) {
				if (lev < 4) {
		    		map.addLayer(Day2_Base1);
					Day2_Base1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day2_Base4);
					Day2_Base4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day2_Base7);
					Day2_Base7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day2_Base10);
					Day2_Base10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day2_Base12);
					Day2_Base12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day2_Base13);
					Day2_Base13.setZIndex(-1);
				} else {
		    		map.addLayer(Day2_Base14);
					Day2_Base14.setZIndex(-1);
				}
			} else if (layerMode == 2) {
				if (lev < 4) {
		    		map.addLayer(Day2_Standard1);
					Day2_Standard1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day2_Standard4);
					Day2_Standard4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day2_Standard7);
					Day2_Standard7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day2_Standard10);
					Day2_Standard10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day2_Standard12);
					Day2_Standard12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day2_Standard13);
					Day2_Standard13.setZIndex(-1);
				} else {
		    		map.addLayer(Day2_Standard14);
					Day2_Standard14.setZIndex(-1);
				}
			} else { // 3
				if (lev < 4) {
		    		map.addLayer(Day2_Detail1);
					Day2_Detail1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day2_Detail4);
					Day2_Detail4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day2_Detail7);
					Day2_Detail7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day2_Detail10);
					Day2_Detail10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day2_Detail12);
					Day2_Detail12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day2_Detail13);
					Day2_Detail13.setZIndex(-1);
				} else {
		    		map.addLayer(Day2_Detail14);
					Day2_Detail14.setZIndex(-1);
				}
			}
			/*if (allLayers.includes(DAY3))
				map.removeLayer(DAY3);
			map.addLayer(DAY2);
			DAY2.setZIndex(-1);*/
		} else {
			if (layerMode == 1) {
				if (lev < 4) {
		    		map.addLayer(Day3_Base1);
					Day3_Base1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day3_Base4);
					Day3_Base4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day3_Base7);
					Day3_Base7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day3_Base10);
					Day3_Base10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day3_Base12);
					Day3_Base12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day3_Base13);
					Day3_Base13.setZIndex(-1);
				} else {
		    		map.addLayer(Day3_Base14);
					Day3_Base14.setZIndex(-1);
				}
			} else if (layerMode == 2) {
				if (lev < 4) {
		    		map.addLayer(Day3_Standard1);
					Day3_Standard1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day3_Standard4);
					Day3_Standard4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day3_Standard7);
					Day3_Standard7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day3_Standard10);
					Day3_Standard10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day3_Standard12);
					Day3_Standard12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day3_Standard13);
					Day3_Standard13.setZIndex(-1);
				} else {
		    		map.addLayer(Day3_Standard14);
					Day3_Standard14.setZIndex(-1);
				}
			} else { // 3
				if (lev < 4) {
		    		map.addLayer(Day3_Detail1);
					Day3_Detail1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day3_Detail4);
					Day3_Detail4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day3_Detail7);
					Day3_Detail7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day3_Detail10);
					Day3_Detail10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day3_Detail12);
					Day3_Detail12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day3_Detail13);
					Day3_Detail13.setZIndex(-1);
				} else {
		    		map.addLayer(Day3_Detail14);
					Day3_Detail14.setZIndex(-1);
				}
			}
			/*if (allLayers.includes(DAY2))
				map.removeLayer(DAY2);
    		map.addLayer(DAY3);
			DAY3.setZIndex(-1);*/
		}
    });



	// 밝기 선택시 동작
	var brightSelect = document.getElementById("brightSelect");

	brightSelect.addEventListener("change", function() {
		const baseLayers = [Day1_Base1, Day1_Base4, Day1_Base7, Day1_Base10, Day1_Base12, Day1_Base13, Day1_Base14];
		const standardLayers = [Day1_Standard1, Day1_Standard4, Day1_Standard7, Day1_Standard10, Day1_Standard12, Day1_Standard13, Day1_Standard14];
		const detailLayers = [Day1_Detail1, Day1_Detail4, Day1_Detail7, Day1_Detail10, Day1_Detail12, Day1_Detail13, Day1_Detail14];
		
		var allLayers = map.getLayers().getArray(); // 모든 추가된 레이어 정보 확인
		const removeLayerIfPresent = (layer) => {
		  if (allLayers.includes(layer)) {
		    map.removeLayer(layer);
		  }
		};
		
		baseLayers.forEach(removeLayerIfPresent);
		standardLayers.forEach(removeLayerIfPresent);
		detailLayers.forEach(removeLayerIfPresent);


		var brightRange = brightSelect.value;
		brightMode = brightRange;
		
		// 레벨 값 얻어오기
		var lev = map.getView().getZoom();

		if (brightRange == 1) {
			//alert("layerModeAAAA : " + layerMode)
			/*if (allLayers.includes(DAY2))
				map.removeLayer(DAY2);
			else if (allLayers.includes(DAY3))
				map.removeLayer(DAY3);*/
			//else if (layerMode == 1) {
			/*if (allLayers.includes(Day1_Base1))
				map.removeLayer(Day1_Base1);
			else if (allLayers.includes(Day1_Base4))
				map.removeLayer(Day1_Base4);
			else if (allLayers.includes(Day1_Base7))
				map.removeLayer(Day1_Base7);
			else if (allLayers.includes(Day1_Base10))
				map.removeLayer(Day1_Base10);
			else if (allLayers.includes(Day1_Base12))
				map.removeLayer(Day1_Base12);
			else if (allLayers.includes(Day1_Base13))
				map.removeLayer(Day1_Base13);
			else if (allLayers.includes(Day1_Base14))
				map.removeLayer(Day1_Base14);
			//} else if (layerMode == 2) {
			if (allLayers.includes(Day1_Standard1))
				map.removeLayer(Day1_Standard1);
			else if (allLayers.includes(Day1_Standard4))
				map.removeLayer(Day1_Standard4);
			else if (allLayers.includes(Day1_Standard7))
				map.removeLayer(Day1_Standard7);
			else if (allLayers.includes(Day1_Standard10))
				map.removeLayer(Day1_Standard10);
			else if (allLayers.includes(Day1_Standard12))
				map.removeLayer(Day1_Standard12);
			else if (allLayers.includes(Day1_Standard13))
				map.removeLayer(Day1_Standard13);
			else if (allLayers.includes(Day1_Standard14))
				map.removeLayer(Day1_Standard14);
			//} else {
			if (allLayers.includes(Day1_Detail1))
				map.removeLayer(Day1_Detail1);
			else if (allLayers.includes(Day1_Detail4))
				map.removeLayer(Day1_Detail4);
			else if (allLayers.includes(Day1_Detail7))
				map.removeLayer(Day1_Detail7);
			else if (allLayers.includes(Day1_Detail10))
				map.removeLayer(Day1_Detail10);
			else if (allLayers.includes(Day1_Detail12))
				map.removeLayer(Day1_Detail12);
			else if (allLayers.includes(Day1_Detail13))
				map.removeLayer(Day1_Detail13);
			else if (allLayers.includes(Day1_Detail14))
				map.removeLayer(Day1_Detail14);
			//}*/

			if (layerMode == 1) {
				if (lev < 4) {
		    		map.addLayer(Day1_Base1);
					Day1_Base1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day1_Base4);
					Day1_Base4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day1_Base7);
					Day1_Base7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day1_Base10);
					Day1_Base10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day1_Base12);
					Day1_Base12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day1_Base13);
					Day1_Base13.setZIndex(-1);
				} else {
		    		map.addLayer(Day1_Base14);
					Day1_Base14.setZIndex(-1);
				}
			} else if (layerMode == 2) {
				if (lev < 4) {
		    		map.addLayer(Day1_Standard1);
					Day1_Standard1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day1_Standard4);
					Day1_Standard4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day1_Standard7);
					Day1_Standard7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day1_Standard10);
					Day1_Standard10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day1_Standard12);
					Day1_Standard12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day1_Standard13);
					Day1_Standard13.setZIndex(-1);
				} else {
		    		map.addLayer(Day1_Standard14);
					Day1_Standard14.setZIndex(-1);
				}
			} else { // 3
				if (lev < 4) {
		    		map.addLayer(Day1_Detail1);
					Day1_Detail1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day1_Detail4);
					Day1_Detail4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day1_Detail7);
					Day1_Detail7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day1_Detail10);
					Day1_Detail10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day1_Detail12);
					Day1_Detail12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day1_Detail13);
					Day1_Detail13.setZIndex(-1);
				} else {
		    		map.addLayer(Day1_Detail14);
					Day1_Detail14.setZIndex(-1);
				}
			}
		} else if (brightRange == 2) {
			if (layerMode == 1) {
				if (lev < 4) {
		    		map.addLayer(Day2_Base1);
					Day2_Base1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day2_Base4);
					Day2_Base4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day2_Base7);
					Day2_Base7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day2_Base10);
					Day2_Base10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day2_Base12);
					Day2_Base12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day2_Base13);
					Day2_Base13.setZIndex(-1);
				} else {
		    		map.addLayer(Day2_Base14);
					Day2_Base14.setZIndex(-1);
				}
			} else if (layerMode == 2) {
				if (lev < 4) {
		    		map.addLayer(Day2_Standard1);
					Day2_Standard1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day2_Standard4);
					Day2_Standard4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day2_Standard7);
					Day2_Standard7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day2_Standard10);
					Day2_Standard10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day2_Standard12);
					Day2_Standard12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day2_Standard13);
					Day2_Standard13.setZIndex(-1);
				} else {
		    		map.addLayer(Day2_Standard14);
					Day2_Standard14.setZIndex(-1);
				}
			} else { // 3
				if (lev < 4) {
		    		map.addLayer(Day2_Detail1);
					Day2_Detail1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day2_Detail4);
					Day2_Detail4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day2_Detail7);
					Day2_Detail7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day2_Detail10);
					Day2_Detail10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day2_Detail12);
					Day2_Detail12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day2_Detail13);
					Day2_Detail13.setZIndex(-1);
				} else {
		    		map.addLayer(Day2_Detail14);
					Day2_Detail14.setZIndex(-1);
				}
			}
			/*if (allLayers.includes(DAY3))
				map.removeLayer(DAY3);*/
			/*else if (layerMode == 1) {
				if (allLayers.includes(Day1_Base1))
					map.removeLayer(Day1_Base1);
				else if (allLayers.includes(Day1_Base4))
					map.removeLayer(Day1_Base4);
				else if (allLayers.includes(Day1_Base7))
					map.removeLayer(Day1_Base7);
				else if (allLayers.includes(Day1_Base10))
					map.removeLayer(Day1_Base10);
				else if (allLayers.includes(Day1_Base12))
					map.removeLayer(Day1_Base12);
				else if (allLayers.includes(Day1_Base13))
					map.removeLayer(Day1_Base13);
				else if (allLayers.includes(Day1_Base14))
					map.removeLayer(Day1_Base14);
			} else if (layerMode == 2) {
				if (allLayers.includes(Day1_Standard1))
					map.removeLayer(Day1_Standard1);
				else if (allLayers.includes(Day1_Standard4))
					map.removeLayer(Day1_Standard4);
				else if (allLayers.includes(Day1_Standard7))
					map.removeLayer(Day1_Standard7);
				else if (allLayers.includes(Day1_Standard10))
					map.removeLayer(Day1_Standard10);
				else if (allLayers.includes(Day1_Standard12))
					map.removeLayer(Day1_Standard12);
				else if (allLayers.includes(Day1_Standard13))
					map.removeLayer(Day1_Standard13);
				else if (allLayers.includes(Day1_Standard14))
					map.removeLayer(Day1_Standard14);
			} else {
				if (allLayers.includes(Day1_Detail1))
					map.removeLayer(Day1_Detail1);
				else if (allLayers.includes(Day1_Detail4))
					map.removeLayer(Day1_Detail4);
				else if (allLayers.includes(Day1_Detail7))
					map.removeLayer(Day1_Detail7);
				else if (allLayers.includes(Day1_Detail10))
					map.removeLayer(Day1_Detail10);
				else if (allLayers.includes(Day1_Detail12))
					map.removeLayer(Day1_Detail12);
				else if (allLayers.includes(Day1_Detail13))
					map.removeLayer(Day1_Detail13);
				else if (allLayers.includes(Day1_Detail14))
					map.removeLayer(Day1_Detail14);
			}*/
			/*map.addLayer(DAY2);
			DAY2.setZIndex(-1);*/
		} else {
			if (layerMode == 1) {
				if (lev < 4) {
		    		map.addLayer(Day3_Base1);
					Day3_Base1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day3_Base4);
					Day3_Base4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day3_Base7);
					Day3_Base7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day3_Base10);
					Day3_Base10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day3_Base12);
					Day3_Base12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day3_Base13);
					Day3_Base13.setZIndex(-1);
				} else {
		    		map.addLayer(Day3_Base14);
					Day3_Base14.setZIndex(-1);
				}
			} else if (layerMode == 2) {
				if (lev < 4) {
		    		map.addLayer(Day3_Standard1);
					Day3_Standard1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day3_Standard4);
					Day3_Standard4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day3_Standard7);
					Day3_Standard7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day3_Standard10);
					Day3_Standard10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day3_Standard12);
					Day3_Standard12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day3_Standard13);
					Day3_Standard13.setZIndex(-1);
				} else {
		    		map.addLayer(Day3_Standard14);
					Day3_Standard14.setZIndex(-1);
				}
			} else { // 3
				if (lev < 4) {
		    		map.addLayer(Day3_Detail1);
					Day3_Detail1.setZIndex(-1);
				} else if (lev < 7) {
		    		map.addLayer(Day3_Detail4);
					Day3_Detail4.setZIndex(-1);
				} else if (lev < 10) {
		    		map.addLayer(Day3_Detail7);
					Day3_Detail7.setZIndex(-1);
				} else if (lev < 12) {
		    		map.addLayer(Day3_Detail10);
					Day3_Detail10.setZIndex(-1);
				} else if (lev == 12) {
		    		map.addLayer(Day3_Detail12);
					Day3_Detail12.setZIndex(-1);
				} else if (lev == 13) {
		    		map.addLayer(Day3_Detail13);
					Day3_Detail13.setZIndex(-1);
				} else {
		    		map.addLayer(Day3_Detail14);
					Day3_Detail14.setZIndex(-1);
				}
			}
			/*if (allLayers.includes(DAY2))
				map.removeLayer(DAY2);*/
			/*else if (layerMode == 1) {
				if (allLayers.includes(Day1_Base1))
					map.removeLayer(Day1_Base1);
				else if (allLayers.includes(Day1_Base4))
					map.removeLayer(Day1_Base4);
				else if (allLayers.includes(Day1_Base7))
					map.removeLayer(Day1_Base7);
				else if (allLayers.includes(Day1_Base10))
					map.removeLayer(Day1_Base10);
				else if (allLayers.includes(Day1_Base12))
					map.removeLayer(Day1_Base12);
				else if (allLayers.includes(Day1_Base13))
					map.removeLayer(Day1_Base13);
				else if (allLayers.includes(Day1_Base14))
					map.removeLayer(Day1_Base14);
			} else if (layerMode == 2) {
				if (allLayers.includes(Day1_Standard1))
					map.removeLayer(Day1_Standard1);
				else if (allLayers.includes(Day1_Standard4))
					map.removeLayer(Day1_Standard4);
				else if (allLayers.includes(Day1_Standard7))
					map.removeLayer(Day1_Standard7);
				else if (allLayers.includes(Day1_Standard10))
					map.removeLayer(Day1_Standard10);
				else if (allLayers.includes(Day1_Standard12))
					map.removeLayer(Day1_Standard12);
				else if (allLayers.includes(Day1_Standard13))
					map.removeLayer(Day1_Standard13);
				else if (allLayers.includes(Day1_Standard14))
					map.removeLayer(Day1_Standard14);
			} else {
				if (allLayers.includes(Day1_Detail1))
					map.removeLayer(Day1_Detail1);
				else if (allLayers.includes(Day1_Detail4))
					map.removeLayer(Day1_Detail4);
				else if (allLayers.includes(Day1_Detail7))
					map.removeLayer(Day1_Detail7);
				else if (allLayers.includes(Day1_Detail10))
					map.removeLayer(Day1_Detail10);
				else if (allLayers.includes(Day1_Detail12))
					map.removeLayer(Day1_Detail12);
				else if (allLayers.includes(Day1_Detail13))
					map.removeLayer(Day1_Detail13);
				else if (allLayers.includes(Day1_Detail14))
					map.removeLayer(Day1_Detail14);
			}*/
    		/*map.addLayer(DAY3);
			DAY3.setZIndex(-1);*/
		}
	});
}