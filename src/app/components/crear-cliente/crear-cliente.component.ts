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
import { ClienteDTO } from '../../dto/cliente-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css'
})
export class CrearClienteComponent {

  crearClienteForm!: FormGroup;
  cliente: ClienteDTO;
  tipoDocumentoDTO: TipoDocumentoDTO[];
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private publicService: PublicService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router){
    this.crearClienteForm = this.fb.group({
      nro_documento: ['', [Validators.required]],
      tipo_documento: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      telefono: [''], //Opcional
      primer_nombre: ['', [Validators.required]],
      segundo_nombre: [''], // Opcional
      primer_apellido: ['', [Validators.required]],
      segundo_apellido: [''], //Opcional
    });
    this.tipoDocumentoDTO = [];
    this.cliente = {
      nro_documento: 0,
      tipo_documento: 0,
      correo: '',
      telefono: '',
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: ''
    };
    this.obtenerTiposDocumento();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const nro_documento = params['nro_documento'];
      if (nro_documento) {
        this.isEditing = true;
        this.cargarDatosCliente(nro_documento);
      }
    });
  }

  cargarDatosCliente(nro_documento: number): void {
    this.userService.obtenerUnCliente(nro_documento).subscribe({
      next: (data) => {
        this.crearClienteForm.patchValue(data.respuesta); // Prellenar el formulario
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

  cargarClienteParaEditar(cliente: ClienteDTO): void {
    this.isEditing = true;
    this.crearClienteForm.patchValue(cliente);
  }

  crearCliente(){
    const clienteDTO = this.crearClienteForm.value as ClienteDTO;
    this.userService.crearCliente(clienteDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Crear Cliente',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });

        this.crearClienteForm.reset();

        setTimeout(() => {
          this.router.navigate(['/gestion-clientes']);
        }, 1500);
      },
      error: (error) => {
        Swal.fire({
          title: 'Crear Cliente',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    });
  }

  public obtenerCLiente(nro_documento: number): void {
    this.userService.obtenerUnCliente(nro_documento).subscribe({
      next: (data) => {
        this.cliente = data.respuesta;
        console.log(data.respuesta);
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      },
    });
  }

  actualizarCliente() {
    const clienteDTO = this.crearClienteForm.value as ClienteDTO;
    this.userService.actualizarCliente(clienteDTO.nro_documento, clienteDTO).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Actualizar Cliente',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });

        this.crearClienteForm.reset();
        this.isEditing = false;
        setTimeout(() => {
          this.router.navigate(['/gestion-clientes']);
        }, 1500);

      },
      error: (error) => {
        Swal.fire({
          title: 'Actualizar Cliente',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    });
  }
}
