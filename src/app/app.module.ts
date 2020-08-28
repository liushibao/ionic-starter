import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { LoadingService } from './services/loading.service';
import { ToastService } from './services/toast.service';
import { logger } from './services/logger';
import { environment } from '../environments/environment';
import { CacheService } from './services/cache.service';
import { MyHttpClient } from './services/MyHttpClient';


export function init(loadingService: LoadingService, cacheService: CacheService, authService: AuthService) {

  return async () => {

    await loadingService.init();

    let tokenRes = cacheService.getObj("tokenRes");
    if (tokenRes)
      return authService.updateLoginStatus(tokenRes,false);

  }

}

export class MyErrorHandler implements ErrorHandler {
  handleError(error) {
    logger.error(error);
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: MyErrorHandler },
    // MyHttpClient,
    // CacheService,
    // ToastService,
    {
      provide: APP_INITIALIZER,
      useFactory: init,
      multi: true,
      deps: [LoadingService, CacheService, AuthService]
    },
    // AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
