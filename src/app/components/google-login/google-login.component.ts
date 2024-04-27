declare var google: any;
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-google-login',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './google-login.component.html',
})
export class GoogleLoginComponent implements OnInit {
  private router = inject(Router);
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '820031334229-q3galbl1cj9psivtjmlhbn67pun68kes.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp),
    });

    google.accounts.id.renderButton(document.getElementById('google_btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'circle',
      width: 300,
    });
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  async handleLogin(response: any) {
    if (response) {
      console.log(response);
      const payLoad = this.decodeToken(response.credential);
      console.log(payLoad);
      sessionStorage.setItem('loggedInUser', JSON.stringify(payLoad));
      await this.inscriptionWithGoogle(payLoad);
    }
  }

  // async connectWithGoogle(data: { email: string }) {
  //   if (!data) throw new Error('No data received');
  //   const email = encodeURIComponent(data.email);
  //   const response = await fetch(
  //     `http://localhost:5000/user/:id?email=${email}`,
  //     {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   );

  //   if (!response.ok) console.log('Error connecting to the backend:', response);
  //   const responseData = await response.json();
  //   console.log('Response data:', responseData);
  //   if (responseData.result) {
  //     this.router.navigate(['/home']);
  //   } else {
  //     this.inscriptionWithGoogle(data);
  //   }
  // }

  async inscriptionWithGoogle(data: object) {
    try {
      const response = await fetch('http://localhost:5000/user/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('User email not verified');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error connecting to the backend:', error);
    }
  }
}
