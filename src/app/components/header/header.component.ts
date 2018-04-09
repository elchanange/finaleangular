import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {DbService} from '../../services/db.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public authSvc: AuthService, private db: DbService) {
    console.log(this.router.url);
  }

  ngOnInit() {

  }


  goTo(url) {
    this.router.navigateByUrl(url);
  }

  redirectAndStopNotifications() {
    this.db.zeroNotification(this.authSvc.user.uid);
    this.goTo('/messages');
  }

}
