import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CreatePostComponent } from './create-post/create-post.component';



@NgModule({
  declarations: [
    SidenavComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule
  ], exports: [
    SidenavComponent
  ]
})
export class NavbarModule { }
