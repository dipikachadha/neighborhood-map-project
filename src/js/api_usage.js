// Enable strict mode JS
"use strict";

// This script contains methods pertaining to third party API
// usage, such as FourSquare API.
const apiKeys = {
  fsApi: {
    client_sec: 'N3GKXU5CXFUWGHBGXBMSEOHZCKCXEW5CPFBKLQ5OIWRYDNTA',
    client_id: 'N3GQ2ZBGXWLE1ZWXIB3SN44Z3HNO2KOKRUGJ1DYAZMEUTDX0'
  }
};

function getFourSquareData (POIObj) {
  const fsApiUrl = 'https://api.foursquare.com/v2/venues/search?ll='+
    POIObj.location().lat + ',' + POIObj.location().lng +
    '&client_id=' + apiKeys.fsApi.client_sec +
    '&client_secret=' + apiKeys.fsApi.client_id +
    '&v=20170801' + '&query=' + POIObj.title().split(' ')[0] + '&limit=1';

  let fsApiData = {state: 'untouched'};
  let processFsApiResponseInContext =
    _.partial(processFsApiResponse, POIObj);

  fetch(fsApiUrl)
    .then(response => response.json())
    .then(processFsApiResponseInContext)
    .catch(err => alert('FourSquare data could not be loaded!' +
      err + '\n\nAll other functions on map should work fine.'));
}

// Function to handle FourSquare API response.
function processFsApiResponse (context, response) {
  // response.response.venues = response.response.venues.length == 1;
  let venue_name = 'Not Available!', venue_address = 'Not Available!';
  try {
    venue_name = response.response.venues[0].name;
    venue_address =
      response.response.venues[0].location.formattedAddress.join('\n')
  } finally {
    // That's fine...
  }

  context.infowindow = new google.maps.InfoWindow({
    content: `<div class="api_results">
    <h4>FourSquare Results</h4>
    <table id="producttable">
      <tbody>
        <tr>
          <td>Name</td>
          <td>${venue_name}</td>
        </tr>
        <tr>
          <td>Address</td>
          <td>${venue_address}</td>
        </tr>
      </tbody>
    </table>
    </div>`
  });

  // google.maps.event.addDomListener(window, 'resize', function() {
  //         context.infowindow.close();
  //       });
    // debugger;
}

// Function to get search results from FourSquare API.
function getFourSquareResults (area='cary,nc') {
  const fsApiSearchUrl = 'https://api.foursquare.com/v2/venues/search?' +
    'near=' + area + '&client_id=' + apiKeys.fsApi.client_sec
    '&client_secret=' + apiKeys.fsApi.client_id +
    '&v=20170801&query=park&categoryId=4bf58dd8d48988d163941735&limit=20';

  let fsApiSearchResults = {state: 'not yet searched'};
  fetch(fsApiSearchUrl)
    .then(response => response.json())
    .then(response => fsApiSearchResults = getApiResponse(response))
}
