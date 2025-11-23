import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { fileUrl } from 'src/app/config/config';
import { LangandparmisionService } from 'src/app/services/langandparmision.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.page.html',
  styleUrls: ['./holiday.page.scss'],
    standalone: false,
})
export class HolidayPage implements OnInit {
  isLoading:boolean = false;
  holidays:any =[];
  siteUrl: any;
  constructor(private navCtrl: NavController,private router: Router, private langandparmisionService: LangandparmisionService) { this.siteUrl = fileUrl; }

  ngOnInit() {
       const userData = localStorage.getItem('loggedinData');
  
    if(!userData)
      this.router.navigate(['/login']);
    if(userData){
      const user = JSON.parse(userData);
      if(user.profile.usertypeID)
        this.getHolidays();
    }
  }
  getHolidays(){
     this.isLoading = true;
    this.langandparmisionService.getHolidays().subscribe((data: any) => {
        this.isLoading = false;
        if (data.status === true) {
        this.holidays = data.data.holidays;
        }
      });
  }
  navigateHome() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }

}