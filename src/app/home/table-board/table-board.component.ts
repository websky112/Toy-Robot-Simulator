import {
  Component,
  OnInit,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { KEYCODE, DIRECTIONS, APPSTATUS } from '../constants';
import { LOG, PLACE } from '../types';

@Component({
  selector: 'app-table-board',
  templateUrl: './table-board.component.html',
  styleUrls: ['./table-board.component.scss'],
})
export class TableBoardComponent implements OnInit {
  @Output() showLogsEvent = new EventEmitter<LOG[]>();

  private appStatus: APPSTATUS;
  private curPosition: PLACE;
  private curDirection: number;
  private logs: LOG[];
  private cells: number[];

  private directions = DIRECTIONS;
  private xPlacement = new FormControl(0);
  private yPlacement = new FormControl(0);
  private dirPlacement = new FormControl(1);

  constructor() {
    this.curDirection = 0;
    this.appStatus = APPSTATUS.paused;
    this.logs = [];
    this.cells = Array(25).fill(1);
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.appStatus === APPSTATUS.started) {
      if (event.keyCode === KEYCODE.left) {
        this.rotateLeft();
      }

      if (event.keyCode === KEYCODE.right) {
        this.rotateRight();
      }

      if (event.keyCode === KEYCODE.forward) {
        this.checkMovement();
      }

      if (event.keyCode === KEYCODE.space) {
        this.reportLogs();
      }
    }

    if (event.keyCode === KEYCODE.enter) {
      this.appStatus =
        this.appStatus === APPSTATUS.started
          ? APPSTATUS.paused
          : APPSTATUS.started;
      if (this.appStatus === APPSTATUS.started && !this.curPosition) {
        this.curPosition = {
          x: this.xPlacement.value,
          y: this.yPlacement.value,
        };
        this.curDirection = this.dirPlacement.value;
      } else {
        this.curPosition = null;
      }
    }
  }

  ngOnInit() {}

  rotateRight() {
    this.curDirection += 1;
    if (this.curDirection > 3) {
      this.curDirection %= 4;
    }
  }

  rotateLeft() {
    this.curDirection -= 1;
    if (this.curDirection < 0) {
      this.curDirection = (this.curDirection + 4) % 4;
    }
  }

  checkMovement() {
    if (this.appStatus === APPSTATUS.paused) {
      return;
    }
    if (this.curDirection === 0 && this.curPosition.y === 4) {
      return;
    }
    if (this.curDirection === 1 && this.curPosition.x === 4) {
      return;
    }
    if (this.curDirection === 2 && this.curPosition.y === 0) {
      return;
    }
    if (this.curDirection === 3 && this.curPosition.x === 0) {
      return;
    }

    this.moveForward();
  }

  moveForward() {
    if (this.curDirection === 0) {
      this.curPosition = {
        ...this.curPosition,
        y: this.curPosition.y + 1,
      };
    }
    if (this.curDirection === 1) {
      this.curPosition = {
        ...this.curPosition,
        x: this.curPosition.x + 1,
      };
    }
    if (this.curDirection === 2) {
      this.curPosition = {
        ...this.curPosition,
        y: this.curPosition.y - 1,
      };
    }
    if (this.curDirection === 3) {
      this.curPosition = {
        ...this.curPosition,
        x: this.curPosition.x - 1,
      };
    }
  }

  reportLogs() {
    this.logs.push({
      x: this.curPosition.x,
      y: this.curPosition.y,
      forward: DIRECTIONS[this.curDirection],
    });
    this.showLogsEvent.emit(this.logs);
  }
}
