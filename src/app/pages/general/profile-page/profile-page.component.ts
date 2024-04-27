import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  templateUrl: './profile-page.component.html',
  imports: [HeaderComponent],
})
export class ProfilePageComponent {
  constructor() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) window.location.href = '/';
  }
  auth = inject(AuthService);

  userImage = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;

  userFamilyName = JSON.parse(sessionStorage.getItem('loggedInUser')!)
    .family_name;

  userGivenName = JSON.parse(sessionStorage.getItem('loggedInUser')!)
    .given_name;

  userEmail = JSON.parse(sessionStorage.getItem('loggedInUser')!).email;
}
