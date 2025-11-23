import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YoutubelinksPageRoutingModule } from './youtubelinks-routing.module';

import { YoutubelinksPage } from './youtubelinks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YoutubelinksPageRoutingModule
  ],
  declarations: [YoutubelinksPage]
})
export class YoutubelinksPageModule {}
