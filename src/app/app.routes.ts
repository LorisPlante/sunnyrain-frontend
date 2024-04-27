import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/general/home-page/home-page.component';
import { NotFoundComponent } from './pages/general/not-found/not-found.component';
import { MapPageComponent } from './pages/general/map-page/map-page.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import { ProfilePageComponent } from './pages/general/profile-page/profile-page.component';
import { HistoryPageComponent } from './pages/general/history-page/history-page.component';

export const routes: Routes = [
  { path: '', component: GoogleLoginComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'carte', component: MapPageComponent },
  { path: 'profil', component: ProfilePageComponent },
  { path: 'historique', component: HistoryPageComponent },

  //   404 always last
  { path: '**', component: NotFoundComponent },
];
