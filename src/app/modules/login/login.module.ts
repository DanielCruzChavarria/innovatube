import { NgModule } from '@angular/core';
import { LoginRoutingModule } from './login-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    HttpClientModule,
    LoginRoutingModule,
    AngularSvgIconModule.forRoot(),
  ],

})
export class LoginModule {}
