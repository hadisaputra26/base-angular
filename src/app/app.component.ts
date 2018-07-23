import { UserChangeAction } from './core/reducers/user.actions';
import { Store } from '@ngrx/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Component } from '@angular/core';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from './core/services/translation-loader.service';

import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { FuseNavigationModel } from './navigation/navigation.model';
import { locale as navigationEnglish } from './navigation/i18n/en';
import { locale as navigationTurkish } from './navigation/i18n/tr';
import { User } from './main/content/users/user.model';

import * as fromRoot from "./core/reducers";

@Component({
  selector: 'fuse-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private fuseNavigationService: FuseNavigationService,
    private fuseSplashScreen: FuseSplashScreenService,
    private translate: TranslateService,
    private translationLoader: FuseTranslationLoaderService,
    private jwtHelper: JwtHelperService,
    public store: Store<fromRoot.State>,

  ) {
    // Add languages
    this.translate.addLangs(['en', 'tr']);

    // Set the default language
    this.translate.setDefaultLang('en');

    // Use a language
    this.translate.use('en');

    // Set the navigation model
    this.fuseNavigationService.setNavigationModel(new FuseNavigationModel());

    // Set the navigation translations
    this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);

    // Set logged in user from localstorage
    const token = localStorage.getItem('base-api:token');
    if (token) {
      const user: User = jwtHelper.decodeToken(token).sub;
      this.store.dispatch(new UserChangeAction(user));
    }
  }
}
