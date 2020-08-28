import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { logger } from 'src/app/services/logger';

@Component({
  selector: 'app-auth',
  template: `
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="end">
      <ion-button [routerLink]="['/']">
        <ion-icon name="home"></ion-icon>首页
      </ion-button>
    </ion-buttons>
    <ion-title>{{title}}</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content fullscreen>

  <form *ngIf="!authService.isSessionCaptchaed" class="form">

    <ion-list lines="full" class="ion-no-margin ion-no-padding">

      <ion-item>
        <img style="margin: auto; height:150px; width:300px" alt="人机验证码加载异常" src="{{authService.captchaImgUri}}">
      </ion-item>

      <ion-item>
        <ion-label position="stacked">请输入上图验证码<ion-text color="danger">*</ion-text></ion-label>
        <ion-input required type="text" name="captchaText" #captchaText></ion-input>
      </ion-item>

      <ion-item lines="none">
        <div>
          <ion-button type=" submit" color="success" name="serssionChallenge" (click)="authService.verifyCaptcha(captchaText.value)">验证</ion-button>
          <a style="margin: 30px;" (click)="authService.refreshCaptcha()">刷新验证码</a>
        </div>
      </ion-item>

    </ion-list>

  </form>
      
  <form class="form">

    <ion-list lines="full" class="ion-no-margin ion-no-padding">

      <ion-item>
        <ion-label position="stacked">手机号<ion-text color="danger">*</ion-text></ion-label>
        <ion-input required type="text" name="mob" #mob></ion-input>
      </ion-item>

      <ion-item *ngIf="actionType=='REGISTER'||actionType=='RESET_PASSWORD'" lines="none">
        <ion-button [disabled]="!authService.isSessionCaptchaed||isSmsRequestBtnDisabled" type="submit" color="success" (click)="smsRequest(mob.value)">{{smsRequestBtnText}}</ion-button>
      </ion-item>

      <ion-item>
        <ion-label position="stacked">最近一次收到的短信验证码<ion-text color="danger">*</ion-text></ion-label>
        <ion-input required type="password" name="password" #password></ion-input>
      </ion-item>

      <ion-item lines="none">
        <div>
          <ion-button *ngIf="actionType=='LOGIN'" [disabled]="!authService.isSessionCaptchaed" type="submit" color="success" (click)="authService.login(mob.value, password.value)">登录</ion-button>
          <ion-button *ngIf="actionType=='RESET_PASSWORD'" [disabled]="!authService.isSessionCaptchaed||!isSMSVerfiySent" type="submit" color="success"(click)="authService.smsChallenge(mob.value, password.value,'RESET_PASSWORD')">重置密码</ion-button>
          <ion-button *ngIf="actionType=='REGISTER'" [disabled]="!authService.isSessionCaptchaed||!isSMSVerfiySent" type="submit" color="success" (click)="authService.smsChallenge(mob.value, password.value,'REGISTER')">注册</ion-button>
          <a *ngIf="actionType!='LOGIN'" style="margin: 30px;" [routerLink]="['/auth/login']">登录</a>
          <a *ngIf="actionType!='RESET_PASSWORD'" style="margin: 30px;" [routerLink]="['/auth/reset-password']">重置密码</a>
          <a *ngIf="actionType!='REGISTER'" style="margin: 30px;" [routerLink]="['/auth/register']">用户注册</a>
        </div>
      </ion-item>

    </ion-list>

  </form>

</ion-content>
`
})
export class AuthPage implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public authService: AuthService) {

    this.authService.redirect_uri = this.route.snapshot.queryParams.redirect_uri;

    if (window.location.pathname.startsWith("/auth/login")) {
      this.actionType = "LOGIN";
      this.title = "登录";
    }
    else if (window.location.pathname.startsWith("/auth/reset-password")) {
      this.actionType = "RESET_PASSWORD";
      this.title = "重置密码";
    }
    else if (window.location.pathname.startsWith("/auth/register")) {
      this.actionType = "REGISTER"
      this.title = "用户注册";
    }

    if (!this.authService.isSessionCaptchaed && !this.authService.captchaImgUri)
      this.authService.refreshCaptcha();

  }

  async ngOnInit() {
  }

  title: string;
  actionType: string;
  isSmsRequestBtnDisabled: boolean = false;
  isSMSVerfiySent: boolean = false;
  smsRequestBtnText: string = "获取短信验证码";

  smsRequest(mob) {
    this.isSmsRequestBtnDisabled = true;
    let count = 60;
    let timer = setInterval(() => {
      count--;
      this.smsRequestBtnText = `等待${count}秒重新获取`;
      if (count <= 0) {
        this.isSmsRequestBtnDisabled = false;
        this.smsRequestBtnText = `获取短信验证码`;
        clearInterval(timer);
      }
    }, 1000);

    this.authService.smsRequest(mob, this.actionType).subscribe(t => {
      this.isSMSVerfiySent = true;
    });

  }

}
