import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  getPosts(userId: string) {
    return this.http.get(`${environment.API_URL}/post/fetch?user_id=${userId}`)

  }

}
