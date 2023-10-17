package com.sk;

import java.io.Serializable;

public class RouteVO implements Serializable {
	private int routeid;
	private String routename;
	private String makename;
	private String makedate;
	private String modifydate;
	private String usefg;
	
	
	public int getRouteid() {
		return routeid;
	}
	public void setRouteid(int routeid) {
		this.routeid = routeid;
	}
	public String getRoutename() {
		return routename;
	}
	public void setRoutename(String routename) {
		this.routename = routename;
	}
	public String getMakename() {
		return makename;
	}
	public void setMakename(String makename) {
		this.makename = makename;
	}
	public String getMakedate() {
		return makedate;
	}
	public void setMakedate(String makedate) {
		this.makedate = makedate;
	}
	public String getModifydate() {
		return modifydate;
	}
	public void setModifydate(String modifydate) {
		this.modifydate = modifydate;
	}
	public String getUsefg() {
		return usefg;
	}
	public void setUsefg(String usefg) {
		this.usefg = usefg;
	}
}
