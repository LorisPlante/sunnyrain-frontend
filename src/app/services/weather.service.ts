import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environnement } from '../../environnement/environnement';

export interface WeatherForHistory {
  city: string;
  date: string;
  time: string;
  desc: string;
  temp: number;
  ressenti: number;
  speed: number;
  humidity: number;
  pression: number;
  sunrise: string;
  sunset: string;
}

type WeatherHistory = WeatherForHistory[];

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private httpClient: HttpClient) {}

  COORDS_URL = '/api';
  ROUTE_URL = '/data';

  coordinates(lat: number, lon: number, email: string) {
    return this.httpClient.post<WeatherForHistory>(
      environnement.BACK_URL + this.COORDS_URL + this.ROUTE_URL,
      {
        lat,
        lon,
        email,
      }
    );
  }

  getHistory(email: string) {
    return this.httpClient.get<WeatherHistory>(
      environnement.BACK_URL + this.COORDS_URL,
      {
        params: {
          email,
        },
      }
    );
  }
}
