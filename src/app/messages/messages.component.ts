import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  msgs: any[];
  loading = true;

  constructor(private db: DbService, private auth: AuthService) {
  }

  ngOnInit() {
    this.initComponent();
  }

  initComponent() {
    if (!this.auth || !this.auth.user) {
      setTimeout(this.initComponent.bind(this), 200);
      return;
    }
    const {uid} = this.auth.user;
    this.db.getMessages(uid).subscribe(msgs => {
      this.msgs = msgs.reverse();
    });
  }

}
