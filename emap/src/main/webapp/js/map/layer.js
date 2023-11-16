var geoserverWmsUrl = "http://141.164.59.52:8089/geoserver/wms";
var geoserverGwcUrl = "http://141.164.59.52:8089/geoserver/gwc/service/wmts";
function wmsInit(){

	// 세계 바다
	/*var ocean = new ol.layer.Tile({
		id : 'ocean',
    	title: 'ocean',
    	opacity: 1,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:ocean',
                'CRS' : 'EPSG:3857',
            },
        })
    });
    map.addLayer(ocean);

	// 세계 나라
	var worldcountries = new ol.layer.Tile({
		id : 'worldcountries',
    	title: 'worldcountries',
    	opacity: 0.5,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',
            params: {
            	'VERSION': '1.1.0',
                'LAYERS': 'skemap:worldcountries',
                'CRS' : 'EPSG:3857',
                //'STYLES': 'worldcountries_noborder', // 테두리 없애기
            },            
        })
    });
    map.addLayer(worldcountries);*/

    //wms Day 주간(기본맵처럼사용)
	var DAY1 = new ol.layer.Tile({
		id : 'Day1',
    	title: 'Day1',
    	opacity: 1,
        source: new ol.source.WMTS({
            url: geoserverGwcUrl,
            layer: 'Day1',
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
    map.addLayer(DAY1);

    //wms Day 야간(기본맵처럼사용)
	var DAY2 = new ol.layer.Tile({
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
	var DAY3 = new ol.layer.Tile({
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
    });

	// 밝기 선택시 동작
	var brightSelect = document.getElementById("brightSelect");

	brightSelect.addEventListener("change", function() {
		var brightRange = brightSelect.value;

		if (brightRange == 1) {
			if (DAY2)
    			map.removeLayer(DAY2);
			else if (DAY3)
				map.removeLayer(DAY3);
    		map.addLayer(DAY1);
			DAY1.setZIndex(-1);
			/*make_sld("ocean", "Polygon1", "d3e9ed", null);
			make_sld("DEPAREA", "Polygon2", "73b5ee", "d3e9ed");
			make_sld("worldcountries", "Polygon1", "c5b578", null);
			make_sld("LNDAREA_A", "Polygon1", "c5b578", null);
			make_sld("rivers", "Polygon1", "0089ff", null);*/
		} else if (brightRange == 2) {
			if (DAY1)
    			map.removeLayer(DAY1);
			else if (DAY3)
				map.removeLayer(DAY3);
			map.addLayer(DAY2);
			DAY2.setZIndex(-1);
			/*make_sld("ocean", "Polygon1", "070707", null);
			make_sld("DEPAREA", "Polygon2", "16232f", "070707");
			make_sld("worldcountries", "Polygon1", "2c291b", null);
			make_sld("LNDAREA_A", "Polygon1", "2c291b", null);
			make_sld("rivers", "Polygon1", "292e2e", null);*/
		} else {
			if (DAY1)
    			map.removeLayer(DAY1);
			else if (DAY2)
				map.removeLayer(DAY2);
    		map.addLayer(DAY3);
			DAY3.setZIndex(-1);
			/*make_sld("ocean", "Polygon1", "070707", null);
			make_sld("DEPAREA", "Polygon2", "030413", "070707");
			make_sld("worldcountries", "Polygon1", "0d0a08", null);
			make_sld("LNDAREA_A", "Polygon1", "0d0a08", null);
			make_sld("rivers", "Polygon1", "292e2e", null);*/
		}
	});

	//wms 바다(기본맵처럼사용) : 한국
	/*var DEPAREA = new ol.layer.Tile({
		id : 'DEPAREA',
    	title: 'DEPAREA',
    	opacity: 1,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:DEPAREA',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
    map.addLayer(DEPAREA);
    
    //wms 바다(lev6_DEPARE_A)
	var lev6_DEPARE_A = new ol.layer.Tile({
		id : 'lev6_DEPARE_A',
    	title: 'lev6_DEPARE_A',
    	opacity: 1,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_DEPARE_A',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
    map.addLayer(lev6_DEPARE_A);
    
    //wms 대지(기본맵처럼사용) : 한국
    var LNDAREA_A = new ol.layer.Tile({
		id : 'LNDAREA_A',
    	title: 'LNDAREA_A',
    	opacity: 1,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:LNDAREA_A',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
    map.addLayer(LNDAREA_A);
    
    //wms lev6_LNDARE_A(기본맵처럼사용)
    var lev6_LNDARE_A = new ol.layer.Tile({
		id : 'lev6_LNDARE_A',
    	title: 'lev6_LNDARE_A',
    	opacity: 1,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_LNDARE_A',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
    map.addLayer(lev6_LNDARE_A);*/
    
    //wms 강(기본맵처럼사용)
    /*var rivers = new ol.layer.Tile({
		id : 'rivers',
    	title: 'rivers',
    	opacity: 1,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:rivers',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
    map.addLayer(rivers);*/
    
    //wms 	lev6_DEPCNT_L(기본맵처럼사용)
    var lev6_DEPCNT_L = new ol.layer.Tile({
		id : 'lev6_DEPCNT_L',
    	title: 'lev6_DEPCNT_L',
    	opacity: 0,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_DEPCNT_L',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
	map.addLayer(lev6_DEPCNT_L);       
    
    //wms 수심텍스트(기본맵처럼사용)
    var lev6_SOUNDG_P = new ol.layer.Tile({
		id : 'lev6_SOUNDG_P',
    	title: 'lev6_SOUNDG_P',
    	opacity: 0,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_SOUNDG_P',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
	map.addLayer(lev6_SOUNDG_P);   
    
    //wms lev6_OBSTRN_A(기본맵처럼사용)
    var lev6_OBSTRN_A = new ol.layer.Tile({
		id : 'lev6_OBSTRN_A',
    	title: 'lev6_OBSTRN_A',
    	opacity: 0,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_OBSTRN_A',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
	map.addLayer(lev6_OBSTRN_A);      
    
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
	map.addLayer(lev6_OILBAR_L);   
    
    //wms lev6_ACHBRT_A(기본맵처럼사용)
    var lev6_ACHBRT_A = new ol.layer.Tile({
		id : 'lev6_ACHBRT_A',
    	title: 'lev6_ACHBRT_A',
    	opacity: 0,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_ACHBRT_A',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
	map.addLayer(lev6_ACHBRT_A);  
    
    //wms lev6_BRIDGE_A(기본맵처럼사용)
    var lev6_BRIDGE_A = new ol.layer.Tile({
		id : 'lev6_BRIDGE_A',
    	title: 'lev6_BRIDGE_A',
    	opacity: 0,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_BRIDGE_A',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
	map.addLayer(lev6_BRIDGE_A);       
    
    //wms lev6_BUISGL_A(기본맵처럼사용)
    var lev6_BUISGL_A = new ol.layer.Tile({
		id : 'lev6_BUISGL_A',
    	title: 'lev6_BUISGL_A',
    	opacity: 0,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_BUISGL_A',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
	map.addLayer(lev6_BUISGL_A);   
    
    //wms lev6_SEAARE_A(기본맵처럼사용)
    var lev6_SEAARE_A = new ol.layer.Tile({
		id : 'lev6_SEAARE_A',
    	title: 'lev6_SEAARE_A',
    	opacity: 0,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_SEAARE_A',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
	map.addLayer(lev6_SEAARE_A);  
    
    //wms lev6_SLCONS_L(기본맵처럼사용)
    var lev6_SLCONS_L = new ol.layer.Tile({
		id : 'lev6_SLCONS_L',
    	title: 'lev6_SLCONS_L',
    	opacity: 0,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_SLCONS_L',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
	map.addLayer(lev6_SLCONS_L);

	/*var seaarea = new ol.layer.Tile({
		id : 'seaarea',
    	title: 'seaarea',
    	opacity: 1,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:seaarea',
                'CRS' : 'EPSG:3857',
            },            
        })
    });
    map.addLayer(seaarea);*/

    //wms 닷 anchor
    /*var anchor = new ol.layer.Tile({
		id : 'anchor',
    	title: 'anchor',
    	opacity: 1,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:anchor',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
    map.addLayer(anchor);*/

	/*var world = new ol.layer.Tile({
		id : 'world',
    	title: 'world',
    	opacity: 1,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:world',
                'CRS' : 'EPSG:3857',
            },            
        })
    });
    map.addLayer(world);*/

    //wms light01
    /*var light01 = new ol.layer.Tile({
		id : 'light01',
    	title: 'light01',
    	opacity: 1,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:light01',               
                'CRS' : 'EPSG:3857',
            },
        })
    });
    map.addLayer(light01);

    //wms light02
    var light02 = new ol.layer.Tile({
		id : 'light02',
    	title: 'light02',
    	opacity: 1,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:light02',               
                'CRS' : 'EPSG:3857',
            },
        })
    });
    map.addLayer(light02);*/
         
    lightIconlayer(); //등대,등표,부표 호출
}


//등대,등표,부표 보여주기
function lightIconlayer(){

	//부표222  :lev6_BUOY_P
   var lev6_BUOY_P = new ol.layer.Tile({
		id : 'lev6_BUOY_P',
    	title: 'lev6_BUOY_P',
    	opacity: 0,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_BUOY_P',                
                'CRS' : 'EPSG:3857',
            },            
        })
    });
	map.addLayer(lev6_BUOY_P); 
         
	//부표
   var lev6_FOGSIG_P = new ol.layer.Tile({
		id : 'lev6_FOGSIG_P',
    	title: 'lev6_FOGSIG_P',
    	opacity: 0,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_FOGSIG_P',
                //'SLD_BODY': text_SLD,
                //'format' : 'image/png', 
                //'transparent' : 'true',
                'CRS' : 'EPSG:3857',
            },            
        })
    });   
	map.addLayer(lev6_FOGSIG_P);    
    
    //등표
    var lev6_LIGHTS_P = new ol.layer.Tile({
		id : 'lev6_LIGHTS_P',
    	title: 'lev6_LIGHTS_P',
    	opacity: 0,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_LIGHTS_P',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });   
	map.addLayer(lev6_LIGHTS_P);    
    
     //등대
     var lev6_LNDMARK_P = new ol.layer.Tile({
		id : 'lev6_LNDMARK_P',
    	title: 'lev6_LNDMARK_P',
    	opacity: 1,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_LNDMARK_P',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });
    // 등대 레이어 제거
	//map.addLayer(lev6_LNDMARK_P);
    
    //lev6_WRECKS_P
     var lev6_WRECKS_P = new ol.layer.Tile({
		id : 'lev6_WRECKS_P',
    	title: 'lev6_WRECKS_P',
    	opacity: 0,
        source: new ol.source.TileWMS({
            url: geoserverWmsUrl,
            serverType: 'geoserver',
            crossOrigin: 'anonymous',            
            params: { 
            	'VERSION': '1.1.0' , 
                'LAYERS': 'skemap:lev6_WRECKS_P',               
                'CRS' : 'EPSG:3857',
            },            
        })
    });   
	map.addLayer(lev6_WRECKS_P);       
}  

//표지 레이어 on/off  (등대,등표,부표)
function ViewLayerChkMark(checked){	
	var layers = map.getLayers().getArray();
	
	var layerList = ["lev6_FOGSIG_P","lev6_LIGHTS_P","lev6_LNDMARK_P","lev6_BUOY_P"];
	let chkLevel = $('input[name=ShipView]:checked').val();
	
	if(!checked){
		if(chkLevel == "1"){  //기본    	
	    	for(let i in layers) {
		        const lyr = layers[i];
		        const thisLayerId = layers[i].get('id');	
				if(thisLayerId == "lev6_LNDMARK_P"){
					lyr.setOpacity(1);
				}		
			}
	    }else{  //표준,상세    	
	    	for(let i in layers) {
		        const lyr = layers[i];
		        const thisLayerId = layers[i].get('id');	
				
				for(var j=0;j<layerList.length;j++){
					if(layerList[j] === thisLayerId) {
						if(chkLevel == "3" && layerList[j]=="lev6_LIGHTS_P"){
						
						}else{
							lyr.setOpacity(1);
						}
						
					}
				}	
			}
	    }    
	}else{ //checked
		for(let i in layers) {
	        const lyr = layers[i];
	        const thisLayerId = layers[i].get('id');	
			
			for(var j=0;j<layerList.length;j++){
				if(layerList[j] === thisLayerId) {
					lyr.setOpacity(0);
				}
			}	
		}
	}
	
}


//OBSTRN 레이어 on/off
function ViewLayerChk(chkLevel){
	var layers = map.getLayers().getArray();
	
	var layerList = ["lev6_SOUNDG_P","lev6_OBSTRN_A","lev6_OILBAR_L","lev6_ACHBRT_A","lev6_BRIDGE_A","lev6_BUISGL_A","lev6_SEAARE_A"
	,"lev6_SLCONS_L","lev6_FOGSIG_P","lev6_LIGHTS_P","lev6_LNDMARK_P","lev6_WRECKS_P","lev6_BUOY_P","lev6_DEPCNT_L"];
	
	
	//레이어 off 후 필요한 레이어만 킴
	for(let i in layers) {
        const lyr = layers[i];
        const thisLayerId = layers[i].get('id');

		for(var j=0;j<layerList.length;j++){
			if(layerList[j] === thisLayerId) {
				lyr.setOpacity(0);
			}
		}
    }
    
    if(chkLevel == "1"){  //기본
    	var lList = ["lev6_LNDMARK_P"];
    	for(let i in layers) {
	        const lyr = layers[i];
	        const thisLayerId = layers[i].get('id');
	
			for(var j=0;j<lList.length;j++){
				if(lList[j] === thisLayerId) {
					var chk = $("#chkViewLayerMark").prop("checked");
					if(!chk){
						lyr.setOpacity(1);
					}				
				}
			}
		}
    }
    
    if(chkLevel == "2"){  //표준
    	var lList = ["lev6_ACHBRT_A","lev6_SLCONS_L","lev6_FOGSIG_P","lev6_LIGHTS_P","lev6_LNDMARK_P","lev6_BUOY_P","lev6_DEPCNT_L"];
    	for(let i in layers) {
	        const lyr = layers[i];
	        const thisLayerId = layers[i].get('id');
	
			for(var j=0;j<lList.length;j++){
				if(lList[j] === thisLayerId) {				
					if(lList[j] == "lev6_LNDMARK_P" || lList[j] == "lev6_FOGSIG_P" || lList[j] == "lev6_LIGHTS_P"|| lList[j] == "lev6_BUOY_P"){
						var chk = $("#chkViewLayerMark").prop("checked");
						if(!chk){
							lyr.setOpacity(1);
						}	
					}else{
						lyr.setOpacity(1);
					}			
				}
			}
		}
    }
    
    if(chkLevel == "3"){  //상세
    	var lList = ["lev6_SOUNDG_P","lev6_OBSTRN_A","lev6_OILBAR_L","lev6_ACHBRT_A","lev6_BRIDGE_A","lev6_BUISGL_A","lev6_SEAARE_A"
	,"lev6_SLCONS_L","lev6_FOGSIG_P","lev6_LNDMARK_P","lev6_WRECKS_P","lev6_BUOY_P"];
    	for(let i in layers) {
	        const lyr = layers[i];
	        const thisLayerId = layers[i].get('id');
	
			for(var j=0;j<lList.length;j++){
				if(lList[j] === thisLayerId) {				
					if(lList[j] == "lev6_LNDMARK_P" || lList[j] == "lev6_FOGSIG_P" || lList[j] == "lev6_LIGHTS_P"|| lList[j] == "lev6_BUOY_P"){
						var chk = $("#chkViewLayerMark").prop("checked");
						if(!chk){
							lyr.setOpacity(1);
						}	
					}else{
						lyr.setOpacity(1);
					}			
				}
			}
		}
    }    
}