import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascaraDirective } from './directives/mascara.directive';

//import { MatPaginatorIntl } from '@angular/material/paginator';
import { PtBrMatPaginatorIntl } from './';



@NgModule({
  declarations: [MascaraDirective],
  imports: [
    CommonModule
  ],
  exports: [
    MascaraDirective
  ],
  providers: [
    PtBrMatPaginatorIntl
  ]
})
export class SharedModule { }
