import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HolidayPage } from './holiday.page';

describe('HolidayPage', () => {
  let component: HolidayPage;
  let fixture: ComponentFixture<HolidayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
