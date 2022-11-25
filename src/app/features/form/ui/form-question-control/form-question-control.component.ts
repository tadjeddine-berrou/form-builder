import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CheckboxListQuestionControl, ParagraphQuestionControl, QuestionControl, QuestionListForm } from '@form/feature/form-builder/form-builder.component';
import { Question } from '@form/utils/models/form-builder.model';

@Component({
  selector: 'fb-form-question-control',
  templateUrl: './form-question-control.component.html',
  styleUrls: ['./form-question-control.component.scss']
})
export class FormQuestionControlComponent {

  @Input() form!: FormGroup<QuestionListForm>;
  @Input() controlName!: number;
  @Input() question: Question | undefined;

  constructor() {}

  get paragraphControl(): ParagraphQuestionControl {
    return (this.form.get('questions') as FormArray)!.controls[this.controlName] as ParagraphQuestionControl;
  }

  get checklistControl(): CheckboxListQuestionControl {
    return (this.form.get('questions') as FormArray)!.controls[this.controlName] as CheckboxListQuestionControl;
  }
}
