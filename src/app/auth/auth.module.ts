import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    // BrowserModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AuthComponent }
    ]),
    SharedModule,
    FormsModule
  ]
})
export class AuthModule {}
