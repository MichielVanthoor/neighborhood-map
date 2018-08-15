// Static data
var amsPosition = {lat: 52.368189, lng: 4.899431};

var amsLocations = [
        { name: 'Mook Pancakes', position: {lat: 52.368897, lng: 4.902816}},
        { name: 'Back to Black', position: {lat: 52.361521, lng: 4.888642}},
        { name: 'Zoku', position: {lat: 52.364461, lng: 4.906445}},
        { name: 'Omelegg', position: {lat: 52.353339, lng: 4.891412}},
        { name: 'Plantage', position: {lat: 52.366812, lng: 4.912598}}
    ];

// Viewmodel
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

        function createInfoWindow(marker) {
            marker.setAnimation(google.maps.Animation.DROP);
            var infowindow = new google.maps.InfoWindow();
            infowindow.marker = marker;
            infowindow.setContent(marker.title);
            infowindow.open(map, marker);
        }

        // Placing the markers and p
        for (var i = 0; i < amsLocations.length; i++) {
            // Adding marker to Map
            var marker= new google.maps.Marker({position: amsLocations[i].position, map: map, title: amsLocations[i].name});

            // Listen for click and open infowindow
            marker.addListener('click', function() {
                createInfoWindow(this);
            });
        }
    }
    self.initMap();

    // Action when place clicked in sidebar
    this.clickPlace = function(place) {
        // Adding marker to Map
        var marker= new google.maps.Marker({position: place.position, map: map, title: place.name});
        createInfoWindow(marker);
    };

    // Twitter search api
    var twitterApi = "https://api.twitter.com/1.1/search/tweets.json";

    // Twitter client id and secret
    var client_id = "FZPMCSEYO134W0XYREE1QGP5TE4OXP2Z4QXCNAATK3MKIME0";
    var client_secret = "YGNCPSLBHXFWEFRWR3E3I4JUV3YHMKT0J3I53GDNTAVOUTXM";

    // Ajax request
    $.ajax({
        //  type: 'GET',
        url: twitterApi,
        data: {
            client_id: client_id,
            client_secret: client_secret,
        },
        headers: {

        },
        success: function(data) {
            console.log(data);
            var tweet = data.response.venues[0];

            contentString = tweet;
        },
        error: function() {
            contentString = "No tweets available. Please try again later!";
        }
    });
}

// Handling Maps error
function errorMap() {
    alert('Ouch, something went wrong there, please refresh the page');
}

// Sidebar functionality
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

// Activating knockout.js
function launchApp() {
    ko.applyBindings(new AppViewModel());
}