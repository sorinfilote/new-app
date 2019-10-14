import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }

  currentUserFromLocalStorage() {
    return this.currentUserSubject.asObservable();
  }

  currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    let data = {'data': {'username': username, 'password': password}};
    let url = 'http://localhost:1234/login';
    return this.http.post<any>(url, data)
      .pipe(map( user => {
        user.username = username;
        if (user.session) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  register(username: string, password: string) {
    let data = {'data': {'username': username,'password': password}};
    let url = 'http://localhost:1234/users';
    return this.http.post<any>(url, data)
      .pipe(map( user => {
        user.username = username;
        if (user.session) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
