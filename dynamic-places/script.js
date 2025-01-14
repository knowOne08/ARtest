
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const placeToFind = urlParams.get('v1');
// console.log(v)
// getting places from APIs or static places
function loadPlaces(position) {
    const method = 'static';
    // const method = 'api';
    if(method === 'static') {
        const CLG_PlACES = [
            {
                name: "LIBRARY",
                url:"./assets/arrow.gltf",
                location: {
                    lat: 23.108156404203143, // add here latitude if using static data
                    lng: 72.59498734978379, // add here longitude if using static data
                }
            },
            {
                name: "A-block",
                url:"./assets/arrow.gltf",
                location: {
                    lat: 23.1064422997269,  // add here latitude if using static data
                    lng: 72.59575386356772, // add here longitude if using static data
                }
            },
            {
                name: "M-Block",
                url:"./assets/arrow.gltf",
                location: {
                    lat: 23.10796558905296, // add here latitude if using static data
                    lng:  72.59461530062512, // add here longitude if using static data
                }
            },
            {
                name: "GTU",
                url:"./assets/arrow.gltf",
                location: {
                    lat: 23.105923398933385,  // add here latitude if using static data
                    lng: 72.59414710034639, // add here longitude if using static data
                }
            },
        ];
        const HOME_PlACES = [
           [ {
                name: "FireStation",
                url:"./assets/arrow.gltf",
                location: {
                    lat: 23.0560196454931,  // add here latitude if using static data
                    lng: 72.66744606670677, // add here longitude if using static data
                }
            }],
           [ {
                name: "Divit Hills",
                url:"./assets/arrow.gltf",
                location: {
                    lat: 23.05760351001347,   // add here latitude if using static data
                    lng: 72.66268710592351, // add here longitude if using static data
                }
            }],
           [ {
                name: "Shiv Residency",
                url:"./assets/arrow.gltf",
                location: {
                    lat: 23.057774877427374,  // add here latitude if using static data
                    lng: 72.66073728561422, // add here longitude if using static data
                }
            }],
        ];
        // console.log(HOME_PlACES)
        // console.log(HOME_PlACES[0]);
        return Promise.resolve(HOME_PlACES[placeToFind]);
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
    // const scene = document.querySelector('a-scene');
    const scene = document.querySelector('a-scene');

    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        let R = 6371; // Radius of the earth in km
        let dLat = deg2rad(lat2-lat1);  // deg2rad below
        let dLon = deg2rad(lon2-lon1); 
        let a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        let d = R * c; 
        // return d; // Distance in km
        return Math.round(d*1000); // Distance in m
      }
      
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }

      function heading(lat1,lon1,lat2,lon2){
        let dLon = lon2 - lon1;
        let y = Math.sin(dLon) * Math.cos(lat2);
        let x = x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
        return  Math.atan2(y, x) * 180 / Math.PI;
      }
    

    // first get current user location
    return navigator.geolocation.getCurrentPosition(function (position) {


        //ORIGINAl CODE
        // than use it to load from remote APIs some places nearby
        loadPlaces(position.coords)
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    // add place name
                    // const placeText = document.createElement('a-link');
                    const placeText = document.createElement('a-entity');
                    placeText.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
                    placeText.setAttribute('title',  place.name + " " + getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,latitude,longitude) +  " m");
                    // placeText.setAttribute('text',  "value: " + place.name + " " + getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,latitude,longitude) +  " m");
                    placeText.setAttribute('scale', '15 15 15');
                    // placeText.setAttribute('src', place.url);
                    placeText.setAttribute('gltf-model', place.url);
                    // placeText.setAttribute('position', "1 0 0");
                    // placeText.setAttribute('text',"value: Click Me; color: #FF0000; align: center; anchor: center; baseline: bottom; letter-spacing: 5; line-height: 1.5; opacity: 0.8;")
                    placeText.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    }); 

                    scene.appendChild(placeText);
                });
            })
        },


        //TESTING CODE
    //     loadPlaces(position.coords)
    //         .then((places) => {
    //             places.forEach((place) => {
    //             const latitude = place.location.lat;
    //             const longitude = place.location.lng;

    //             let arrow = document.getElementById('entity');
    //             arrow.setAttribute("position", "0 0 -" + getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,latitude,longitude));
    //             arrow.setAttribute("rotation", "0 " + heading(position.coords.latitude,position.coords.longitude,latitude,longitude) + " 0");
                
    //             arrow.addEventListener('loaded', () => {
    //                 window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
    //             });
    //             scene.appendChild(arrow);
    //         });
    //     })
    //     // console.log(getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,latitude,longitude))
    // },
    
    (err) => console.error('Error in retrieving position', err),
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000,
        }
    );
};
    
// })
