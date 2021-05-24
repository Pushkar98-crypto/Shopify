import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private router:Router)
  {
    
  }

  canActivate ()
  {
      if(localStorage.getItem('ShoppingUserId'))
      {
        return true
      }
      
      {
        this.router.navigateByUrl('login')
        return false
      }

  }
}
