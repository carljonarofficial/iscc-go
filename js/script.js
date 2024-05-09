const statusAlert = document.getElementById("coordinates");
const gMapsLink = document.getElementById("gmaps-link");

var isccAreaBoundaries = [
    { lat: 17.579247, lng: 120.389173}, //celsite
    { lat: 17.579064, lng: 120.389577}, //near open lot
    { lat: 17.577177, lng: 120.388759}, //near shs bldg.
    { lat: 17.577492, lng: 120.387925}, //near coa
    { lat: 17.578471, lng: 120.388392}, //near nbi
    { lat: 17.578397, lng: 120.388783} //near canteen
];

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        statusAlert.innerHTML = "Geolocation is not supported by this browser.";
        statusAlert.style.backgroundColor = "red";
        statusAlert.style.color = "white";
        gMapsLink.style.display = "none";
    }
}

function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    document.querySelector("#latitude p").innerHTML = latitude;
    document.querySelector("#longitude p").innerHTML = longitude;

    var userPosition = { lat: latitude, lng: longitude };

    var insideISCC = isPointInsidePolygon(userPosition, isccAreaBoundaries);

    if (insideISCC) {
        statusAlert.innerHTML = "You are inside ISCC area.";
        statusAlert.style.backgroundColor = "green";
        statusAlert.style.color = "white";
    } else {
        statusAlert.innerHTML = "You are outside ISCC area.";
        statusAlert.style.backgroundColor = "yellow";
        statusAlert.style.color = "black";
    }
    gMapsLink.style.display = "inline-block";
    gMapsLink.href = `https://www.google.com/maps/search/?api=1&query=${latitude}%2C${longitude}`;
}

// Function to check if a point (latitude, longitude) is inside a polygon
function isPointInsidePolygon(point, polygon) {
  var x = point.lat;
  var y = point.lng;

  var inside = false;
  for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    var xi = polygon[i].lat;
    var yi = polygon[i].lng;
    var xj = polygon[j].lat;
    var yj = polygon[j].lng;

    var intersect = ((yi > y) != (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}