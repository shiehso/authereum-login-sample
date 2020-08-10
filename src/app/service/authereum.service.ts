import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import Authereum from 'authereum';

import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthereumService
{
  private authereum;

  constructor(
    private sessionService: SessionService,
  ) {
    this.authereum = new Authereum('mainnet');
  }

  getProvider()
  {
    return this.authereum.getProvider();
  }

  enable(): Observable<string[]>
  {
    return new Observable(subscriber => {
      this.getProvider().enable()
      .then((accounts: string[]) => {
        subscriber.next(accounts);
        subscriber.complete();
      })
      .catch(err => {
        subscriber.error(new Error(err.message || JSON.stringify(err)));
      });
    });
  }

  signTypedData(payload: any): Observable<string>
  {
    const from = this.sessionService.getUser()[0];

    return new Observable(subscriber => {
      this.getProvider().sendAsync({
        id: 1,
        method: 'eth_signTypedData',
        params: [
          payload,
          from,
        ],
        from: from,
      }, (err, resp) => {
        if (err) subscriber.error(new Error(err.message || JSON.stringify(err)));
        subscriber.next(resp.result);
        subscriber.complete();
      });
    });
  }
}
