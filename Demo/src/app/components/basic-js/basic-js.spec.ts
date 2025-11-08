import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicJs } from './basic-js';

describe('BasicJs', () => {
  let component: BasicJs;
  let fixture: ComponentFixture<BasicJs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasicJs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicJs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
