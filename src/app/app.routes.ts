import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroEmpleadoComponent } from './components/registro-empleado/registro-empleado.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'crear-empleado', component: RegistroEmpleadoComponent },
  { path: "**", pathMatch: "full", redirectTo: "" }
];
