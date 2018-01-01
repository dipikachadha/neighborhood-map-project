// This script contains methods pertaining to third party API
// usage, such as FourSquare API.
function getFourSquareData (POIObj) {
  const fsApiUrl = 'https://api.foursquare.com/v2/venues/search?ll='+
    POIObj.location.lat + ',' + POIObj.location.lng +
    '&client_id=' + 'N3GKXU5CXFUWGHBGXBMSEOHZCKCXEW5CPFBKLQ5OIWRYDNTA' +
    '&client_secret=' + 'N3GQ2ZBGXWLE1ZWXIB3SN44Z3HNO2KOKRUGJ1DYAZMEUTDX0' +
    '&v=20170801' + '&query=' + POIObj.title.split(' ')[0] + '&limit=1';

  let fsApiData = {state: 'untouched'};
  const that = this;
  fetch(this.fsApiUrl)
    .then(response => response.json())
    .then(response => {
      that.fsApiData = response;
    })
    .catch(err => console.log(err));

  // Add an Info Box related to each element. This will eventually
  // hold data collected from the APIs.
  return `<div>
    <h3>FourSquare Results</h3>
    ${JSON.stringify(that.fsApiData)}
    </div>`;
}
