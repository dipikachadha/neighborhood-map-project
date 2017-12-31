function initMap() {
    // The area where the map would center on
    const cary_NC = {lat: 35.7881812, lng: -78.7951261};

    // Constructor creates a new map - only center and zoom are required.
    return new google.maps.Map(document.getElementById('map'), {
        center: cary_NC,
        zoom: 12,
        style: myMapStyles
    });
}

function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
}

function setMarkerAnimations (marker) {
  const defaultIcon = makeMarkerIcon('0091ef');
  const highlightedIcon = makeMarkerIcon('FFFF24');

  // bounce on click
  marker.addListener('click', toggleBounce);
  // Create an onclick event to open the large infowindow at each marker.
  // marker.addListener('click', function() {
  //   populateInfoWindow(this, largeInfowindow);
  // });
  // Two event listeners - one for mouseover, one for mouseout,
  // to change the colors back and forth.
  marker.addListener('mouseover', function() {
    this.setIcon(highlightedIcon);
  });
  marker.addListener('mouseout', function() {
    this.setIcon(defaultIcon);
  });
}

function toggleBounce() {
  if (this.getAnimation() !== null) {
      this.setAnimation(null);
    } else {
      this.setAnimation(google.maps.Animation.BOUNCE);
      var obj=this;
      setTimeout(function() {
        obj.setAnimation(null);
      }, 2200);
    }
}
