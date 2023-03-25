// Initialize the AR.js scene
let scene = document.querySelector('a-scene');

// Wait for the scene to load before initializing the markers
scene.addEventListener('loaded', function () {
  // Initialize the markers
  let startMarker = document.querySelector('#start');
  let endMarker = document.querySelector('#end');

  // Add a click event listener to the end marker
  endMarker.addEventListener('click', function () {
    // Redirect the user to the start marker
    window.location.href = "#start";
  });
});