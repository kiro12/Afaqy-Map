# MapComponent Documentation

MapComponent integrates Leaflet for map rendering and route visualization with dynamic marker updates.

## Initialization and Setup

- **ngAfterViewInit**: Initializes the map and adds a marker at a predefined location (`[27.8206, 30.8025]`) with a custom icon.

### Map Initialization

- **initMap()**: Sets up the Leaflet map instance (`this.map`) centered at `[27.8206, 30.8025]`, with OpenStreetMap tiles.

### Route Handling

- **addRoutes()**: Enables route creation on map click events, using Leaflet Routing Machine. It dynamically updates the marker position along the route coordinates.

## Components and Libraries

- **Leaflet**: Integrates Leaflet library for interactive map features.
- **Leaflet Routing Machine**: Utilizes the plugin for route calculation and visualization.

## Interaction

- **Click Events**: Listens for map clicks to initiate route calculation between a fixed starting point and the clicked location, updating the marker's position along the route.

This documentation provides an overview of MapComponent's key functionalities, focusing on map initialization, route handling, and interaction with users through Leaflet and Angular integration.
