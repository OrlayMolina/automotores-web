import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ServiciosConPrecioDTO } from '../../dto/reportes/servicios-con-precio-dto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-servicio-con-precio',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './servicio-con-precio.component.html',
  styleUrl: './servicio-con-precio.component.css'
})
export class ServicioConPrecioComponent {

  estructuraReporte: ServiciosConPrecioDTO[] = [];
  reporteActual: string = '';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.reporteSeleccionado$.subscribe((reporte) => {
      this.reporteActual = reporte;
      if (reporte === 'Tarifa Servicios') {
        this.obtenerInfoReporte();
      }
    });
  }

  obtenerInfoReporte(): void {
    this.userService.obtenerServiciosConTarifa().subscribe({
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
