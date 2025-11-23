import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeavesPage } from './leaves.page';

describe('LeavesPage', () => {
  let component: LeavesPage;
  let fixture: ComponentFixture<LeavesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
