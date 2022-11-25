import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { first, Subscription } from 'rxjs';
import { FormService } from '@form/data-access/services/form.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilderDialogComponent } from '@form/ui/form-builder-dialog/form-builder-dialog.component';
import { Question } from '@form/utils/models/form-builder.model';
import { Router } from '@angular/router';

export type ParagraphQuestionControl = FormControl<string>;

export type CheckboxListQuestionControl = FormGroup<{
  list: FormGroup<Record<string, FormControl<boolean>>>;
  other?: FormControl<string>;
}>;

export type QuestionControl =
  ParagraphQuestionControl |
  CheckboxListQuestionControl;

export interface QuestionListForm {
  questions: FormArray<QuestionControl>;
};

@Component({
  selector: 'fb-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, OnDestroy {

  dialogRef: MatDialogRef<FormBuilderDialogComponent> | undefined;

  form!: FormGroup<QuestionListForm>;

  subscriptions: Subscription = new Subscription();

  questions: Question[] = [];

  constructor(
    private dialog: MatDialog,
    private formService: FormService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formService.getQuestions().pipe(first()).subscribe(
      questions => {
        this.questions = questions;
        this.form = this.formBuilder.group({
          questions: new FormArray(questions.map(question => this.buildFormQuestion(question)))
        })
      }
    )
  }

  buildFormQuestion(question: Question): QuestionControl {
    switch (question.type) {
      case 'paragraph':
        return new FormControl('', {
          nonNullable: true,
          validators: [
            question.required ? Validators.required : null,
            Validators.maxLength(200)
          ].filter(_ => _) as ValidatorFn[]
        });
      case 'checkbox-list':
        const control: CheckboxListQuestionControl = new FormGroup({
          list: new FormGroup({
            ...question.answers!.reduce((group, option) => {
              group[option] = new FormControl(false, {
                nonNullable: true
              });
              return group;
            }, {} as Record<string, FormControl<boolean>>),
            ...(question.other && { other: new FormControl(false, {
              nonNullable: true,
            })})
          })
        });
        if (question.other)
          this.subscriptions.add(
            control.get('list.other')!.valueChanges.subscribe(
              value => {
                if (value)
                  control.addControl('other', new FormControl('', {
                    nonNullable: true,
                    validators: [
                      question.required ? Validators.required : null,
                      Validators.maxLength(200)
                    ].filter(_ => _) as ValidatorFn[]
                  }))
                else
                  control.removeControl('other');
              }
            )
          );
        return control;
    }
  }

  addQuestion(): void {
    this.dialogRef = this.dialog.open(FormBuilderDialogComponent);
    this.dialogRef.componentInstance.submitQuestion.subscribe(question => {
      this.questions.push(question);
      (this.form.get('questions') as FormArray).controls.push(this.buildFormQuestion(question));
      this.formService.addQuestion(question);
    });
  }

  onSubmit(): void {
    console.log(this.form.value)
    if (this.form.valid) {
      // this.formService.saveAnswers(this.form.getRawValue().questions);
      // this.router.navigate(['/', 'form', 'answers']);
    } else {
      this.form.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.dialogRef?.close();
    this.subscriptions.unsubscribe();
  }
}
