import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {EmailValidator, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fg = new FormGroup({
    email : new FormControl(),
    password : new FormControl()
  });
  changes: Observable<any>;

  loginErrMsg: string;

  constructor(private auth: AuthService, private router: Router, public snackBar: MatSnackBar) {
    this.fg.valueChanges.subscribe(() => this.loginErrMsg = null);
  }

  ngOnInit() {
  }

  async login() {
    this.loginErrMsg = await this.auth.login(this.fg.value);
    const msg = this.loginErrMsg;
    const duration = 1000;
    this.snackBar.open(this.loginErrMsg, '', {duration});
  }

  goToSignup() {
    this.router.navigateByUrl('/signup');
  }

}
