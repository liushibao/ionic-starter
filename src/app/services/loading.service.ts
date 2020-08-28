import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public loadingController: LoadingController) {

  }

  async init() {

    this.loading = await this.loadingController.create({
      message: '正在努力加载数据中...',
    });

    await this.loading.present();

    this.loading.hidden = true;

  }

  private couter: number = 0;
  private loading: HTMLIonLoadingElement;

  show() {
    this.couter++;
    this.loading.hidden = false;
  }

  hide() {
    this.couter--;
    if (this.couter <= 0)
      this.loading.hidden = true;
  }

}
