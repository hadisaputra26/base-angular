import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClientService } from './services/httpclient.service';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Http } from '@angular/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {

  constructor(public http: Http, public jwtHelper: JwtHelperService) { }

  refreshToken(refreshToken, userId) {
    return this.http.post(environment.apiUrl + '/users/token/refresh', {
      refresh_token: refreshToken,
      id: userId
    });
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let changedReq;
    let token = localStorage.getItem('base-api:token');
    let refreshToken = localStorage.getItem('base-api:refresh-token');

    if (token) {
      let decodedToken = this.jwtHelper.decodeToken(token.toString());
      const tokenizedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token.toString())
      })
      return next.handle(tokenizedRequest).catch((res) => {
        if (res.status === 401 || res.status === 403) {
          return this.refreshToken(refreshToken.toString(), decodedToken.data.id).flatMap((data) => {
            const newToken = data.json();
            localStorage.setItem('base-api:token', newToken.meta.token);
            const clonedRequestRepeat = req.clone({
              headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('base-api:token'))
            });
            return next.handle(clonedRequestRepeat);
          })
        } else {
          return Observable.throw(res);
        }
      });
    } else {
      return next.handle(req);
    }
  }
}