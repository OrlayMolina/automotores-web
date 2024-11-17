import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { EmpleadoDTO } from '../../dto/empleado-dto';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-empleados',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './gestion-empleados.component.html',
  styleUrl: './gestion-empleados.component.css'
})
export class GestionEmpleadosComponent {

  empleados: EmpleadoDTO[];

  constructor(private userService: UserService){
    this.empleados = [];
    this.obtenerEmpleados();
  }

  public obtenerEmpleados(): void {
    this.userService.obtenerEmpleados().subscribe({
      next: (data) => {
        this.empleados = data.respuesta;
      },
      error: (error) => {
        console.error(error.error.respuesta);
      }
    });
  }

  public eliminarEmpleado(nro_empleado: number): void {
    this.userService.eliminarEmpleado(nro_empleado).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Eliminar Empleado',
          text: data.respuesta,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#065f46',
        });
        this.obtenerEmpleados();
      },
      error: (error) => {
        Swal.fire({
          title: 'Eliminar Empleado',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      }
    })
  }

  public obtenerEmpleado(nro_documento: number): void {
    if (!nro_documento) {
      Swal.fire({
        title: 'Buscar Empleado',
        text: "Debe ingresar un numero válido",
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#8b0000',
      });
      return;
    }

    this.userService.obtenerUnEmpleado(nro_documento).subscribe({
      next: (data) => {
        if (data.respuesta) {
          this.empleados = [data.respuesta];
        } else {
          Swal.fire({
            title: 'Empleado no encontrado',
            text: `No se encontró un empleado con el documento: ${nro_documento}`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#8b0000',
          });
        }
      },
      error: (error) => {
        console.log(nro_documento);
        console.error('Error en la petición:', error);
      },
    });
  }

  public limpiarFiltro(inputDocumento: HTMLInputElement): void {
    inputDocumento.value = '';
    this.obtenerEmpleados();
  }

}
