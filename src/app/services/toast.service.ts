import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AppError } from '../models/error';
import { logger } from './logger';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToast(message: string | AppError, color: string = "warning", duration: number = 10000) {
    const toast = await this.toastController.create({
      message: typeof message == 'string' ? message : message.errorMsg,
      duration: duration,
      color: color,
      buttons: [{
        text: '关闭',
        role: 'cancel',
        handler: () => {
          logger.debug('Cancel clicked');
        }
      }]
    });
    toast.present();
  }

}
