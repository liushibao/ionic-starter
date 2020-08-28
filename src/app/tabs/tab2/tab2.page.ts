import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  template: `
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>我的消息</ion-title>
    <ion-buttons slot="end">
      <ion-button (click)="service.refreshData()"><ion-icon name="refresh-outline" size="large"></ion-icon></ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content>
<ion-content fullscreen>
<div>我的消息</div>
</ion-content>
`
})
export class Tab2Page {

  constructor(private router: Router, public modalController: ModalController) { }


  currentModal = null;

}