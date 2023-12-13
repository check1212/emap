/*
 * Copyright 2008-2009 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.sk.web;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springmodules.validation.commons.DefaultBeanValidator;

import com.sk.SkShipVO;
import com.sk.WeatherVO;
import com.ibm.icu.text.SimpleDateFormat;
import com.sk.RouteDetailVO;
import com.sk.RouteVO;
import com.sk.ShipInfoVO;
import com.sk.SkAlertVO;
import com.sk.service.LibJson;
import com.sk.service.mapService;

import egovframework.rte.fdl.property.EgovPropertyService;

/**
 * @Class Name : EgovSampleController.java
 * @Description : EgovSample Controller Class
 * @Modification Information
 * @
 * @  수정일      수정자              수정내용
 * @ ---------   ---------   -------------------------------
 * @ 2009.03.16           최초생성
 *
 * @author 개발프레임웍크 실행환경 개발팀
 * @since 2009. 03.16
 * @version 1.0
 * @see
 *
 *  Copyright (C) by MOPAS All right reserved.
 */

@Controller
public class WebController {	

	/** EgovPropertyService */
	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	/** Validator */
	@Resource(name = "beanValidator")
	protected DefaultBeanValidator beanValidator;
	
	@Resource(name = "mapService")
    private mapService mapService;

	LibJson json = new LibJson(); //json 설정
	
	LocalDate now = LocalDate.now();
	 
    // 포맷 정의
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

    // 포맷 적용
    String formatedNow = now.format(formatter);
	
	//초기화면
	@RequestMapping(value = "/index.do")
	public String selectSampleList(ModelMap model) throws Exception {
	
		//RouteVO vo = mapService.test();
		//System.out.println("vo.getRouteid : "+vo.getRouteid());	
		
		return "sk/map/map";
	}
	
	//항로계획 리스트
	@RequestMapping("getPlanList.do")
	public void getPlanList(HttpServletRequest req, HttpServletResponse res) throws Exception {
		System.out.println("getPlanList : start!");
		
		List<RouteVO> slist = mapService.getPlanList();		
		
		System.out.println("slist.size() : "+slist.size());
		if(slist.size() > 0) {			
			/*json으로 정보 전달*/
			json.Json(res, slist);
		}				
	}
	
	//항로계획 저장
	@RequestMapping("RouteSave.do")
	public void RouteSave(HttpServletRequest req, HttpServletResponse res) throws Exception {
		System.out.println("RouteSave : start!");
		String id = req.getParameter("rt_id");
		String r_name = req.getParameter("rt_rname");
		String name = req.getParameter("rt_mkname");

		RouteVO vo = new RouteVO();
		List<String> list = null;
		if(id.isEmpty()) {
			vo.setRoutename(r_name);
			vo.setMakename(name);
			mapService.RouteInsert(vo);
		} else {
			vo.setRouteid(Integer.parseInt(id));
			vo.setRoutename(r_name);
			vo.setMakename(name);
			mapService.RouteUpdate(vo);
		}	
		json.Json(res, list);
	}
	
	//항로계획 상세 저장
	@RequestMapping("RouteDetailSave.do")
	public void RouteDetailSave(HttpServletRequest req, HttpServletResponse res) throws Exception {
		System.out.println("RouteDetailSave : start!");
		List<String> list = null;
		int cnt = Integer.parseInt(req.getParameter("cnt"));
		String id = req.getParameter("id");
		String[] arr_num = req.getParameter("arr_num").split(",");
		String[] arr_lon = req.getParameter("arr_lon").split(",");
		String[] arr_lat = req.getParameter("arr_lat").split(",");
		
		RouteDetailVO vo = new RouteDetailVO();
		vo.setRouteid(Integer.parseInt(id));
		mapService.RouteDetailDelete(vo);
		
		for(int i=0; i<cnt; i++) {
			vo = new RouteDetailVO();
			String num = arr_num[i];
			//if("0".equals(num)) {
				vo.setRouteid(Integer.parseInt(id));
				vo.setRouteseq((i+1));
				vo.setLon(arr_lon[i]);
				vo.setLat(arr_lat[i]);
				System.out.println("R_pointid :" + vo.getR_pointid());
				System.out.println("Routeid :" + vo.getRouteid());
				System.out.println("lon :" + vo.getLon());
				System.out.println("lat :" + vo.getLat());
				mapService.RouteDetailInsert(vo);
		}
		json.Json(res, list);
	}
	
