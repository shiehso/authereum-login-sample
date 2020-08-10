import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignedInGuard } from './guard/signed-in.guard';
import { SignedOutGuard } from './guard/signed-out.guard';

import { SigninPageComponent } from './page/signin-page/signin-page.component';
import { HomePageComponent } from './page/home-page/home-page.component';

const routes: Routes = [{
  path: 'signin',
  component: SigninPageComponent,
  canActivate: [
    SignedOutGuard,
  ],
}, {
  path: '**',
  component: HomePageComponent,
  canActivate: [
    SignedInGuard,
  ],
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
