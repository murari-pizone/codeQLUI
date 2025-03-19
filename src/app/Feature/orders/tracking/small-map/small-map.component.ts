import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-small-map',
  standalone: true,
  imports: [],
  templateUrl: './small-map.component.html',
})
export class SmallMapComponent implements AfterViewInit {

  @Input() startLat: number = 51.505;  // Default start latitude
  @Input() startLng: number = -0.09;   // Default start longitude
  @Input() endLat: number = 51.515;    // Default end latitude
  @Input() endLng: number = -0.1;      // Default end longitude
  private map: L.Map | undefined;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [this.startLat, this.startLng],
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // this.addRouting();
  }

  // addRouting(): void {
  //   if (this.map) {
  //     const control = L.Routing.control({
  //       waypoints: [
  //         L.latLng(this.startLat, this.startLng),
  //         L.latLng(this.endLat, this.endLng)
  //       ],
  //       routeWhileDragging: true
  //     }).addTo(this.map);
  //     control
  //   }
  // }

  // addRouting(): void {
  //   if (this.map) {
  //     L.marker([this.startLat, this.startLng]).addTo(this.map);
  //     L.marker([this.endLat, this.endLng]).addTo(this.map);

  //     const control = L.Routing.control({
  //       waypoints: [
  //         L.latLng(this.startLat, this.startLng),
  //         L.latLng(this.endLat, this.endLng)
  //       ],
  //       routeWhileDragging: true
  //     }).addTo(this.map);
  //   }
  // }
}
