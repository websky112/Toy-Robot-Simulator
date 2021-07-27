import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { APPSTATUS } from '../constants';

import { TableBoardComponent } from './table-board.component';

describe('TableBoardComponent', () => {
  let component: TableBoardComponent;
  let fixture: ComponentFixture<TableBoardComponent>;
  let debugEl: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TableBoardComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(TableBoardComponent);
      component = fixture.componentInstance;
      debugEl = fixture.debugElement;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be 25 cells in the board', () => {
    const cells = debugEl.queryAll(By.css('.cell'));
    expect(cells.length).toBe(25);
  });

  it('should start game after pressing enter', () => {
    const event = new KeyboardEvent('keyup', { keyCode: 13 });
    window.dispatchEvent(event);
    const appStatus = (component as any).appStatus;
    expect(appStatus).toBe(APPSTATUS.started);
  });
});
