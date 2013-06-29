//Definimos la variable map
var map;

function init() {
    var options = {
        projection: new OpenLayers.Projection("EPSG:4326"),
        units: "degrees",
        numZoomLevels: 10,
        maxExtent: new OpenLayers.Bounds(-90, 0, 1, 45)
    };

    //Creamos un nuevo objeto map en el div con el id = map
    map = new OpenLayers.Map('map',options);
    //Creamos una capa de tipo WMS
    var ol_wms = new OpenLayers.Layer.WMS( "OpenLayers WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
    //Agregamos la capa creada al mapa
    map.addLayer(ol_wms);
	
	//agregar el control de leyenda al mapa
	map.addControl(new OpenLayers.Control.LayerSwitcher());
	
	//agregar el control de mapa de referencia
	map.addControl( new OpenLayers.Control.OverviewMap());
	
    //Hacemos un zoom a la extensión máxima del mapa.
    map.zoomToMaxExtent();
}
