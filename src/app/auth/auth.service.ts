import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS: string   = 'http://www.licovitras.co.za/oauth/token';
  AUTH_CLIENT_ID: string        = '4'
  AUTH_SECRET: string           = 'lhfcOrX6edoWNxkx1DlAeTuVJ1xYg4OAhYMVr246';
  GRANT_TYPE: string            = 'password';
  SCOPE: string                 = '*';

  authSubject  =  new  BehaviorSubject(false);

  constructor(private httpClient: HttpClient, private storage: Storage) { }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
        tap(async (res: AuthResponse ) => {

          if (res.user) {
            await this.storage.set("ACCESS_TOKEN", res.user.access_token);
            await this.storage.set("EXPIRES_IN", res.user.expires_in);
            this.authSubject.next(true);
          }
        })
    );
  }

  login(user: User): Observable<AuthResponse> {
    var body = "username=" + encodeURIComponent(user.email) + "&password=" + encodeURIComponent(user.password) + "&grant_type=" + "password" + "&scope=" + "*" + "&client_id=" + this.AUTH_CLIENT_ID + "&client_secret=" + this.AUTH_SECRET;
    var headers = new Headers();
    let params = new HttpParams({fromString: body });
    return this.httpClient.post(this.AUTH_SERVER_ADDRESS, body, {
    headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
  }).pipe(
        tap(async (res: AuthResponse) => {
          console.log(res);
          if (res.user) {
            await this.storage.set("ACCESS_TOKEN", res.user.access_token);
            await this.storage.set("EXPIRES_IN", res.user.expires_in);
            await this.storage.set("username", user.email);
            this.authSubject.next(true);
          }
        })
    );
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }

}
