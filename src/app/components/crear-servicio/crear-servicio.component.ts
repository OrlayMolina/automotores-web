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
import { ServicioDTO } from '../../dto/servicio-dto';
import { PublicService } from '../../services/public.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-servicio',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear-servicio.component.html',
  styleUrl: './crear-servicio.component.css'
})
export class CrearServicioComponent {

  crearServicioForm!: FormGroup;
  servicio: ServicioDTO;
  servicios: ServicioDTO[];
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private publicService: PublicService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router){
    this.crearServicioForm = this.fb.group({
      id_servicio: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion_servicio: ['', [Validators.required]],
      precio: ['', [Validators.required]], // Opcional
      servicio_asociado: [''], //Opcional
    });
    this.servicio = {
      id_servicio: 0,
      nombre: '',
      descripcion_servicio: '',
      precio: '',
      servicio_asociado: 0
    };
    this.servicios = [];
    this.obtenerServicios();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const id_servicio = params['id_servicio'];
      if (id_servicio) {
        this.isEditing = true;
        this.cargarDatosServicio(id_servicio);
      }
    });
  }

  public obtenerServicios(): void {
    this.userService.obtenerServicios().subscribe({
      next: (data) => {
        this.servicios = data.respuesta;
      },
      error: (error) => {
        console.error(error.error.respuesta);
      }
    });
  }

  cargarDatosServicio(id_servicio: number): void {
    this.userService.obtenerUnServicio(id_servicio).subscribe({
      next: (data) => {
        this.crearServicioForm.patchValue(data.respuesta); // Prellenar el formulario
      },
      error: (error) => {
        console.error('Error al cargar servicio:', error);
      },
    });
  }

  cargarServicioParaEditar(servicio: ServicioDTO): void {
    this.isEditing = true;
    this.crearServicioForm.patchValue(servicio);
  }

  crearServicio(){
    const servicioDTO = this.crearServicioForm.value as ServicioDTO;
    this.userService.crearServicio(servicioDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Crear Servicio',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });

        this.crearServicioForm.reset();

        setTimeout(() => {
          this.router.navigate(['/gestion-servicios']);
        }, 1500);
      },
      error: (error) => {
        Swal.fire({
          title: 'Crear Servicio',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    });
  }

  public obtenerServicio(id_servicio: number): void {
    this.userService.obtenerUnServicio(id_servicio).subscribe({
      next: (data) => {
        this.servicio = data.respuesta;
        console.log(data.respuesta);
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      },
    });
  }

  actualizarServicio() {
    const servicioDTO = this.crearServicioForm.value as ServicioDTO;
    this.userService.actualizarServicio(servicioDTO.id_servicio, servicioDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Actualizar Servicio',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });

        this.crearServicioForm.reset();
        this.isEditing = false;
        setTimeout(() => {
          this.router.navigate(['/gestion-servicios']);
        }, 1500);

      },
      error: (error) => {
        Swal.fire({
          title: 'Actualizar Servicios',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    });
  }
}
