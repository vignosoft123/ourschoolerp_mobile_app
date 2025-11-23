import { Component, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonInput } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Platform, ToastController } from '@ionic/angular';
import { LangandparmisionService } from '../services/langandparmision.service';
import { Device } from '@capacitor/device';
import { FCM } from '@awesome-cordova-plugins/fcm';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})

export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  userdata:any;
  errorMessage: string = '';
  user:any = {};
  constructor(private router: Router, private platform: Platform,private apiservice: LangandparmisionService,
    private authService: AuthenticationService,  private toastController: ToastController) {}

  ngOnInit() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      this.router.navigate(['/home']);
    }
  }
  async showToast(message: string, type: 'success' | 'danger' = 'success') {
  const toast = await this.toastController.create({
    message: message,
    duration: 3000,
    color: type, // 'success' (green) or 'danger' (red)
    position: 'top'
  });
  toast.present();
}

  async login() {
  if (this.user.username != '' && this.user.password != '') {
    this.authService.login(this.user)
      .then(async (data: any) => {
        this.userdata = data.profile;
        localStorage.setItem('teacher',data.teacher_phone);
        localStorage.setItem('prinicpal',data.correspondent_phone)

        this.authService.publishUserData({
          user: data.profile
        });
        this.authService.publishTokenData({
          token: data.token
        });

        if (data) {
          await this.profile();
          this.showToast('Login successful!', 'success');

       this.router.navigateByUrl('/home', { replaceUrl: true });
          this.sendDeviceToken(); 
        }
      })
      .catch(error => {
        this.showToast('Invalid login details.', 'danger');
        console.log(error);
      });
  }
}

  async profile(){
    this.apiservice.getUserProfile().subscribe((data: any) => {        
      if(data.status == true)
      {
        localStorage.setItem('loggedinData',JSON.stringify(data.data))
      }       
    })
  }


async sendDeviceToken() {
  if (!Capacitor.isNativePlatform()) {
    console.warn('Skipping FCM token request — running in browser');
    return;
  }

  try {
    const id: any = await FCM.getToken();
    const platform = this.platform.is('android') ? 'android' : 'ios';

    const payload = {
      studentID: this.userdata.loginuserID,
      device_token: id.identifier,
      platform: platform
    };

    this.apiservice.sendDeviceToken(payload).subscribe({
      next: (data: any) => {
        if (data && data.status === true) {
          this.router.navigate(['/home']);
        } else {
          this.showToast('Failed to send device token.', 'danger');
        }
      },
      error: (error) => {
        this.showToast(error, 'danger');
      }
    });
  } catch (err: any) {
    this.showToast(err, 'danger');
  }
}

}
