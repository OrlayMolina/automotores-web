import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { VehiculoDTO } from '../../dto/vehiculo-dto';
import { UserService } from '../../services/user.service';

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

  constructor(private userService: UserService){
    this.vehiculos = [];
  }


}
