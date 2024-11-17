import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';
import { ClienteDTO } from '../dto/cliente-dto';
import { EmpleadoDTO } from '../dto/empleado-dto';
import { ProveedorDTO } from '../dto/proveedor-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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

  public eliminarCliente(nro_documento: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userURL}/clientes/eliminar-cliente/${nro_documento}`);
  }

  public eliminarEmpleado(nro_documento: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userURL}/empleados/eliminar-empleado/${nro_documento}`);
  }

  public eliminarProveedor(nro_documento: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.userURL}/proveedores/eliminar-proveedor/${nro_documento}`);
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

  public crearCliente(clienteDTO: ClienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userURL}/clientes/crear-cliente`, clienteDTO);
  }

  public crearEmpleado(empleado: EmpleadoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userURL}/empleados/crear-empleado`, empleado);
  }

  public crearProveedor(proveedor: ProveedorDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.userURL}/proveedores/crear-proveedor`, proveedor);
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
}
