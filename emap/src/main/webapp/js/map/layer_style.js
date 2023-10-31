//https://docs.geoserver.org/stable/en/user/styling/sld/reference/index.html 참고
//lynm : 레이어 id
//type : 도형 타입
function make_sld(lynm, type) {
	var text_SLD ="<?xml version='1.0' encoding='UTF-8'?>";
    text_SLD +="<StyledLayerDescriptor xmlns='http://www.opengis.net/sld' ";
    text_SLD +=" xmlns:gml='http://www.opengis.net/gml' xmlns:ogc='http://www.opengis.net/ogc' ";
    text_SLD +=" xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' ";
    text_SLD +=" version='1.0.0' ";
    text_SLD +=" xsi:schemaLocation='http://www.opengis.net/sld http://schemas.opengeospatial.net/sld/1.0.0/StyledLayerDescriptor.xsd'> ";
    text_SLD +="<NamedLayer>";
    text_SLD +="<Name>skemap:"+lynm+"</Name>";
    text_SLD +="<UserStyle>";
    text_SLD +="<FeatureTypeStyle>";
    
    if(type == "Polygon") {
    	text_SLD += '<PolygonSymbolizer>';
    	text_SLD += '<Fill>';
    	text_SLD += '<CssParameter name="fill">#000000</CssParameter>';
    	text_SLD += '<CssParameter name="fill-opacity">1</CssParameter>';
    	text_SLD += '</Fill>';
    	text_SLD += '<Stroke>';
    	text_SLD += '<CssParameter name="stroke">';
    	text_SLD += '<Literal xmlns="http://www.opengis.net/ogc">#FF0000</Literal>';
    	text_SLD += '<CssParameter name="stroke-width">3</CssParameter>';
    	text_SLD += '</CssParameter>';
    	text_SLD += '</Stroke>';
    	text_SLD += '</PolygonSymbolizer>';
    } else if(type == "LineString") {
    	text_SLD += '<LineSymbolizer>';
    	text_SLD += '<Stroke>';
    	text_SLD += '<CssParameter name="stroke">#000000</CssParameter>';
    	text_SLD += '<CssParameter name="stroke-width">1</CssParameter>';
    	text_SLD += '</Stroke>';
    	text_SLD += '</LineSymbolizer>';
    } else if(type == "Point") {
    	if(type_ == "image") {
    		text_SLD += '<PointSymbolizer>';
    		text_SLD += '<Graphic>';
    		text_SLD += '<ExternalGraphic>';
    		text_SLD += '<OnlineResource xlink:type="simple"';
    		text_SLD += 'xlink:href="첨부 경로" />';
    		text_SLD += '<Format>image.png</Format>';
    		text_SLD += '</ExternalGraphic>';
    		text_SLD += '</Graphic>';
    		text_SLD += '</PointSymbolizer>';
    	} else {
    		text_SLD += '<PointSymbolizer>';
    		text_SLD += '<Graphic>';
    		text_SLD += '<Mark>';
    		text_SLD += '<WellKnownName>circle</WellKnownName>';
    		text_SLD += '<Fill>';
    		text_SLD += '<CssParameter name="fill">#FF0000</CssParameter>';
    		text_SLD += '</Fill>';
    		text_SLD += '</Mark>';
    		text_SLD += '<Size>6</Size>';
    		text_SLD += '</Graphic>';
    		text_SLD += '</PointSymbolizer>';
    	}    	
    } else if(type == "Text") {
    	text_SLD += '<TextSymbolizer>';
    	text_SLD += '<Label>';
    	text_SLD += '<ogc:PropertyName>name</ogc:PropertyName>';
    	text_SLD += '</Label>';
    	text_SLD += '<Font>';
    	text_SLD += '<CssParameter name="font-family">Arial</CssParameter>';
    	text_SLD += '<CssParameter name="font-size">12</CssParameter>';
    	text_SLD += '<CssParameter name="font-style">normal</CssParameter>';
    	text_SLD += '<CssParameter name="font-weight">bold</CssParameter>';
    	text_SLD += '</Font>';
    	text_SLD += '<Fill>';
    	text_SLD += '<CssParameter name="fill">#990099</CssParameter>';
    	text_SLD += '</Fill>';
    	text_SLD += '</TextSymbolizer>';
    }
    
    text_SLD +="</FeatureTypeStyle>";
    text_SLD +="</UserStyle>";
    text_SLD +="</NamedLayer>";
    text_SLD +="</StyledLayerDescriptor>";
    
    var source = getLayer(lynm).getSource();
    source.updateParams({ 'STYLES': '' ,'SLD_BODY': text_SLD });
}