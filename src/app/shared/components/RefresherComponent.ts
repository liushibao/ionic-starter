import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-refresher',
  template: `
<ng-container>

  <ion-refresher slot="fixed" (ionRefresh)="pulled($event)">
    <ion-refresher-content></ion-refresher-content>
  </ion-refresher>

</ng-container>
`
})
export class RefresherComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  @Output() appRefresh = new EventEmitter();

  pulled($event) {
    this.appRefresh.emit($event);
  }

}
