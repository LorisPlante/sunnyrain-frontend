import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  auth = inject(AuthService);
  private router = inject(Router);
  toggleMenu() {
    document.getElementById('burger')?.classList.toggle('rotate-90');
    document.getElementById('menu')?.classList.toggle('h-0');
    if (window.innerWidth <= 640) {
      document.getElementById('menu')?.classList.toggle('h-[236px]');
    } else {
      document.getElementById('menu')?.classList.toggle('h-[192px]');
    }
    document.getElementById('menu')?.classList.toggle('mt-4');
  }
  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.router.navigate(['/']);
  }
}
