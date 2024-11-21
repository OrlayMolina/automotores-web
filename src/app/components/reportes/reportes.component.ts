import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReporteDTO } from '../../dto/reporte-dto';
import { UserService } from '../../services/user.service';
import { ClienteConCorreoComponent } from '../cliente-con-correo/cliente-con-correo.component';
import { EmpleadoConCargoComponent } from '../empleado-con-cargo/empleado-con-cargo.component';
import { ServicioConPrecioComponent } from "../servicio-con-precio/servicio-con-precio.component";

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ClienteConCorreoComponent,
    EmpleadoConCargoComponent,
    ServicioConPrecioComponent
],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {

  reportes: ReporteDTO[];
  reporteSeleccionado: string;
  mostrarFechas: boolean = false;

  constructor(private userService: UserService){
    this.reportes = [
      { nombre_reporte: "Clientes con Correo" },
      { nombre_reporte: "Empleados con Cargo y Salario" },
      { nombre_reporte: "Tarifa Servicios" },
      { nombre_reporte: "Ordenes por Cliente" },
      { nombre_reporte: "Servicios por Empleado" },
      { nombre_reporte: "Promedio facturas mensual" },
      { nombre_reporte: "Repuestos más vendidos" },
      { nombre_reporte: "Ingresos por Cliente" },
      { nombre_reporte: "Detalle Servicios y Repuestos" },
      { nombre_reporte: "Ingresos Mensuales" }
    ];
    this.reporteSeleccionado = '';
  }

  onReporteChange(event: Event): void {
    const selectedReporte = (event.target as HTMLSelectElement).value;
    this.reporteSeleccionado = selectedReporte;

    const reportesSinFechas = [
      'Empleados con Cargo y Salario',
      'Clientes con Correo',
      'Tarifa Servicios',
    ];
    this.mostrarFechas = !reportesSinFechas.includes(selectedReporte);

    this.userService.actualizarReporteSeleccionado(selectedReporte);
  }
}
