(function ($){
	$(window).on('load', function () {
		setSize();
		
		$('#colorSelector2').ColorPicker({
			color: '#0000ff',
			onShow: function (colpkr) {
				$(colpkr).fadeIn(500);
				return false;
			},
			onHide: function (colpkr) {
				$(colpkr).fadeOut(500);
				return false;
			},
			onChange: function (hsb, hex, rgb) {
				$('#colorSelector2 div').css('backgroundColor', '#' + hex);
			}
		});
		$('#colorSelector1').ColorPicker({
			color: '#ff0000',
			onShow: function (colpkr) {
				$(colpkr).fadeIn(500);
				return false;
			},
			onHide: function (colpkr) {
				$(colpkr).fadeOut(500);
				return false;
			},
			onChange: function (hsb, hex, rgb) {
				$('#colorSelector1 div').css('backgroundColor', '#' + hex);
				ColorPickerValue = "#"+hex;
			}
		});
	});
	$(window).resize(function () {
		setSize();
	});
	
	$(document).ready(function () {

		Ps.initialize(document.getElementById('route_resultlist'));
		Ps.initialize(document.getElementById('route_detail_list'));
		Ps.initialize(document.getElementById('ship_resultlist'));
		Ps.initialize(document.getElementById('div_detail'));
		
		$(".map_tool li img").on("click",function(){
			if($(this).attr("src").indexOf("btn7") == -1) {
				$(".div_left").css("display","none");
			}
			
			for(let i=0; i<$(".map_tool li img").length; i++) {
				$(".map_tool li img").eq(i).attr("src",$(".map_tool li img").eq(i).attr("src").replace("_on.jpg",".jpg"));
			}
			
			$("#mapSetting img").attr("src",$("#mapSetting img").attr("src").replace("_on.jpg",".jpg"));
			
			var srcn = $(this).attr("src").slice(-5);
			if (srcn == 'n.jpg') $(this).attr("src",$(this).attr("src").replace("_on.jpg",".jpg"));
			else $(this).attr("src",$(this).attr("src").replace(".jpg","_on.jpg"));
			setSize();
		});
	});
})(jQuery);


function setSize() {
		var window_w = $( window ).width();
		var window_h = $( window ).height();
		var left_w = $(".con_left").width();
		var l_div = $(".div_left").width();
		
		if($(".div_left").css("display") == "none") {
			l_div = 0;
		}else l_div += 1;
		
		$(".con_left").height(window_h+"px");
		$(".nav").height(window_h-70+"px");
		
		$("#container").width(window_w+"px");
		$("#container").height(window_h+"px");
		$(".con_center").width(window_w-left_w-l_div-4+"px");
		$(".con_center").height(window_h+"px");
		$("#route_resultlist").height(window_h-135+"px");
		$("#ship_resultlist").height(window_h-75+"px");
		
		$(".scale").css({'left': 115+l_div+"px"});
		
		Ps.update(document.getElementById('route_resultlist'));
		Ps.update(document.getElementById('route_detail_list'));
		Ps.update(document.getElementById('ship_resultlist'));
		Ps.update(document.getElementById('div_detail'));
		
		if(map != null){
			map.updateSize();
		}		
}
