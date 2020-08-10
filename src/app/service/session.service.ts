import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService
{
  private USER_KEY = 'user';

  constructor() {}

  setUser(accounts: string[]): void
  {
    localStorage.setItem(this.USER_KEY, JSON.stringify(accounts));
  }

  getUser(): string[]
  {
    const accountsStr = localStorage.getItem(this.USER_KEY);
    if (accountsStr === null) {
      return null;
    }
    return JSON.parse(accountsStr);
  }

  removeUser(): void
  {
    localStorage.removeItem(this.USER_KEY);
  }
}
