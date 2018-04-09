import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {DbService} from '../services/db.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {SendMessageComponent} from '../send-message/send-message.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfile;
  loading = true;


  get age() {
    const ageDifMs = Date.now() - new Date(this.userProfile.birthday).getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  get mePage() {
    const {uid} = this.userProfile;
    return this.auth.user.uid === uid;
  }

  constructor(public db: DbService, private route: ActivatedRoute, public dialog: MatDialog, private auth: AuthService, private router: Router) {
    this.route.params.subscribe(params => {
      const {id} = params;
      this.db.getUser(id, this.auth.user).subscribe(u => {
        this.userProfile = u;
        this.loading = false;
      });
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(SendMessageComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.db.sendMessage(this.userProfile.uid, this.auth.user, result);
    });
  }

  goToEdit() {
    this.router.navigateByUrl('/profile/me');
  }

  ngOnInit() {
  }

}
