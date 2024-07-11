import {AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LeafletModule} from "@bluehalo/ngx-leaflet";
import  {icon, latLng, Marker, tileLayer} from 'leaflet';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import { Unit} from "./unit.model";
import {debounceTime, distinctUntilChanged, fromEvent, interval, map, Subscription} from "rxjs";
import {TableModule} from "primeng/table";
import {MapComponent} from "../map/map.component";
import * as L from 'leaflet';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LeafletModule,
    FormsModule,
    NgForOf,
    TableModule,
    MapComponent,
    NgIf,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private optionsSpec: any = {
    layers: [{url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: 'Open Street Map'}],
    zoom: 5,
    center: [26.8206, 30.8025]
  };

  public markers: Marker[] = [];
  // Leaflet bindings
  public options = {
    layers: [tileLayer(this.optionsSpec.layers[0].url, {attribution: this.optionsSpec.layers[0].attribution})],
    zoom: this.optionsSpec.zoom,
    center: latLng(this.optionsSpec.center)
  };
  public zoomLevels: number[] = [];
  public units: Unit[] = [];
  public originalUnits: Unit[] = [];
  private subscriptions: Subscription = new Subscription();
  @ViewChild('searchInput', {static: false}) searchInput: ElementRef | undefined;

  constructor(private zone: NgZone) {}

  public ngOnInit(): void {
    this.zoomLevels = Array.from({length: 15}, (v, k) => k + 1);
    this.units = [
      {id: 1, name: 'Toyota', latitude: 26.8206, longitude: 30.8025},
      {id: 2, name: 'Mercedes', latitude: 28.8206, longitude: 33.8025},
    ]
    this.originalUnits = [...this.units]
    this.updateMarkers()
    const updateCoordsInterval$ = interval(this.getRandomInterval(2000, 5000)).subscribe(() => {
      this.updateRandomCoordinates();
    });
    this.subscriptions.add(updateCoordsInterval$);
  }

  ngAfterViewInit() {
    const searchInput$ = fromEvent(this.searchInput?.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      })
      , debounceTime(500)
      , distinctUntilChanged()
    ).subscribe((text: string) => {
      if (!text) {
        this.units = [...this.originalUnits]
      }
      this.updateFilteredUnits(text);
    })
    this.subscriptions.add(searchInput$);
  }
  private updateFilteredUnits(searchText?: string): void {
    if (!searchText) {
      this.units = [...this.originalUnits];
    } else {
      this.units = this.originalUnits.filter(unit =>
        unit.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    this.updateMarkers();
  }

  private updateMarkers(): void {
    this.markers = [];
    this.units.forEach(unit => {
      if (!unit.isHidden){
        const newMarker: any = L.marker(
        [unit.latitude, unit.longitude],
        {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: '',
            iconRetinaUrl: 'assets/images/marker-icon-2x.png',
            shadowUrl: ''
          })
        }
      )
        this.markers.push(newMarker);
      }

    });
  }

  public showHideMarker(unit:Unit){
    unit.isHidden = !unit.isHidden
    console.log(unit.isHidden)
    this.updateMarkers()
  }

  private updateRandomCoordinates(): void {
    this.units.forEach((unit) => {
      unit.latitude = unit.latitude + 0.1 * (Math.random() - 0.5);
      unit.longitude = unit.longitude + 0.1 * (Math.random() - 0.5);
    });
    if (this.units.length === this.originalUnits.length){
      this.originalUnits = [...this.units];
    }
    this.updateMarkers();
  }

  private getRandomInterval(minInterval: number, maxInterval: number): number {
    return Math.floor(Math.random() * (maxInterval - minInterval + 1) + minInterval);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
