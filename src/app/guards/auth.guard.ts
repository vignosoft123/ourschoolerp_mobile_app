
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(private router: Router) {}

  canActivate(): boolean {
    const storedData = localStorage.getItem('loggedinData');
    let parsedData: any = null;

    try {
      parsedData = storedData ? JSON.parse(storedData) : null;
    } catch (e) {
      console.error('Invalid login data:', e);
    }

    // 🔒 Check valid login session
    if (!parsedData || !parsedData.profile) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}