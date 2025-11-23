import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplyLeavePage } from './apply-leave.page';

describe('ApplyLeavePage', () => {
  let component: ApplyLeavePage;
  let fixture: ComponentFixture<ApplyLeavePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyLeavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
