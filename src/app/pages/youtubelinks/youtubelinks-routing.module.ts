import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YoutubelinksPage } from './youtubelinks.page';

const routes: Routes = [
  {
    path: '',
    component: YoutubelinksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubelinksPageRoutingModule {}
