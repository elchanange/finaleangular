import {Component, OnInit} from '@angular/core';
import {DbService} from '../../services/db.service';
import * as _ from 'lodash';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sorts = [{
    value: '/date',
    text: 'Post date'
  },
    {
      value: '/like',
      text: 'Amount of likes'
    }];
  _posts = [];
  sortPostsBy;
  loading = true;
  subscription;
  activeSub;

  get posts() {
    return this._posts;
  }

  constructor(private db: DbService, private auth: AuthService, private route: Router) {

    this.init();
  }

  ngOnInit() {
    this.sortPostsBy = '/date';
  }

  init() {
    this.loading = true;
    if (!this.auth.user) {
      setTimeout(() => this.init(), 1000);
      return;
    }
    let filter = {};
    this.subscription = this.db.getPosts(this.sortPostsBy);
    if (this.route.url !== '/') {
      const {uid} = this.auth.user;
      filter = {uid};
    }
    this.activeSub = this.subscription.subscribe(posts => {
      this._posts = _.filter(posts.reverse(), filter);
      setTimeout(() => this.loading = false, 1);
    });
  }


  reorderPosts(event) {
    this.activeSub.unsubscribe();
    this.init();
  }

}
