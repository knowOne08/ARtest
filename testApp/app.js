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
        // return Promise.resolve(HOME_PlACES[placeToFind]);
        return Promise.resolve(HOME_PlACES[0]);
    }
}

window.onload = () => {

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
      
    let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {
        
        loadPlaces(e.detail.position)// passing the position to find the current position
            .then((places) => {
                places.forEach((place) => {
                    
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;
                    const entity = document.createElement("a-entity");
                    entity.setAttribute('geometry', 'primitive: box');
                    entity.setAttribute("scale", {
                        x: 15, 
                        y: 15,
                        z: 15
                    });
                    entity.setAttribute('material', { color: 'red' } );
                    entity.setAttribute('gps-new-entity-place', {
                        latitude: latitude,
                        longitude: longitude
                    });
                    // entity.setAttribute('title',  place.name);
                    // entity.setAttribute('title',  place.name + " " + getDistanceFromLatLonInKm(position.coords.latitude,position.coords.longitude,latitude,longitude) + " km");
                    if(getDistanceFromLatLonInKm(e.detail.position.latitude,e.detail.position.longitude,latitude,longitude) > 2){
                        const text = document.createElement('a-text');
                        text.setAttribute('value', 'Reached Destination');
                        text.setAttribute('color', 'black');
                        text.setAttribute('gps-entity-place', `latitude: ${e.detail.position.latitude + 0.0001}; longitude: ${e.detail.position.longitude};`);
                        text.setAttribute('scale', '15 15 15');
                        document.querySelector("a-scene").appendChild(text);
                    } else {
                        document.querySelector("a-scene").appendChild(entity);
                    }
                    
                    
                    // console.log(getDistanceFromLatLonInKm(e.detail.position.latitude,e.detail.position.longitude,latitude,longitude))
                })
                
            })

            
           
           
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // OG CODE
        // if(!testEntityAdded) {
        //     // alert(`Got first GPS position: lon ${e.detail.position.longitude} lat ${e.detail.position.latitude}`);
        //     // Add a box to the north of the initial GPS position
        //     const entity = document.createElement("a-box");
        //     entity.setAttribute("scale", {
        //         x: 20, 
        //         y: 20,
        //         z: 20
        //     });
        //     entity.setAttribute('material', { color: 'red' } );
        //     entity.setAttribute('gps-new-entity-place', {
        //         latitude: e.detail.position.latitude + 0.001,
        //         longitude: e.detail.position.longitude
        //     });
        //     document.querySelector("a-scene").appendChild(entity);
        // }
        // testEntityAdded = true;
    });
};