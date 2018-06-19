// Maps functinonality
function initMap() {
  // Hardcoded geo-info for Amsterdam and point of interests
  var amsterdam = {lat: 52.368189, lng: 4.899431};
  var mook_pancakes = {lat: 52.368897, lng: 4.902816};
  var back_to_black = {lat: 52.361521, lng: 4.888642};
  var zoku = {lat: 52.364461, lng: 4.906445};
  var omelegg = {lat: 52.353339, lng: 4.891412};
  var plantage = {lat: 52.366812, lng: 4.912598};

  // The map, centered at Amsterdam
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 14, center: amsterdam});
  // The marker, positioned at the points of interest
  var marker = new google.maps.Marker({position: mook_pancakes, map: map});
  var marker = new google.maps.Marker({position: back_to_black, map: map});
  var marker = new google.maps.Marker({position: zoku, map: map});
  var marker = new google.maps.Marker({position: omelegg, map: map});
  var marker = new google.maps.Marker({position: plantage, map: map});
}

// Sidebar functionality
$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

// *Viewmodel*
function AppViewModel() {
    var self = this;
 
    self.places = ko.observableArray([
        { name: 'Mook Pancakes', location: {lat: 52.368897, lng: 4.902816}},
        { name: 'Back to Black', location: {lat: 52.361521, lng: 4.888642}},
        { name: 'Zoku', location: {lat: 52.364461, lng: 4.906445}},
        { name: 'Omelegg', location: {lat: 52.353339, lng: 4.891412}},
        { name: 'Plantage', location: {lat: 52.366812, lng: 4.912598}}
    ]);
}

// Activating knockout.js
ko.applyBindings(new AppViewModel());