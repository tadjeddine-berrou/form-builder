import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormService } from '@form/data-access/services/form.service';
import { FormAnswers, Question } from '@form/utils/models/form-builder.model';

@Component({
  selector: 'fb-form-answers',
  templateUrl: './form-answers.component.html',
  styleUrls: ['./form-answers.component.scss']
})
export class FormAnswersComponent {

  questions$: Observable<Question[]> = this.formService.getQuestions();
  answers: FormAnswers | null = this.formService.answers;

  constructor(private formService: FormService) { }

}
