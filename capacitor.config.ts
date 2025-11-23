import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.ourschoolerp',
  appName: 'our-school-erp-app',
  webDir: 'www',
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      SplashShowOnlyFirstTime: 'false',
      AndroidWindowSplashScreenAnimatedIcon: 'resources/android/splash/drawable-port-xxxhdpi-screen.png',
      AndroidWindowSplashScreenBackground: '#FFFFFF'
    }
  }
};

export default config;
