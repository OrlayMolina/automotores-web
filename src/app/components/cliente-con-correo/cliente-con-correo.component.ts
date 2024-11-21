import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { ClientesConCorreoDTO } from '../../dto/reportes/clientes-con-correo-dto';

@Component({
  selector: 'app-cliente-con-correo',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './cliente-con-correo.component.html',
  styleUrl: './cliente-con-correo.component.css'
})
export class ClienteConCorreoComponent {

  estructuraReporte: ClientesConCorreoDTO[] = [];
  reporteActual: string = '';

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.reporteSeleccionado$.subscribe((reporte) => {
      this.reporteActual = reporte;
      if (reporte === 'Clientes con Correo') {
        this.obtenerInfoReporte();
      }
    });
  }

  obtenerInfoReporte(): void {
    this.userService.obtenerClientesConCorreo().subscribe({
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
