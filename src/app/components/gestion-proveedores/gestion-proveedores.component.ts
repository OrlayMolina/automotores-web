import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ProveedorDTO } from '../../dto/proveedor-dto';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-proveedores',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './gestion-proveedores.component.html',
  styleUrl: './gestion-proveedores.component.css'
})
export class GestionProveedoresComponent {

  proveedores: ProveedorDTO[];

  constructor(private userService: UserService){
    this.proveedores = [];
    this.obtenerProveedores();
  }

  public obtenerProveedores(): void {
    this.userService.obtenerProveedores().subscribe({
      next: (data) => {
        this.proveedores = data.respuesta;
      },
      error: (error) => {
        console.error(error.error.respuesta);
      }
    })
  }

  public eliminarProveedor(nro_documento: number): void {
    this.userService.eliminarProveedor(nro_documento).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Eliminar Proveedor',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });
        this.obtenerProveedores();
      },
      error: (error) => {
        Swal.fire({
          title: 'Eliminar Proveedor',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    })
  }

  public obtenerProveedor(nro_documento: number): void {
    if (!nro_documento) {
      Swal.fire({
        title: 'Buscar Proveedor',
        text: "Debe ingresar un número válido",
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#8b0000',
      });
      return;
    }

    this.userService.obtenerUnProveedor(nro_documento).subscribe({
      next: (data) => {
        if (data.respuesta) {
          this.proveedores = [data.respuesta];
        } else {
          Swal.fire({
            title: 'Proveedor no encontrado',
            text: `No se encontró un proveedor con el documento: ${nro_documento}`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#8b0000',
          });
        }
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      },
    });
  }

  public limpiarFiltro(inputDocumento: HTMLInputElement): void {
    inputDocumento.value = '';
    this.obtenerProveedores();
  }
}
