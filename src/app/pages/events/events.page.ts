import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { fileUrl } from 'src/app/config/config';
import { LangandparmisionService } from 'src/app/services/langandparmision.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: false,
})
export class EventsPage implements OnInit {
  isLoading:boolean = false;
  events:any =[];
  siteUrl: any;
  constructor(private navCtrl: NavController,private router: Router, private langandparmisionService: LangandparmisionService) { this.siteUrl = fileUrl; }

  ngOnInit() {
      const userData = localStorage.getItem('loggedinData');
  
    if(!userData)
      this.router.navigate(['/login']);
    if(userData){
      const user = JSON.parse(userData);
      if(user.profile.usertypeID)
        this.getEvents();
    }
  }
  getEvents(){
     this.isLoading = true;
    this.langandparmisionService.getEvents().subscribe((data: any) => {
        this.isLoading = false;
        if (data.status === true) {
        this.events = data.data.events;
        }
      });
  }
  navigateHome() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }

}
