package com.sk;

import java.io.Serializable;

import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 *  클래스
 * @author 공통서비스개발팀 이삼섭
 * @since 2009.06.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자           수정내용
 *  -------       --------    ---------------------------
 *   2009.3.11   이삼섭          최초 생성
 *
 * </pre>
 */
public class WeatherVO implements Serializable {
    
	private String date = "";
	private String tableName = "";
	private float lat;
	private float lon;
    private String air_temp = "";
    private String water_temp = "";
    private String u_current = "";
    private String v_current = "";
    private String ugrd10m = "";
    private String vgrd10m = "";
    private String fsdir = "";
    private String fshgt = "";
    
    
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTableName() {
		return tableName;
	}
	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	public float getLat() {
		return lat;
	}
	public void setLat(float lat) {
		this.lat = lat;
	}
	public float getLon() {
		return lon;
	}
	public void setLon(float lon) {
		this.lon = lon;
	}
	public String getAir_temp() {
		return air_temp;
	}
	public void setAir_temp(String air_temp) {
		this.air_temp = air_temp;
	}
	public String getWater_temp() {
		return water_temp;
	}
	public void setWater_temp(String water_temp) {
		this.water_temp = water_temp;
	}
	public String getU_current() {
		return u_current;
	}
	public void setU_current(String u_current) {
		this.u_current = u_current;
	}
	public String getV_current() {
		return v_current;
	}
	public void setV_current(String v_current) {
		this.v_current = v_current;
	}
	public String getUgrd10m() {
		return ugrd10m;
	}
	public void setUgrd10m(String ugrd10m) {
		this.ugrd10m = ugrd10m;
	}
	public String getVgrd10m() {
		return vgrd10m;
	}
	public void setVgrd10m(String vgrd10m) {
		this.vgrd10m = vgrd10m;
	}
	public String getFsdir() {
		return fsdir;
	}
	public void setFsdir(String fsdir) {
		this.fsdir = fsdir;
	}
	public String getFshgt() {
		return fshgt;
	}
	public void setFshgt(String fshgt) {
		this.fshgt = fshgt;
	}
    

}
