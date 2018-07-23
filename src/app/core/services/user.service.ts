import { User } from './../../main/content/users/user.model';
import { ApiResponse } from './../types/ApiResponse';
import { environment } from './../../../environments/environment';
import { HttpClientService } from './httpclient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClientService) { }

  signin(credentials): Observable<ApiResponse> {
    return this.httpClient.post(environment.apiUrl + '/users/login', credentials).map(response => <ApiResponse>response);
  }

  getAll(column, direction, offset, limit, filter): Observable<any> {
    const options = {
      params: {
        orderBy: (column) ? column : '',
        orderDir: direction,
        offset: offset,
        limit: limit,
        filter
      }
    }
    return this.httpClient.get(environment.apiUrl + '/users', options).map(response => <ApiResponse>response);
  }

  create(user: User) {
    return this.httpClient.post(environment.apiUrl + '/users', user).map(response => <User>(<ApiResponse>response).data);
  }

  update(user: User) {
    return this.httpClient.put(environment.apiUrl + '/users', user).map(response => <User>(<ApiResponse>response).data);
  }

  delete(id) {
    return this.httpClient.delete(environment.apiUrl + '/users/' + id).map(response => <ApiResponse>response);
  }
}