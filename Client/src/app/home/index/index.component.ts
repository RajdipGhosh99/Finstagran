import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  constructor(private router: Router) {
    let user: any = localStorage.getItem('_user')
    if (user) {
      if (!JSON.parse(user).token) this.router.navigateByUrl('/login')
    } else {
      this.router.navigateByUrl('/login')
    }


  }
}
