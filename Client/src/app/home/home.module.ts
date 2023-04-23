import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { PostDivComponent } from './post-div/post-div.component';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [
    IndexComponent,
    PostDivComponent
  ],
  exports: [PostDivComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarModule
  ]
})
export class HomeModule { }
