package com.sk.service;

import java.util.List;
import java.util.Map;

import com.sk.SkShipVO;
import com.sk.RouteDetailVO;
import com.sk.RouteVO;
import com.sk.ShipInfoVO;

public interface mapService {
	
	public RouteVO test() throws Exception;
	
	public List<RouteVO> getPlanList() throws Exception;
	
	public List<RouteVO> getRouteList(RouteVO vo) throws Exception;
	
	public void RouteInsert(RouteVO vo) throws Exception;
	
	public int RouteUpdate(RouteVO vo) throws Exception;
	
	public void RouteDetailInsert(RouteDetailVO vo) throws Exception;
	
	public int RouteDetailDelete(RouteDetailVO vo) throws Exception;
	
	public List<RouteDetailVO> getRouteDetailList(RouteVO vo) throws Exception;
	
	public int RouteDelete(RouteDetailVO vo) throws Exception;
	
	public List<ShipInfoVO> getShipSearch() throws Exception;
}
