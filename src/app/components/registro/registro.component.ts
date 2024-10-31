import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  AbstractControlOptions,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertaComponent } from '../alerta/alerta.component';
import { PublicService } from '../../services/public.service';
import { AuthService } from '../../services/auth.service';
import { AlertaDTO } from '../../dto/alerta-dto';
import { UsuarioEmpleadoDTO } from '../../dto/usuario-empleado-dto';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    AlertaComponent
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  registroUsuarioDTO: UsuarioEmpleadoDTO;
  mostrarAlerta: boolean = false;

  alerta!:AlertaDTO;

  constructor(private publicService: PublicService, private authService: AuthService, private router: Router) {
    this.registroUsuarioDTO = {
      id_empleado: null,
      correo: '',
      password: '',
      confirm_password: ''
    }
  }

  public registrarUsuario() {

  }

}
