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
