myPOIs||alert("Points of interest could not be loaded!"),myMapStyles||alert("Map Styling could not be loaded!");function POIObject(t,e){this.location=ko.observable(t.location),this.address=ko.observable(t.address),this.title=ko.observable(t.title),this.mapMarker=new google.maps.Marker({position:this.location(),title:this.title(),animation:google.maps.Animation.DROP,map:e}),setMarkerAnimations(this.mapMarker),this.infoContent="<div>blah blah</div>",this.infowindow=new google.maps.InfoWindow({content:this.infoContent}),this.mapMarker.addListener("click",t=>{this.infowindow.open(e,this.mapMarker)})}function AppViewModel(t){const e=this;this.myPOIObjList=ko.observableArray(myPOIs.map(e=>new POIObject(e,t))),this.currentPOI=ko.observable({}),this.selectThisPOI=(e=>{toggleBounce.call(e.mapMarker),this.currentPOI(e,t)}),this.POIFilter=ko.observable(""),this.filterRegex=ko.computed(t=>{try{return new RegExp(e.POIFilter())}catch(t){return alert("Invalid Input!"),new RegExp("")}}),this.filteredPOIList=ko.computed(i=>{const o=e.myPOIObjList().filter(t=>e.filterRegex().test(t.title().toLowerCase()));return updateMarkers(this.myPOIObjList(),o,t),o})}function init(){const t=initMap();ko.applyBindings(new AppViewModel(t))}