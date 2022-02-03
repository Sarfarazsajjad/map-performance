
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
        // disableClusteringAtZoom: 18,
        maxClusterRadius: 80,
    });

    for (let y = 0; y < totalDataPoints; y++) {    
        markers.addLayer(L.marker([Math.floor(Math.random() * totalDataPoints * 0.1), Math.floor(Math.random() * totalDataPoints * 0.1)]).bindPopup("Iteration No: "+iteration));
        // for (var x = 0; x < totalDataPoints; x++) {
        //     markers.addLayer(L.marker([48.5+(x*0.1), 20.1+(y*0.1)]).bindPopup("Iteration No: "+iteration));
            // markers.addLayer(L.circleMarker([48.5+(x*0.1), 20.1+(y*0.1)], {
            //     color: 'red',
            //     fillColor: '#234',
            //     fillOpacity: 1,
            //     radius: 10
            // }).bindPopup("Iteration No: "+iteration));
            iteration++;
        // }
    }
    map.addLayer(markers);
    map.fitBounds(markers.getBounds());

} 
else if (dataDisplayType == 'heat') {

    var points = [];

    for (let y = 0; y < totalDataPoints; y++) {    
        // for (var x = 0; x < totalDataPoints; x++) {
            // points.push({lat: (48.5+(x*0.1)), lng: (20.1+(y*0.1)), count: 1});
            points.push({lat: (Math.floor(Math.random() * totalDataPoints * 0.1)), lng: (Math.floor(Math.random() * totalDataPoints * 0.1)), count: 1});
            iteration++;
        // }
    }

    var testData = {
        max: 8,
        data: points,//[{lat: 24.6408, lng:46.7728, count: 1},{lat: 24.7408, lng:46.8728, count: 1},{lat: 50.75, lng:-1.55, count: 1}]
    };
    map.addLayer(heatmapLayer);
    heatmapLayer.setData(testData);

} 
else if (dataDisplayType == 'll_heat') {

    var points = [];

    for (let y = 0; y < totalDataPoints; y++) {    
        // for (var x = 0; x < totalDataPoints; x++) {
            // points.push({lat: (48.5+(x*0.1)), lng: (20.1+(y*0.1)), count: 1});
            points.push([(Math.floor(Math.random() * totalDataPoints * 0.1)), (Math.floor(Math.random() * totalDataPoints * 0.1)), "500"]);
            iteration++;
        // }
    }

    var heatLayer = L.heatLayer(points,{radius: 25}).addTo(map);

    map.addLayer(heatLayer);

} 




console.log("Value Given: ",totalDataPoints);
console.log("Total Data Points Generated: ",iteration);



// for (let y = 0; y < totalDataPoints; y++) {    
    // markers.addLayer(L.circleMarker([(Math.floor(Math.random() * totalDataPoints * 0.5)), (Math.floor(Math.random() * totalDataPoints * 0.5))], {
//         color: 'red',
//         fillColor: '#234',
//         fillOpacity: 1,
//         radius: 10
//     })/*.addTo(map)*/.bindPopup("Iteration No: "+iteration));
//     iteration++;
// };