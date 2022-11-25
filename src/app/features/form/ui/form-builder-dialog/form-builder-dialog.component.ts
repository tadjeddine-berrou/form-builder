import { FormArray, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormQuestion, Question, QuestionType } from '@form/utils/models/form-builder.model';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Observable, Subject, Subscription } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'fb-form-builder-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './form-builder-dialog.component.html',
  styleUrls: ['./form-builder-dialog.component.scss']
})
export class FormBuilderDialogComponent implements OnInit, OnDestroy {

  form!: FormGroup<FormQuestion>;

  subscription: Subscription = Subscription.EMPTY;

  questionTypeOptions: { value: QuestionType; viewValue: string; }[] = [
    { value: 'paragraph', viewValue: 'Paragraph' },
    { value: 'checkbox-list', viewValue: 'Checkbox List V' }
  ];

  maxCheckboxListAnswerOptions: number = 5;

  private submitQuestion$: Subject<Question> = new Subject<Question>();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FormBuilderDialogComponent>
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      type: new FormControl<QuestionType>('paragraph', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      required: new FormControl<boolean>(false, {
        nonNullable: true
      }),
      question: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(200)
        ]
      })
    });
    /** watch question type control change to update the form */
    this.subscription = this.form.get('type')!.valueChanges.subscribe(type => {
      switch (type) {
        case 'paragraph':
          this.form.removeControl('answers');
          this.form.removeControl('other');
          break;
        case 'checkbox-list':
          this.form.addControl('answers', new FormArray<FormControl<string>>([
            new FormControl<string>('', {
              nonNullable: true,
              validators: [
                Validators.required,
                Validators.maxLength(100)
              ]
            })
          ]));
          this.form.addControl('other', new FormControl<boolean>(false, {
            nonNullable: true
          }));
          break;
      }
    });
  }

  get submitQuestion(): Observable<Question> {
    return this.submitQuestion$.asObservable();
  }

  get checkboxListAnswersControls() {
    return (this.form.get('answers') as FormArray | undefined)?.controls;
  }

  addAnswerOption(): void {
    if ((this.checkboxListAnswersControls?.length ?? 0) < this.maxCheckboxListAnswerOptions) {
      this.checkboxListAnswersControls?.push(
        new FormControl<string>('', {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.maxLength(100)
          ]
        })
      );
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      // emit form data and close dialog
      this.submitQuestion$.next(this.form.getRawValue());
      this.submitQuestion$.complete();
      this.dialogRef.close();
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
