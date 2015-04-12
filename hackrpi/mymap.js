var gmap;
var Open = false;
var geoXml;
var Marker_Info;
function load() {
	document.getElementById("gmap").style.backgroundImage = "url(loading.jpg)";
	geoXml = new GGeoXml("http://arboretom.com/GoogleMap/gen/Amazonie2008.kml");
	var emap = document.getElementById("gmap");
	gmap = new GMap2(emap);
	gmap.setCenter(new GLatLng(-3.13056666666667, -60.0227833333333), 10);
	gmap.addControl(new GLargeMapControl());
	gmap.addControl(new GMapTypeControl());
	gmap.addControl(new GScaleControl());
	gmap.addControl(new GOverviewMapControl());
	gmap.enableDragging();
	gmap.enableDoubleClickZoom();
	gmap.enableContinuousZoom();
	gmap.enableInfoWindow();
	gmap.setMapType(G_SATELLITE_MAP);
	gmap.addMapType(G_PHYSICAL_MAP);
	positionDiv(G_ANCHOR_TOP_LEFT, 70, 5, 'divLogo');
	positionDiv(G_ANCHOR_TOP_RIGHT, 30, 60, 'divMenu');
	positionDiv(G_ANCHOR_TOP_RIGHT, 275, 8, 'OpenMenu');
	GEvent.addListener(gmap, "moveend", moveend);
	GEvent.addListener(gmap, "dblclick", dblclickeed);
	GEvent.addListener(gmap, "movestart", movestart);
	GEvent.addListener(gmap, "move", move);
	GEvent.addListener(gmap, "maptypechanged", maptypechanged);
	//GLog.write("yo");
	gmap.addOverlay(geoXml);
	

	
	window.setTimeout(function () {
		afficheId("divLogo");
		afficheId("divMenu");
		var blueIcon = new GIcon(G_DEFAULT_ICON);
        blueIcon.image = "http://maps.google.com/mapfiles/kml/shapes/info.png";
		markerOptions = { icon:blueIcon };
	
	
		Marker_Info = new GMarker(gmap.getCenter(), markerOptions);
		gmap.addOverlay(Marker_Info);
		//gmap.addOverlay(new GMarker(gmap.getCenter(), markerOptions));
		var maxContentDiv = document.createElement('div');
		maxContentDiv.innerHTML = 'Loading...';
		Marker_Info.openInfoWindowHtml("<div style='padding:5px'>Chargement...</div>", {maxContent:maxContentDiv, maxTitle:"info"});

		//
		var iw = gmap.getInfoWindow();
		setTimeout("gmap.getInfoWindow().maximize()", 1000);
		GEvent.addListener(iw, "maximizeclick", function () {
			GDownloadUrl("myfile.html", function (data) {
				maxContentDiv.innerHTML = data;
			});
		});
		GEvent.addListener(Marker_Info, "click", function () {
			Marker_Info.openInfoWindowHtml("<div style='padding:5px'>Chargement...</div>", {maxContent:maxContentDiv, maxTitle:"info"});
			setTimeout("gmap.getInfoWindow().maximize()", 1000);
		});
	}, 2500);
}
function affInfo(){
	/*	var Marker_Info = new GMarker(gmap.getCenter(), markerOptions);
	var maxContentDiv = document.createElement('div');
		maxContentDiv.innerHTML = 'Loading...';*/
		var maxContentDiv = document.createElement('div');
		GDownloadUrl("myfile.html", function (data) {
				maxContentDiv.innerHTML = data;
			});
		Marker_Info.openInfoWindowHtml("<div style='padding:5px'>Chargement...</div>", {maxContent:maxContentDiv, maxTitle:"info"});

			setTimeout("gmap.getInfoWindow().maximize()", 1000);
}
function ViewPlace(id, latitude, longitude) {
	if (GBrowserIsCompatible()) {
		var center = new GLatLng(latitude, longitude);
		gmap.setCenter(center, 12);
		//
		//GLog.write("yo"+center);
		var contenuWindow = document.forms['form_'+id]['desc'+id].value;
		gmap.openInfoWindowHtml(new GLatLng(latitude, longitude), '<div class="iwstyle">'+contenuWindow+'</div>');
	}
}
function clickeed() {
	Open = true;
	cacheId('divMenu');
}
function dblclickeed() {
	Open = true;
	cacheId('divMenu');
}
function moveend() {
}
function movestart() {
	Open = true;
	cacheId('divMenu');
}
function move() {
}
function maptypechanged() {
}
function changeStatus(status) {
	document.getElementById("divLogo").innerHTML = "Current event: "+status;
}
function OpenClose(baliseId) {
	if (document.getElementById && document.getElementById(baliseId) != null) {
		if (Open == true) {
			afficheId(baliseId);
			//document.getElementById('li'+baliseId).src = 'img/arrow_open.gif';
			Open = false;
		} else {
			Open = true;
			cacheId(baliseId);
			//document.getElementById('li'+baliseId).src = 'img/arrow_close.gif';
		}
	}
}
function afficheId(baliseId) {
	if (document.getElementById && document.getElementById(baliseId) != null) {
		document.getElementById(baliseId).style.visibility = 'visible';
		document.getElementById(baliseId).style.display = 'inline';
		document.getElementById('OpenMenu').style.visibility = 'hidden';
		gmap.closeInfoWindow();
		gmap.disableScrollWheelZoom();
	}
}
function cacheId(baliseId) {
	if (document.getElementById && document.getElementById('li'+baliseId) != null) {
		document.getElementById('li'+baliseId).src = 'img/arrow_close.gif';
	}
	if (document.getElementById && document.getElementById(baliseId) != null) {
		document.getElementById(baliseId).style.visibility = 'hidden';
		document.getElementById(baliseId).style.display = 'none';
		document.getElementById('OpenMenu').style.visibility = 'visible';
		gmap.enableScrollWheelZoom();
	}
}
function positionDiv(anchorDiv, x, y, id) {
	var posDiv = new GControlPosition(anchorDiv, new GSize(x, y));
	posDiv.apply(document.getElementById(id));
	gmap.getContainer().appendChild(document.getElementById(id));
}
window.onload = load;

