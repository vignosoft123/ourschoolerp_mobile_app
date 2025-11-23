import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendencePageRoutingModule } from './attendence-routing.module';

import { AttendencePage } from './attendence.page';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoaderComponent,
    AttendencePageRoutingModule
  ],
  declarations: [AttendencePage]
})
export class AttendencePageModule {}
