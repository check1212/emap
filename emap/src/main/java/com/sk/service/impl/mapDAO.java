package com.sk.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.sk.SkShipVO;
import com.sk.RouteDetailVO;
import com.sk.RouteVO;
import com.sk.ShipInfoVO;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

/**
 * @Class Name : CmmUseDAO.java
 * @Description : 공통코드등 전체 업무에서 공용해서 사용해야 하는 서비스를 정의하기위한 데이터 접근 클래스
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
@Repository("mapDAO")
public class mapDAO extends EgovComAbstractDAO {

    /**
     * test
     *
     * @param vo
     * @return
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
	public RouteVO test() throws Exception {
	return (RouteVO) select("map.test", null);
    }
    
    @SuppressWarnings("unchecked")
   	public int testCnt() throws Exception {
   	return (int) select("map.testCnt", null);
    }
    
    @SuppressWarnings("unchecked")
   	public List<RouteVO> getPlanList() throws Exception {
    	return (List<RouteVO>) list("map.getPlanList");
    }
    
    @SuppressWarnings("unchecked")
   	public List<RouteVO> getRouteList(RouteVO vo) throws Exception {
    	return (List<RouteVO>) list("map.getRouteList",vo);
    }
    
    @SuppressWarnings("unchecked")
   	public void RouteInsert(RouteVO vo) throws Exception {
    	insert("map.RouteInsert", vo);
    }
    
    @SuppressWarnings("unchecked")
   	public int RouteUpdate(RouteVO vo) throws Exception {
    	return (int) update("map.RouteUpdate", vo);
    }
    
    @SuppressWarnings("unchecked")
   	public void RouteDetailInsert(RouteDetailVO vo) throws Exception {
    	insert("map.RouteDetailInsert", vo);
    }
    
    @SuppressWarnings("unchecked")
   	public int RouteDetailDelete(RouteDetailVO vo) throws Exception {
    	return (int) update("map.RouteDetailDelete", vo);
    }
    
    @SuppressWarnings("unchecked")
   	public List<RouteDetailVO> getRouteDetailList(RouteVO vo) throws Exception {
    	return (List<RouteDetailVO>) list("map.getRouteDetailList", vo);
    }
    
    @SuppressWarnings("unchecked")
   	public int RouteDelete(RouteDetailVO vo) throws Exception {
    	return (int) update("map.RouteDelete", vo);
    }
    
    @SuppressWarnings("unchecked")
   	public List<ShipInfoVO> getShipSearch() throws Exception {
    	return (List<ShipInfoVO>) list("map.getShipSearch");
    }
}
