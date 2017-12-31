function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map-area'), {
    center: {lat: 35.7881812, lng: -78.7951261},
    zoom: 12,
  });

  const largeInfowindow = new google.maps.InfoWindow();
}
