import { Component } from '@angular/core';
import { LOG } from './types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private logs: LOG[];

  constructor() {
    this.logs = [];
  }

  showLogsEvent(recentLogs: LOG[]) {
    this.logs = recentLogs;
  }
}
