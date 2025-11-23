import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeePage } from './fee.page';

describe('FeePage', () => {
  let component: FeePage;
  let fixture: ComponentFixture<FeePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
