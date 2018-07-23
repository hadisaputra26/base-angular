import { Observable } from 'rxjs/Observable';
import { ApiResponse } from './../types/ApiResponse';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class CustomValidatorService {

  constructor(
    public httpClient: HttpClient
  ) {

  }

  uniqueValidator(tableName, field, id = null) {
    return (control: AbstractControl): Observable<any> => {
      const options = {
        params: {
          field,
          value: control.value,
          id
        }
      }

      return this.httpClient.get(`${environment.apiUrl}/${tableName}/check-unique`, options).map(res => {
        return (<ApiResponse>res).data ? null : { unique: true };
      });
    }
  }
}