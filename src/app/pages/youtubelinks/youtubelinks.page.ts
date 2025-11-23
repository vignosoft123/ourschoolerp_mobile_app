import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LangandparmisionService } from 'src/app/services/langandparmision.service';

@Component({
  selector: 'app-youtubelinks',
  templateUrl: './youtubelinks.page.html',
  styleUrls: ['./youtubelinks.page.scss'],
    standalone: false,
})
export class YoutubelinksPage implements OnInit {

  constructor(private navCtrl: NavController,private router: Router, private langandparmisionService: LangandparmisionService) { }
  lstyoutubelinks:any=[];
  ngOnInit() {
    this.getyoutubelinks()
  }
 navigateHome() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }
  getyoutubelinks(){
     this.langandparmisionService.getyoutubelinks().subscribe((data: any) => {
      // this.isLoading = false;
      if (data.status === true) {
        this.lstyoutubelinks = data.data;
      }
    });
  }
}
