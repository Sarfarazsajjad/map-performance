var query = window.location.search.substring(1);

// var map = L.map('map').setView([48.5, 20.1], 12);

var center = {'lat':24.23, 'lng':23.12};
var radius = 1050000;
var totalDataPoints = 50;
var iteration = 0;
var isHeatMapDisplayed = false;
var isClusterMapDisplayed = false;
var isSimpleMapDisplayed = false;

// var map = L.map('map').setView([24.23, 23.12], 12);
var map = L.map('map').setView([0,0], 12);

var mapType = query.split('=')[1]; // simple | cluster | heat

var heatLayer;
var mapMarkers = [];

var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

map.addLayer(layer);

var testLayer;

if (mapType == 'simple') {
    displayMarkers();
} 
else if (mapType == 'cluster') {
    displayClusterMap();
} 
else if (mapType == 'heat') {
    displayHeatMap();
} 

console.log("Value Given: ",totalDataPoints);
console.log("Total Data Points Generated: ",iteration);

map.on("zoomend",()=>{
    var zoomlevel = map.getZoom()
    console.log(zoomlevel);

    if (mapType == 'heat') {
        if (zoomlevel >= 14) {
            // display simple markers and remove heatmap
            console.log('display markers');
            map.removeLayer(heatLayer);
            displayMarkers();
            isHeatMapDisplayed = false;
        }
        else if (zoomlevel < 14) {
            // display heatmap only
            console.log('display heatmap');
            isSimpleMapDisplayed = false;
            removeMarkers();
            displayHeatMap();
        }
    }

    
});


// ===================== DATA DISPLAY FUNCTIONS ===================


function displayHeatMap(){
    if (!isHeatMapDisplayed) {
        var points = [];
        var point;
    
        for (let y = 0; y < totalDataPoints; y++) {    
            // points.push([(Math.floor(Math.random() * totalDataPoints * 0.1)), (Math.floor(Math.random() * totalDataPoints * 0.1)), "500"]);
            point = generateRandomPoint(center, radius);
            point.push("150");
            points.push(point);
            iteration++;
        }

        points.push([0,0,"200"]);
    
        heatLayer = L.heatLayer(points,{radius: 25}).addTo(map);
        mapLayer = map.addLayer(heatLayer);
        isHeatMapDisplayed = true;
    }
}

function displayClusterMap(){
    if (!isClusterMapDisplayed) {
        var markers = L.markerClusterGroup({
            spiderfyOnMaxZoom: true,
            showCoverageOnHover: false,
            zoomToBoundsOnClick: false,
            maxClusterRadius: 80,
        });

        for (let y = 0; y < totalDataPoints; y++) {    
            // markers.addLayer(L.marker([Math.floor(Math.random() * totalDataPoints * 0.1), Math.floor(Math.random() * totalDataPoints * 0.1)]).bindPopup("Iteration No: "+iteration));
            markers.addLayer(L.marker(generateRandomPoint(center, radius)).bindPopup("Iteration No: "+iteration));
            iteration++;
        }
        map.addLayer(markers);
        map.fitBounds(markers.getBounds());
        isClusterMapDisplayed = true;
    }
    
}

function displayMarkers(){
    if (!isSimpleMapDisplayed) {
        testLayer = L.marker([0,0]).addTo(map).bindPopup("Iteration No: "+iteration)
        for (let y = 0; y < totalDataPoints; y++) {
            // L.marker([Math.floor(Math.random() * totalDataPoints * 0.1), Math.floor(Math.random() * totalDataPoints * 0.1)]).addTo(map).bindPopup("Iteration No: "+iteration);
            mapMarkers[y] = L.marker(generateRandomPoint(center, radius)).addTo(map).bindPopup("Iteration No: "+iteration);
            iteration++;
        }
        isSimpleMapDisplayed = true;
    }
}


function removeMarkers(){
    for (let i = 0; i < mapMarkers.length; i++) {
        map.removeLayer(mapMarkers[i]);
        
    }
    map.removeLayer(testLayer);
}


// ======================= UTILITY FUNCTIONS ======================

function generateRandomPoint(center, radius) {
    var x0 = center.lng;
    var y0 = center.lat;
    // Convert Radius from meters to degrees.
    var rd = radius/111300;
  
    var u = Math.random();
    var v = Math.random();
  
    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    var xp = x/Math.cos(y0);
  
    // Resulting point.
    return [ y+y0, xp+x0 ];
}

// function generateRandomPoints(center, radius, count) {
//     var points = [];
//     for (var i=0; i<count; i++) {
//         points.push(generateRandomPoint(center, radius));
//     }
//     return points;
// }

//  var randomGeoPoints = generateRandomPoints({'lat':24.23, 'lng':23.12}, 1000, 100);