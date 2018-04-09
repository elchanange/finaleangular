import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FormControl, FormGroup} from '@angular/forms';
import {DbService} from '../services/db.service';
import {SendMessageComponent} from '../send-message/send-message.component';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit {
  get data() {
    const oldPass = this.oldPass;
    const newPass = this.newPass;
    return {oldPass, newPass};
  }

  public oldPass;
  public newPass;

  constructor(public dialogRef: MatDialogRef<SendMessageComponent>) {
  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
