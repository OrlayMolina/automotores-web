import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { OrdenesServicioComponent } from './components/ordenes-servicio/ordenes-servicio.component';
import { FacturacionComponent } from './components/facturacion/facturacion.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { CrearEmpleadoComponent } from './components/crear-empleado/crear-empleado.component';
import { CrearClienteComponent } from './components/crear-cliente/crear-cliente.component';
import { CrearVehiculoComponent } from './components/crear-vehiculo/crear-vehiculo.component';
import { CrearProveedorComponent } from './components/crear-proveedor/crear-proveedor.component';
import { CrearServicioComponent } from './components/crear-servicio/crear-servicio.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'crear-empleado', component: CrearEmpleadoComponent },
  { path: 'crear-cliente', component: CrearClienteComponent },
  { path: 'crear-vehiculo', component: CrearVehiculoComponent },
  { path: 'crear-proveedor', component: CrearProveedorComponent },
  { path: 'crear-servicio', component: CrearServicioComponent },
  { path: 'ordenes-servicio', component: OrdenesServicioComponent },
  { path: 'facturacion', component: FacturacionComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: "**", pathMatch: "full", redirectTo: "" }
];
