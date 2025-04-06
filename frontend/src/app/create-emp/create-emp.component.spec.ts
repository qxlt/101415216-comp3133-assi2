import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmpComponent } from './create-emp.component';

describe('CreateEmpComponent', () => {
  let component: CreateEmpComponent;
  let fixture: ComponentFixture<CreateEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
