import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeePayPage } from './fee-pay.page';

describe('FeePayPage', () => {
  let component: FeePayPage;
  let fixture: ComponentFixture<FeePayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FeePayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
