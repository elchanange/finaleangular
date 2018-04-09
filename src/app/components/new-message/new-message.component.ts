import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {DbService} from '../../services/db.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {


  fg = new FormGroup({
    headline: new FormControl(),
    message: new FormControl()
  });

  constructor(private authSvc: AuthService, private dbSvc: DbService) {

  }

  ngOnInit() {
  }

  post() {
    this.dbSvc.postNewPost({...this.fg.value, ...this.authSvc.user});
    this.authSvc.redirectHome();
  }

}
