import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SsoGoogleComponent } from './sso-google/sso-google.component';



@NgModule({
  declarations: [
    SsoGoogleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
