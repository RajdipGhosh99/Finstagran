import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  private user: any
  public postsList: any[] = []

  constructor(private router: Router, private dbservice: DbService) {
    this.user = localStorage.getItem('_user')
    if (this.user) {
      if (!JSON.parse(this.user).token) this.router.navigateByUrl('/login')
    } else {
      this.router.navigateByUrl('/login')
    }
  }
  ngOnInit(): void {
    this.getPosts()
  }

  getPosts() {
    this.postsList = []
    // console.log(this.user._id);

    this.dbservice.getPosts(JSON.parse(this.user)._id).subscribe({
      next: (d: any) => {
        this.postsList = d.data
        console.log(this.postsList);
      },
      error: e => console.log(e)
    })
  }



}
