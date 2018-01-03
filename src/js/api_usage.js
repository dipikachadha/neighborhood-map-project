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
    .then(response => {
      // FourSquare needs venue-id to return ratings for the venue
      const newReqUrl = 'https://api.foursquare.com/v2/venues/' +
        response.response.venues[0].id + '?&client_id=' +
        apiKeys.fsApi.client_sec + '&client_secret=' + apiKeys.fsApi.client_id +
        '&v=20170801';
      fetch(newReqUrl)
        .then(response => response.json())
        .then(processFsApiResponseInContext)
        .catch(err => alert('Final call: FourSquare data could not be loaded!' +
          err + '\n\nAll other functions on map should work fine.'));
    })
    .catch(err => alert('Init data: FourSquare data could not be loaded!' +
      err + '\n\nAll other functions on map should work fine.'));
}

// Function to handle FourSquare API response.
function processFsApiResponse (context, response) {
  // response.response.venues = response.response.venues.length == 1;
  let venue_name = 'Not Available!', venue_address = 'Not Available!',
    venue_url = 'Not Available!', venue_ratings = ['Not Available!', '#000'];
  try {
    venue_name = response.response.venue.name;
  } finally {};
  try {
    venue_address =
      response.response.venue.location.formattedAddress.join('\n');
  } finally {};
  try {
    venue_url = response.response.venue.canonicalUrl;
  } finally {};
  try {
    venue_ratings = [response.response.venue.rating + '/10',
      '#' + response.response.venue.ratingColor];
    venue_ratings = venue_ratings[0] !== 'undefined/10' ? venue_ratings :
      ['Not Available!', '#000'];
  } catch(e) {
      venue_ratings = ['Not Available!', '#000'];
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
          <td>URL</td>
          <td>${venue_url}</td>
        </tr>
        <tr>
          <td>Rating</td>
          <td style="color: ${venue_ratings[1]}; font-weight: bold">
            ${venue_ratings[0]}</td>
        </tr>
      </tbody>
    </table>
    </div>`
  });
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
