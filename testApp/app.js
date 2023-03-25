// Wait for the scene to load
document.getElementById('scene').addEventListener('loaded',  () => {
  // Get the user's current location
  navigator.geolocation.watchPosition(function (position) {
    // Set the GPS camera position
    var camera = document.querySelector('a-entity[camera]');
    camera.setAttribute('gps-camera', 'latitude:' + position.coords.latitude + '; longitude:' + position.coords.longitude + ';');
    
    // Get the destination location
    var destination = document.querySelector('#destination');
    var destLatitude = destination.getAttribute('location-based').latitude;
    var destLongitude = destination.getAttribute('location-based').longitude;
    
    // Calculate the distance and bearing to the destination
    var distance = destination.getAttribute('location-based').distance;
    var bearing = calculateBearing(position.coords.latitude, position.coords.longitude, destLatitude, destLongitude);
    
    // Convert the bearing to radians
    var radBearing = bearing * (Math.PI / 180);
    
    // Calculate the position of the box relative to the user's location
    var boxPosition = calculatePosition(position.coords.latitude, position.coords.longitude, distance, radBearing);
    
    // Create a new entity for the box at the destination location
    var box = document.querySelector('#box');
    if (!box) {
      box = document.createElement('a-box');
      box.id = 'box';
      box.setAttribute('color', 'red');
      box.setAttribute('position', boxPosition.x + ' 1.6 ' + boxPosition.z);
      document.querySelector('a-scene').appendChild(box);
    } else {
      box.setAttribute('position', boxPosition.x + ' 1.6 ' + boxPosition.z);
    }
    
    // Check if the user is within a certain distance of the destination
    if (distance <= 20) {
      // Display a message or trigger an event
      console.log('You have reached your destination!');
    }
  });
});

// Helper function to calculate the bearing between two GPS coordinates
function calculateBearing(lat1, lon1, lat2, lon2) {
  var dLon = (lon2 - lon1) * (Math.PI / 180);
  var lat1Rad = lat1 * (Math.PI / 180);
  var lat2Rad = lat2 * (Math.PI / 180);
  var y = Math.sin(dLon) * Math.cos(lat2Rad);
  var x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
}

// Helper function to calculate a new GPS position given a distance and bearing
function calculatePosition(lat, lon, distance, bearing) {
  var R = 6371000; // Earth's radius in meters
  var lat1 = lat * (Math.PI / 180);
  var lon1 = lon * (Math.PI / 180);
  var lat2 = Math.asin(Math.sin(lat1) * Math.cos(distance / R) + Math.cos(lat1) * Math.sin(distance / R) * Math.cos(bearing));
  var lon2 = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(distance / R) * Math.cos(lat1), Math.cos(distance / R) - Math.sin(lat1) * Math.sin(lat2));
  var lat2Deg = lat2 * (180 / Math.PI);
  var lon2Deg = lon2 * (180 / Math.PI);
  return {
    lat: lat2Deg,
    lon: lon2Deg,
    x: (lon2Deg - lon) * (R * Math.cos(lat1)),
    z: (lat2Deg - lat) * R
  };
}
