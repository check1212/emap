var geoserverWmsUrl = "http://141.164.59.52:8089/geoserver/wms";
var geoserverGwcUrl = "http://141.164.59.52:8089/geoserver/gwc/service/wmts";
function wmsInit(){

//TTEST
	var OsmTileServer = "BRAVO"
	// Add Layers to map-------------------------------------------------------------------------------------------------------
	
	// Mapnik (Base map)
	// old definition
	// layer_mapnik = new OpenLayers.Layer.XYZ('Mapnik',
	//                                         GetOsmServer(),
	//                                         { layerId      : 1,
	//                                           wrapDateLine : true
	//                                         });
	const osmUrl = 
	    OsmTileServer === "BRAVO" ?
	        'https://t2.openseamap.org/tile/{z}/{x}/{y}.png' :
	        'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
	var layer_mapnik = new ol.layer.Tile({
	    source: new ol.source.OSM({
	        url: osmUrl,
	        crossOrigin: null,
	    }),
	    properties: {
	        name: 'Mapnik',
	        layerId: 1,
	        wrapDateLine:true
	    }
	});
	map.addLayer(layer_mapnik);

                

	// Seamark
	// old definition
	// layer_seamark = new OpenLayers.Layer.TMS("seamarks",
	// "https://tiles.openseamap.org/seamark/",
	//     { layerId: 3, numZoomLevels: 19, type: 'png', getURL:getTileURL, isBaseLayer:false, displayOutsideMaxExtent:true});
	/*var layer_seamark = new ol.layer.Tile({
	    visible: true,
	    maxZom: 19,
	    source: new ol.source.XYZ({
	        // url: "https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png"
	        tileUrlFunction: function(coordinate) {
	            return getTileUrlFunction("https://tiles.openseamap.org/seamark/", 'png', coordinate);
	            // return "https://tiles.openseamap.org/seamark/" + coordinate[0] + '/' +
	            //     coordinate[1] + '/' + (-coordinate[2] - 1) + '.png';
	        }
	    }),
	    properties: {
	        name: "seamarks",
	        layerId: 3,
	        cookieKey: "SeamarkLayerVisible",
	        checkboxId: "checkLayerSeamark",
	    }
	});
	map.addLayer(layer_seamark);

	// Sport
	// old definition
	// layer_sport = new OpenLayers.Layer.TMS("Sport", "https://tiles.openseamap.org/sport/",
	//     { layerId: 4, numZoomLevels: 19, type: 'png', getURL:getTileURL, isBaseLayer:false, visibility: false, displayOutsideMaxExtent:true});
	layer_sport = new ol.layer.Tile({
	    visible: false,
	    maxZom: 19,
	    properties: {
	        name: 'Sport',
	        layerId: 4,
	        checkboxId: "checkLayerSport",
	        cookieKey: "SportLayerVisible",
	    },
	    source: new ol.source.XYZ({
	        url: "https://tiles.openseamap.org/sport/{z}/{x}/{y}.png",
	        tileUrlFunction: function(coordinate) {
	            return getTileUrlFunction("https://tiles.openseamap.org/sport/", 'png', coordinate);
	            // return "https://tiles.openseamap.org/seamark/" + coordinate[0] + '/' +
	            //     coordinate[1] + '/' + (-coordinate[2] - 1) + '.png';
	        }
	        
	    }),
	});
	layer_sport.on("change:visible", (evt) => {
	    updateCheckboxAndCookie(evt.target);
	});*/

	//GebcoDepth
	// old definition
	// layer_gebco_deeps_gwc = new OpenLayers.Layer.WMS("gebco_2021", "https://geoserver.openseamap.org/geoserver/gwc/service/wms",
	//     {layers: "gebco2021:gebco_2021", format:"image/png"},
	//     { layerId: 6, isBaseLayer: false, visibility: false, opacity: 0.8});
	var layer_gebco_deeps_gwc = new ol.layer.Tile({
	    visible: false,
	    opacity: 0.8,
	    properties: {
	        name:"gebco_2021",
	        layerId: 6,
	        isBaseLayer: false,
	        checkboxId: "checkLayerGebcoDepth",
	        cookieKey: "GebcoDepthLayerVisible",
	    },
	    source: new ol.source.TileWMS({
	        url: 'https://geoserver.openseamap.org/geoserver/gwc/service/wms',
	        params: {'LAYERS': 'gebco2021:gebco_2021', 'VERSION':'1.1.1'},
	        ratio: 1,
	        serverType: 'geoserver',
	        hidpi: false,
	    }),
	});
	map.addLayer(layer_gebco_deeps_gwc);


	// POI-Layer for harbours
	// old definition
	// layer_harbours = new OpenLayers.Layer.Vector("pois", {
	//     layerId: 7,
	//     visibility: true,
	//     projection: proj4326,
	//     displayOutsideMaxExtent:true
	// });
	var layer_harbours = new ol.layer.Vector({
	    visible: true,
	    properties: {
	        name: "pois",
	        layerId: 7,
	        checkboxId: "checkLayerHarbour",
	        cookieKey: "HarbourLayerVisible",
	    },
	    style: harbourStyleFunction,
	    source: new ol.source.Vector({
	        strategy: ol.loadingstrategy.bbox,
	        loader: harbourSourceLoader,                            
	    }),
	});
	map.addLayer(layer_harbours);

	// Bing
	// old definition
	// layer_bing_aerial = new Bing({
	//     layerId: 12,
	//     name: 'Aerial photo',
	//     key: 'AuA1b41REXrEohfokJjbHgCSp1EmwTcW8PEx_miJUvZERC0kbRnpotPTzGsPjGqa',
	//     type: 'Aerial',
	//     isBaseLayer: true,
	//     displayOutsideMaxExtent: true,
	//     wrapDateLine: true
	// });
	/*var layer_bing_aerial = new ol.layer.Tile({
	    visible: false,
	    preload: Infinity,
	    properties: {
	        name: 'Aerial photo',
	        layerId: 12,
	        isBaseLayer: true,
	        checkboxId: "checkLayerBingAerial",
	        cookieKey: "BingAerialLayerVisible",
	    },
	    source: new ol.source.BingMaps({
	        key: 'AuA1b41REXrEohfokJjbHgCSp1EmwTcW8PEx_miJUvZERC0kbRnpotPTzGsPjGqa',
	        imagerySet: 'Aerial',
	        // use maxZoom 19 to see stretched tiles instead of the BingMaps
	        // "no photos at this zoom level" tiles
	        maxZoom: 19
	    }),
	});
	map.addLayer(layer_bing_aerial);*/

    // Map download
    // old definition
    // layer_download = new OpenLayers.Layer.Vector("Map Download", {
    //     layerId: 8,
    //     visibility: false
    // });
    layer_download = new ol.layer.Vector({
        visible: false,
        properties: {
            name: 'Map Download',
            layerId: 8,
        },
        source: new ol.source.Vector({features:[]}),
    });

    // Trip planner
    // old definition
    // layer_nautical_route = new OpenLayers.Layer.Vector("Trip Planner",
    //     { layerId: 9, styleMap: routeStyle, visibility: false, eventListeners: {"featuresadded": NauticalRoute_routeAdded, "featuremodified": NauticalRoute_routeModified}});

    var layer_nautical_route = new ol.layer.Vector({
        visible: false,
        properties: {
            name: 'Trip Planner',
            layerId: 9,
            checkboxId: "checkNauticalRoute",
            cookieKey: "NauticalRouteLayerVisible",
        },
        source: new ol.source.Vector({features:[]}),
    });
    map.addLayer(layer_nautical_route);

    // Grid WGS
    // old definition
    // layer_grid = new OpenLayers.Layer.GridWGS("coordinateGrid", {
    //     layerId: 10,
    //     visibility: true,
    //     zoomUnits: zoomUnits
    // });
    var layer_grid = new ol.layer.Graticule({
        visible: true,
        properties: {
            name: "coordinateGrid",
            layerId: 10,
            checkboxId: "checkLayerGridWGS",
            cookieKey: "GridWGSLayerVisible",
        },
        // the style to use for the lines, optional.
        strokeStyle: new ol.style.Stroke({
            color: 'rgba(0,0,0,1)',
            width: 1,
            // lineDash: [0.5, 4],
        }),
        showLabels: true,
        wrapX: true,
    });
    map.addLayer(layer_grid);

    // old definition
    // var poiLayerWikipediaHttp = new OpenLayers.Protocol.HTTP({
    //     url: 'api/proxy-wikipedia.php?',
    //     params: {
    //         'LANG' : language,
    //         'thumbs' : 'no'
    //     },
    //     format: new OpenLayers.Format.KML({
    //         extractStyles: true,
    //         extractAttributes: true
    //     })
    // });
    // layer_wikipedia = new OpenLayers.Layer.Vector("Wikipedia World", {
    //     layerId: 11,
    //     visibility: false,
    //     projection: proj4326,
    //     strategies: [bboxStrategyWikipedia],
    //     protocol: poiLayerWikipediaHttp
    // });
    var layer_wikipedia = new ol.layer.Vector({
        visible: false,
        properties: {
            name: "Wikipedia World",
            layerId: 11,
            checkboxId: "checkLayerWikipedia",
            cookieKey: "WikipediaLayerVisible",
        },
        source: new ol.source.Vector({
            features: [],
            strategy: ol.loadingstrategy.bbox,
            format: new ol.format.KML({
                extractStyles: true,
            }),
            loader: function(extent, resolution, projection, success, failure) {
                document.getElementById("checkLayerWikipediaThumbnails").checked = wikipediaThumbs;
                setCookie("WikipediaLayerThumbs", wikipediaThumbs);
   
                const proj = projection.getCode();
                const bbox = ol.proj.transformExtent(extent, map.getView().getProjection(), 'EPSG:4326');
                // Beforee it used the api/prox-wikipedia.php but i seems to work without the proxy
                const url = 'https://wp-world.toolforge.org/marks.php?' + 'LANG=' + language + '&thumbs=' + (wikipediaThumbs ? 'yes' : 'no') +'&bbox=' + bbox.join(',');
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                const vectorSource = this;
                const onError = function() {
                    vectorSource.removeLoadedExtent(extent);
                    failure();
                };
                xhr.onerror = onError;
                xhr.onload = function() {
                    if (xhr.status == 200) {
                        const features = vectorSource.getFormat().readFeatures(xhr.responseText, {featureProjection: "EPSG:3857"});
                        // Dont' display poi name.
                        features.forEach((feature) => {
                            const style = feature.getStyle()(feature);
                            style.getText().setText(null);
                            feature.setStyle(style);
                        });
                        vectorSource.addFeatures(features);
                        success(features);
                    } else {
                        onError();
                    }
                }
                xhr.send();
            },
        }),
    });

    // old definition
    // layer_ais = new OpenLayers.Layer.TMS("Marinetraffic", "https://tiles.marinetraffic.com/ais_helpers/shiptilesingle.aspx?output=png&sat=1&grouping=shiptype&tile_size=512&legends=1&zoom=${z}&X=${x}&Y=${y}",
    //     { layerId: 13, numZoomLevels: 19, type: 'png', getURL:getTileURLMarine, isBaseLayer:false, displayOutsideMaxExtent:true, tileSize    : new OpenLayers.Size(512,512)
    //   });
    let aisRefreshInterval = null;
    var layer_ais = new ol.layer.Tile({
        visible: false,
        maxZom: 19,
        properties: {
            name: 'Marinetraffic',
            layerId: 13,
            checkboxId: "checkLayerAis",
            cookieKey: "AisLayerVisible",
        },
        source: new ol.source.XYZ({
           tileUrlFunction: function(coordinate) {
                return getTileURLMarine("https://tiles.marinetraffic.com/ais_helpers/shiptilesingle.aspx?output=png&sat=1&grouping=shiptype&tile_size=512&legends=1&zoom=${z}&X=${x}&Y=${y}", coordinate);
            },
           tileGrid: tileGrid512
        }),
    });
    map.addLayer(layer_ais);

    // SatPro
    // old definition
    // satPro = new SatPro(map, selectControl, {
    //     layerId: 14
    // });
    // layer_satpro = satPro.getLayer();                
    // Disaster (15)
    var layer_satpro = new ol.layer.Vector({
        visible: false,
        properties: {
            name: "SatPro",
            layerId: 14,
            checkboxId: "checkLayerSatPro",
            cookieKey: "SatProLayerVisible",
        },
        source: new ol.source.Vector({
            features: [],
            strategy: ol.loadingstrategy.bbox,
            loader: function(extent, resolution, projection, success, failure) {               
                const proj = projection.getCode();
                const bbox = ol.proj.transformExtent(extent, map.getView().getProjection(), 'EPSG:4326');
                const url = 'api/getSatPro.php?' + 'bbox=' + bbox.join(',');
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                const vectorSource = this;
                const onError = function() {
                    vectorSource.removeLoadedExtent(extent);
                    failure();
                };
                xhr.onerror = onError;
                xhr.onload = function() {
                    if (xhr.status == 200) {
                        var lines = xhr.responseText.split('\n');
                        var features = [];
                        var trackPoints = [];
                        var actualName = '';
                        for (var i = 0; i < lines.length; i++) {
                            var line = lines[i];
                            var vals = line.split('\t');
                            if (vals.length === 1) {
                                // New vessel, but process previous vessel first
                                if (trackPoints.length > 1) {
                                    // Track line
                                    const lineArr = trackPoints.map((trackPoint)=> {
                                        return ol.proj.fromarkerLonLat([trackPoint.lon, trackPoint.lat]);
                                    });
                                    const lineFeature = new ol.Feature(new ol.geom.LineString(lineArr));
                                    lineFeature.set('type','line');                                                
                                    features.push(lineFeature);

                                    // Track points (ignore first)
                                    for (var j = 1; j < trackPoints.length; j++) {
                                        const point = new ol.geom.Point(ol.proj.fromarkerLonLat([trackPoints[j].lon, trackPoints[j].lat]));
                                        const pointFeature = new ol.Feature(point);
                                        pointFeature.setProperties(trackPoints[j]);
                                        pointFeature.set('type', 'point');
                                        features.push(pointFeature);
                                        lineArr.push(point.clone());
                                    }

                                    // Vessel                                             
                                    const vessel = new ol.Feature(new ol.geom.Point(ol.proj.fromarkerLonLat([trackPoints[0].lon, trackPoints[0].lat])));
                                    vessel.setProperties(attributes);
                                    vessel.set('type', 'actual');
                                    features.push(vessel);
                                }
                                actualName = vals[0];
                                trackPoints = [];
                            } else if (vals.length === 10) {
                                // Tracks for vessel
                                var attributes = {
                                    name            : actualName,
                                    lat             : parseFloat(vals[0]),
                                    lon             : parseFloat(vals[1]),
                                    terminal        : vals[2],
                                    datum           : vals[3],
                                    uhrzeit         : vals[4],
                                    breite          : parseFloat(vals[0]),
                                    laenge          : parseFloat(vals[1]),
                                    hoehe           : vals[5],
                                    temperatur      : vals[6],
                                    batterie        : vals[7],
                                    geschwindigkeit : vals[8],
                                    richtung        : vals[9]
                                };
                                trackPoints.push(attributes);
                            }
                        }
                        vectorSource.addFeatures(features);
                        success(features);
                    } else {
                        onError();
                    }
                }
                xhr.send();
            },
        }),
    });


    // POI-Layer for tidal scales
    // old definition
    // layer_tidalscale = new OpenLayers.Layer.Vector("tidalscale", {
    //     layerId: 16,
    //     visibility: false,
    //     projection: proj4326,
    //     displayOutsideMaxExtent:true
    // });
    var layer_tidalscale = new ol.layer.Vector({
        visible: false,
        properties: {
            name: 'tidalscale',
            layerId: 16,
            checkboxId: "checkLayerTidalScale",
            cookieKey: "TidalScaleLayerVisible",
        },
        source: new ol.source.Vector({features:[]}),
    });
    map.addLayer(layer_tidalscale);


    // Permalink
    // old definition
    // layer_permalink = new OpenLayers.Layer.Markers("Permalink", {
    //     layerId: 17,
    //     visibility: false,
    //     projection: proj4326
    // });
    var layer_permalink = new ol.layer.Vector({
        visible: false,
        source: new ol.source.Vector(),
        properties:{
            name: "Permalink",
            layerId: 17, // invalid layerId -> will be ignored by layer visibility setup
            cookieKey: "PermalinkLayerVisible",
        },
        style: new ol.style.Style({
            image: new ol.style.Icon({
                src: 'resources/icons/Needle_Red_32.png',
                size: [32, 32],
                anchor: [0.5, 1]
            })
        })
    });
	map.addLayer(layer_permalink);

    // Water Depth
    
    // layer_waterdepth_trackpoints_10m 
    var layer_waterdepth_trackpoints_10m = new ol.layer.Image({
      visible: false,
      properties:{
        name: 'Water Depth Track Points',
        layerId: 21,
        checkboxId: "checkLayerWaterDepthTrackPoints10m",
        cookieKey: "WaterDepthTrackPointsLayerVisible10m",
      },
      source: new ol.source.ImageWMS({
        url: 'https://depth.openseamap.org/geoserver/openseamap/wms',
        params: {
          'LAYERS': 'openseamap:tracks_10m',
          'VERSION': '1.1.0'
        },
        attributions: '&copy; OpenSeaMap Contributors,'
      })
    });
    map.addLayer(layer_waterdepth_trackpoints_10m);

    // layer_waterdepth_trackpoints_100m
    var layer_waterdepth_trackpoints_100m = new ol.layer.Image({
      visible: false,
      properties:{
        name: 'Water Depth Track Points',
        layerId: 18,
        checkboxId: "checkLayerWaterDepthTrackPoints100m",
        cookieKey: "WaterDepthTrackPointsLayerVisible100m",
      },  
      source: new ol.source.ImageWMS({
        url: 'https://depth.openseamap.org/geoserver/openseamap/wms',
        params: {
          'LAYERS': 'openseamap:tracks_100m',
          'VERSION': '1.1.0'
        },
        attributions: '&copy; OpenSeaMap Contributors,'
      })
    });
    map.addLayer(layer_waterdepth_trackpoints_100m);
   
    // layer_waterdepth_contours 
    var layer_waterdepth_contours = new ol.layer.Image({
      visible: false,
      maxZoom: 22,
      properties:{
        name: 'Contours',
        layerId: 22,
        checkboxId: "checkDepthContours",
        cookieKey: "WaterDepthContoursVisible",
      },  
      source: new ol.source.ImageWMS({
        url: 'https://depth.openseamap.org/geoserver/openseamap/wms',
        params: {
          'LAYERS': 'openseamap:contour2,openseamap:contour',
          'VERSION': '1.1.0'
        },
        attributions: '&copy; OpenSeaMap Contributors,'
      })
	});
	map.addLayer(layer_waterdepth_contours);


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