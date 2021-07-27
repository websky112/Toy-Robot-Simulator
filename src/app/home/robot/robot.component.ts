import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { ROBOT_ICONS } from '../constants';
import { PLACE } from '../types';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.scss'],
})
export class RobotComponent implements OnInit, OnChanges {
  @Input()
  position: PLACE;
  @Input()
  direction: number;

  private iconName: string;
  private posX: number;
  private posY: number;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.iconName = ROBOT_ICONS[this.direction];
    this.posX = 100 * this.position.x;
    this.posY = 100 * this.position.y;
  }
}
