/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QuerypageheaderComponent } from './querypageheader.component';

describe('QuerypageheaderComponent', () => {
  let component: QuerypageheaderComponent;
  let fixture: ComponentFixture<QuerypageheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuerypageheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerypageheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
