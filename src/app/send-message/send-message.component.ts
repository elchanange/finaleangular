import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  public msg;

  constructor(public dialogRef: MatDialogRef<SendMessageComponent>) {
  }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
