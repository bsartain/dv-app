import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropZoneWidgetFilterComponent } from './drop-zone-widget-filter.component';

describe('DropZoneWidgetFilterComponent', () => {
  let component: DropZoneWidgetFilterComponent;
  let fixture: ComponentFixture<DropZoneWidgetFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropZoneWidgetFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropZoneWidgetFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
