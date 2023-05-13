import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private http: HttpClient) { }

  fileUpload(body: any) {
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Type': 'formData'
    }
    return this.http.post(`${environment.API_URL}/post/upload`, body)
  }

  createPost(body: string) {
    return this.http.post(`${environment.API_URL}/post/create`, body)
  }

}
