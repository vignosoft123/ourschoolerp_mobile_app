import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'attendence',
    loadChildren: () => import('./pages/attendence/attendence.module').then(m => m.AttendencePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then(m => m.EventsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'leaves',
    loadChildren: () => import('./pages/leaves/leaves.module').then(m => m.LeavesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'apply-leave',
    loadChildren: () => import('./pages/apply-leave/apply-leave.module').then(m => m.ApplyLeavePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'holiday',
    loadChildren: () => import('./pages/holiday/holiday.module').then(m => m.HolidayPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'marks',
    loadChildren: () => import('./pages/marks/marks.module').then(m => m.MarksPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'fee',
    loadChildren: () => import('./pages/fee/fee.module').then(m => m.FeePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'home-work',
    loadChildren: () => import('./pages/home-work/home-work.module').then(m => m.HomeWorkPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pay-fee',
    loadChildren: () => import('./pages/fee-pay/fee-pay.module').then(m => m.FeePayPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'youtubelinks',
    loadChildren: () => import('./pages/youtubelinks/youtubelinks.module').then(m => m.YoutubelinksPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}