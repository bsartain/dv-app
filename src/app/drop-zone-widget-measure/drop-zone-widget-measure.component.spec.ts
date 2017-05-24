/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DropZoneWidgetMeasureComponent } from './drop-zone-widget-measure.component';

describe('DropZoneWidgetMeasureComponent', () => {
  let component: DropZoneWidgetMeasureComponent;
  let fixture: ComponentFixture<DropZoneWidgetMeasureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropZoneWidgetMeasureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropZoneWidgetMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
