import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { SessionService } from 'src/app/service/session.service';

@Injectable({
  providedIn: 'root',
})
export class SignedOutGuard implements CanActivate
{
  constructor(
    private router: Router,
    private sessionService: SessionService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return new Observable(subscriber =>
    {
      const user = this.sessionService.getUser();
      if (user !== null) {
        this.router.navigate(['/']);
        subscriber.next(false);
      }
      else {
        subscriber.next(true);
      }
      subscriber.complete();
    });
  }
}
