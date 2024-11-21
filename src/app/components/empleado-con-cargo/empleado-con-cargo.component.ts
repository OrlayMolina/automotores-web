import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { EmpleadosConCargoDTO } from '../../dto/reportes/empleados-con-cargo-dto';

@Component({
  selector: 'app-empleado-con-cargo',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './empleado-con-cargo.component.html',
  styleUrl: './empleado-con-cargo.component.css'
})
export class EmpleadoConCargoComponent {

  estructuraReporte: EmpleadosConCargoDTO[] = [];
  reporteActual: string = '';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.reporteSeleccionado$.subscribe((reporte) => {
      this.reporteActual = reporte;
      if (reporte === 'Empleados con Cargo y Salario') {
        this.obtenerInfoReporte();
      }
    });
  }

  obtenerInfoReporte(): void {
    this.userService.obtenerEmpleadosConCargo().subscribe({
      next: (data) => {

        this.estructuraReporte = data.respuesta;
      },
      error: (error) => {
        Swal.fire({
          title: 'Información Reporte',
          text: error.error.respuesta,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#8b0000',
        });
      },
    });
  }

}
