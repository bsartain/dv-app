import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterWidgetCategoryComponent } from './filter-widget-category.component';

describe('FilterWidgetCategoryComponent', () => {
  let component: FilterWidgetCategoryComponent;
  let fixture: ComponentFixture<FilterWidgetCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterWidgetCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterWidgetCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
