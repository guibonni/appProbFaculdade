import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from './../../providers/storage/storage';
import { Stats2Page } from './../stats2/stats2';

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider) {}

  selecionar(posicao: number) {
    this.navCtrl.push(Stats2Page,{armazenamento: posicao});
  }

}
