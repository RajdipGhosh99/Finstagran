import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleService } from 'src/app/sso/google.service';

@Component({
  selector: 'app-sso-google',
  templateUrl: './sso-google.component.html',
  styleUrls: ['./sso-google.component.scss']
})
export class SsoGoogleComponent {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private googleService: GoogleService) {
    const params: any = this.activatedRoute.snapshot.queryParams
    if (params?.code && params?.scope) {
      this.googleService.authHandlar(new URLSearchParams(params).toString()).subscribe({
        next: (d: any) => {
          if (d?.data?.length > 0) {
            localStorage.setItem('_user', JSON.stringify(d.data[0]))
            localStorage.setItem('_token', d.data[0].token)
            localStorage.setItem('_url', d.data[0].url)
            this.router.navigateByUrl('/')
          } else {
            this.router.navigate(['/logout'])
          }
        },
        error: (e) => {
          console.log("err", e);

        }
      })
    } else {
      console.log('no params');

    }


  }

}
