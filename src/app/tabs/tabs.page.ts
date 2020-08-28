import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  template:`
<ion-tabs>

<ion-tab-bar slot="bottom">
  <ion-tab-button tab="portal">
    <ion-icon name="grid-outline"></ion-icon>
    <ion-label>应用</ion-label>
  </ion-tab-button>

  <ion-tab-button tab="activities">
    <ion-icon name="file-tray-stacked-outline"></ion-icon>
    <ion-label>我的消息</ion-label>
  </ion-tab-button>

  <ion-tab-button tab="profile">
    <ion-icon name="person-outline"></ion-icon>
    <ion-label>用户</ion-label>
  </ion-tab-button>
</ion-tab-bar>

</ion-tabs>
`
})
export class TabsPage {

  constructor() {}

}
