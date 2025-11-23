import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HolidayPageRoutingModule } from './holiday-routing.module';

import { HolidayPage } from './holiday.page';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoaderComponent,
    HolidayPageRoutingModule
  ],
  declarations: [HolidayPage]
})
export class HolidayPageModule {}
