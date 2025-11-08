import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IfConditionalChild } from './if-conditional-child';

describe('IfConditionalChild', () => {
  let component: IfConditionalChild;
  let fixture: ComponentFixture<IfConditionalChild>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IfConditionalChild]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IfConditionalChild);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
