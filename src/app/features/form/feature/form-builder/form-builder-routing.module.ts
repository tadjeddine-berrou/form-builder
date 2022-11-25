import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormBuilderComponent } from './form-builder.component';

const routes: Routes = [
  {
    path: '',
    component: FormBuilderComponent,
    title: 'Form Builder',
    data: {
      animation: 'formBuilderPage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormBuilderRoutingModule { }
