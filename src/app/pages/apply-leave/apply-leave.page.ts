import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.page.html',
  styleUrls: ['./apply-leave.page.scss'],
  standalone: false,
})
export class ApplyLeavePage implements OnInit {

  constructor(private navCtrl: NavController,private router: Router) { }

  ngOnInit() {
  }
  navigatetoLeaves(){
    this.navCtrl.navigateRoot('/leaves');
  }
  navigateHome() {
    this.router.navigate(['/home'], { replaceUrl: true });
  }
}
