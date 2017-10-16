import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Health, HealthData } from '@ionic-native/health';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private health: Health) {
    this.health.isAvailable()
      .then((available: boolean) => {
        console.log(available);
        this.health.requestAuthorization([
          'distance', 'nutrition',  //read and write permissions
          {
            read: ['steps'],       //read only permission
            write: ['height', 'weight']  //write only permission
          }
        ])
          .then(res => console.log(res))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
    this.health.query({
      startDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // three days ago
      endDate: new Date(), //now
      dataType: 'steps'
    }).then((value: HealthData) => {
      console.info("Before Convertion")
      console.info("Before For loop")
      for (let val in value) {
        console.info("HealthData data  " + JSON.stringify(value[val].value))
        console.info("HealthData data  " + JSON.stringify(value[val]))
      }
    }).catch((e: any) => {
      console.error("HealthData ERROR:---" + e)
    })
  }
}
