import {Component, Input, OnInit} from '@angular/core';
import {SendMessageComponent} from '../send-message/send-message.component';
import {MatDialog} from '@angular/material';
import {DbService} from '../services/db.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() data;

  constructor(public dialog: MatDialog, public db: DbService, public auth: AuthService) {
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SendMessageComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.db.sendMessage(this.data.sender.uid, this.auth.user, result);
    });
  }

}
