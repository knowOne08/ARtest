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
    let testEntityAdded = false;

    const el = document.querySelector("[gps-new-camera]");

    el.addEventListener("gps-camera-update-position", e => {

        loadPlaces(e.detail.position)// passing the position to find the current position
            .then((places) => {
                places.forEach((place) => {
                    const latitude = place.location.lat;
                    const longitude = place.location.lng;

                    const entity = document.createElement("a-box");
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
                    entity.addEventListener('loaded', () => {
                        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
                    });
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