import { Component } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { GoogleLoginComponent } from '../../../components/google-login/google-login.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.component.html',
  imports: [HeaderComponent, GoogleLoginComponent],
})
export class HomePageComponent {
  // propriété de la page home-page
  //est directement disponible dans le template de home-page
  public pageName = 'Home';
}
