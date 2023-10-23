package com.sk;

import java.io.Serializable;

public class ShipInfoVO implements Serializable {
	private String mmsi;
	private String gathertime;
	private String shipname;
	private String lat;
	private String lon;
	private String sog;
	private String cog;
	private String theading;
	private String rateturn;
	private String shipton;
	private String navistatus;
	private String shiptype;
	private String ackname;
	
	
	public String getMmsi() {
		return mmsi;
	}
	public void setMmsi(String mmsi) {
		this.mmsi = mmsi;
	}
	public String getGathertime() {
		return gathertime;
	}
	public void setGathertime(String gathertime) {
		this.gathertime = gathertime;
	}
	public String getShipname() {
		return shipname;
	}
	public void setShipname(String shipname) {
		this.shipname = shipname;
	}
	public String getLat() {
		return lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	public String getLon() {
		return lon;
	}
	public void setLon(String lon) {
		this.lon = lon;
	}
	public String getSog() {
		return sog;
	}
	public void setSog(String sog) {
		this.sog = sog;
	}
	public String getCog() {
		return cog;
	}
	public void setCog(String cog) {
		this.cog = cog;
	}
	public String getTheading() {
		return theading;
	}
	public void setTheading(String theading) {
		this.theading = theading;
	}
	public String getRateturn() {
		return rateturn;
	}
	public void setRateturn(String rateturn) {
		this.rateturn = rateturn;
	}
	public String getShipton() {
		return shipton;
	}
	public void setShipton(String shipton) {
		this.shipton = shipton;
	}
	public String getNavistatus() {
		return navistatus;
	}
	public void setNavistatus(String navistatus) {
		this.navistatus = navistatus;
	}
	public String getShiptype() {
		return shiptype;
	}
	public void setShiptype(String shiptype) {
		this.shiptype = shiptype;
	}
	public String getAckname() {
		return ackname;
	}
	public void setAckname(String ackname) {
		this.ackname = ackname;
	}
}
