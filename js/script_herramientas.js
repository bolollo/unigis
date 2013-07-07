//Definimos la variable map
var map;
var controlClick;

function init() {
    //Declaramos el objeto options del mapa
    var options = {
        projection: new OpenLayers.Projection("EPSG:4326"),
        units: "degrees",
        controls:[]
    };

    //Creamos un nuevo objeto map en el div con el id = map
    map = new OpenLayers.Map('map',options);
    //Creamos una capa de tipo WMS
    var ol_wms = new OpenLayers.Layer.WMS( "OpenLayers WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
    //Agregamos la capa creada al mapa
    map.addLayer(ol_wms);
    
    //Hacemos un zoom a la extensión máxima del mapa.
    map.zoomToMaxExtent();
	
	//Agregamos el control para navegar
	map.addControl(new OpenLayers.Control.NavToolbar());
	
	//Definimos el control de click
	OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
		defaultHandlerOptions: {
			'single': true,
			'double': false,
			'pixelTolerance': 0,
			'stopSingle': false,
			'stopDouble': false
		},
		initialize: function(options) {
			this.handlerOptions = OpenLayers.Util.extend(
				{}, this.defaultHandlerOptions
			);
			OpenLayers.Control.prototype.initialize.apply(
				this, arguments
			); 
			this.handler = new OpenLayers.Handler.Click(
				this, {
					'click': this.trigger
				}, this.handlerOptions
			);
		}, 
		trigger: function(e) {
			var lonlat = map.getLonLatFromViewPortPx(e.xy);
			alert("Click cerca de " + lonlat.lat + " N, " + lonlat.lon + " E");
		}
	});
	
	//Declaramos el control
	controlClick = new OpenLayers.Control.Click();

	//agregamos el control al mapa
	map.addControl(controlClick);
	
};

function activaClick(){
    controlClick.deactivate();
    controlClick.activate();
}
