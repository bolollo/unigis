//Definimos la variable map
var map;
var infoControl;
var capa_catastro;
var infoVectorControl;
var gml;

function init() {

	//Asigamos la ruta para el archivo Proxy
	//OpenLayers.ProxyHost = "/proxy/proxy.php?url=";
	OpenLayers.ProxyHost = "/cgi-bin/proxy.cgi?url=";

	//Declaramos el objeto options del mapa
	var options = {
		projection : new OpenLayers.Projection("EPSG:4326"),
		units : "degrees",
		numZoomLevels : 22,
		maxExtent : new OpenLayers.Bounds(-9, 35, 3, 43)
	};

	//Creamos un nuevo objeto map en el div con el id = map
	map = new OpenLayers.Map('map', options);
	//Creamos una capa de tipo WMS
	var ol_wms = new OpenLayers.Layer.WMS("OpenLayers WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0", {
			layers : 'basic'
		});
	//Agregamos la capa creada al mapa
	map.addLayer(ol_wms);

	//Creamos la capa WMS de Catastro
	capa_catastro = new OpenLayers.Layer.WMS("Catastro", "http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?", {
			layers : 'Catastro',
			format : 'image/png',
			transparent : 'true',
			exceptions : "application/vnd.ogc.se_xml",
			srs : "EPSG:4326"
		}, {
			units : 'm',
			'isBaseLayer' : false,
			titles : 'Catastro',
			'singleTile' : true
		});
	capa_catastro.setVisibility(false);
	//Agregamos la capa creada al mapa
	map.addLayer(capa_catastro);

	//Creamos el GML
	gml = new OpenLayers.Layer.Vector("GML", {
			strategies : [new OpenLayers.Strategy.Fixed()],
			protocol : new OpenLayers.Protocol.HTTP({
				url : "datos/gml.xml",
				format : new OpenLayers.Format.GML()
			})
		});
	//Agregamos los eventos de seleccion y deseleccion de elementos a la capa vectorial
	gml.events.on({
		'featureselected' : function (elemento) {
			//Implementar la funcionalidad cuando seleccionemos
			//texto que mostraremos
			var texto = "Nombre: " + elemento.feature.attributes.name + "<br />";
			texto += "Color: " + elemento.feature.attributes.color + "<br />";
			texto += "Forma: " + elemento.feature.attributes.forma + "<br />";
			//escribimos el texto en el div de respuestas
			document.getElementById('respuestaInfo').innerHTML = texto;
		},
		'featureunselected' : function (elemento) {
			//Implementar la funcionalidad cuando des-seleccionemos
			//limpiamos el div de respuestas
			document.getElementById('respuestaInfo').innerHTML = "";
		},
	});

	//Agregamos la capa GML creada al mapa
	map.addLayer(gml);

	//agregar el control de leyenda al mapa
	map.addControl(new OpenLayers.Control.LayerSwitcher());
	//agregar el control de mapa de referencia
	map.addControl(new OpenLayers.Control.OverviewMap());

	//creamos el control para obtener información del Catastro
	infoControl = new OpenLayers.Control.WMSGetFeatureInfo({
			url : 'http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?',
			layers : [capa_catastro],
			queryVisible : true
		});
	//registramos el evento getfeatureinfo para el control
	infoControl.events.register("getfeatureinfo", this, mostrarInfo);
	//añadimos el control al mapa
	map.addControl(infoControl);
	//activamos el control
	infoControl.activate();

	//Creamos el control select para seleccionar un elemento vectorial
	infoVectorControl = new OpenLayers.Control.SelectFeature(
			gml);

	//añadimos el control al mapa
	map.addControl(infoVectorControl);
	//activamos el control
	infoVectorControl.activate();

	//Hacemos un zoom a un punto concreto del mapa.
	map.setCenter(new OpenLayers.LonLat(-3.6777606904519, 40.461144089702), 14);

	//Hacemos zoom a toda la vista del mapa
	map.zoomToMaxExtent();

}

function mostrarInfo(evt) {
	//mostramos la respuesta del servidor en nuestro div
	document.getElementById('respuestaInfo').innerHTML = evt.text;
}