	//항로계획 조회
	@RequestMapping("getRouteList.do")
	public void getRouteList(HttpServletRequest req, HttpServletResponse res) throws Exception {
		System.out.println("getRouteList : start!");
		RouteVO vo = new RouteVO();
		vo.setRouteid(Integer.parseInt(req.getParameter("id")));
		List<RouteVO> slist = mapService.getRouteList(vo);		
		
		System.out.println("slist.size() : "+slist.size());
		if(slist.size() > 0) {			
			/*json으로 정보 전달*/
			json.Json(res, slist);
		}				
	}
	
	//항로계획 상세 리스트
	@RequestMapping("RouteDetailList.do")
	public void RouteDetailList(HttpServletRequest req, HttpServletResponse res) throws Exception {
		System.out.println("RouteDetailList : start!");
		RouteVO vo = new RouteVO();
		vo.setRouteid(Integer.parseInt(req.getParameter("id")));
		
		List<RouteDetailVO> slist = mapService.getRouteDetailList(vo);		
		
		System.out.println("slist.size() : "+slist.size());
		if(slist.size() > 0) {			
			/*json으로 정보 전달*/
			json.Json(res, slist);
		}				
	}
	
	//항로계획 삭제
	@RequestMapping("RouteDelete.do")
	public void RouteDelete(HttpServletRequest req, HttpServletResponse res) throws Exception {
		System.out.println("RouteDelete : start!");
		List<String> list = null;

		String id = req.getParameter("id");
		
		RouteDetailVO vo = new RouteDetailVO();
		vo.setRouteid(Integer.parseInt(id));
		mapService.RouteDetailDelete(vo);
		mapService.RouteDelete(vo);		
		json.Json(res, list);
	}
	
	//선박정보
	@RequestMapping("getShipSearch.do")
	public void getShipSearch(HttpServletRequest req, HttpServletResponse res) throws Exception {
		System.out.println("getShipSearch : start!");	
		List<ShipInfoVO> slist = mapService.getShipSearch();		
		System.out.println("slist.size() : "+slist.size());
		if(slist.size() > 0) {			
			/*json으로 정보 전달*/
			json.Json(res, slist);
		}
	}
	
	//선박정보
	@RequestMapping("getShipOne.do")
	public void getShipOne(HttpServletRequest req, HttpServletResponse res) throws Exception {
		System.out.println("getShipOne : start!");
		
		ShipInfoVO vo = new ShipInfoVO();
		vo.setMmsi(req.getParameter("mmsi"));
		System.out.println("vo.getMmsi : "+vo.getMmsi());
		List<ShipInfoVO> slist = mapService.getShipOne(vo);		
		System.out.println("slist.size() : "+slist.size());
		if(slist.size() > 0) {			
			/*json으로 정보 전달*/
			json.Json(res, slist);
		}
	}

	// 기상 정보
	@RequestMapping("getWeather.do")
	public void getWeather(HttpServletRequest req, HttpServletResponse res) throws Exception {
		WeatherVO vo = new WeatherVO();
		//vo.setDate((String)req.getParameter("date"));
		String dateToTable = (String)req.getParameter("date"); // 20231203
		vo.setDate(dateToTable);

		dateToTable = "tb_" + dateToTable;
		//vo.setTableName("tb_20231203");
		vo.setTableName(dateToTable);
		//vo.setDate(formattedDate);

		List<WeatherVO> slist = mapService.getWeather(vo);		
		if(slist.size() > 0) {			
			json.Json(res, slist);
		}
	}

	// 기상 정보 (팝업)
	@RequestMapping("getWeatherPopup.do")
	public void getWeatherPopup(HttpServletRequest req, HttpServletResponse res) throws Exception {
		WeatherVO vo = new WeatherVO();
		String dateToTable = (String)req.getParameter("date"); // 20231203
		vo.setDate(dateToTable);

		dateToTable = "tb_" + dateToTable;
		vo.setTableName(dateToTable);

		String lat = (String)req.getParameter("lat");
		float floatLat = Float.parseFloat(lat);
		vo.setLat(floatLat);
		String lon = (String)req.getParameter("lon");
		float floatLon = Float.parseFloat(lon);
		vo.setLon(floatLon);

		List<WeatherVO> slist = mapService.getWeatherPopup(vo);		
		if(slist.size() > 0) {
			json.Json(res, slist);
		}
	}
}
