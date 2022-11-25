import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormShellComponent } from './form-shell.component';

const routes: Routes = [
  {
    path: '',
    component: FormShellComponent,
    children: [
      {
        path: 'builder',
        loadChildren: () =>
          import('@form/feature/form-builder/form-builder.module').then(
            m => m.FormBuilderModule
          ),
        title: 'Form Builder',
        data: {
          animation: 'formBuilderPage'
        }
      },
      {
        path: 'answers',
        loadChildren: () =>
          import('@form/feature/form-answers/form-answers.module').then(
            m => m.FormAnswersModule
          ),
        title: 'Form Answers',
        data: {
          animation: 'formAnswersPage'
        }
      },
      {
        path: '**',
        redirectTo: '/form/builder',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormShellRoutingModule { }
