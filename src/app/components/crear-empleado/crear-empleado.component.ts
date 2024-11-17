import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import {
  AbstractControlOptions,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TipoDocumentoDTO } from '../../dto/tipo-documento-dto';
import { PublicService } from '../../services/public.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { EmpleadoDTO } from '../../dto/empleado-dto';
import { CargoDTO } from '../../dto/cargo-dto';

@Component({
  selector: 'app-crear-empleado',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear-empleado.component.html',
  styleUrl: './crear-empleado.component.css'
})
export class CrearEmpleadoComponent {

  crearEmpleadoForm!: FormGroup;
  empleado: EmpleadoDTO;
  tipoDocumentoDTO: TipoDocumentoDTO[];
  cargos: CargoDTO[];
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private publicService: PublicService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router){
    this.crearEmpleadoForm = this.fb.group({
      nro_documento: ['', [Validators.required]],
      tipo_documento: ['', [Validators.required]],
      telefono: [''], //Opcional
      cargo: ['', [Validators.required]],
      salario: ['', [Validators.required]],
      primer_nombre: ['', [Validators.required]],
      segundo_nombre: [''], // Opcional
      primer_apellido: ['', [Validators.required]],
      segundo_apellido: [''], //Opcional
    });
    this.tipoDocumentoDTO = [];
    this.cargos = [];
    this.empleado = {
      nro_documento: 0,
      tipo_documento: 0,
      telefono: '',
      cargo: 0,
      salario: 0,
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: ''
    };
    this.obtenerTiposDocumento();
    this.obtenerCargos();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const nro_documento = params['nro_documento'];
      if (nro_documento) {
        this.isEditing = true;
        this.cargarDatosEmpleado(nro_documento);
      }
    });
  }

  cargarDatosEmpleado(nro_documento: number): void {
    this.userService.obtenerUnEmpleado(nro_documento).subscribe({
      next: (data) => {
        this.crearEmpleadoForm.patchValue(data.respuesta);
      },
      error: (error) => {
        console.error('Error al cargar cliente:', error);
      },
    });
  }

  obtenerTiposDocumento(): void {
    this.publicService.obtenerTiposDocumento().subscribe({
      next: (data) => {
        this.tipoDocumentoDTO = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  obtenerCargos(): void {
    this.publicService.obtenerCargos().subscribe({
      next: (data) => {
        this.cargos = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  cargarEmpleadoParaEditar(empleado: EmpleadoDTO): void {
    this.isEditing = true;
    this.crearEmpleadoForm.patchValue(empleado);
  }

  crearEmpleado(){
    const empleadoDTO = this.crearEmpleadoForm.value as EmpleadoDTO;
    this.userService.crearEmpleado(empleadoDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Crear Empleado',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });

        this.crearEmpleadoForm.reset();

        setTimeout(() => {
          this.router.navigate(['/gestion-empleados']);
        }, 1500);
      },
      error: (error) => {
        Swal.fire({
          title: 'Crear Empleado',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    });
  }

  public obtenerEmpleado(nro_documento: number): void {
    this.userService.obtenerUnEmpleado(nro_documento).subscribe({
      next: (data) => {
        this.empleado = data.respuesta;
        console.log(data.respuesta);
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      },
    });
  }

  actualizarEmpleado() {
    const empleadoDTO = this.crearEmpleadoForm.value as EmpleadoDTO;
    this.userService.actualizarEmpleado(empleadoDTO.nro_documento, empleadoDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Actualizar Empleado',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });

        this.crearEmpleadoForm.reset();
        this.isEditing = false;
        setTimeout(() => {
          this.router.navigate(['/gestion-empleados']);
        }, 1500);

      },
      error: (error) => {
        Swal.fire({
          title: 'Actualizar Empleado',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    });
  }
}
