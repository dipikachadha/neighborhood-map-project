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


// Define map color styles
const myMapStyles = [
    {
        featureType: 'water',
        stylers: [{color: '#19a0d8'}]
    },{
        featureType: 'administrative',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#ffffff'}, {weight: 6}]
    },{
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [{color: '#e85113'}]
    },{
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#efe9e4'}, {lightness: -40}]
    },{
        featureType: 'transit.station',
        stylers: [{weight: 9}, {hue: '#e85113'}]
    },{
        featureType: 'road.highway',
        elementType: 'labels.icon',
        stylers: [{visibility: 'off'}]
    },{
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{lightness: 100}]
    },{
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{lightness: -100}]
    },{
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{visibility: 'on'}, {color: '#f0e4d3'}]
    },{
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [{color: '#efe9e4'}, {lightness: -25}]
    }
];

// Define the areas I want to highlight in the map
const myPOIs = [
    {
        title: 'Nazara Indian Bistro',
        location: {lat: 35.7891879, lng: -78.8492855},
        address: '1945 High House Rd, Cary, NC 27519'
    },{
        title: 'Cilantro Indian Cafe',
        location: {lat: 35.7382482, lng: -78.7982457},
        address: '107 Edinburgh S Dr #107, Cary, NC 27511'
    },{
        title: 'Methai Indian Cafe',
        location: {lat: 35.7905911, lng: -78.7664929},
        address: '744 E Chatham St, Cary, NC 27511'
    },{
        title: 'Tangerine Cafe',
        location: {lat: 35.7665213, lng: -78.81936},
        address: '2422 SW Cary Pkwy, Cary, NC 27513'
    },{
        title: 'Kababish Cafe',
        location: {lat: 35.7839237, lng: -78.7876353},
        address: '201 W Chatham St #103, Cary, NC 27511'
    }
];
