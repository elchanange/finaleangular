import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  get userPhoto() {
    return this.auth.user ? this.auth.user.photoURL : 'assets/img/unknown.jpg';
  }

  get displayName() {
    return this.auth.user ? this.auth.user.displayName : 'Guest';
  }

  // get fullName() {
  //   return this.auth.connected ? this.auth.fullName : 'Guest';
  // }

  constructor(public auth: AuthService, private route: Router) {

  }

  ngOnInit() {
  }

  disconnect() {
    this.auth.disconnect();
  }

  goToLogin() {
    if (this.auth.user) {
      this.route.navigateByUrl(`/profile/${this.auth.user.uid}`);
    } else {
      this.route.navigateByUrl('/login');
    }
  //  asdf
  }

}
