import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthereumService } from 'src/app/service/authereum.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SessionService } from 'src/app/service/session.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: [
    './home-page.component.scss',
  ],
})
export class HomePageComponent implements OnInit
{
  account: string = '';

  constructor(
    private router: Router,
    private authereumService: AuthereumService,
    private notificationService: NotificationService,
    private sessionService: SessionService,
  ) {}

  ngOnInit(): void
  {
    this.account = this.sessionService.getUser()[0];
  }

  sign(): void
  {
    this.authereumService.signTypedData([{
      type: 'string',
      name: 'message',
      value: 'hello'
    }]).subscribe(
      sig => console.log(sig),
      err => this.notificationService.error(err.message),
    );
  }

  signout(): void
  {
    this.sessionService.removeUser();
    this.router.navigate(['/signin']);
  }
}
