import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../dto/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private publicURL = "http://localhost:8080/api/public";

  constructor(private http: HttpClient) { }

  public obtenerTiposDocumento(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicURL}/tipos-documento`);
  }

  public obtenerTiposVehiculo(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicURL}/tipos-vehiculo`);
  }

  public obtenerCargos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.publicURL}/empleados/cargos`);
  }
}
