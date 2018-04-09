import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-fastpost',
  templateUrl: './fastpost.component.html',
  styleUrls: ['./fastpost.component.css']
})
export class FastpostComponent implements OnInit {
  public headline;
  public message;

  get canPost() {
    return this.headline && this.message;
  }

  constructor(private db: DbService, private auth: AuthService) {
  }

  ngOnInit() {
  }

  post() {
    if (!this.canPost) {
      return;
    }
    const message = this.message;
    const headline = this.headline;
    this.message = '';
    this.headline = '';
    this.db.postNewPost({message, headline, ...this.auth.user});

  }

}
