import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormAnswersRoutingModule } from './form-answers-routing.module';
import { FormAnswersComponent } from './form-answers.component';
import { MatButtonModule } from '@angular/material/button';

const MaterialModules = [
  MatButtonModule
];

@NgModule({
  declarations: [
    FormAnswersComponent
  ],
  imports: [
    CommonModule,
    FormAnswersRoutingModule,
    MaterialModules
  ]
})
export class FormAnswersModule { }
