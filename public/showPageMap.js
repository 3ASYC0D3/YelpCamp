mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/mapbox/streets-v11', // style URL
center: campground.geometry.coordinates, // starting position [lng, lat]
zoom: 9 // starting zoom
});

const marker1 = new mapboxgl.Marker({color: 'orange'})
.setLngLat(campground.geometry.coordinates)
.addTo(map);