# HomeComponent Documentation

HomeComponent manages a Leaflet map displaying dynamic markers for units. It includes search functionality and periodic updates for unit coordinates.

## Features

- **Leaflet Map Setup**: Configures map layers, zoom level, and initial center coordinates.
- **Dynamic Markers**: Updates markers by removing existing ones and adding new ones with updated coordinates.
- **Search Handling**: Filters units based on user input in a search field.
- **Marker Visibility**: Allows toggling visibility of unit markers on the map.

## Methods

- **updateMarkers()**: Manages marker updates by removing old markers and adding new ones based on unit data.
- **updateRandomCoordinates()**: Updates unit coordinates randomly to simulate movement, triggering marker updates.

## Lifecycle Hooks

- **AfterViewInit**: Sets up search input handling.
- **OnDestroy**: Cleans up subscriptions to prevent memory leaks.
