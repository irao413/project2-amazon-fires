// Range of data, from 2004 to 2020 (not counting 2020)
var timeline = [2004,2020];

// Load in geojson data
var geoURL = "https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson";
var fireURL = "data/brazil_states_deforestation.csv";
// Container for all the different layers we create.
// Each year gets its own layer so we can easily switch between them
var firesLayer = {};

// Create the base map
var mapBoxMap = GenerateMap(); 
// Refresh the map using the geojson data and the deforestation data.
RefreshMap();

// Grabs the geojson data for each state and grabs the csv data for forest fires
// Parses and converts to javascript objects
// Adds the fires data for each state in the loaded geojson data
// Will Create features using updated geojson
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

// Create the base map 
// Creates the legen as well with the right colors and ranges
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

// Creates all the layers on the map combining the geodata and fire data
// Each different year in the fire data is used as a different layer
// The geojson contains the data required to draw the different states with their borders
// it is publicly available on github.
function CreateFeatures(geoData, fireData, map) {
  // This is used by onEachFeature to use the correct fire data for each popup
  var currentYear = 2004;

  // delete all the layers if they were already added
  if (firesLayer != null) 
  {
    for (var entry in firesLayer)
    {
      map.removeLayer(firesLayer[entry]);
    }
    firesLayer = {};
  };

  // For each different feature, in our case the amount of fires for the current year
  // Add a new popup
  function onEachFeature(feature, layer) 
  {
    // Add State name
    var popupValue = "<h3>" + feature.properties.name + "</h3>";
    if(feature.properties.fires != null)
    {
      // Add the fires for the current year
      popupValue += "<hr><p> Fires recorded: " + feature.properties.fires[currentYear] + "</p>";
    }

    // Add popup to current layer
    layer.bindPopup(popupValue, {'className' : 'firePopup'});    
  }

  // for each year in our timeline starting from 2004
  for(var i = 0 ; i < timeline[1] - timeline[0]; i++)
  {
    // Get current year starting from our first.
    var currYear = timeline[0] + i;
    // update currentl year for onEachFeature
    currentYear = currYear;

    // Get geoJson from geodata which already contains the fires 
    var currLayer = L.geoJSON(geoData, 
    {
      onEachFeature: onEachFeature,
      // Color each state based on amount of fires for that year
      style: function(feature) 
      {
        if(feature.properties.fires != null)
        {
          var d = feature.properties.fires[currYear];
          return  GetColor(d);
        }
        return {color: '#FFFFF', opacity:0.0};
      }
    });

    // map.addLayer(currLayer);
    firesLayer[currYear] = currLayer;
  }
  console.log(firesLayer);
	L.control.layers(firesLayer).addTo(map);
}

// Returns the color for a specified value
// the colors & range is currently set in the function itself
function GetColor(value) {
  // Map of colors to the different range of values
  var colors = ["#D9DBF1", "#85C7F2", "#175676","#FFE733", "#F57200", "#B80000"]
  var ranges = [500,1000,2000,4000,8000,12000]
  for(var i = 0 ; i < ranges.length; i++)
  {
    // if value is less than current range value
    // assign the color at the same index
    if(value < ranges[i])
    {
      return {color:colors[i],opacity:0.7};
    }
  }

  // if value is bigger than all our ranges
  // just return color value
  return {color: colors[colors.length - 1], opacity:0.7};
};