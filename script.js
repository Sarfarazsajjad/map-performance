
var map = L.map('map').setView([48.5, 20.1], 12);

var dataDisplayType = 'll_heat'; // simple | cluster | heat | ll_heat

var totalDataPoints = 500;

var iteration = 0;

var cfg = {
    "radius": 2,
    "maxOpacity": .8,
    "scaleRadius": true,
    "useLocalExtrema": true,
    latField: 'lat',
    lngField: 'lng',
    valueField: 'count'
  };

var heatmapLayer = new HeatmapOverlay(cfg);

var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

map.addLayer(layer);

if (dataDisplayType == 'simple') {

    for (let y = 0; y < totalDataPoints; y++) {
        L.marker([Math.floor(Math.random() * totalDataPoints * 0.1), Math.floor(Math.random() * totalDataPoints * 0.1)]).addTo(map).bindPopup("Iteration No: "+iteration);
        iteration++;
    }
    

} 
else if (dataDisplayType == 'cluster') {
    var markers = L.markerClusterGroup({
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: false,
        zoomToBoundsOnClick: false,
        maxClusterRadius: 80,
    });

    for (let y = 0; y < totalDataPoints; y++) {    
        markers.addLayer(L.marker([Math.floor(Math.random() * totalDataPoints * 0.1), Math.floor(Math.random() * totalDataPoints * 0.1)]).bindPopup("Iteration No: "+iteration));
        iteration++;
    }
    map.addLayer(markers);
    map.fitBounds(markers.getBounds());

} 
else if (dataDisplayType == 'heat') {

    var points = [];

    for (let y = 0; y < totalDataPoints; y++) {    
        points.push([(Math.floor(Math.random() * totalDataPoints * 0.1)), (Math.floor(Math.random() * totalDataPoints * 0.1)), "500"]);
        iteration++;
    }

    var heatLayer = L.heatLayer(points,{radius: 25}).addTo(map);

    map.addLayer(heatLayer);

} 

console.log("Value Given: ",totalDataPoints);
console.log("Total Data Points Generated: ",iteration);
