myPOIs || alert('Points of interest could not be loaded!');
myMapStyles || alert('Map Styling could not be loaded!');
"use strict";
// We make a POIObject out of all POI (Point of Interest) data. This
// object should contain the POI's KO properties and the associated
// marker in the maps.
function POIObject (POI, map) {
  const that = this; // save context

  this.location = ko.observable(POI.location);
  this.address = ko.observable(POI.address);
  this.title = ko.observable(POI.title);

  this.mapMarker = new google.maps.Marker({
    position: that.location(),
    title: that.title(),
    animation: google.maps.Animation.DROP,
    map: map
  });
  setMarkerAnimations(this.mapMarker);

  // Create an onclick event to open the info window at each
  // marker.
  this.openInfo = _ =>
    this.infowindow.open(map, this.mapMarker);

  this.mapMarker.addListener('click', this.openInfo);
}

function AppViewModel (map) {
  const that = this; // save the context for referring later on if need be.

  // We need a KO observable array of POIs. This helps HTML view bindings and
  // help filter as well using KO.
  this.myPOIObjList = ko.observableArray(
    myPOIs.map(POI => new POIObject(POI, map)));

  this.myPOIObjList().map(POI => getFourSquareData(POI));

  this.currentPOI = ko.observable({});

  this.selectThisPOI = POI =>
    {
      toggleBounce.call(POI.mapMarker);
      this.currentPOI(POI, map);
    };

  // The filter string is input by the user via the filter-string
  // input in HTML. It needs to be converted to a regex for matching
  // against the full list later on.
  this.POIFilter = ko.observable('');

  // Do the regex conversion here, and give a graceful alert if the
  // input string is not a valid regex. It would otherwise give a hairy
  // TypeError or something likewise in the console.
  this.filterRegex = ko.computed(_ => {
    try {
      return new RegExp(that.POIFilter());
    } catch (err) {
      alert('Invalid Input!');
      return new RegExp('');
    }
  });

  // Here we need to filter the myPOIObjList as per the user input above.
  // A new ko.computed needs to be used instead of modifying the original
  // myPOIObjList, else we risk losing the full list we had if there was
  // a bad search with no matches.
  this.filteredPOIList = ko.computed(_ => {
    // Filter the list first
    const filteredList = that.myPOIObjList().filter(
        POI => that.filterRegex().test(POI.title().toLowerCase())
      );
    updateMarkers(this.myPOIObjList(), filteredList, map);
    return filteredList;
    });
}

function init () {
  const map = initMap();

  // Save the context for the viewModel, in case we need to use the
  // properties in some other function. Thereafter, apply KO bindings.
  const viewModel = new AppViewModel(map);
  ko.applyBindings(viewModel);
}
