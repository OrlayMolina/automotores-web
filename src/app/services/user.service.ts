import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject  } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { ClienteDTO } from '../dto/cliente-dto';
import { EmpleadoDTO } from '../dto/empleado-dto';
import { ProveedorDTO } from '../dto/proveedor-dto';
import { ServicioDTO } from '../dto/servicio-dto';
import { VehiculoDTO } from '../dto/vehiculo-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private reporteSeleccionado = new BehaviorSubject<string>('');
  reporteSeleccionado$ = this.reporteSeleccionado.asObservable();
  private userURL = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  public obtenerClientes(): Observable<MensajeDTO>{
    return this.http.get<MensajeDTO>(`${this.userURL}/clientes/obtener-todos`)
  }

  public obtenerEmpleados(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userURL}/empleados/obtener-todos`);
  }

  public obtenerProveedores(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userURL}/proveedores/obtener-todos`);
  }

  public obtenerServicios(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userURL}/servicios/obtener-todos`);
  }

  public obtenerVehiculos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userURL}/vehiculos/obtener-todos`);
  }

  public eliminarCliente(nro_documento: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userURL}/clientes/eliminar-cliente/${nro_documento}`);
  }

  public eliminarEmpleado(nro_documento: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userURL}/empleados/eliminar-empleado/${nro_documento}`);
  }

  public eliminarProveedor(nro_documento: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userURL}/proveedores/eliminar-proveedor/${nro_documento}`);
  }

  public eliminarServicio(id_servicio: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userURL}/servicios/eliminar-servicio/${id_servicio}`);
  }

  public eliminarVehiculo(nro_placa: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userURL}/vehiculos/eliminar-vehiculo/${nro_placa}`);
  }

  public obtenerUnCliente(nro_documento: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userURL}/clientes/cliente/${nro_documento}`);
  }

  public obtenerUnEmpleado(nro_documento: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userURL}/empleados/empleado/${nro_documento}`);
  }

  public obtenerUnProveedor(nro_documento: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userURL}/proveedores/proveedor/${nro_documento}`);
  }

  public obtenerUnServicio(id_servicio: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userURL}/servicios/servicio/${id_servicio}`);
  }

  public obtenerUnVehiculo(nro_placa: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userURL}/vehiculos/vehiculo/${nro_placa}`);
  }

  public crearCliente(clienteDTO: ClienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userURL}/clientes/crear-cliente`, clienteDTO);
  }

  public crearEmpleado(empleado: EmpleadoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userURL}/empleados/crear-empleado`, empleado);
  }

  public crearProveedor(proveedor: ProveedorDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userURL}/proveedores/crear-proveedor`, proveedor);
  }

  public crearServicio(servicio: ServicioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userURL}/servicios/crear-servicio`, servicio);
  }

  public crearVehiculo(vehiculo: VehiculoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userURL}/vehiculos/crear-vehiculo`, vehiculo);
  }

  public actualizarCliente(nro_documento: number, clienteDTO: ClienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userURL}/clientes/actualizar-cliente/${nro_documento}`, clienteDTO);
  }

  public actualizarEmpleado(nro_documento: number, empleado: EmpleadoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userURL}/empleados/actualizar-empleado/${nro_documento}`, empleado);
  }

  public actualizarProveedor(nro_documento: number, proveedor: ProveedorDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userURL}/proveedores/actualizar-proveedor/${nro_documento}`, proveedor);
  }

  public actualizarServicio(id_servicio: number, servicio: ServicioDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userURL}/servicios/actualizar-servicio/${id_servicio}`, servicio);
  }

  public actualizarVehiculo(nro_placa: string, vehiculo: VehiculoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userURL}/vehiculos/actualizar-vehiculo/${nro_placa}`, vehiculo);
  }

  //////

  public obtenerClientesConCorreo(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userURL}/reportes/reporte/clientes-con-correo`);
  }

  public obtenerEmpleadosConCargo(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userURL}/reportes/reporte/empleados-con-cargo`);
  }

  public obtenerServiciosConTarifa(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.userURL}/reportes/reporte/precio-servicios`);
  }


  actualizarReporteSeleccionado(reporte: string): void {
    this.reporteSeleccionado.next(reporte);
  }
}
