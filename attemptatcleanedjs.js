// Immutable data
var amsterdamPosition = {lat: 52.368189, lng: 4.899431};

var locationsAmsterdam = [
        { name: 'Mook Pancakes', position: {lat: 52.368897, lng: 4.902816}},
        { name: 'Back to Black', position: {lat: 52.361521, lng: 4.888642}},
        { name: 'Zoku', position: {lat: 52.364461, lng: 4.906445}},
        { name: 'Omelegg', position: {lat: 52.353339, lng: 4.891412}},
        { name: 'Plantage', position: {lat: 52.366812, lng: 4.912598}}
    ];

// Sidebar functionality
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

function createInfoWindow(marker,gmap) {
    marker.setAnimation(google.maps.Animation.DROP);
    var infowindow = new google.maps.InfoWindow();
    infowindow.marker = marker;
    infowindow.setContent(marker.title);
    infowindow.open(map, marker);
}

function clickPlace(place) {
    console.log(gmap);
    var marker= new google.maps.Marker({position: place.position, map: gmap, title: place.name});
    createInfoWindow(marker, gmap);
}

// Google Maps: Initiliazing map and provide marker functionality
function initMap() {
    // The map, centered at Amsterdam
    var gmap = new google.maps.Map(document.getElementById('map'), {zoom: 14, center: amsterdamPosition});

    for (var i = 0; i < locationsAmsterdam.length; i++) {
         // Adding marker to Map
         var marker= new google.maps.Marker({position: locationsAmsterdam[i].position, map: gmap, title: locationsAmsterdam[i].name});

        // Listen for click and open infowindow
         marker.addListener('click', function() {
             createInfoWindow(this, gmap);
         });
     }
}

// Google Maps: Gracefully handling errors
function errorMap() {
    alert('Ouch, something went wrong there, please refresh the page');
}

// Viewmodel
function AppViewModel() {
    var self = this;

    // Filter functionality
    var places = ko.observableArray(locationsAmsterdam);
    self.query = ko.observable('');
    self.filteredPlaces = ko.computed(
    function () {
           var search = self.query().toLowerCase();
           return ko.utils.arrayFilter(places(), function (place) {
               return place['name'].toLowerCase().indexOf(search) >= 0;
           });
    });
}


// Activating knockout.js
ko.applyBindings(new AppViewModel());