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

  ko.computed(
    that.myPOIsKOList(that.myPOIsKOList().filter(
      POI => {
        console.log(this.POIFilter());
        const userInp = new RegExp(this.POIFilter());
        return userInp.test(POI.title);
      })
  ));
}

$(ko.applyBindings(new AppViewModel()));
