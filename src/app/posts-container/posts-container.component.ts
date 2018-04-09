import {Component, Input, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';
import {AuthService} from '../services/auth.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.css']
})
export class PostsContainerComponent implements OnInit {
  @Input() uid: string;
  posts: any[];
  activeSub;
  sorts = [{
    value: '/date',
    text: 'Post date'
  },
    {
      value: '/like',
      text: 'Amount of likes'
    }];
  sortPostsBy;

  constructor(private db: DbService, private auth: AuthService) {
    this.init();
  }

  ngOnInit() {
    this.sortPostsBy = '/date';
  }

  init() {
    if (!this.auth.user) {
      setTimeout(() => this.init(), 500);
      return;
    }

    this.activeSub = this.db.getPosts(this.sortPostsBy).subscribe(p => {
      const uid = this.uid;
      const filter = {uid};
      this.posts = _.filter(p.reverse(), filter);
    });
  }

  reorderPosts(event) {
    this.activeSub.unsubscribe();
    this.init();
  }

}
