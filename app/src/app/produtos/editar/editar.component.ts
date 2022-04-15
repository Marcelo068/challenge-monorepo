import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs';

import { NotificationService } from '../../services/notification.service'
import { ProdutosService } from '../../services/produtos.service'

@Component({
  selector: 'app-editar',
  templateUrl: '../formulario.component.html',
  styleUrls: ['../formulario.component.scss']
})
export class EditarComponent implements OnInit {

  title = "Editar de Produtos"
  formProdutos!: FormGroup;
  path = this.router.url.split('/')
  idProduto!: string

  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.idProduto = this.path[3]
    this.initForm()
    this.getProdutos()
  }

  initForm(){
    this.formProdutos = this.formBuilder.group(
      {
        nome: [null, [Validators.required, Validators.maxLength(40)]],
        preco: [null, Validators.required],
        quantidade: [null, Validators.required],
        descricao: [null, [Validators.required, Validators.maxLength(100)]],
      }
    )
  }

  getProdutos() {
    this.produtosService.getOneProduct(this.idProduto)
      .pipe(take(1))
      .subscribe(produtos => {
        console.log('produtos =>', produtos)
        this.formProdutos.patchValue(produtos)
      })
  }

  submit() {
    const payload = this.formProdutos.value

    this.produtosService.updateProduct(this.idProduto, payload)
      .pipe(take(1))
      .subscribe({
        next: data => {
          console.log('Produto => Updated successful', data)
          this.router.navigate(['produtos'])
          this.notificationService.showSuccessNotification('Editado com sucesso !!')
        },
        error: error => {
          console.error('Produto => There was an error!', error);
          this.notificationService.showErrorNotification('Erro no servidor')
        }
      })
  }

}
