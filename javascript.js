var amsterdamPosition = {lat: 52.368189, lng: 4.899431};

var locationsAmsterdam = [
        { name: 'Mook Pancakes', position: {lat: 52.368897, lng: 4.902816}},
        { name: 'Back to Black', position: {lat: 52.361521, lng: 4.888642}},
        { name: 'Zoku', position: {lat: 52.364461, lng: 4.906445}},
        { name: 'Omelegg', position: {lat: 52.353339, lng: 4.891412}},
        { name: 'Plantage', position: {lat: 52.366812, lng: 4.912598}}
    ];

// Viewmodel
function AppViewModel() {
    var self = this;

    // Hardcoded geo-info for Amsterdam and point of interests
    places = ko.observableArray(locationsAmsterdam);

    // Filter functionality
    self.query = ko.observable('');

    self.filteredPlaces = ko.computed(
    function () {
           var search = self.query().toLowerCase();
           return ko.utils.arrayFilter(places(), function (place) {
               return place['name'].toLowerCase().indexOf(search) >= 0;
           });
    });

    this.initMap = function() {
        // Hardcoded geo-info

        // The map, centered at Amsterdam
        var map = new google.maps.Map(
        document.getElementById('map'), {zoom: 14, center: amsterdamPosition});

        for (var i = 0; i < locationsAmsterdam.length; i++) {
            self.marker = new google.maps.Marker({position: locationsAmsterdam[i].position, map: map});
        }
    }
    this.initMap();
}

// Maps error handling
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