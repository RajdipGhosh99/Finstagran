import { Component, OnInit } from '@angular/core';
import { DbService } from '../General/db/db.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleService } from '../sso/google.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  })

  public errBlock: boolean = false
  public passShow: boolean = false


  constructor(private dbService: DbService, private fb: FormBuilder, private router: Router, private googleSsoService: GoogleService) {

    let user: any = localStorage.getItem('_user')
    if (user && JSON.parse(user).token) {
      this.router.navigateByUrl('/')
    }
  }

  ngOnInit(): void {
  }

  loginClicked() {
    this.errBlock = false

    if (this.loginForm.valid) {

      this.dbService.userLogIn(this.loginForm.value).subscribe((d: any) => {
        if (d?.data?.length > 0) {
          delete d.data[0].password
          localStorage.setItem('_user', JSON.stringify(d.data[0]))
          localStorage.setItem('_token', d.data[0].token)
          localStorage.setItem('_url', d.data[0].url)
          this.router.navigateByUrl('/')
        } else {
          this.errBlock = true
        }
      })
    }
  }

  passShowHide() {
    this.passShow = !this.passShow
  }

  googleSso() {
    localStorage.clear()
    let url = this.googleSsoService.getGoogleOAuthURL()
    window.open(url, "_self")
  }

}
