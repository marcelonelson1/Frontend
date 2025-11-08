import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TypeScriptComponent } from './type-script-component';

describe('TypeScriptComponent', () => {
  let component: TypeScriptComponent;
  let fixture: ComponentFixture<TypeScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeScriptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
