myPOIs || Error('Points of interest could not be loaded!');
myMapStyles || Error('Map Styling could not be loaded!');

// We make a POIObject out of all POI (Point of Interest) data. This
// object should contain the POI's KO properties and the associated
// marker in the maps.
function POIObject (POI) {
  let that = this; // save context

  this.location = ko.observable(POI.location);
  this.address = ko.observable(POI.address);
  this.title = ko.observable(POI.title);

  this.matchesSearch = true;
  // this.matchesSearch = ko.computed(_ => {
  //   const regex = new RegExp(POIFilter());
  //   return regex.test(this.title.toLowercase());
  // });
  //
  this.mapMarker = new google.maps.Marker({
    position: that.location(),
    title: that.title(),
    animation: google.maps.Animation.DROP,
    map: that.map
  });
}

function AppViewModel () {
  const that = this; // save the context for referring later on if need be.

  // We need a KO observable array of POIs. This helps HTML view bindings and
  // help filter as well using KO.
  this.myPOIObjList = ko.observableArray(
    myPOIs.map(POI => new POIObject(POI, map)));

  this.currentPOI = ko.observable({});

  this.selectThisPOI = POI =>
    {
      console.log(`Selected ${POI.title()}`);
      this.currentPOI(POI);
    };

  this.POIFilter = ko.observable("");

  ko.computed(_ =>
    that.myPOIObjList(
      that.myPOIObjList().filter(POI => POI.matchesSearch)));
}

function init () {
  const map = initMap();
  ko.applyBindings(new AppViewModel());
}
