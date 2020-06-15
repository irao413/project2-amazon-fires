function GenerateMap()
{ 
  // Creating our initial map object
  // We set the longitude, latitude, and the starting zoom level (arbitrary values)
  // Add to <div id="map"/>
  var mapboxMap = L.map("map", {
    center: [-10, -45.608],
    zoom: 5
  });

  var darkSatelliteLayer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/dark-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: MBAPI_KEY
  }).addTo(mapboxMap);

  // Create bottom left leaflet legend
  let legend = L.control({position: 'bottomleft'});

  legend.onAdd = function(map) {
    let div = L.DomUtil.create('div', 'info legend'),
        ranges = [0, 500,1000,2000,4000,8000,12000];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 1; i < ranges.length; i++) {
      div.innerHTML +=
          '<i style="background:' + GetColor(ranges[i] - 1).color + '"></i> ' +
          ranges[i - 1] + (ranges[i+1] ? '&ndash;' + ranges[i] + '<br>' : '+');
    }

    return div;
  };
  legend.addTo(mapboxMap);

  return mapboxMap;
} 

var currentYear = "2004";
// Load in geojson data
var geoURL = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";
var fireURL = "data/brazil_states_deforestation.csv";

// // <div id="slider"></div>
// var sliderHtml = document.getElementById('slider');

// noUiSlider.create(sliderHtml, {
//     start: 2004,
//     step: 1,
//     range: {
//         'min': 2004,
//         'max': 2019
//     },    
// });
// sliderHtml.noUiSlider.set(2004);

// // When the slider value changes, update the input and span
// sliderHtml.noUiSlider.on('set', function () {
//   var yer = toString(sliderHtml.noUiSlider.get());
//   console.log(yer);
// });

var mapBoxMap = GenerateMap(); 
RefreshMap();

function RefreshMap() 
{
  var states = ["AC","AM","AP","MA","MT","PA","RO","RR","TO"];

  // Grab data with d3
  d3.json(geoURL, function(geoData) {
    d3.csv(fireURL, function(fireData) {

      fireData.forEach(function(d) {
        d.Year = d.Year;
        for(var i = 0 ; i < states.length; i++)
        {
          d[states[i]] = + d[states[i]];
        }
        d["AMZ LEGAL"] = +d["AMZ LEGAL"];
      });

      for(var i = 0 ; i < geoData.features.length; i++)
      {
        var prop = geoData.features[i].properties;
        if(states.indexOf(prop.sigla) != -1)
        {
          geoData.features[i].properties.fires = {};
          for(var j = 0 ; j < fireData.length ; j++)
          {
            geoData.features[i].properties.fires[fireData[j]["Year"]] = fireData[j][prop.sigla]; 
          }
        }

      }
      console.log(geoData);
      console.log(fireData);
      CreateFeatures(geoData, fireData, mapBoxMap);
    });
  }); 
};
var firesLayer = null;

function CreateFeatures(geoData, fireData, map) {
  if (firesLayer != null) {
    map.removeLayer(firesLayer);
  };

  // Define a function we want to run once for each feature in the features array
  function onEachFeature(feature, layer) {
    var popupValue = "<h3>" + feature.properties.name + "</h3>";
    if(feature.properties.fires != null)
    {
      popupValue += "<hr><p>" + feature.properties.fires[currentYear] + "</p>";
    }

    layer.bindPopup(popupValue);    
  }

  firesLayer = L.geoJSON(geoData, {
    onEachFeature: onEachFeature,
    style: function(feature) {
      if(feature.properties.fires != null)
      {
        var d = feature.properties.fires[currentYear];
        return  GetColor(d);
      }
      return {color: '#FFFFF', opacity:0.0};
    }
  });
  map.addLayer(firesLayer);
}

function GetColor(value) {
  var colors = ["green", "darkgreen", "blue","yellow", "orange", "red"]
  var ranges = [500,1000,2000,4000,8000,12000]
  for(var i = 0 ; i < ranges.length; i++)
  {
    if(value < ranges[i])
    {
      return {color:colors[i],opacity:0.7};
    }
  }
  return {color: 'red', opacity:0.7};
};