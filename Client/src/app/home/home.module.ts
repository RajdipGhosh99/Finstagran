import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { IndexComponent } from './index/index.component';
import { PostDivComponent } from './post-div/post-div.component';


@NgModule({
  declarations: [
    IndexComponent,
    PostDivComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports: [PostDivComponent]
})
export class HomeModule { }
