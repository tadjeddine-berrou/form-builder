import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAnswersComponent } from './form-answers.component';

const routes: Routes = [
  {
    path: '',
    component: FormAnswersComponent,
    title: 'Form Answers',
    data: {
      animation: 'formAnswersPage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormAnswersRoutingModule { }
