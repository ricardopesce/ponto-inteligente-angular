import { Component, OnInit, ViewChild } from '@angular/core';
//import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { PageEvent } from '@angular/material/paginator';
//import { MatPaginator } from '@angular/material/paginator';
//import { Sort } from '@angular/material/sort';
//import { MatSort } from '@angular/material/sort';

//import { Observable } from 'rxjs';
//import 'rxjs/add/observable/of';

import { LancamentoService, Lancamento } from '../../../shared';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao'];

  constructor(
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.lancamentoService.listarTodosLancamentos()
    .subscribe(
      data => {
        const lancamentos = data['data'] as Lancamento[];
        this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
      },
      err => {
        const msg: string = "Erro obtendo lancamentos.";
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    );
  }

}
