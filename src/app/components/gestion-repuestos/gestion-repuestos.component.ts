import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RepuestoDTO } from '../../dto/repuesto-dto';
import { ProveedorDTO } from '../../dto/proveedor-dto';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-repuestos',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './gestion-repuestos.component.html',
  styleUrl: './gestion-repuestos.component.css'
})
export class GestionRepuestosComponent {

  repuestos: RepuestoDTO[];
  proveedores: ProveedorDTO[];

  constructor(private userService: UserService){
    this.repuestos = [];
    this.proveedores = [];
    this.obtenerRepuestos();
    this.obtenerProveedores();
  }

  public obtenerRepuestos(): void {
    this.userService.obtenerRepuestos().subscribe({
      next: (data) => {
        this.repuestos = data.respuesta;
      },
      error: (error) => {
        console.error(error.error.respuesta);
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

  public getNombreProveedorAsociado(nro_documento: number | null): string {
    if (nro_documento === null || nro_documento === undefined) {
      return 'Cliente no especificado';
    }

    const proveedor = this.proveedores.find(proveedor => proveedor.nro_documento === nro_documento);

    if (!proveedor) {
      return 'Proveedor no encontrado';
    }

    return `${proveedor.nombre} || ''}`.trim();
  }

  public eliminarRepuesto(codigo_repuesto: string): void {
    this.userService.eliminarRepuesto(codigo_repuesto).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Eliminar Repuesto',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });
        this.obtenerRepuestos();
      },
      error: (error) => {
        Swal.fire({
          title: 'Eliminar Repuesto',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    })
  }

  public obtenerRepuesto(codigo_repuesto: string): void {
    if (!codigo_repuesto) {
      Swal.fire({
        title: 'Buscar Repuesto',
        text: "Debe ingresar un numero válido",
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#8b0000',
      });
      return;
    }

    this.userService.obtenerUnRepuesto(codigo_repuesto).subscribe({
      next: (data) => {
        if (data.respuesta) {
          this.repuestos = [data.respuesta];
        } else {
          Swal.fire({
            title: 'Repuesto no encontrado',
            text: `No se encontró un repuesto con el documento: ${codigo_repuesto}`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#8b0000',
          });
        }
      },
      error: (error) => {
        console.log(codigo_repuesto);
        console.error('Error en la petición:', error);
      },
    });
  }

  public limpiarFiltro(codigoRepuesto: HTMLInputElement): void {
    codigoRepuesto.value = '';
    this.obtenerRepuestos();
  }
}
