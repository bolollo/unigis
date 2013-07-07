//Definimos la variable map
var map;

function init() {    
    //Declaramos el objeto options del mapa
    var options = {
        projection: new OpenLayers.Projection("EPSG:4326"),
        units: "degrees",
        numZoomLevels: 22,
        maxExtent: new OpenLayers.Bounds(-9, 35, 3, 43)
    };

    //Creamos un nuevo objeto map en el div con el id = map
    map = new OpenLayers.Map('map',options);
    //Creamos una capa de tipo WMS
    var ol_wms = new OpenLayers.Layer.WMS( "OpenLayers WMS", "http://vmap0.tiles.osgeo.org/wms/vmap0", {layers: 'basic'} );
    //Agregamos la capa creada al mapa
    map.addLayer(ol_wms);
	
	//Definimos el estilo para nuestra capa de edicion
	var estilo_capa = new OpenLayers.StyleMap({
		//estilo por defecto de los elementos
		'default' : new OpenLayers.Style({
			fillColor: "#BF7DDF",
			pointRadius: 4,
			strokeColor: "#4A006F",
			strokeWidth: 3
		}),
		//estilo de los elementos seleccionados
		'select': new OpenLayers.Style({
			fillColor: "#DF9999",
			fillOpacity: 0.4,
			strokeColor: "#6F0000",
			pointRadius: 6
		})
	});

	//opciones de la capa edicion
	var opciones_capa = { 
		styleMap: estilo_capa
	};
	
	//Creamos la capa de tipo Vector donde editaremos
	var capaEdicion =  new OpenLayers.Layer.Vector("Editable", opciones_capa);
	
	//registramos el evento featureadded para detectar cuando se agregar un elemento a la capa
	capaEdicion.events.register('featureadded', capaEdicion, agregarElemento);
	
	//Agregamos la capa creada al mapa
	map.addLayer(capaEdicion);
    
	var estilo_gml = new OpenLayers.StyleMap({
		//estilo por defecto de los elementos del gml
		'default' : new OpenLayers.Style({
			fillColor: "${color}"
		})
	});

	//Creamos el GML
	var gml = new OpenLayers.Layer.Vector("GML", {
		strategies: [new OpenLayers.Strategy.Fixed()],
		protocol: new OpenLayers.Protocol.HTTP({
			url: "datos/gml.xml",
			format: new OpenLayers.Format.GML()
		}),
		styleMap: estilo_gml
	});
	//Agregamos la capa GML creada al mapa
	map.addLayer(gml);

	
	//definimos la barra de edicion para la capa vector
	var barraEdicion = new OpenLayers.Control.EditingToolbar(capaEdicion);
	//agregamos la barra de edicion al mapa
	map.addControl(barraEdicion);
	
	//definimos el control de modificar elementos
	var controlModifica = new OpenLayers.Control.ModifyFeature(
		capaEdicion, {displayClass: "olControlModifyFeature"}
	);
	//añadimos el control a la barra de herramientas
	barraEdicion.addControls([controlModifica]);
	
    //agregar el control de leyenda al mapa
    map.addControl(new OpenLayers.Control.LayerSwitcher());

    //Hacemos zoom a toda la vista del mapa
    map.zoomToMaxExtent();
	
	//Creamos el control select para seleccionar un elemento vectorial
	var colorVectorControl = new OpenLayers.Control.SelectFeature(
		gml,
		{onSelect: seleccionarElemento, onUnselect: deseleccionarElemento, displayClass:'cambiaColor'}
	);
	//añadimos el control a la barra de herramientas
	barraEdicion.addControls([colorVectorControl]);

	
	
}

function agregarElemento(feature){
    console.debug(feature);
}

function seleccionarElemento(feature){
    //cambiamos el color del elemento
    feature.attributes.color = "#ff00ff";
    //creamos el popup
    var popup = new OpenLayers.Popup.FramedCloud("chicken", 
         feature.geometry.getBounds().getCenterLonLat(),
         null,
         "<div style='font-size:.8em'>Feature: " + feature.id +"<br>Area: " + feature.geometry.getArea()+"</div>",
         null, false);
    //vinculamos el popup con el elemento     
    feature.popup = popup;
    //agregamos el popup al mapa
    map.addPopup(popup);
}

function deseleccionarElemento(feature){
    //quitamos el popup del mapa
    map.removePopup(feature.popup);
    //destruimos el popup
    feature.popup.destroy();
    //desvinculamos el popup del elemento.
    feature.popup = null;
}