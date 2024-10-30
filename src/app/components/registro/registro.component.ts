import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  AbstractControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistroEmpleadoDTO } from '../../dto/registro-empleado-dto';
import { PublicService } from '../../services/public.service';
import { AuthService } from '../../services/auth.service';
import { AlertaDTO } from '../../dto/alerta-dto';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  registroEmpleadoDTO: RegistroEmpleadoDTO;
  tiposDocumento: string[];
  alerta!:AlertaDTO;

  constructor(private publicService: PublicService, private authService: AuthService, private router: Router) {
    this.tiposDocumento =[];
    this.cargarTiposDocumento();
    this.registroEmpleadoDTO = {
      nro_documento: 0,
      tipo_documento: 0,
      cargo: 0,
      salario: 0,
      primer_nombre: '',
      segundo_nombre: '',
      primer_apeliido: '',
      segundo_apellido: '',
      correo: '',
      password: '',
      confirm_password: ''
    }
  }

  private cargarTiposDocumento() {
    this.tiposDocumento = ["Cédula de Ciudadania", "Cédula de Extranjería", "Permiso Especial de Permanencia", "Registro Civil", "Tarjeta de Identidad"];
  }

  public registrar() {
    if (this.sonIguales()) {
      this.authService.registrarEmpleado(this.registroEmpleadoDTO).subscribe({
        next: (data) => {
          this.alerta = {
            mensaje: data.respuesta,
            tipo: "success"
          }

          setTimeout(() => {
            this.router.navigate(['/activar-cuenta']);
          }, 1500);
        },
        error: (error) => {
          this.alerta = {
            mensaje: error.error.respuesta.token,
            tipo: 'danger',
          }

        }
      });
    } else {
      this.alerta = {
        mensaje: "Las contraseñas no coinciden",
        tipo: 'danger',
      }
    }
  }

  public sonIguales(): boolean {
    return this.registroEmpleadoDTO.password == this.registroEmpleadoDTO.confirm_password;
  }

}
