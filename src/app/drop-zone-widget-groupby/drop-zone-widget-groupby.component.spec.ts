/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DropZoneWidgetGroupbyComponent } from './drop-zone-widget-groupby.component';

describe('DropZoneWidgetGroupbyComponent', () => {
  let component: DropZoneWidgetGroupbyComponent;
  let fixture: ComponentFixture<DropZoneWidgetGroupbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropZoneWidgetGroupbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropZoneWidgetGroupbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
