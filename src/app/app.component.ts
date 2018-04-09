import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private iconReg: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.iconReg.addSvgIconSetInNamespace('clap', sanitizer.bypassSecurityTrustResourceUrl('assets/img/hands.ico'));
  }
}
