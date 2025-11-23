import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YoutubelinksPage } from './youtubelinks.page';

describe('YoutubelinksPage', () => {
  let component: YoutubelinksPage;
  let fixture: ComponentFixture<YoutubelinksPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubelinksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
