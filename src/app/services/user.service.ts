import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }


}
