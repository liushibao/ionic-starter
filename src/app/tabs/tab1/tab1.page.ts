import { Component, AfterViewInit } from '@angular/core';
import { error } from 'protractor';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { logger } from '../../services/logger';
declare var cordova: any;
declare var navigator: any;
declare var Camera: any;


@Component({
  selector: 'app-tab1',
  template: `
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>
      应用入口
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
<div>应用入口</div>
</ion-content>`,
  styles: []
})
export class Tab1Page {

  constructor(public router: Router, public authService: AuthService) {
  }

  open(url: string, target: string = '_blank') {
    this.router.navigateByUrl(url);
  }

  isShow(item) {
    let result = true;
    if (item.showIfNot)
      result = !this.authService.tokenObj?.user?.roles.find(t => t == item.showIfNot);
    else if (item.showIf)
      result = this.authService.tokenObj?.user?.roles.find(t => t == item.showIf) != null;
    return result;
  }

}
