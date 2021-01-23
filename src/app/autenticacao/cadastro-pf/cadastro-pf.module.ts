import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{ RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CadastrarPfComponent, CadastroPfComponent } from './components';



@NgModule({
  declarations: [
    CadastrarPfComponent,
    CadastroPfComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule
  ]
})
export class CadastroPfModule { }
