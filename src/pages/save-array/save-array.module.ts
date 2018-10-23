import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaveArrayPage } from './save-array';

@NgModule({
  declarations: [
    SaveArrayPage,
  ],
  imports: [
    IonicPageModule.forChild(SaveArrayPage),
  ],
  exports: [
    SaveArrayPage
  ]
})
export class SaveArrayPageModule {}
