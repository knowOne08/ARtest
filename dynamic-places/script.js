// getting places from APIs
function loadPlaces(position) {
    const method = 'static';
    // const method = 'api';
    if(method === 'static') {
        return [
            {
                name: "LIBRARY",
                location: {
                    lat: 23.108156404203143, // add here latitude if using static data
                    lng: 72.59498734978379, // add here longitude if using static data
                }
            },
            {
                name: "A-block",
                location: {
                    lat: 23.1064422997269,  // add here latitude if using static data
                    lng: 72.59575386356772, // add here longitude if using static data
                }
            },
            {
                name: "M-Block",
                location: {
                    lat: 23.10796558905296, // add here latitude if using static data
                    lng:  72.59461530062512, // add here longitude if using static data
                }
            },
            {
                name: "GTU",
                location: {
                    lat: 23.105923398933385,  // add here latitude if using static data
                    lng: 72.59414710034639, // add here longitude if using static data
                }
            },
        ];
    } else {
        const params = {
            radius: 300,    // search places not farther than this value (in meters)
            clientId: '<your-client-id>',
            clientSecret: '<your-client-secret>',
            version: '20300101',    // foursquare versioning, required but unuseful for this demo
        };
    
        // CORS Proxy to avoid CORS problems
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    
        // Foursquare API (limit param: number of maximum places to fetch)
        const endpoint = `${corsProxy}https://api.foursquare.com/v2/venues/search?intent=checkin
            &ll=${position.latitude},${position.longitude}
            &radius=${params.radius}
            &client_id=${params.clientId}
            &client_secret=${params.clientSecret}
            &limit=30 
            &v=${params.version}`;
        return fetch(endpoint)
            .then((res) => {
                return res.json()
                    .then((resp) => {
                        return resp.response.venues;
                    })
            })
            .catch((err) => {
                console.error('Error with places API', err);
            })
    }
    
};


window.onload = () => {
    const scene = document.querySelector('a-scene');

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {

        // than use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    // add place name
                    const placeText = document.createElement('a-link');
                    placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    placeText.setAttribute('title', place.name);
                    placeText.setAttribute('scale', '15 15 15');
                    
                    placeText.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    });

                    scene.appendChild(placeText);
                });
            })
    },
        (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};
