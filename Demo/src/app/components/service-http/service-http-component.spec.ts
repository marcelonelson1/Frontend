import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHttpComponent } from './service-http-component';

describe('ServiceHttp', () => {
  let component: ServiceHttpComponent;
  let fixture: ComponentFixture<ServiceHttpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceHttpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceHttpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
