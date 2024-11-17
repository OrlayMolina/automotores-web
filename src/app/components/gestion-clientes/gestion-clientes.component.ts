import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ClienteDTO } from '../../dto/cliente-dto';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-clientes',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './gestion-clientes.component.html',
  styleUrl: './gestion-clientes.component.css'
})
export class GestionClientesComponent {

  clientes: ClienteDTO[];

  constructor(private userService: UserService){
    this.clientes = [];
    this.obtenerClientes();
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

  public eliminarCLiente(nro_cliente: number): void {
    this.userService.eliminarCliente(nro_cliente).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Eliminar Cliente',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });
        this.obtenerClientes();
      },
      error: (error) => {
        Swal.fire({
          title: 'Eliminar Cliente',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    })
  }

  public obtenerCLiente(nro_documento: number): void {
    if (!nro_documento) {
      Swal.fire({
        title: 'Buscar Cliente',
        text: "Debe ingresar un numero válido",
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#8b0000',
      });
      return;
    }

    this.userService.obtenerUnCliente(nro_documento).subscribe({
      next: (data) => {
        if (data.respuesta) {
          this.clientes = [data.respuesta];
        } else {
          Swal.fire({
            title: 'Cliente no encontrado',
            text: `No se encontró un cliente con el documento: ${nro_documento}`,
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
    this.obtenerClientes();
  }

}
