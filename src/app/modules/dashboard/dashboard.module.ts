import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [
    HttpClientModule,
    AngularSvgIconModule.forRoot(),

    DashboardRoutingModule,
  ],
})
export class DashboardModule {}
