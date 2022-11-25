import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormShellRoutingModule } from './form-shell-routing.module';
import { FormShellComponent } from './form-shell.component';
import { FormService } from '@form/data-access/services/form.service';


@NgModule({
  declarations: [
    FormShellComponent
  ],
  imports: [
    CommonModule,
    FormShellRoutingModule
  ],
  providers: [
    FormService
  ]
})
export class FormShellModule { }
