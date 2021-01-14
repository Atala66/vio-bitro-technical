import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class IncidentFormService {
  public mockURL = '../../../assets/mocks/persons.json';
  constructor(private http: HttpClient) {}

  public getPersonsToAutocomplete(): Observable<any> {
    return this.http.get(this.mockURL);
  }
}
