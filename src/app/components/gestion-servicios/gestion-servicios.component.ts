import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicioDTO } from '../../dto/servicio-dto';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-servicios',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './gestion-servicios.component.html',
  styleUrl: './gestion-servicios.component.css'
})
export class GestionServiciosComponent {

  servicios: ServicioDTO[];

  constructor(private userService: UserService){
    this.servicios = [];
    this.obtenerServicios();
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

  public getNombreServicioAsociado(idServicioAsociado: number | null): string {
    if (!idServicioAsociado) {
      return 'No Aplica';
    }

    const servicioAsociado = this.servicios.find(servicio => servicio.id_servicio === idServicioAsociado);
    return servicioAsociado ? servicioAsociado.nombre : 'No encontrado';
  }

  public eliminarServicio(id_servicio: number): void {
    this.userService.eliminarServicio(id_servicio).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Eliminar Servicio',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });
        this.obtenerServicios();
      },
      error: (error) => {
        Swal.fire({
          title: 'Eliminar Servicio',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    })
  }

  public obtenerServicio(id_servicio: number): void {
    if (!id_servicio) {
      Swal.fire({
        title: 'Buscar Servicio',
        text: "Debe ingresar un numero válido",
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#8b0000',
      });
      return;
    }

    this.userService.obtenerUnServicio(id_servicio).subscribe({
      next: (data) => {
        if (data.respuesta) {
          this.servicios = [data.respuesta];
        } else {
          Swal.fire({
            title: 'Servicio no encontrado',
            text: `No se encontró un servicio con el documento: ${id_servicio}`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#8b0000',
          });
        }
      },
      error: (error) => {
        console.log(id_servicio);
        console.error('Error en la petición:', error);
      },
    });
  }

  public limpiarFiltro(idServicio: HTMLInputElement): void {
    idServicio.value = '';
    this.obtenerServicios();
  }
}
