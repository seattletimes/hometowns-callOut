//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

var ich = require("icanhaz");
var templateFile = require("./_popup.html");
ich.addTemplate("popup", templateFile);

// var onEachFeature = function(feature, layer) {
// 	layer.bindPopup(ich.popup(feature.properties))
// };
var $ = require("jquery");
var data = require("./hometown.geo.json");
var all = "groups";
var s = "info"
var currentItem = null;

var onEachFeature = function(feature, layer) {
  feature.layer = layer;
  layer.on('click', function(e) {
    currentItem = feature;
    var container = $(".pop-container");
    container.html(ich.popup(feature.properties));
    $(".close").click(function() {
      container.html("");
    });
  });
};

map.scrollWheelZoom.disable();

var getColor = function(d) {
    var value = d[all];
    console.log(value)
    if (typeof value != "undefined") {
      // condition ? if-true : if-false;
     return value == "g1" ? '#c7e9c0' :
     		value == "g2" ? '#74c476' :
            value == "g3" ? '#238b45' :
            value == "g4" ? '#00441b' :
             '#00441b' ;
    } else {
      return "gray"
    }
  };

function getStroke(s) {
 return s == "INFO" ? 2 : .2
}

function geojsonMarkerOptions(feature) {
	console.log(feature.properties.photo)

  return {
    radius: 6,
    className: "leaflet-clickable groups-marker " + feature.properties.groups,
    fillColor: getColor(feature.properties),
    color: "#000000",
    weight: getStroke(feature.properties.info),
    opacity: 1,
    fillOpacity: 0.5,
  }
};

var geojson = L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
        var marker = L.circleMarker([latlng.lat, latlng.lng]);
      return marker;
    },
    style: geojsonMarkerOptions,
    onEachFeature: onEachFeature
}).addTo(map);



var controls = document.querySelector(".radio-block");

var onChange = function() {
  //find the radio button that's currently checked
  var value = document.querySelector(`input[name="groups"]:checked`).id;
  element.setAttribute("data-filter", value); 
};

controls.addEventListener("change", onChange);
onChange(); 

var onEachFeature = function(feature, layer) {
	  layer.bindPopup(ich.popup(feature.properties))
};

map.scrollWheelZoom.disable();
map.setView([48, -80], 2);