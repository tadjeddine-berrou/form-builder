import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderDialogComponent } from './form-builder-dialog.component';

describe('FormBuilderDialogComponent', () => {
  let component: FormBuilderDialogComponent;
  let fixture: ComponentFixture<FormBuilderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormBuilderDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormBuilderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
