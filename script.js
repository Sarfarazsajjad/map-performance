var query = window.location.search.substring(1);

// var map = L.map('map').setView([48.5, 20.1], 12);

var center = {'lat':24.23, 'lng':23.12};
// var radius = 1500000;
var iteration = 0;

var isHeatMapDisplayed = false;
var isClusterMapDisplayed = false;
var isSimpleMapDisplayed = false;

var dataPoints = [];

var map = L.map('map').setView([0,0], 5);

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

map.on("zoomend",()=>{
    var zoomlevel = map.getZoom()

    if (mapType == 'heat') {
        if (zoomlevel >= 18) {
            // display simple markers and remove heatmap
            map.removeLayer(heatLayer);
            displayMarkers();
            isHeatMapDisplayed = false;
        }
        else if (zoomlevel < 18) {
            // display heatmap only
            removeMarkers();
            displayHeatMap();
            isSimpleMapDisplayed = false;
        }
    }

    
});


// ===================== DATA DISPLAY FUNCTIONS ===================


function displayHeatMap(){
    if (!isHeatMapDisplayed) {
        var Points = addressPoints.map(function (p) { return [p[0], p[1]]; });
        heatLayer = L.heatLayer(Points,{radius: 25}).addTo(map);
        map.addLayer(heatLayer);
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

        var Points = addressPoints.map(function (p) { return [p[0], p[1]]; });
        for (let i = 0; i < Points.length; i++) {    
            markers.addLayer(L.circleMarker(Points[i]).bindPopup("Iteration No: "+iteration));
            iteration++;
        }

        map.addLayer(markers);
        map.fitBounds(markers.getBounds());
        isClusterMapDisplayed = true;
    }
    
}

function displayMarkers(){
    if (!isSimpleMapDisplayed) {
        var Points = addressPoints.map(function (p) { return [p[0], p[1]]; });
        for (let i = 0; i < Points.length; i++) {
            mapMarkers[i] = L.circleMarker(Points[i]).addTo(map).bindPopup("Iteration No: "+iteration);
            iteration++;
        }
        isSimpleMapDisplayed = true;
    }
}


function removeMarkers(){
    if (isSimpleMapDisplayed) {
        for (let i = 0; i < mapMarkers.length; i++) {
            map.removeLayer(mapMarkers[i]);
            
        }
    }
}


// ======================= UTILITY FUNCTIONS ======================

// function generateRandomPoint(center, radius) {
//     var x0 = center.lng;
//     var y0 = center.lat;
//     // Convert Radius from meters to degrees.
//     var rd = radius/111300;
  
//     var u = Math.random();
//     var v = Math.random();
  
//     var w = rd * Math.sqrt(u);
//     var t = 2 * Math.PI * v;
//     var x = w * Math.cos(t);
//     var y = w * Math.sin(t);

//     var xp = x/Math.cos(y0);
  
//     // Resulting point.
//     return [ y+y0, xp+x0 ];
// }

// function generateRandomPoints(center, radius, count) {
//     var points = [];
//     for (var i=0; i<count; i++) {
//         points.push(generateRandomPoint(center, radius));
//     }
//     return points;
// }

//  var randomGeoPoints = generateRandomPoints({'lat':24.23, 'lng':23.12}, 1000, 100);