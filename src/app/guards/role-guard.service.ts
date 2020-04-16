import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {


  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.role();
    console.log(980980, next.data);
    if (user.Role === next.data.role) {
      return true;
    }
    // this.router.navigate(['/404']);
    console.log('Access not Granted');
    this.router.navigate(['/login']);
    return false;
  }
} 
