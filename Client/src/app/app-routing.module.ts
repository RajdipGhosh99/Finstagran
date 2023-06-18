import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
// import { HomeModule } from './home/home.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: () => import('./home/home-routing.module').then(m => m.HomeRoutingModule) },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.routing').then(m => m.AuthRoutingModule) },

  { path: ':user_name', pathMatch: 'full', loadChildren: () => import('./view-profile/view-profile-routing.module').then(m => m.ViewProfileRoutingModule) },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
