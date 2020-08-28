import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Observable, of, EMPTY, BehaviorSubject } from 'rxjs';
import { request } from 'http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { delay, finalize, map, tap, catchError, filter, take, switchMap, mergeMap } from 'rxjs/operators';
import { ToastService } from 'src/app/services/toast.service';
import { logger } from 'src/app/services/logger';
import { error } from 'console';
import { CacheService } from '../cache.service';
import { API_LIST } from '../../models/API_LIST';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private httpClient: HttpClient, private authService: AuthService, private loadingService: LoadingService, private toastService: ToastService, private cacheService: CacheService) { }

  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  private refreshAccessToken(): Observable<any> {
    return this.httpClient.post<any>(`/api/auth/token`, { grant_type: "refresh_token", client_id: "app-client", refresh_token: this.authService.tokenObj.refresh_token }, { observe: 'response', });
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    request.headers.delete("Authorization");
    return request.clone({
      headers: request.headers.set("Authorization", `Bearer ${this.authService.tokenObj?.access_token}`)
    });
  }

  private getRelativeUrl() {
    return window.location.pathname + window.location.search;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    logger.debug({ req: req });

    // this interceptor only process internal apis
    if (!req.urlWithParams.startsWith("/"))
      return next.handle(req);

    let withCredentials = false;
    if (req.url.startsWith("/api/auth/")) {
      withCredentials = true;
    }
    else if (!this.authService.tokenObj?.access_token) {
      this.router.navigateByUrl(`/auth/login?redirect_uri=${this.getRelativeUrl()}`);
      return EMPTY;
    }

    let api = req.url.startsWith("/") ? Object.values(API_LIST).find(t => t.path == req.url) : null;

    let url = req.urlWithParams.startsWith("/") ? `${environment.apiBaseUrl}${req.urlWithParams}` : req.urlWithParams;

    let headers = req.headers;
    if (this.authService.tokenObj?.access_token)
      headers = headers.set("Authorization", `Bearer ${this.authService.tokenObj?.access_token}`);

    let authReq = req.clone({
      url: url,
      withCredentials: withCredentials,
      headers: headers
    })

    logger.debug({ transformedReq: authReq });

    if (!api?.isScilent)
      this.loadingService.show();

    return next.handle(authReq).pipe(

      tap(t => logger.debug({ res: t })),

      catchError((err: any, caught: Observable<any>) => {
        logger.error({ errorRes: err });

        if (req.url.startsWith("/api/auth/token")) {
          if (
            err.error.errorCode == "SESSIONID_NOT_FOUND"
            || err.error.errorCode == "SESSION_EXPIRED"
            || err.error.errorCode == "NOT_CAPTCHAED"
            || err.error.errorCode == "SMS_CODE_EXPIRED"
          )
            this.authService.refreshCaptcha();
          this.router.navigateByUrl(`/auth/login?redirect_uri=${this.getRelativeUrl()}`);
          return [err];
        }

        if (err.status == 401 && !req.url.startsWith("/api/auth/") && this.authService.tokenObj?.refresh_token) {
          // 401 errors are most likely going to be because we have an expired token that we need to refresh.
          if (this.refreshTokenInProgress) {
            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            // which means the new token is ready and we can retry the request again
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthenticationToken(authReq)))
            );
          } else {
            this.refreshTokenInProgress = true;

            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refreshTokenSubject.next(null);

            return this.refreshAccessToken().pipe(
              switchMap(t => {
                if (t?.body?.access_token) {
                  let token = { ...this.authService.tokenObj/*保留用户信息，refresh_token返回没有用户信息*/, ...t.body };
                  this.authService.updateTokean(token,true);
                  this.refreshTokenSubject.next(t);
                  // should use the url modified authReq not the original req
                  return next.handle(this.addAuthenticationToken(authReq));
                }
                else if (t?.status >= 400) {
                  this.router.navigateByUrl(`/auth/login?redirect_uri=${this.getRelativeUrl()}`);
                }
              }),
              // When the call to refreshToken completes we reset the refreshTokenInProgress to false
              // for the next time the token needs to be refreshed
              finalize(() => this.refreshTokenInProgress = false)
            );
          }
        }

        return of(err);
      }),

      map((t: HttpEvent<any>) => {
        if (t instanceof HttpErrorResponse && t.status >= 500 && t.status < 600 && !t.error?.errorMsg)
          return new HttpErrorResponse({ ...t, error: { errorCode: "UNKNOWN_SERVER_SIDE_ERROR", errorMsg: "服务器端未知错误。" } });
        else if (t instanceof HttpErrorResponse && t.status == 401)
          return new HttpErrorResponse({ ...t, error: { errorCode: "NOT_LOGGED", errorMsg: "未登录。" } });
        else if (t instanceof HttpErrorResponse && t.status >= 400 && t.status < 500 && !t.error?.errorMsg)
          return new HttpErrorResponse({ ...t, error: { errorCode: "UNKNOWN_Client_SIDE_ERROR", errorMsg: "客户端未知错误。" } });
        else if (t instanceof HttpErrorResponse && t.status == 0)
          return new HttpErrorResponse({ ...t, error: { errorCode: "PROBABLY_NETWORK_ERROR", errorMsg: "可能网络连接故障。" } });
        else if (t instanceof HttpErrorResponse && !t.error?.errorMsg)
          return new HttpErrorResponse({ ...t, error: { errorCode: "UNKNOWN_ERROR", errorMsg: "未知错误。" } });
        else
          return t;
      }),

      tap((t: HttpEvent<any>) => {
        logger.debug({ transofrmedRes: t });
        if (t instanceof HttpErrorResponse && (t.status >= 500 && t.status < 600 || t.status == 0)) {
          this.toastService.presentToast(t.error.errorMsg, "danger");
          throw t; // throw again, so the subscriber still get a chance to handle it
        }
        else if (t instanceof HttpErrorResponse && t.status >= 400 && t.status < 500) {
          this.toastService.presentToast(t.error.errorMsg, "warning", -1);
          if (t.status == 401)
            return this.router.navigateByUrl(`/auth/login?redirect_uri=${this.getRelativeUrl()}`);
          throw t; // throw again, so the subscriber still get a chance to handle it
        }
      }),

      // delay(5000), // for test only
      finalize(() => {
        if (!api?.isScilent)
          this.loadingService.hide();
      })

    );

  }

}