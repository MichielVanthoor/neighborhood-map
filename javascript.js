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
    this.option1 = "Mook Pancakes";
    this.option2 = "Back to Black";
    this.option3 = "Zoku";
    this.option4 = "Omelegg";
    this.option5 = "Plantage";

}

// Activating knockout.js
ko.applyBindings(new AppViewModel());




    // self.places = [
    //     { name: "mook_pancakes", location: {lat: 52.368897, lng: 4.902816}},
    //     { name: "back_to_black", location: {lat: 52.361521, lng: 4.888642}},
    //     { name: "zoku", location: {lat: 52.364461, lng: 4.906445}},
    //     { name: "omelegg", location: {lat: 52.353339, lng: 4.891412}},
    //     { name: "plantage", location: {lat: 52.366812, lng: 4.912598}},
    // ];    