import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  isAuthenticated() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }
  role() {
    return {
      Role: 'Admin111'
    }
  }
}
