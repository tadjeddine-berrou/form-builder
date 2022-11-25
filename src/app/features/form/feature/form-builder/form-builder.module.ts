import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilderRoutingModule } from './form-builder-routing.module';
import { FormBuilderComponent } from './form-builder.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormQuestionControlModule } from '@form/ui/form-question-control/form-question-control.module';
import { MatDividerModule } from '@angular/material/divider';

const MaterialModules = [
  MatButtonModule,
  MatDialogModule,
  MatDividerModule
];

@NgModule({
  declarations: [
    FormBuilderComponent
  ],
  imports: [
    CommonModule,
    FormBuilderRoutingModule,
    MaterialModules,
    ReactiveFormsModule,
    FormQuestionControlModule
  ]
})
export class FormBuilderModule { }
