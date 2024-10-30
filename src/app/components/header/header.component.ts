import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

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

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(() => {
      this.verificarRuta();
    });
  }

  verificarRuta() {
    const rutaActual = this.router.url;
    if (['/login', '/registro'].includes(rutaActual)) {
      this.mostrarElementos = false;
    } else {
      this.mostrarElementos = true;
    }
  }

}
