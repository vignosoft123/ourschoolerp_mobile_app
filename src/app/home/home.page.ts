import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LangandparmisionService } from '../services/langandparmision.service';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { fileUrl } from '../config/config';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [CallNumber],
  standalone: false,
  encapsulation: ViewEncapsulation.None
})
export class HomePage {
 menus:any=[];

 studentMenu:any= [
  { title: 'Call to Teacher', icon: 'call-outline', route: '/call-teacher' },
  { title: 'Call to Principal', icon: 'call-outline', route: '/call-principal' },
  { title: 'Student Info', icon: 'person-circle-outline', route: '/student-info' },
  { title: 'Attendance', icon: 'checkmark-done-outline', route: '/attendance' },
  { title: 'Home Work', icon: 'book-outline', route: '/home-work' },
  { title: 'Exam Schedule', icon: 'calendar-outline', route: '/exam-schedule' },
  { title: 'Exam Marks', icon: 'clipboard-outline', route: '/exam-marks' },
  { title: 'Exam Syllabus', icon: 'document-text-outline', route: '/exam-syllabus' },
  { title: 'Fees', icon: 'calculator-outline', route: '/fees' },
  { title: 'Apply Leave', icon: 'medkit-outline', route: '/apply-leave' },
  { title: 'Holidays', icon: 'calendar-number-outline', route: '/holidays' },
  { title: 'Events', icon: 'color-palette-outline', route: '/events' },
  { title: 'Suggestions / Complaints', icon: 'chatbubbles-outline', route: '/suggestions' },
  { title: 'Student Achievements', icon: 'trophy-outline', route: '/achievements' },
  { title: 'Notifications', icon: 'notifications-outline', route: '/notifications' },
  // { title: 'SMS Messages', icon: 'mail-outline', route: '/sms-messages' },
  { title: 'Time Table', icon: 'time-outline', route: '/time-table' },
  { title: 'Pay Fee', icon: 'cash-outline', route: '/pay-fee' },
  { title: 'Academic Calendar', icon: 'school-outline', route: '/academic-calendar' },
  { title: 'Whatsapp', icon: 'logo-whatsapp', route: '/youtube' },
  { title: 'Youtube', icon: 'logo-youtube', route: '/youtube' }
];

teacherMenu: any = [
  { title: 'Teacher Info', icon: 'person-circle-outline', route: '/student-info' },
  { title: 'Subjects', icon: 'book-outline', route: '/subjects' },
  { title: 'Syllabus', icon: 'document-text-outline', route: '/syllabus' },
  { title: 'Home Work', icon: 'create-outline', route: '/home-work' },
  { title: 'Time Table', icon: 'time-outline', route: '/time-table' },
  { title: 'Exams List', icon: 'calendar-outline', route: '/exams-list' },
  { title: 'Marks Entry', icon: 'clipboard-outline', route: '/marks-entry' },
  { title: 'Student Attendance', icon: 'checkmark-done-outline', route: '/student-attendance' },
  { title: 'Leave Application', icon: 'medkit-outline', route: '/leave-application' },
  { title: 'Notice', icon: 'notifications-outline', route: '/notice' },
  { title: 'Events', icon: 'color-palette-outline', route: '/events' },
  { title: 'Holidays', icon: 'calendar-number-outline', route: '/holidays' }
];


  permission: any;
  loginprofile: any;
  language: any;
  isLoading:boolean = false;
  teacherNumber:string ="";
  principalNumber: string ="";
  profileData:any;
   siteUrl: any;
  constructor(private router: Router,
    private langandparmisionService: LangandparmisionService,private callNumber: CallNumber,private toastController: ToastController
  ) {this.siteUrl = fileUrl;}

  ionViewWillEnter() {
    console.log('ionViewWillEnter triggered');
    const profileData: any = localStorage.getItem('Profile');
    if (profileData) {
      this.profileData = JSON.parse(profileData);
    }
    
    const userData: any = localStorage.getItem('loggedinData');
    if (userData) {
      this.loginprofile = JSON.parse(userData);
      console.log('Updated loginprofile:', this.loginprofile);
    }

    this.profile(); // optional: if you're fetching fresh data
  }

  

