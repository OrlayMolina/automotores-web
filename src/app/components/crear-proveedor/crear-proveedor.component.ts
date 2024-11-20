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
import { ProveedorDTO } from '../../dto/proveedor-dto';
import { TipoDocumentoDTO } from '../../dto/tipo-documento-dto';
import { PublicService } from '../../services/public.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-crear-proveedor',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear-proveedor.component.html',
  styleUrl: './crear-proveedor.component.css'
})
export class CrearProveedorComponent {

  crearProveedorForm!: FormGroup;
  proveedor: ProveedorDTO;
  tipoDocumentoDTO: TipoDocumentoDTO[];
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private publicService: PublicService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router){
    this.crearProveedorForm = this.fb.group({
      nro_documento: ['', [Validators.required]],
      tipo_documento: ['', [Validators.required]],
      telefono: [''], //Opcional
      correo: ['', [Validators.required, Validators.email]],
      nombre: ['', [Validators.required]],
      razon_social: [''], // Opcional
    });
    this.tipoDocumentoDTO = [];
    this.proveedor = {
      nro_documento: 0,
      tipo_documento: 0,
      telefono: '',
      correo: '',
      nombre: '',
      razon_social: ''
    };
    this.obtenerTiposDocumento();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const nro_documento = params['nro_documento'];
      if (nro_documento) {
        this.isEditing = true;
        this.cargarDatosProveedor(nro_documento);
      }
    });
  }

  cargarDatosProveedor(nro_documento: number): void {
    this.userService.obtenerUnProveedor(nro_documento).subscribe({
      next: (data) => {
        this.crearProveedorForm.patchValue(data.respuesta); // Prellenar el formulario
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

  cargarProveedorParaEditar(proveedor: ProveedorDTO): void {
    this.isEditing = true;
    this.crearProveedorForm.patchValue(proveedor);
  }

  crearProveedor(){
    const proveedorDTO = this.crearProveedorForm.value as ProveedorDTO;
    this.userService.crearProveedor(proveedorDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Crear Proveedor',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });

        this.crearProveedorForm.reset();

        setTimeout(() => {
          this.router.navigate(['/gestion-proveedores']);
        }, 1500);
      },
      error: (error) => {
        Swal.fire({
          title: 'Crear Proveedor',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    });
  }

  public obtenerProveedor(nro_documento: number): void {
    this.userService.obtenerUnProveedor(nro_documento).subscribe({
      next: (data) => {
        this.proveedor = data.respuesta;
        console.log(data.respuesta);
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      },
    });
  }

  actualizarProveedor() {
    const proveedorDTO = this.crearProveedorForm.value as ProveedorDTO;
    this.userService.actualizarProveedor(proveedorDTO.nro_documento, proveedorDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Actualizar Proveedor',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });

        this.crearProveedorForm.reset();
        this.isEditing = false;
        setTimeout(() => {
          this.router.navigate(['/gestion-proveedores']);
        }, 1500);

      },
      error: (error) => {
        Swal.fire({
          title: 'Actualizar Proveedor',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    });
  }
}
