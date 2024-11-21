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
import Swal from 'sweetalert2';
import { ClienteDTO } from '../../dto/cliente-dto';
import { VehiculoDTO } from '../../dto/vehiculo-dto';
import { PublicService } from '../../services/public.service';
import { UserService } from '../../services/user.service';
import { TipoVehiculoDTO } from '../../dto/tipo-vehiculo-dto';

@Component({
  selector: 'app-crear-vehiculo',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear-vehiculo.component.html',
  styleUrl: './crear-vehiculo.component.css'
})
export class CrearVehiculoComponent {

  crearVehiculoForm!: FormGroup;
  vehiculo: VehiculoDTO;
  clientes: ClienteDTO[];
  tipoVehiculoDTO: TipoVehiculoDTO[];
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private publicService: PublicService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router){
    this.crearVehiculoForm = this.fb.group({
      nro_placa: ['', [Validators.required]],
      tipo_vehiculo: ['', [Validators.required]],
      marca: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      anio_modelo: ['', [Validators.required]],
      nro_motor: ['', [Validators.required]],
      cliente: ['', [Validators.required]],
    });
    this.vehiculo = {
      nro_placa: '',
      tipo_vehiculo: 0,
      marca: '',
      modelo: '',
      anio_modelo: '',
      nro_motor: '',
      cliente: 0
    };
    this.tipoVehiculoDTO = [];
    this.clientes = [];
    this.obtenerClientes();
    this.obtenerTiposVehiculo();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const nro_placa = params['nro_placa'];
      if (nro_placa) {
        this.isEditing = true;
        this.cargarDatosVehiculo(nro_placa);
      }
    });
  }

  public obtenerClientes(): void {
    this.userService.obtenerClientes().subscribe({
      next: (data) => {
        this.clientes = data.respuesta;
      },
      error: (error) => {
        console.error(error.error.respuesta);
      }
    });
  }

  obtenerTiposVehiculo(): void {
    this.publicService.obtenerTiposVehiculo().subscribe({
      next: (data) => {
        this.tipoVehiculoDTO = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  cargarDatosVehiculo(nro_placa: string): void {
    this.userService.obtenerUnVehiculo(nro_placa).subscribe({
      next: (data) => {
        this.crearVehiculoForm.patchValue(data.respuesta);
      },
      error: (error) => {
        console.error('Error al cargar servicio:', error);
      },
    });
  }

  cargarVehiculoParaEditar(vehiculo: VehiculoDTO): void {
    this.isEditing = true;
    this.crearVehiculoForm.patchValue(vehiculo);
  }

  crearVehiculo(){
    const vehiculoDTO = this.crearVehiculoForm.value as VehiculoDTO;
    this.userService.crearVehiculo(vehiculoDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Crear Vehiculo',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });
        this.crearVehiculoForm.reset();

        setTimeout(() => {
          this.router.navigate(['/gestion-vehiculos']);
        }, 1500);
      },
      error: (error) => {
        Swal.fire({
          title: 'Crear Vehiculo',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    });
  }

  public obtenerVehiculo(nro_placa: string): void {
    this.userService.obtenerUnVehiculo(nro_placa).subscribe({
      next: (data) => {
        this.vehiculo = data.respuesta;
        console.log(data.respuesta);
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      },
    });
  }

  actualizarVehiculo() {
    const vehiculoDTO = this.crearVehiculoForm.value as VehiculoDTO;
    this.userService.actualizarVehiculo(vehiculoDTO.nro_placa, vehiculoDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Actualizar Vehiculo',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });

        this.crearVehiculoForm.reset();
        this.isEditing = false;
        setTimeout(() => {
          this.router.navigate(['/gestion-vehiculos']);
        }, 1500);

      },
      error: (error) => {
        Swal.fire({
          title: 'Actualizar Vehiculo',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    });
  }
}
