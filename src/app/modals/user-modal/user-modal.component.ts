import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class UserModalComponent  implements OnInit {
  constructor(private modalCtrl: ModalController, private navCtrl: NavController) {}
  ngOnInit(): void {
    
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  navigateTo(path: string) {
    this.modalCtrl.dismiss();
    this.navCtrl.navigateForward(`/${path}`);
  }

  logout() {
    this.modalCtrl.dismiss();
    // Add your logout logic
  }
}