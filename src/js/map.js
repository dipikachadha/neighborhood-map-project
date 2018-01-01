// The file contains all utility functions related to map and map
// objects such as markers.
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


// Function to create custom styled markers for the map.
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

// Function to update markers on the map as per search results.
function updateMarkers (fullList, filteredList, map) {
  // Add and remove markers as per the filtered list. This is done in
  // a two step approach:
  // 1. All fullList markers that are absent in filteredList are removed.
  // 2. All markers common to fullList and filteredList are added.
  // The second step seems redundant, but is essential to keep away from
  // losing all the markers over subsequent searches.

  // Remove markers for elements not present in filter
  _.difference(fullList, filteredList).forEach(
    POI => POI.mapMarker.setMap(null)
  );

  // Add ones in the intersection to avoid losing all markers
  _.intersection(fullList, filteredList).forEach(
    POI => POI.mapMarker.setMap(map)
  );
}

// Function to create bounce animations on the markers. Assumes
// correct `this' context.
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
