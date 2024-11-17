import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  mostrarElementos: boolean = true;
  correo: string = '';
  isLoggedIn: boolean = false;
  userMenuOpen: boolean = false;

  constructor(private router: Router, private authService: AuthService, private tokenService: TokenService) {
    this.router.events.subscribe(() => {
      this.verificarRuta();
    });
    this.isLoggedIn = this.tokenService.isLogged();
    this.verificarToken();
  }

  verificarRuta() {
    const rutaActual = this.router.url;
    if (['/login'].includes(rutaActual)) {
      this.mostrarElementos = false;
    } else {
      this.mostrarElementos = true;
    }
  }

  verificarToken() {
    const token = this.tokenService.getToken();
    if (token) {
      const payload = this.tokenService.decodePayload(token);
      this.isLoggedIn = true;
      this.correo = payload.correo || '';
    } else {
      this.isLoggedIn = false;
      this.correo = '';
    }
  }

  toggleUserMenu() {
    this.userMenuOpen = !this.userMenuOpen;
  }

  logout() {
    this.tokenService.logout();
    this.userMenuOpen = !this.userMenuOpen;
  }

}
