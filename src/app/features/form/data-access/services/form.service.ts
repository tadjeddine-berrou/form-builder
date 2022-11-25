import { Injectable } from '@angular/core';
import { FormAnswers, Question } from '@form/utils/models/form-builder.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FormService {

  private questions$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
  private questions: Question[] = [];

  answers: FormAnswers | null = null;

  constructor() { }

  addQuestion(question: Question): void {
    this.questions.push(question);
    this.emitQuestions();
  }

  private emitQuestions(): void {
    this.questions$.next(this.questions);
  }

  getQuestions(): Observable<Question[]> {
    return this.questions$.asObservable();
  }

  saveAnswers(answers: FormAnswers): void {
    this.answers = answers;
  }
}
