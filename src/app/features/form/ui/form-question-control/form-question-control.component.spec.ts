import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormQuestionControlComponent } from './form-question-control.component';

describe('FormQuestionControlComponent', () => {
  let component: FormQuestionControlComponent;
  let fixture: ComponentFixture<FormQuestionControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormQuestionControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormQuestionControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
