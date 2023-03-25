// Wait for the scene to load
document.querySelector('a-scene').addEventListener('loaded', function () {
  // Get the user's current location
  navigator.geolocation.getCurrentPosition(function (position) {
    // Set the GPS camera position
    var camera = document.querySelector('a-entity[camera]');
    camera.setAttribute('gps-camera', 'latitude:' + position.coords.latitude + '; longitude:' + position.coords.longitude + ';');
    
    // Get the destination entity
    var destination = document.querySelector('#destination');
    
    // Set the position of the destination entity based on its GPS coordinates
    var latitude = destination.getAttribute('gps-entity-place').latitude;
    var longitude = destination.getAttribute('gps-entity-place').longitude;
    destination.object3D.position.copy(camera.components['gps-camera'].convertCoordsFromLatLngToVec3(latitude, longitude));
  });
});
