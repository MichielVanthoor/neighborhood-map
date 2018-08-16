// Static data
var amsPosition = {lat: 52.368189, lng: 4.899431};

var amsLocations = [
        { name: 'Mook Pancakes', position: {lat: 52.368897, lng: 4.902816}},
        { name: 'Back to Black', position: {lat: 52.361521, lng: 4.888642}},
        { name: 'Zoku', position: {lat: 52.364461, lng: 4.906445}},
        { name: 'Omelegg', position: {lat: 52.353339, lng: 4.891412}},
        { name: 'Plantage', position: {lat: 52.366812, lng: 4.912598}}
];

// Provide Sidebar functionality
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

// Gracefully handling Google Maps error
function errorMap() {
    alert('Ouch, something went wrong there, please refresh the page');
}

// MVVM - Viewmodel
function AppViewModel() {
    var self = this;

    // Filter functionality
    var places = ko.observableArray(amsLocations);
    self.query = ko.observable('');
    self.filteredPlaces = ko.computed(
    function () {
           var search = self.query().toLowerCase();
           return ko.utils.arrayFilter(places(), function (place) {
               return place['name'].toLowerCase().indexOf(search) >= 0;
           });
    });

    // The map, centered at Amsterdam
    var map = new google.maps.Map(
    document.getElementById('map'), {zoom: 14, center: amsPosition});

    self.initMap = function() {
        // Add markers to the map
        for (var i = 0; i < amsLocations.length; i++) {
            var marker= new google.maps.Marker({position: amsLocations[i].position, map: map, title: amsLocations[i].name});

            // Listen for click and open infowindow if needed
            marker.addListener('click', function() {
                createInfoWindow(this);
            });
        }
    }

    self.initMap();

    function createInfoWindow(marker) {
        // Foursquare search api
        var foursquareSearchApi = "https://api.foursquare.com/v2/venues/search";
        var foursquareVenuesApi = "https://api.foursquare.com/v2/venues/"

        // API parameters
        var client_id = "30QOMK0YSPXYE4KITHIQ31EGXR4JKMSLQJL20OOF5INLMONP";
        var client_secret = "MUVZHUGKAARQQLQONA5KQU0A2PAVCLJARH0KYC3SX2OL1MXI";
        var version = "20180816";
        var near = "Amsterdam";
        var query = marker.title;

        // Ajax request for ID and tips details from Foursquare
        $.ajax({
            url: foursquareSearchApi,
            data: {
                client_id: client_id,
                client_secret: client_secret,
                v : version,
                near : near,
                query : query
            },
            success: function(data) {
                var venue_id = data.response.venues[0].id;
                $.ajax({
                    url: foursquareVenuesApi+venue_id,
                    data :{
                        client_id: client_id,
                        client_secret: client_secret,
                        v : version,
                    },
                    success: function(data) {
                        var tip = data.response.venue.tips.groups[0].items[0].text;
                        infowindow.setContent('<div><b>'+ marker.title + '</b></div>'+
                            '<div><u>Fourquare intel:</u></div>' + '<div>'+ tip + '</div>');
                    },
                    error: function() {
                        alert("Oops, something went wrong, please try again.");
                    }
                });

            },
            error: function() {
                alert("Something went wrong, please try again.");
            }
        });

        // Set further Marker and Infowindow properties
        marker.setAnimation(google.maps.Animation.DROP);
        var infowindow = new google.maps.InfoWindow({maxWidth: 200});
        infowindow.marker = marker;
        infowindow.open(map, marker);
    }

    // Take action when place clicked in sidebar
    this.clickPlace = function(place) {
        // Adding marker to Map
        var marker= new google.maps.Marker({position: place.position, map: map, title: place.name});
        createInfoWindow(marker);
    };
}

// Activating knockout bindings
function launchApp() {
    ko.applyBindings(new AppViewModel());
}