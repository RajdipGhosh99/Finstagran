import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private http: HttpClient) { }

  getGoogleOAuthURL() {
    const options = {
      redirect_uri: environment.BASE_REDIRECT_URL,
      client_id: environment.GOOGLE_CLIENT_ID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };

    const qs = new URLSearchParams(options);

    return `${environment.GOOGLE_AUTH_URL}?${qs.toString()}`;
  }

  authHandlar(qs: any) {
    return this.http.get(`${environment.API_URL}/user/auth/google?${qs}`)
  }


}
