import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LoginDTO } from '../../dto/login-dto';
import { AlertaDTO } from '../../dto/alerta-dto';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, FormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginDTO: LoginDTO;
  alerta!: AlertaDTO;
  mostrarAlerta: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {
    this.loginDTO = {
      correo: '',
      password: '',
    };
  }

  public logearse() {
    this.authService.loginCliente(this.loginDTO).subscribe({
      next: (data) => {
        this.tokenService.login(data.respuesta.token);

        const decodedToken = this.tokenService.decodePayload(
          data.respuesta.token
        );
        const usuario = decodedToken.correo;

        this.authService.setUser(usuario);

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        this.alerta = {
          mensaje: error.error.respuesta.token,
          tipo: 'danger',
        };
        this.mostrarAlerta = true;

        setTimeout(() => {
          this.mostrarAlerta = false;
          this.loginDTO.password = '';
        }, 2000);
      },
    });
  }
}
