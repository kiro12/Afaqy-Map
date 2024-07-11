import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {icon} from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  private map: L.Map | any;
  marker: any;

  public ngAfterViewInit(): void {
    this.initMap();
    this.marker = L.marker([27.8206, 30.8025], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: '',
        iconRetinaUrl: 'assets/images/marker-icon-2x.png',
        shadowUrl: ''
      })
    }).addTo(this.map);

  }

  private initMap(): void {

    this.map = L.map('map').setView([27.8206, 30.8025], 12);
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Open Street Map'
    });
    tiles.addTo(this.map);
    this.addRoutes()

  }

  private addRoutes() {
    this.map.on('click', (e: any) => {
      if (e.latlng) {
        const routingControl = L.Routing.control({

          waypoints: [
            L.latLng(27.8206, 30.8025),
            L.latLng(e.latlng.lat, e.latlng.lng),
          ]

        }).addTo(this.map);
        let routes;
        if (!routes) {
          routingControl.on('routesfound', (event: any) => {
            if (routes?.length > 0) {
              routes = null
            }
            routes = event.routes
            const routeCoordinates = routes[0].coordinates;
            routeCoordinates.forEach((coord: any, index: number) => {
              setTimeout(() => {
                this.marker.setLatLng([coord.lat, coord.lng]);
              }, 100 * index);
            });
          });
        }
      }
    });

  }


}
