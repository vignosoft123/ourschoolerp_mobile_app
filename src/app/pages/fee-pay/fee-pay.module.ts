import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeePayPageRoutingModule } from './fee-pay-routing.module';

import { FeePayPage } from './fee-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeePayPageRoutingModule
  ],
  declarations: [FeePayPage]
})
export class FeePayPageModule {}
