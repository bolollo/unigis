//Definimos la variable map
var map;

function init() {
	//Asigamos la ruta para el archivo Proxy
	OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";
	//OpenLayers.ProxyHost = "/proxy/proxy_1.php?url=";


	//Sobrescribir el método para manejar multiples SRS.
	OpenLayers.Layer.WMS.prototype.getFullRequestString = function(newParams, altUrl) {
		var projectionCode = this.map.getProjection();
		if (this.params.SRS){
			if (this.params.SRS != projectionCode){
				var point1 = new OpenLayers.LonLat(newParams.BBOX[0], newParams.BBOX[1]);
				point1 = point1.transform(new OpenLayers.Projection(projectionCode), new OpenLayers.Projection(this.params.SRS));
				var point2 = new OpenLayers.LonLat(newParams.BBOX[2], newParams.BBOX[3]);
				point2 = point2.transform(new OpenLayers.Projection(projectionCode), new OpenLayers.Projection(this.params.SRS));
				newParams.BBOX[0] = point1.lon;
				newParams.BBOX[1] = point1.lat;
				newParams.BBOX[2] = point2.lon;
				newParams.BBOX[3] = point2.lat;
			}else{
				this.params.SRS = (projectionCode == "none") ? null : projectionCode;
			}
		}else{
			this.params.SRS = (projectionCode == "none") ? null : projectionCode;
		   }
		return OpenLayers.Layer.Grid.prototype.getFullRequestString.apply(this, arguments);
	};


    var options = {
        projection: new OpenLayers.Projection("EPSG:4326"),
        units: "degrees",
        numZoomLevels: 10,
        maxExtent: new OpenLayers.Bounds(-90, 0, 10, 60)
    };

    //Creamos un nuevo objeto map en el div con el id = map
    map = new OpenLayers.Map('map',options);
    //Creamos una capa de tipo WMS
    var ol_wms = new OpenLayers.Layer.WMS( "OpenLayers WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
    //Agregamos la capa creada al mapa
    map.addLayer(ol_wms);
	
	//Creamos la capa WMS de Catastro
	var catastro = new OpenLayers.Layer.WMS("Catastro",
		"http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?", 
		{layers: 'Catastro', format:'image/png', transparent:'true', 
			exceptions: "application/vnd.ogc.se_xml", srs: "EPSG:4326"},
		{units:'m','isBaseLayer':false, titles: 'Catastro',
			'singleTile':true}
	);
	//Agregamos la capa creada al mapa
	map.addLayer(catastro);
	
	//Capa en EPSG:23031
	var orto5 = new OpenLayers.Layer.WMS( "ICC ORTO5",
		"http://shagrat.icc.es/lizardtech/iserv/ows?", 
			{layers: 'orto5m', srs: 'EPSG:23031', format:'image/png', 
		transparent:'true', exceptions:"application/vnd.ogc.se_xml"},
			{'isBaseLayer':false, 'displayInLayerSwitcher':true, numZoomLevels: 22}
	);
	map.addLayer(orto5);
	
	//Creamos el KML
	var kml = new OpenLayers.Layer.Vector("KML", {
		projection: map.displayProjection,
		strategies: [new OpenLayers.Strategy.Fixed()],
		protocol: new OpenLayers.Protocol.HTTP({
			url: "datos/kml.kml",
			format: new OpenLayers.Format.KML({
				extractStyles: true,
				extractAttributes: true
			})
		})
	});
	map.addLayer(kml);
	
	//Creamos el GML
	var gml = new OpenLayers.Layer.Vector("GML", {
		strategies: [new OpenLayers.Strategy.Fixed()],
		protocol: new OpenLayers.Protocol.HTTP({
			url: "datos/gml.xml",
			format: new OpenLayers.Format.GML()
		})
	});
	map.addLayer(gml);
	
	//Creamos la capa WFS
	var wfs = new OpenLayers.Layer.Vector("States", {
			strategies: [new OpenLayers.Strategy.BBOX()],
			protocol: new OpenLayers.Protocol.WFS({
				url: "http://demo.opengeo.org/geoserver/wfs",
				featureType: "states",
				featureNS: "http://www.openplans.org/topp"
			})
	});
	map.addLayer(wfs);

	//Creamos el GeoRSS
	var geoRss = new OpenLayers.Layer.GeoRSS("RSS", "http://earthquake.usgs.gov/earthquakes/catalogs/eqs7day-M5.xml");
	map.addLayer(geoRss);
	
	//creamos el GeoJSON
	var geoJson = new OpenLayers.Layer.Vector("GeoJSON", {
		 projection: "EPSG:4326",
		 strategies: [new OpenLayers.Strategy.Fixed()],
		 protocol: new OpenLayers.Protocol.HTTP({
			 url:"http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson",
			 format: new OpenLayers.Format.GeoJSON({ignoreExtraDims: true })
		 })
	 });
	 map.addLayer(geoJson); 
	
	//agregar el control de leyenda al mapa
	map.addControl(new OpenLayers.Control.LayerSwitcher());
	
	//agregar el control de mapa de referencia
	map.addControl( new OpenLayers.Control.OverviewMap());
	
    //Hacemos un zoom a la extensión máxima del mapa.
    map.zoomToMaxExtent();
}
