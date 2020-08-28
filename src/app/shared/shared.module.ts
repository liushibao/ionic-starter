import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaddingBar } from './pipes/PaddingBar';
import { ScrollLoadMoreComponent } from './components/ScrollLoadMoreComponent';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { RefresherComponent } from './components/RefresherComponent';


@NgModule({
  declarations: [PaddingBar, ScrollLoadMoreComponent, RefresherComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule
  ],
  exports: [PaddingBar, ScrollLoadMoreComponent, RefresherComponent],
})
export class SharedModule { }
