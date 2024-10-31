import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  AbstractControlOptions,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistroEmpleadoDTO } from '../../dto/registro-empleado-dto';
import { AlertaComponent } from '../alerta/alerta.component';
import { PublicService } from '../../services/public.service';
import { AuthService } from '../../services/auth.service';
import { AlertaDTO } from '../../dto/alerta-dto';
import { TipoDocumentoDTO } from '../../dto/tipo-documento-dto';
import { TipoEmpleadoDTO } from '../../dto/tipo-empleado-dto';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    AlertaComponent
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  registroEmpleadoDTO: RegistroEmpleadoDTO;
  tiposDocumento: TipoDocumentoDTO[];
  cargos: TipoEmpleadoDTO[];
  alerta!:AlertaDTO;

  constructor(private publicService: PublicService, private authService: AuthService, private router: Router) {
    this.tiposDocumento = [];
    this.cargarTiposDocumento();
    this.cargos = [];
    this.cargarCargos();
    this.registroEmpleadoDTO = {
      nro_documento: 0,
      tipo_documento: 0,
      cargo: 0,
      salario: 0,
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      correo: '',
      password: '',
      confirm_password: ''
    }
  }

  private cargarTiposDocumento() {
    this.publicService.obtenerTiposDocumento().subscribe({
      next: (data) => {
        const abreviaciones = data.respuesta.map((item: TipoDocumentoDTO) => item.abreviacion);

        this.tiposDocumento = abreviaciones;
      },
      error: (error) => {
        console.log('Error al cargar los tipos de documento', error);
      },
    });
  }

  private cargarCargos() {
    this.publicService.obtenerCargos().subscribe({
      next: (data) => {
        const cargos = data.respuesta.map((item: TipoEmpleadoDTO) => item.nombre_cargo);

        this.cargos = cargos;
      },
      error: (error) => {
        console.log('Error al cargar los cargos', error);
      },
    });
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
