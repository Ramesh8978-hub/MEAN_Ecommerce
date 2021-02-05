import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminService } from '../shared/admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private adminService : AdminService,private router : Router){}

  canActivate(): boolean {
    if (this.adminService.loggedIn()) {
      console.log('true')
      return true
    } else {
      console.log('false')            
      this.router.navigate(['/login'])
      return false
    }
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): boolean {
  //     if (!this.adminService.loggedIn()) {
  //       this.router.navigateByUrl('/login');
  //       this.adminService.deleteToken();
  //       return false;
  //     }
  //   return true;
  // }
  
}
