import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildForLoop } from './child-for-loop';

describe('ChildForLoop', () => {
  let component: ChildForLoop;
  let fixture: ComponentFixture<ChildForLoop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildForLoop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildForLoop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
