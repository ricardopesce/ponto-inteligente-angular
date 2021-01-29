import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';

import {
  LancamentoService,
  Lancamento,
  Funcionario,
  Tipo,
  HttpUtilService,
  FuncionarioService
} from '../../../shared';


@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao', 'acao'];
  funcionarioId: string;
  totalLancamentos: number;

  funcionarios: Funcionario[];
  @ViewChild(MatSelect) matSelect: MatSelect;
  form: FormGroup;

  private pagina: number;
  private ordem: string;
  private direcao: string;

  constructor(
    private lancamentoService: LancamentoService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.pagina = 0;
    this.ordemPadrao();
    this.obterFuncionarios();
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      funcs: ['', []]
    });
  }

  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }

  get funcId(): string {
    return sessionStorage['funcionarioId'] || false
  }

  obterFuncionarios() {
    this.funcionarioService.listarFuncionariosPorEmpresa()
    .subscribe(
      data => {
        const usuarioId: string = this.httpUtil.obterIdUsuario();
        this.funcionarios = (data.data as Funcionario[])
        .filter(func => func.id != usuarioId);

        if(this.funcId) {
          this.form.get('funcs').setValue(parseInt(this.funcId, 10));
          this.exibirLancamentos();
        }
      },
      err => {
        const msg: string = "Erro obtendo funcionários.";
        this.snackBar.open(msg, "Erro", {duration: 5000 });
      }
    );
  }

  exibirLancamentos() {
    if(this.matSelect.selected) {
      this.funcionarioService = this.matSelect.selected['value'];
    } else if (this.funcId) {
      this.funcionarioId = this.funcId;
    } else {
      return;
    }
    sessionStorage['funcionarioId'] = this.funcionarioId;

    this.lancamentoService.listarLancamentosPorFuncionario(
      this.funcionarioId, this.pagina, this.ordem, this.direcao)
      .subscribe(
        data => {
          this.totalLancamentos = data['data'].totalElements;
          const lancamentos = data['data'].content as Lancamento[];
          this.dataSource = new MatTableDataSource<Lancamento>(lancamentos);
        },
        err => {
          const msg: string = "Erro obtendo lançamentos.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

  remover(lancamentoId: string) {
    alert(lancamentoId);
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.exibirLancamentos();
  }

  ordenar(sort: Sort){
    if(sort.direction == '') 
      this.ordemPadrao();
    else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.exibirLancamentos();    
  }

}
