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
    
    //Declaramos el control click
    var clickControl = new OpenLayers.Control.Click({displayClass:'controlClick'});
    
    //Declaramos el control zoom ventana
    var zoomVentana = new OpenLayers.Control.ZoomBox();

    //Declaramos el control zoom extensión
    var zoomExtent = new OpenLayers.Control.ZoomToMaxExtent();
    
    //Declaramos el control arrastrar
    var pan = new OpenLayers.Control.Navigation();
	
	//Declaramos el panel que contendrá las herramientas
	var barraHerramientas = new OpenLayers.Control.Panel();
	
	//agregamos los controles al panel
	barraHerramientas.addControls([
		zoomVentana, 
		zoomExtent,
		pan,
		clickControl
	]);
	
	//agregamos el panel al mapa
	map.addControl(barraHerramientas);


    
};
