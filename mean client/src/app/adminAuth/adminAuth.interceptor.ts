import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';

import { AdminService } from "../shared/admin.service";
import { Injector } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs/operators";

@Injectable()
export class AdminAuthInterceptor implements HttpInterceptor {
  
  constructor(private injector: Injector){}
    intercept(req:any, next:any) {
      let adminService = this.injector.get(AdminService)
      let tokenizedReq = req.clone(
        {
          headers: req.headers.set('Authorization', 'bearer ' + adminService.getToken())
        }
      )
      return next.handle(tokenizedReq)
    }
  // constructor(private adminService : AdminService,private router : Router){}

  // intercept(req: HttpRequest<any>, next: HttpHandler) {

  //     if (req.headers.get('noauth'))
  //         return next.handle(req.clone());
  //     else {
  //         const clonedreq = req.clone({
  //             headers: req.headers.set("Authorization", "Bearer " + this.adminService.getToken())
  //         });
  //         return next.handle(clonedreq).pipe(
  //             tap(
  //                 event => { },
  //                 err => {
  //                     if (err.error.auth == false) {
  //                         this.router.navigateByUrl('/login');
  //                     }
  //                 })
  //         );
  //     }
  // }
}