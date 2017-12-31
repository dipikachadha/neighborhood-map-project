myPOIs || Error('Points of interest could not be loaded!');
myMapStyles || Error('Map Styling could not be loaded!');

function KOObjectPOI (POI) {
  this.location = ko.observable(POI.location);
  this.address = ko.observable(POI.address);
  this.title = ko.observable(POI.title);
}

function AppViewModel () {
  const that = this; // save the context for referring later on if need be.

  // We need a KO observable array of POIs. This helps HTML view bindings and
  // help filter as well using KO.
  this.myPOIsKOList = ko.observableArray(
    myPOIs.map(POI => new KOObjectPOI (POI)));

  this.currentPOI = ko.observable({});

  this.selectThisPOI = POI =>
    {
      console.log(`Selected ${POI}`);
      this.currentPOI(POI);
    };

  this.POIFilter = ko.observable("");
}

$(ko.applyBindings(new AppViewModel()));

function initMap() {
    // The area where the map would center on
    const cary_NC = {lat: 35.7881812, lng: -78.7951261};

    // Constructor creates a new map - only center and zoom are required.
    const map = new google.maps.Map(document.getElementById('map'), {
        center: cary_NC,
        zoom: 12,
        style: myMapStyles
    });

    const markersArray = myPOIs.map(
        POI => {
            new google.maps.Marker({
                position: POI.location,
                map: map
            });
        }
    );
}
