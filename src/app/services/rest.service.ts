import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  baseUrl: string = "http://www.licovitras.co.za/api/";

  constructor(public httpClient: HttpClient) { }

  public getActiveCases() {

    return this.httpClient

      .get(this.baseUrl + "patients").pipe(map(result => result));

  }

  public getCases() {

  }

  public registerNewPatient(patient, lat, long, adress) {
    var body = "name=" + encodeURIComponent(patient.name) + "&email=" + encodeURIComponent(patient.email) + 
    "&cell=" + patient.phone + "&latitude=" + lat + "&longitude=" + long + "&address=" + adress;
    return this.httpClient.post(this.baseUrl + "patients", body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }

}

