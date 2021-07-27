import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { TableBoardComponent } from './table-board/table-board.component';
import { RobotComponent } from './robot/robot.component';
import { LogsListComponent } from './logs-list/logs-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
  ],
  declarations: [
    HomePage,
    TableBoardComponent,
    RobotComponent,
    LogsListComponent,
  ],
})
export class HomePageModule {}
