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
    .catch(err => Error(err));
}

// Function to handle FourSquare API response.
function processFsApiResponse (context, response) {
  context.infowindow = new google.maps.InfoWindow({
    content: `<div>
    <h3>FourSquare Results</h3>
    ${JSON.stringify(response)}
    </div>`
  });
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
