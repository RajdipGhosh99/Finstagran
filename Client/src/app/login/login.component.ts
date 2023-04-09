import { Component, OnInit } from '@angular/core';
import { DbService } from '../General/db/db.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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


  constructor(private dbService: DbService, private fb: FormBuilder) {

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
        } else {
          this.errBlock = true
        }
      })
    }
  }

  passShowHide() {
    this.passShow = !this.passShow
  }

}
