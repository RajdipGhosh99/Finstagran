import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbService } from '../General/db/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    mobile: [null, Validators.required],
    fullname: [null, Validators.required],
    username: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(5)]]
  })

  constructor(private dbService: DbService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {

  }


  signUp() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.dbService.userSignUp(this.signupForm.value).subscribe((d: any) => {
        if (d.status = 'success') {
          alert('Signup Successfull')
        } else {
          if (d.redirect_login) {
            alert('Already found an account, please try login !')
            this.router.navigateByUrl('/login')
          }
        }
      })

    }

  }


}
