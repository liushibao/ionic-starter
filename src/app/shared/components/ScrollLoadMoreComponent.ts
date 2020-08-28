import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-scroll-load-more',
  template: `
<ng-container>

  <div *ngIf="!canScroll" class="login-form">没有更多记录。</div>

  <ion-infinite-scroll threshold="100px" (ionInfinite)="loadDataClicked($event)" #infiniteScroll [disabled]="!canScroll">
    <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="加载数据 ...">
    </ion-infinite-scroll-content>
  </ion-infinite-scroll>

</ng-container>
`
})
export class ScrollLoadMoreComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }


  @Input() canScroll: boolean;
  @Output() loadData = new EventEmitter();

  loadDataClicked($event) {
    this.loadData.emit($event);
  }

}