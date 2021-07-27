import { Component, OnInit, Input } from '@angular/core';
import { LOG } from '../types';

@Component({
  selector: 'app-logs-list',
  templateUrl: './logs-list.component.html',
  styleUrls: ['./logs-list.component.scss'],
})
export class LogsListComponent implements OnInit {
  @Input()
  movements: LOG[];

  constructor() {}

  ngOnInit() {}
}
