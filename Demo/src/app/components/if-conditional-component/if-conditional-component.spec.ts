import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IfConditionalComponent } from './if-conditional-component';

describe('IfConditionalComponent', () => {
  let component: IfConditionalComponent;
  let fixture: ComponentFixture<IfConditionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IfConditionalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IfConditionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