  profile(){
    this.isLoading =true;
    this.langandparmisionService.getUserProfile().subscribe((data: any) => {        
      if(data.status == true)
      {
          this.isLoading = false;
        this.loginprofile = data.data;
        localStorage.setItem('loggedinData',JSON.stringify(data.data))
      }
       
    })

  }

  permissioncall() {
    this.langandparmisionService.getLangandPermissionCall('dashboard').subscribe((data: any) => {
          if(data.status == true)
          {
            this.permission = data.data.permission;
            this.language = data.language;
            this.menus = Object.keys(data.data.permission).filter(
              key => data.data.permission[key] === 'yes'
            );
            console.log(this.menus);
          }
           
        })
  }

  profileNavigate(){
   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  this.router.navigate(['/profile']);
});
  }

  logout() {
   // localStorage.removeItem('isLoggedIn');
    //localStorage.removeItem('studentData');
    localStorage.clear();
  this.router.navigate(['/login'], { replaceUrl: true });
  }
  
  gotoMenu(menu:any){
    if(menu == 'Call to Teacher')
      this.callTeacher();
    else if(menu == 'Call to Principal')
      this.callPrincipal();
    else if(menu == 'Student Info' || menu == 'Teacher Info'){
       if (!this.loginprofile || !this.loginprofile.profile) {
      this.showToast('Profile not loaded yet. Please try again.', 'danger');
      return;
    }
    this.profileNavigate();
    return;
    }      
    else if(menu == 'Attendance')
      this.router.navigate(['/attendence']);
    else if(menu == 'Home Work')
      this.router.navigate(['/home-work']);
    else if(menu == 'Events')
      this.router.navigate(['/events']);
    else if(menu == 'Apply Leave')
      this.router.navigate(['/leaves']);
    else if(menu == 'Holidays')
      this.router.navigate(['/holiday']);
    else if(menu == 'Exam Marks')
      this.router.navigate(['/marks']);
    else if(menu == 'Fees')
      this.router.navigate(['/fee']);
    else if(menu == 'Pay Fee')
      this.router.navigate(['/pay-fee']);    
     else if(menu == 'Youtube')
      this.router.navigate(['/youtubelinks']);
     else if(menu == 'Whatsapp')
    this.openWhatsApp()
    
  }
  
  callTeacher() {
    if(!this.teacherNumber){
       const teacher:any = localStorage.getItem('teacher');
      
       
         this.teacherNumber =  teacher ? teacher : "";
      
         this.menus = this.studentMenu;
    }
    this.callNumber.callNumber(this.teacherNumber, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  callPrincipal() {
     const prinicpal:any = localStorage.getItem('prinicpal');
      this.principalNumber = prinicpal? prinicpal : "";

    this.callNumber.callNumber(this.principalNumber, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  //  ionViewWillEnter() {
  //   this.profile();
  //  }
   async showToast(message: string, type: 'success' | 'danger' = 'success') {
  const toast = await this.toastController.create({
    message: message,
    duration: 3000,
    color: type, // 'success' (green) or 'danger' (red)
    position: 'top'
  });
  toast.present();
}
  openWhatsApp(): void {
  const teacher: any = localStorage.getItem('teacher');
  this.teacherNumber = teacher ? teacher : "";

  if (!this.teacherNumber) {
    this.showToast('Teacher number is not available.', 'danger');
    return;
  }

  // Ensure proper international format
  let formattedNumber = this.teacherNumber.replace(/\D/g, ''); // Remove non-digits
  if (formattedNumber.length === 10) {
    formattedNumber = '91' + formattedNumber; // Add India country code
  }

  const whatsappUrl = `https://wa.me/${formattedNumber}`;
  window.open(whatsappUrl, '_blank');
}


}
