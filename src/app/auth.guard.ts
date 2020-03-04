import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { SpotifyService } from "../app/services/spotify.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private spotserv: SpotifyService, private router: Router){ }

  canActivate(): boolean {
    if(this.spotserv.checkToken()){
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

}
  

