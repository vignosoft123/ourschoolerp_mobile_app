import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { UserModalComponent } from '../modals/user-modal/user-modal.component';
import { Router } from '@angular/router';
import { LangandparmisionService } from '../services/langandparmision.service';
import { fileUrl } from '../config/config';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  loginprofile:any;
  siteUrl:any;
  isLoading:boolean = false;
  profileData:any;
  constructor(private navCtrl: NavController, private modalCtrl: ModalController,private router: Router, private langandparmisionService: LangandparmisionService,) {this.siteUrl = fileUrl;}
  ngOnInit(): void {
    const tokenKey = localStorage.getItem('tokenKey');
    if(!tokenKey)
      this.router.navigate(['/login']);
   const profiledta:any = localStorage.getItem('loggedinData');
   this.loginprofile = JSON.parse(profiledta);

    const profileData: any = localStorage.getItem('Profile');
    if (profileData) {
      this.profileData = JSON.parse(profileData);
    }


    this.profile();
  }
  profile(){
    this.isLoading = true;
    this.langandparmisionService.getUserProfile().subscribe((data: any) => {
      if(data.status == true)
      {
        
          this.isLoading = false;
  
        this.loginprofile = data.data
      }
       
    })

  }
  navigateHome() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }

  async openUserModal() {
    const modal = await this.modalCtrl.create({
      component: UserModalComponent,
      cssClass: 'user-modal'
    });
    await modal.present();
  }
}