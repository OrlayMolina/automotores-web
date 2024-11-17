import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css'
})
export class SidebarMenuComponent {

  @Output() selectOption = new EventEmitter<string>();

  menu: string[];

  constructor(){
    this.menu = [
      'Gestión Clientes',
      'Gestión Vehiculos',
      'Gestión Empleados',
      'Gestión Proveedores',
      'Gestión Repuestos',
      'Gestión Servicios',
      'Ordenes de Servicio',
      'Facturación',
      'Reportes'
    ]
  }

  onOptionClick(option: string) {
    this.selectOption.emit(option);
  }
}
