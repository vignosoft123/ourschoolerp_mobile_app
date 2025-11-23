import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeWorkPageRoutingModule } from './home-work-routing.module';

import { HomeWorkPage } from './home-work.page';
import { LoaderComponent } from "src/app/shared/loader/loader.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeWorkPageRoutingModule,
    LoaderComponent
],
  declarations: [HomeWorkPage]
})
export class HomeWorkPageModule {}
