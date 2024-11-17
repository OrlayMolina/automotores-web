import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../dto/mensaje-dto';
import { LoginDTO } from '../dto/login-dto';
import { Observable, BehaviorSubject } from 'rxjs';
import { RegistroEmpleadoDTO } from '../dto/registro-empleado-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "http://localhost:8080/api/auth";
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) { }

  public loginCliente(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login`, loginDTO);
  }

  public registrarEmpleado(registroEmpleadoDTO: RegistroEmpleadoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/empleados/crear-empleado`, registroEmpleadoDTO);
  }

  setUser(correo: string) {
    this.userSubject.next(correo);
  }

  logout() {
    this.userSubject.next(null);
  }
}
