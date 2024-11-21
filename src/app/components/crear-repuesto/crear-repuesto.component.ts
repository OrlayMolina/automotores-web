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
import { RepuestoDTO } from '../../dto/repuesto-dto';
import { ProveedorDTO } from '../../dto/proveedor-dto';
import { PublicService } from '../../services/public.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-crear-repuesto',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear-repuesto.component.html',
  styleUrl: './crear-repuesto.component.css'
})
export class CrearRepuestoComponent {

  crearRepuestoForm!: FormGroup;
  repuesto: RepuestoDTO;
  proveedores: ProveedorDTO[];
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private publicService: PublicService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router){
    this.crearRepuestoForm = this.fb.group({
      codigo_repuesto: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      cantidad: ['', [Validators.required]],
      proveedor: ['', [Validators.required]]
    });
    this.repuesto = {
      codigo_repuesto: '',
      nombre: '',
      descripcion: '',
      precio: 0,
      cantidad: 0,
      proveedor: 0
    };
    this.proveedores = [];
    this.obtenerProveedores();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const codigo_repuesto = params['codigo_repuesto'];
      if (codigo_repuesto) {
        this.isEditing = true;
        this.cargarDatosRepuesto(codigo_repuesto);
      }
    });
  }

  public obtenerProveedores(): void {
    this.userService.obtenerProveedores().subscribe({
      next: (data) => {
        this.proveedores = data.respuesta;
      },
      error: (error) => {
        console.error(error.error.respuesta);
      }
    });
  }

  cargarDatosRepuesto(codigo_repuesto: string): void {
    this.userService.obtenerUnRepuesto(codigo_repuesto).subscribe({
      next: (data) => {
        this.crearRepuestoForm.patchValue(data.respuesta);
      },
      error: (error) => {
        console.error('Error al cargar servicio:', error);
      },
    });
  }

  cargarRepuestoParaEditar(repuesto: RepuestoDTO): void {
    this.isEditing = true;
    this.crearRepuestoForm.patchValue(repuesto);
  }

  crearRepuesto(){
    const repuestoDTO = this.crearRepuestoForm.value as RepuestoDTO;
    this.userService.crearRepuesto(repuestoDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Crear Repuesto',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });
        this.crearRepuestoForm.reset();

        setTimeout(() => {
          this.router.navigate(['/gestion-repuestos']);
        }, 1500);
      },
      error: (error) => {
        Swal.fire({
          title: 'Crear Repuesto',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    });
  }

  public obtenerRepuesto(codigo_repuesto: string): void {
    this.userService.obtenerUnRepuesto(codigo_repuesto).subscribe({
      next: (data) => {
        this.repuesto = data.respuesta;
        console.log(data.respuesta);
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      },
    });
  }

  actualizarRepuesto() {
    const repuestoDTO = this.crearRepuestoForm.value as RepuestoDTO;
    this.userService.actualizarRepuesto(repuestoDTO.codigo_repuesto, repuestoDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Actualizar Repuesto',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });

        this.crearRepuestoForm.reset();
        this.isEditing = false;
        setTimeout(() => {
          this.router.navigate(['/gestion-repuestos']);
        }, 1500);

      },
      error: (error) => {
        Swal.fire({
          title: 'Actualizar Repuesto',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    });
  }
}
