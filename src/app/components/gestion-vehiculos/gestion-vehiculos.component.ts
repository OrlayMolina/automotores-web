import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VehiculoDTO } from '../../dto/vehiculo-dto';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { ClienteDTO } from '../../dto/cliente-dto';

@Component({
  selector: 'app-gestion-vehiculos',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './gestion-vehiculos.component.html',
  styleUrl: './gestion-vehiculos.component.css'
})
export class GestionVehiculosComponent {

  vehiculos: VehiculoDTO[];
  clientes: ClienteDTO[];

  constructor(private userService: UserService){
    this.vehiculos = [];
    this.clientes = [];
    this.obtenerVehiculos();
    this.obtenerClientes();
  }

  public obtenerVehiculos(): void {
    this.userService.obtenerVehiculos().subscribe({
      next: (data) => {
        this.vehiculos = data.respuesta;
      },
      error: (error) => {
        console.error(error.error.respuesta);
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

  public getNombreClienteAsociado(clienteId: number | null): string {
    if (clienteId === null || clienteId === undefined) {
      return 'Cliente no especificado';
    }

    const propietario = this.clientes.find(cliente => cliente.nro_documento === clienteId);

    if (!propietario) {
      return 'Propietario no encontrado';
    }

    return `${propietario.primer_nombre} ${propietario.segundo_nombre || ''} ${propietario.primer_apellido} ${propietario.segundo_apellido || ''}`.trim();
  }

  public eliminarVehiculo(nro_placa: string): void {
    this.userService.eliminarVehiculo(nro_placa).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Eliminar Vehiculo',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });
        this.obtenerVehiculos();
      },
      error: (error) => {
        Swal.fire({
          title: 'Eliminar Vehiculo',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    })
  }

  public obtenerVehiculo(nro_placa: string): void {
    if (!nro_placa) {
      Swal.fire({
        title: 'Buscar Vehiculo',
        text: "Debe ingresar un numero válido",
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#8b0000',
      });
      return;
    }

    this.userService.obtenerUnVehiculo(nro_placa).subscribe({
      next: (data) => {
        if (data.respuesta) {
          this.vehiculos = [data.respuesta];
        } else {
          Swal.fire({
            title: 'Vehiculo no encontrado',
            text: `No se encontró un vehiculo con el documento: ${nro_placa}`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#8b0000',
          });
        }
      },
      error: (error) => {
        console.log(nro_placa);
        console.error('Error en la petición:', error);
      },
    });
  }

  public limpiarFiltro(nroPlaca: HTMLInputElement): void {
    nroPlaca.value = '';
    this.obtenerVehiculos();
  }
}
