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
  selector: 'app-registro-empleado',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    AlertaComponent
  ],
  templateUrl: './registro-empleado.component.html',
  styleUrl: './registro-empleado.component.css'
})
export class RegistroEmpleadoComponent {

  registroEmpleadoDTO: RegistroEmpleadoDTO;
  tiposDocumento: TipoDocumentoDTO[];
  cargos: TipoEmpleadoDTO[];
  objectoTipos: TipoDocumentoDTO[];
  objectoCargos: TipoEmpleadoDTO[];
  alerta!:AlertaDTO;

  constructor(private publicService: PublicService, private authService: AuthService, private router: Router) {
    this.tiposDocumento = [];
    this.objectoTipos = [];
    this.cargarTiposDocumento();
    this.cargos = [];
    this.objectoCargos = [];
    this.cargarCargos();
    this.registroEmpleadoDTO = {
      nro_documento: 0,
      tipo_documento: 0,
      cargo: 0,
      salario: 0,
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: ''
    }
  }

  private cargarTiposDocumento() {
    this.publicService.obtenerTiposDocumento().subscribe({
      next: (data) => {
        const abreviaciones = data.respuesta.map((item: TipoDocumentoDTO) => item.abreviacion);
        this.tiposDocumento = abreviaciones;
        this.objectoTipos = data.respuesta;
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
        this.objectoCargos = data.respuesta;
      },
      error: (error) => {
        console.log('Error al cargar los cargos', error);
      },
    });
  }

  public registrar() {
    const dtoParaEnviar = { ...this.registroEmpleadoDTO };

    const tipoDocumentoId = this.objectoTipos.find(
      (item) => item.abreviacion === String(this.registroEmpleadoDTO.tipo_documento)
    )?.id;

    const cargoId = this.objectoCargos.find(
      (item) => item.nombre_cargo === String(this.registroEmpleadoDTO.cargo)
    )?.id;

    dtoParaEnviar.tipo_documento = tipoDocumentoId ?? 0;
    dtoParaEnviar.cargo = cargoId || 0;
    console.log(dtoParaEnviar);

    this.authService.registrarEmpleado(dtoParaEnviar).subscribe({
      next: (data) => {
        this.alerta = {
          mensaje: data.respuesta,
          tipo: "success"
        }

        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (error) => {
        this.alerta = {
          mensaje: error.error.respuesta.token,
          tipo: 'danger',
        }

      }
    });
  }
}
