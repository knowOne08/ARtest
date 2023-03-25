// Wait for the scene to load
document.querySelector('a-scene').addEventListener('loaded', function () {
    // Get the user's current location
    navigator.geolocation.watchPosition(function (position) {
      // Set the GPS camera position
      var camera = document.querySelector('a-entity[camera]');
      camera.setAttribute('gps-camera', 'latitude:' + position.coords.latitude + '; longitude:' + position.coords.longitude + ';');
      
      // Get the distance to the destination location
      var destination = document.querySelector('#destination');
      var distance = destination.getAttribute('location-based').distance;
      
      // Check if the user is within a certain distance of the destination
      if (distance <= 20) {
        // Display a message or trigger an event
        console.log('You have reached your destination!');
      }
    });
  });
  