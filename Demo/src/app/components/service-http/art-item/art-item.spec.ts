import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtItem } from './art-item';

describe('ArtItem', () => {
  let component: ArtItem;
  let fixture: ComponentFixture<ArtItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
