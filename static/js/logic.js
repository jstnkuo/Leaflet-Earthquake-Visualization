
// Create my map.
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5,
});



// Create the base layers.
var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// function to determine color based on magnitude.
function chooseColor(mag) {
  // var color = "";
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
    color = "beige";
  }
  else if (mag > 10) {
    color = "yellow";
  }
  else if (mag > -10) {
    color = "lime";
  }
  return color;
}

// query url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"


// loading in data and create circles
d3.json(url).then(function(data){
  let features=data['features'];
  for (let i=0; i<features.length; i++){
    let currentFeature=features[i];
    let coordinates=currentFeature['geometry']['coordinates'];
    L.circle([coordinates[1],coordinates[0]],{
      fillOpacity: 0.9,
      fillColor: chooseColor(coordinates[2]),
      color: "gray",
      radius: Math.sqrt(currentFeature['properties']['mag'])*25000,
    }).bindPopup(`<h3>magnitude: ${currentFeature['properties']['mag']}<h3> 
                  <hr>
                  <h3>location: ${currentFeature['properties']['place']}<h3>
                  <h3>depth: ${coordinates[2]}<h3>`)
      .addTo(myMap);
  }

  //legend
  var legend = "img/legend.png";
  var imageBounds = [[27.09, -73.71], [32.09, -67.71]];
  L.imageOverlay(legend, imageBounds).addTo(myMap);

});

