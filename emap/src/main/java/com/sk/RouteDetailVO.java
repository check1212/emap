package com.sk;

import java.io.Serializable;

public class RouteDetailVO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int routeid;
	private int r_pointid;
	private int routeseq;
	private String geom;
	private String lon;
	private String lat;
	private String usefg;
	
	public int getRouteid() {
		return routeid;
	}
	public void setRouteid(int routeid) {
		this.routeid = routeid;
	}
	public int getR_pointid() {
		return r_pointid;
	}
	public void setR_pointid(int r_pointid) {
		this.r_pointid = r_pointid;
	}
	public String getGeom() {
		return geom;
	}
	public void setGeom(String geom) {
		this.geom = geom;
	}
	public String getUsefg() {
		return usefg;
	}
	public void setUsefg(String usefg) {
		this.usefg = usefg;
	}
	public String getLon() {
		return lon;
	}
	public void setLon(String lon) {
		this.lon = lon;
	}
	public String getLat() {
		return lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	public int getRouteseq() {
		return routeseq;
	}
	public void setRouteseq(int routeseq) {
		this.routeseq = routeseq;
	}		
}
