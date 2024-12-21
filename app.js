//inserer un fond de carte OSM
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
});

var satellite = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    attribution: '© Google'
});

var Carto_Dark = L.tileLayer('https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 20,
    attribution : '@Carto Dark'
   
});

//Inserer etendue centre de la carte
var map = L.map('map', {
    center: [14.370834, -14.831543],
    zoom: 7,
    layers: [osm]
});

//Inserer les fonds de carte dans le controle de couche
var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT,
    "Satellite": satellite,
    "Carto_Dark": Carto_Dark
};

// Ajout de la couche WMS
var Departement = L.tileLayer.wms("http://localhost:8080/geoserver/UAM/wms", {
    layers: 'Departement',
    format: 'image/png',
    transparent: true
}).addTo(map)

var Hydrographie = L.tileLayer.wms("http://localhost:8080/geoserver/UAM/wms", {
    layers: 'Hydrographie',
    format: 'image/png',
    transparent: true
}).addTo(map)

// Ajout des couche Geojson
var Arrondissement=L.geoJson(Arrondissement).addTo(map);
var Chemin_de_fer=L.geoJson(Chemin_de_fer).addTo(map);

//Inserer les fonds de carte dans le controle de couche
var OverLayerMaps = {
    "Departement": Departement,
    "Hydrographie": Hydrographie,
    "Chemin de fer": Chemin_de_fer,
    "Arrondissement": Arrondissement,
   
   
};


//Inserer le controle des couches
L.control.layers(baseMaps, OverLayerMaps).addTo(map);

// Ajouter l'impression des cartes
L.control.browserPrint({ position: 'topleft' }).addTo(map);

// Ajout d'un contrôle d'échelle à la carte 
L.control.scale({
    position: 'bottomleft',
    metric: true,
    imperial: false
}).addTo(map);
