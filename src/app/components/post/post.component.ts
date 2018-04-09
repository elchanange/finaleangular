import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {DbService} from '../../services/db.service';
import * as _ from 'lodash';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() content;

  public audio: any;
  get likes() {
    return this.content.like ? this.content.like : 0;
  }

  get myPost() {
    const {uid} = this.auth.user;
    return this.content.uid === uid;
  }


  get enableLike() {
    const {uid} = this.auth.user;
    return !_.find(this.content.likes, {uid});
  }

  constructor(private auth: AuthService, private db: DbService, private router: Router) {
    this.audio = (<any>window).audio;
  }

  ngOnInit() {
  }

  goToProfile() {
    this.router.navigateByUrl(`/profile/${this.content.uid}`);
  }

  like() {
    this.audio.currentTime = 0;
    this.audio.play();
    if (!this.enableLike) {
      return;
    }
    this.db.likePost(this.content.key, this.auth.user);
  }

  dislike() {
    this.db.dislikePost(this.content.key, this.auth.user);
  }

}
