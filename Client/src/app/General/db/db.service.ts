import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  userLogIn(body: any) {
    return this.http.post(`${environment.API_URL}/user/login`, body)
  }

  userSignUp(body: any) {
    return this.http.post(`${environment.API_URL}/user/signup`, body)
  }



}
