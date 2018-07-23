import { ApiResponse } from './../types/ApiResponse';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpClientService {
  constructor(private http: HttpClient) { }

  get(path: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(path, options);
  }

  post(path: string, data: object, options = null): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(path, data);
  }

  uploadWithProgress(url, data) {
    const req = new HttpRequest('POST', url, data, {
      reportProgress: true,
    });
    return this.http.request(req);
  }

  uploadWithProgressPut(url, data) {
    const req = new HttpRequest('PUT', url, data, {
      reportProgress: true,
    });
    return this.http.request(req);
  }

  put(path: string, data: object, options = null): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(path, data);
  }

  delete(path: string, options?: {
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
      [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
  }): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(path, options);
  }
}