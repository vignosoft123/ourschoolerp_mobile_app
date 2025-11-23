import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplyLeavePageRoutingModule } from './apply-leave-routing.module';

import { ApplyLeavePage } from './apply-leave.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplyLeavePageRoutingModule
  ],
  declarations: [ApplyLeavePage]
})
export class ApplyLeavePageModule {}
