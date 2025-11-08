import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsingService } from './using-service-component';

describe('Empty', () => {
  let component: UsingService;
  let fixture: ComponentFixture<UsingService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsingService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsingService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
