import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Authereum from 'authereum';

import { AuthereumService } from 'src/app/service/authereum.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: [
    './signin-page.component.scss',
  ],
})
export class SigninPageComponent implements OnInit
{
  private NETWORK = 'mainnet';

  private authreum;

  constructor(
    private router: Router,
    private authereumService: AuthereumService,
    private notificationService: NotificationService,
    private sessionService: SessionService,
  ) {
    this.authreum = new Authereum(this.NETWORK);
  }

  ngOnInit(): void {}

  signin(): void
  {
    this.authereumService.enable().subscribe(
      accounts => {
        this.sessionService.setUser(accounts);
        this.router.navigate(['/']);
      },
      err => this.notificationService.error(err.message),
    );
  }
}
