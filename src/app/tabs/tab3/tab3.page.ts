import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/User';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-tab3',
  template: `
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>
      用户信息
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
<div>用户信息</div>
</ion-content>
`
})
export class Tab3Page {

  constructor(public authService: AuthService, private httpClient: HttpClient, private toastService: ToastService) {
    this.user = { ...authService.tokenObj?.user };
  }

  user: User;
  editable: boolean = true;

  enableEdit() {
    this.editable = true;
  }

  save() {
    this.httpClient.post<any>(`/api/user/save`, this.user, { observe: 'response', })
      .subscribe(
        t => {
          this.toastService.presentToast("用户信息保存成功。","success");
          // be carefull, save dose not return roles
          this.authService.updateCachedTokenResUser(this.user);
        }
      )
  }

}
