import { AfterViewInit, Component, NgModule } from '@angular/core';
import * as L from 'leaflet';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import {
  WeatherService,
  WeatherForHistory,
} from '../../../services/weather.service';
import { lastValueFrom } from 'rxjs';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-map-page',
  standalone: true,
  templateUrl: './map-page.component.html',
  providers: [WeatherService, CommonModule],
  imports: [HttpClientModule, RouterLink, HeaderComponent, NgIf],
})
export class MapPageComponent implements AfterViewInit {
  public seeMore: boolean = false;
  toggleWeatherData() {
    document.getElementById('dataToToggle')?.classList.toggle('opacity-0');
    document.getElementById('dataToToggle')?.classList.toggle('opacity-100');
    document.getElementById('dataToToggle')?.classList.toggle('h-0');
    document.getElementById('dataToToggle')?.classList.toggle('h-32');
    this.seeMore = !this.seeMore;
  }
  constructor(private weatherService: WeatherService) {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) window.location.href = '/';
  }

  private map!: L.Map;

  public data!: WeatherForHistory;

  ngAfterViewInit(): void {
    this.getCurrentLocation();
  }

  async getCoords(lat: number, lon: number) {
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')!);
    // console.log(loggedInUser);
    const email = loggedInUser['email'];

    let response = await lastValueFrom(
      this.weatherService.coordinates(lat, lon, email)
    );

    return response;
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.data = await this.getCoords(coords.lat, coords.lng);

          this.createMap(coords);
          this.addMarker({
            coords,
            text: '<p class="font-bold block w-full text-center">Votre position !</p>',
            open: true,
          });
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération de la localisation',
            error
          );
          this.createMap({ lat: 48.866667, lng: 2.333333 });
        }
      );
    } else {
      console.error("la géolocation n'est pas supportée pas ce navigateur");
      this.createMap({ lat: 48.866667, lng: 2.333333 });
    }
  }

  createMap(coords: { lat: number; lng: number }) {
    const zoomLevel = 6;

    var southWest = L.latLng(-90, -180);
    var northEast = L.latLng(90, 180);
    var bounds = L.latLngBounds(southWest, northEast);

    this.map = L.map('map', {
      center: [coords.lat, coords.lng],
      zoom: zoomLevel,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
    });

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      {
        minZoom: 3,
        maxZoom: 20,
        subdomains: 'abcd',
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a href="https://carto.com/attributions">CARTO</a>&nbsp;&nbsp;',
      }
    ).addTo(this.map);
  }

  addMarker({
    coords,
    text,
    open,
  }: {
    coords: { lat: number; lng: number };
    text: string;
    open: boolean;
  }) {
    const iconOptionsCurrent = L.icon({
      iconUrl: './assets/medias/img/svg/marker.svg',
      iconSize: [35, 35],
    });
    const marker = L.marker([coords.lat, coords.lng], {
      icon: iconOptionsCurrent,
    });
    marker.addTo(this.map).bindPopup(text, { autoClose: false });
    if (open) {
      marker.openPopup();
    }
  }

  // redirectHistory() {
  //   window.location.href = '/history';
  // }
}
