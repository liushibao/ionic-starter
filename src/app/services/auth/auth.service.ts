import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpRequest, HttpErrorResponse, HttpEvent, HttpEventType } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/User';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { request } from 'http';
import { Router } from '@angular/router';
import { CacheService } from '../cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private cacheService: CacheService, private httpClient: HttpClient) {
  }

  tokenObj?: any;

  private _redirect_uri: string;
  public get redirect_uri(): string {
    if (this._redirect_uri && this._redirect_uri.trim() != '')
      return this._redirect_uri;
    else
      return "/";
  }
  public set redirect_uri(value: string) {
    this._redirect_uri = value;
  }

  isSessionCaptchaed: boolean = false;
  captchaImgUri: string;

  refreshCaptcha() {
    this.isSessionCaptchaed = false;
    this.captchaImgUri = undefined;
    this.httpClient.get<any>(`/api/auth/serssionChallenge`, { observe: 'response' }).pipe(
      map(t => {
        return t.body.imgUri;
      })
    ).subscribe(t => this.captchaImgUri = t);
  }

  verifyCaptcha(captchaText) {
    this.httpClient.post<any>(`/api/auth/serssionChallenge`, { captchaText }, { observe: 'response', })
      .subscribe(
        t => this.isSessionCaptchaed = t.body.captchaed
      )
  }

  smsRequest(mob, actionType) {
    return this.httpClient.post<any>(`/api/auth/mobInput`, { mob, actionType }, { observe: 'response', });
  }

  updateTokean(token, isUpdateCache) {
    this.tokenObj = token;
    if (isUpdateCache)
      this.cacheService.setObj("tokenRes", this.tokenObj, this.tokenObj.refresh_expires_in - 2000);
  }

  updateCachedTokenResUser(user) {
    let token = { ...this.tokenObj, user: this.tokenObj.user };
    this.updateTokean(token, true);
  }

  updateLoginStatus(tokenRes, isUpdateCache: boolean) {
    this.isSessionCaptchaed = false;
    this.updateTokean(tokenRes, isUpdateCache);
    this.router.navigateByUrl(this.redirect_uri);
  }

  login(mob, password) {
    this.httpClient.post<any>(`/api/auth/login`, { mob, password }, { observe: 'response', })
      .subscribe(
        t => {
          this.updateLoginStatus(t.body, true);
        }
      )
  }

  smsChallenge(mob, password, actionType) {
    this.httpClient.post<any>(`/api/auth/smsChallenge`, { mob, password, actionType }, { observe: 'response', })
      .subscribe(
        t => {
          this.updateLoginStatus(t.body, false);
        }
      )
  }

  logout() {
    this.isSessionCaptchaed = false;
    this.tokenObj = undefined;
    this.cacheService.del("tokenRes");
    this.router.navigateByUrl("/");
  }


}
