import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Stats2Page } from './stats2';

@NgModule({
  declarations: [
    Stats2Page,
  ],
  imports: [
    IonicPageModule.forChild(Stats2Page),
  ],
  exports: [
    Stats2Page
  ]
})
export class Stats2PageModule {}
