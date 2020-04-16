import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable(
  {
    providedIn: 'root'
  })

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public apiUrl = 'http://localhost:3000';
  constructor(
    private http: HttpClient, private router: Router,
    private snackBar: MatSnackBar) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        console.log(user);
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(8098098, user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        } else {
          this.openSnackBar(user.msg, 'Try Again');
        }
        return user;
      }));
  }

  registration(userData) {
    return this.http.post<any>(`${this.apiUrl}/users/registration`, userData)
      .pipe(map(user => {
        console.log(123, user);
        if (user.success) {
          this.openSnackBar(user.msg, 'OK');
        } else {
          this.openSnackBar(user.msg, 'OK');
        }
        return user;
      }));
  }




  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.openSnackBar('Logout Sucessfully !!!', 'OK');
    this.router.navigate(['/login']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
