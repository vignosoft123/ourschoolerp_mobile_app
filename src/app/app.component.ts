import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { App as CapacitorApp } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  private appInitialized = false; // prevent re-navigation on repeated initialization

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.initializeApp();
    this.handleBackButton();
  }

  async initializeApp() {
    await this.platform.ready();

    await SplashScreen.show({
      showDuration: 1000,
      autoHide: true,
    });

    // Run this block only once at cold start
    if (this.appInitialized) return;
    this.appInitialized = true;

    setTimeout(() => {
      const storedData = localStorage.getItem('loggedinData');
      let parsedData: any = null;

      try {
        parsedData = storedData ? JSON.parse(storedData) : null;
      } catch (e) {
        console.error('Invalid stored login data:', e);
      }

      /**
       * Important: only perform automatic redirects when the app is on the root/login
       * path during startup. This prevents interfering with user navigation to
       * other pages (like /events) which caused the Events -> Login -> Back issue.
       */

      const currentUrl = this.router.url;

      // If there's no login data and app is on root/login, go to /login.
      if (!parsedData || !parsedData.profile) {
        if (currentUrl === '/' || currentUrl === '' || currentUrl === '/login') {
          this.router.navigate(['/login'], { replaceUrl: true });
        }
        return;
      }

      // If logged in and app is on root/login, navigate to home.
      if (currentUrl === '/' || currentUrl === '' || currentUrl === '/login') {
        this.router.navigate(['/home'], { replaceUrl: true });
      }

      // If logged in and user already navigated to some other page (e.g. /events),
      // do nothing — allow that navigation to continue.
    }, 300); // small delay to let routing initialize
  }

  handleBackButton() {
    this.platform.ready().then(() => {
      CapacitorApp.addListener('backButton', ({ canGoBack }) => {
        // Exit app only when on /home
        if (this.router.url === '/home') {
          CapacitorApp.exitApp();
        } else {
          window.history.back();
        }
      });
    });
  }
}