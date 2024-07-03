import { NgModule, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  imports: [
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    LayoutRoutingModule,
  ],
})
export class LayoutModule {

}
