import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { NotificationService } from '../../services/notification.service'
import { ProdutosService } from '../../services/produtos.service'
import { Produtos } from '../../interfaces/produtos'

/* Material */
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['nome', 'preco', 'quantidade', 'descricao', 'acao'];
  dataSource = new MatTableDataSource<Produtos>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  paginationLength: number = 0;
  fetch: number = 0;
  offSet: number = 0;
  pageSizeOptions: number[] = [5, 10, 15];

  destroy$: Subject<boolean> = new Subject<boolean>();
  displayOptions: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtosService: ProdutosService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.paginationOptions()
  }

  paginationOptions(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((urlParams: any) => {
        this.offSet = urlParams['params'].offSet
        this.fetch = urlParams['params'].fetch

        if (!this.offSet || !this.fetch) {
          this.offSet = 0
          this.fetch = this.pageSizeOptions[0]
        }
        this.getProdutos()
      })
  }

  getProdutos(): void {
    this.displayOptions = undefined
    let resp = this.produtosService.getProduct(this.offSet, this.fetch);

    resp.pipe(take(1)).subscribe((produtos: any) => {
      console.log('produtos =>', produtos['data'])
      this.paginationLength = produtos['count']
      this.dataSource = new MatTableDataSource(produtos['data']);
      this.dataSource.sort = this.sort;
    })
  }

  handlePagination(paginator: any): void {
    this.router.navigate([],
      {
        queryParams: {
          fetch: paginator.pageSize, offSet: (paginator.pageIndex * paginator.pageSize)
        },
        queryParamsHandling: 'merge'
      });
  }

  handleClick(i: number) {
    if (i === this.displayOptions) {
      this.displayOptions = -1
      return
    }
    this.displayOptions = i
  }

  excluir = (id: string) => {
    this.produtosService.deleteProduct(id)
      .pipe(take(1))
      .subscribe({
        next: data => {
          console.log('Produto => Deleted successful', data)
          if (this.dataSource.filteredData.length === 1 && this.offSet > 0) {
            this.offSet = this.offSet - this.fetch
          }
          this.getProdutos()
          this.notificationService.showSuccessNotification('Excluido com sucesso !!')
        },
        error: error => {
          console.error('Produto => There was an error!', error);
          this.notificationService.showErrorNotification('Erro no servidor')
        }
      })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
