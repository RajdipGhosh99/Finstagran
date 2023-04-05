import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClientModule) { }

  userLogIn(body: any) {

  }

}
