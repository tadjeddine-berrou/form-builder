import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormQuestionControlComponent } from './form-question-control.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const MaterialModules = [
  MatFormFieldModule,
  MatCheckboxModule,
  MatInputModule
];

@NgModule({
  declarations: [
    FormQuestionControlComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModules
  ],
  exports: [
    FormQuestionControlComponent
  ]
})
export class FormQuestionControlModule { }
