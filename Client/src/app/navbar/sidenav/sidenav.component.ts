import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  public createPost: boolean = false


  createPostToggle() {
    this.createPost = !this.createPost
  }

}
