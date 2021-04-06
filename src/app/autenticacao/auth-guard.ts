import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router){ 
        
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean |
        Observable<boolean> | Promise<boolean> {
            if(this.authService.estalogado()){
                return true;
            }else{
                this.router.navigate(['login']);
                return false;
            }
        }
}