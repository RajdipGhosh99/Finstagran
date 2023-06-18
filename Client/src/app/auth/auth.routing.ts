import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SsoGoogleComponent } from './sso-google/sso-google.component';


const routes: Routes = [
    { path: 'v1/google', component: SsoGoogleComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }