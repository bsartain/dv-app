/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuerydataComponent } from './querydata.component';

describe('QuerydataComponent', () => {
  let component: QuerydataComponent;
  let fixture: ComponentFixture<QuerydataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuerydataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
