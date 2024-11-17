  import { Component, ViewChild, ViewContainerRef } from '@angular/core';
  import { SidebarMenuComponent } from '../sidebar-menu/sidebar-menu.component';
import { GestionClientesComponent } from '../gestion-clientes/gestion-clientes.component';
import { ComponentRef } from 'react';
import { GestionVehiculosComponent } from '../gestion-vehiculos/gestion-vehiculos.component';
import { GestionEmpleadosComponent } from '../gestion-empleados/gestion-empleados.component';
import { GestionProveedoresComponent } from '../gestion-proveedores/gestion-proveedores.component';
import { GestionRepuestosComponent } from '../gestion-repuestos/gestion-repuestos.component';
import { GestionServiciosComponent } from '../gestion-servicios/gestion-servicios.component';
import { OrdenesServicioComponent } from '../ordenes-servicio/ordenes-servicio.component';
import { FacturacionComponent } from '../facturacion/facturacion.component';
import { ReportesComponent } from '../reportes/reportes.component';
import { TokenService } from '../../services/token.service';
import Swal from 'sweetalert2';

  @Component({
    selector: 'app-inicio',
    standalone: true,
    imports: [
      SidebarMenuComponent
    ],
    templateUrl: './inicio.component.html',
    styleUrl: './inicio.component.css'
  })
  export class InicioComponent {

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  private componentRef!: ComponentRef<any>;

  constructor(private tokenService: TokenService){}

  // Manejar el evento del SidebarMenuComponent
  onMenuOptionSelected(option: string) {
    this.container.clear();
    if (this.tokenService.getIDCuenta()){
      switch (option) {
        case 'Gestión Clientes':
          this.componentRef = this.container.createComponent(GestionClientesComponent);
          break;
        case 'Gestión Vehiculos':
          this.componentRef = this.container.createComponent(GestionVehiculosComponent);
          break;
        case 'Gestión Empleados':
          this.componentRef = this.container.createComponent(GestionEmpleadosComponent);
          break;
        case 'Gestión Proveedores':
          this.componentRef = this.container.createComponent(GestionProveedoresComponent);
          break;
        case 'Gestión Repuestos':
          this.componentRef = this.container.createComponent(GestionRepuestosComponent);
          break;
        case 'Gestión Servicios':
          this.componentRef = this.container.createComponent(GestionServiciosComponent);
          break;
        case 'Ordenes de Servicio':
          this.componentRef = this.container.createComponent(OrdenesServicioComponent);
          break;
        case 'Facturación':
          this.componentRef = this.container.createComponent(FacturacionComponent);
          break;
        case 'Reportes':
          this.componentRef = this.container.createComponent(ReportesComponent);
          break;
        default:
          console.log(`Opción no manejada: ${option}`);
      }
    } else {
      Swal.fire({
        title: 'Inicie Sesión',
        text: 'Debe iniciar sesión primero para eligir una opción',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#8b0000',
      });
    }
  }
  }
