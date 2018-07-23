import { reducers } from './core/reducers/index';
import { HttpClientService } from './core/services/httpclient.service';
import { Http, HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { TranslateModule } from '@ngx-translate/core';
import { AuthGuard } from './core/guards/auth-guard.service';
import { CustomHttpInterceptor } from './core/httpInterceptor';
import { StoreModule } from '@ngrx/store';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: 'app/main/content/authorization/authorization.module#AuthorizationModule'
  },
  {
    path: 'user',
    loadChildren: 'app/main/content/users/user.module#UserModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'role',
    loadChildren: 'app/main/content/roles/role.module#RoleModule',
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'user',
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    SharedModule,
    TranslateModule.forRoot(),
    FuseMainModule,
    HttpModule,
    StoreModule.forRoot(reducers),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true,
      deps: [Http, JwtHelperService]
    },
    FuseSplashScreenService,
    FuseConfigService,
    FuseNavigationService,
    AuthGuard,
    HttpClientService,
    JwtHelperService
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
