import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-leaves',
  templateUrl: './leaves.page.html',
  styleUrls: ['./leaves.page.scss'],
  standalone: false,
})
export class LeavesPage implements OnInit {

  constructor(private navCtrl: NavController,private router: Router) { }

  ngOnInit() {
  }
  navigateHome() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }
  applyLeave(){
    this.navCtrl.navigateRoot('/apply-leave');
  }
}
