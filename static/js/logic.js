var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
});

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}).addTo(myMap);


// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


function chooseColor(mag) {
  var color = "";
  if (mag > 90) {
    color = "red";
  }
  else if (mag > 70) {
    color = "brown";
  } 
  else if (mag > 50) {
    color = "orange";
  }
  else if (mag > 30) {
    color = "yellow";
  }
  else if (mag > 10) {
    color = "green";
  }
  else if (mag > -10) {
    color = "black";
  }
}

d3.json(url).then(function(data){
  let features=data['features'];
  for (let i=0; i<features.length; i++){
    let currentFeature=features[i];
    let coordinates=currentFeature['geometry']['coordinates'];
    L.circle([coordinates[1],coordinates[0]],{
      fillOpacity: 0.75,
      fillColor: chooseColor(coordinates[2]),
      radius: Math.sqrt(currentFeature['properties']['mag'])*25000,
    }).addTo(myMap);
  }
});