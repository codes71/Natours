const mapBox = document.getElementById('map');

/* eslint-disable */
const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoidGh1cmE3MTIiLCJhIjoiY21iOThlcmtlMGUyMTJpc2I1MTQ4cTR4byJ9.JTZti8CaOwNSxqxrqwOQqQ';
  // console.log(locations);
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/thura712/cmb999t1r00u001sdgj5nfrto',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    // interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
if (mapBox) {
// console.log(mapBox);

  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}
