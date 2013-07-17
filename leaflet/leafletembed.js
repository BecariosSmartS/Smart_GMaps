var map;
function initmap() {
	var hibrido = new L.Google('HYBRID'),
		carreteras = new L.Google('ROADMAP');
	
	map = new L.Map('map', {
		center: new L.LatLng(43.472,-3.800),
		zoom: 17,
		layers: [hibrido]
	});
	//var gmap_layer = new L.Google('HYBRID');
	//map.addLayer(gmap_layer);
	
	var googleLayers = {
		"Satelite": hibrido, 
		"Carreteras": carreteras
	};

	var markers = new L.MarkerClusterGroup();

    for (var i = 0; i < addressPoints.length; i++) {
			var a = addressPoints[i];
			var title = a[2];
			var marker = L.marker(new L.LatLng(a[0], a[1]), { title: title });
			marker.bindPopup(title);
			markers.addLayer(marker);
	}
	map.addLayer(markers);
	
	var imageUrl = 'leaflet/images/lab_uc.png',
		imageBounds = [[43.472445,-3.800889], [43.471628, -3.799767]];
	var lab = new L.imageOverlay(imageUrl, imageBounds);

	var overlays = {
			"Laboratorio": lab
	};
	
	map.on('zoomend', function(e) {
		var zoom = map.getZoom();
		if (zoom >= 18) {
	        map.addLayer(lab);
		}
		else {
			map.removeLayer(lab);
		}

	});
	
	// layer button
	L.control.layers(googleLayers, overlays).addTo(map);
	var scala = new L.control.scale();
	scala.addTo(map);
}
