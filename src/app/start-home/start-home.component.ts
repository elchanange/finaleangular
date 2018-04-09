import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-start-home',
  templateUrl: './start-home.component.html',
  styleUrls: ['./start-home.component.css']
})
export class StartHomeComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  goToLogin() {
    this.route.navigateByUrl('/login');
  }

}
