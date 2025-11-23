import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeePayPage } from './fee-pay.page';

const routes: Routes = [
  {
    path: '',
    component: FeePayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeePayPageRoutingModule {}
