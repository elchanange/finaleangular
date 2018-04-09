import {Component, OnInit} from '@angular/core';
import {Upload, UploadService} from '../../services/upload.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {DbService} from '../../services/db.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {SendMessageComponent} from '../../send-message/send-message.component';
import {ChangePassComponent} from '../../change-pass/change-pass.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public file;
  public loginErrMsg;
  fg = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    password2: new FormControl(),
    displayName: new FormControl(),
    birthday: new FormControl()
  });
  public error;
  public isEdit: boolean;
  public user;
  public today = new Date();

  constructor(private upSvc: UploadService,
              private authSvc: AuthService,
              private dbSvc: DbService,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) {
    this.fg.valueChanges.subscribe(() => this.error = null);
  }

  ngOnInit() {
    this.isEdit = this.route.snapshot.url.join('/') === 'profile/me';
    if (this.isEdit) {
      setTimeout(this.initUser.bind(this), 500);
    }
  }

  private initUser() {
    this.inserUDetails(this.authSvc.user);
    this.authSvc.userObserv.subscribe(this.inserUDetails.bind(this));
  }

  private inserUDetails(u) {
    this.user = u;
    Object.keys(u).forEach(k => {
      if (this.fg.controls[k]) {
        this.fg.controls[k].patchValue(u[k]);
      }
    });
  }

  fileChanges($event) {
    this.file = $event.srcElement.files.length > 0 ? $event.srcElement.files[0] : '';
  }

  private async uploadSingle(path): Promise<any> {
    const upload = new Upload(this.file);
    return await this.upSvc.pushUpload(upload, path);
  }

  private async editUser() {
    if (this.file) {
      const photoURL = await this.uploadSingle(`profilePictures/${this.user.uid}`);
      this.authSvc.updateUserInfo({photoURL});
    }
    const {birthday, displayName} = this.fg.value;
    this.authSvc.updateUserInfo({displayName, birthday});
    this.snackBar.open('Saved Succesfuly', '', {duration: 3000});
  }


  async register() {
    if (this.isEdit) {
      return this.editUser();
    }
    const registerResponse = await this.authSvc.register(this.fg.value);
    if (!registerResponse['uid']) {
      this.error = registerResponse['message'];
      return;
    } else {
      if (this.file) {
        const photoURL = await this.uploadSingle(`profilePictures/${registerResponse['uid']}`);
        this.authSvc.updateUserInfo({photoURL});
      }
      const {birthday, displayName} = this.fg.value;
      this.authSvc.updateUserInfo({displayName, birthday});
      this.authSvc.redirectHome();
    }

  }

  async changePassword() {
    const successMsg = 'Operation completed successfuly!!!';
    const duration = 3000;
    const dialogRef = this.dialog.open(ChangePassComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const {oldPass, newPass} = result;
      this.authSvc.changePassword(oldPass, newPass)
        .then(() => this.snackBar.open(successMsg, '', {duration}))
        .catch(err => this.snackBar.open('One of the params is wrong, please check it.', '', {duration}));
    });
  }


}
