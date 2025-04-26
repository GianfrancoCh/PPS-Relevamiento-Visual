import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

  constructor(public router:Router, private platform: Platform) {
    this.initializeApp();
    // this.showSplashScreen();
  }

  async initializeApp() {
    await this.platform.ready().then(() => {

      this.router.navigateByUrl('splash');
    });
    // await this.showSplashScreen();
    // await SplashScreen.hide();
  };
  // async showSplashScreen() {

  //   await SplashScreen.show({
  //     autoHide: true,
  //     showDuration: 5000
  //   });
  // };

}
