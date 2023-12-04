package com.sk.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.sk.SkShipVO;
import com.sk.WeatherVO;
import com.sk.RouteDetailVO;
import com.sk.RouteVO;
import com.sk.ShipInfoVO;
import com.sk.service.mapService;

import egovframework.rte.fdl.cmmn.EgovAbstractServiceImpl;

/**
 * @Class Name : EgovCmmUseServiceImpl.java
 * @Description : 공통코드등 전체 업무에서 공용해서 사용해야 하는 서비스를 정의하기위한 서비스 구현 클래스
 * @Modification Information
 *
 *    수정일       수정자         수정내용
 *    -------        -------     -------------------
 *    2009. 3. 11.     이삼섭
 *
 * @author 공통 서비스 개발팀 이삼섭
 * @since 2009. 3. 11.
 * @version
 * @see
 *
 */
@Service("mapService")
public class mapServiceImpl extends EgovAbstractServiceImpl implements mapService {

	@Resource(name = "mapDAO")
	private mapDAO mapDAO;

	/**
	 * 공통코드를 조회한다.
	 *
	 * @param vo
	 * @return
	 * @throws Exception
	 */
	@Override
	public RouteVO test() throws Exception {
		return mapDAO.test();
	}
	
	@Override
	public List<RouteVO> getPlanList() throws Exception {
		return mapDAO.getPlanList();
	}
	
	@Override
	public List<RouteVO> getRouteList(RouteVO vo) throws Exception {
		return mapDAO.getRouteList(vo);
	}

	@Override
	public void RouteInsert(RouteVO vo) throws Exception {
		mapDAO.RouteInsert(vo);
	}

	@Override
	public int RouteUpdate(RouteVO vo) throws Exception {
		return mapDAO.RouteUpdate(vo);
	}

	@Override
	public void RouteDetailInsert(RouteDetailVO vo) throws Exception {
		mapDAO.RouteDetailInsert(vo);
	}

	@Override
	public int RouteDetailDelete(RouteDetailVO vo) throws Exception {
		return mapDAO.RouteDetailDelete(vo);
	}
	
	@Override
	public List<RouteDetailVO> getRouteDetailList(RouteVO vo) throws Exception {
		return mapDAO.getRouteDetailList(vo);
	}

	@Override
	public int RouteDelete(RouteDetailVO vo) throws Exception {
		return mapDAO.RouteDelete(vo);
	}
	
	@Override
	public List<ShipInfoVO> getShipSearch() throws Exception {
		return mapDAO.getShipSearch();
	}
	
	@Override
	public List<ShipInfoVO> getShipOne(ShipInfoVO vo) throws Exception {
		return mapDAO.getShipOne(vo);
	}

	@Override
	public List<WeatherVO> getWeather(WeatherVO vo) throws Exception {
		return mapDAO.getWeather(vo);
	}

	@Override
	public List<WeatherVO> getWeatherPopup(WeatherVO vo) throws Exception {
		return mapDAO.getWeatherPopup(vo);
	}
}
