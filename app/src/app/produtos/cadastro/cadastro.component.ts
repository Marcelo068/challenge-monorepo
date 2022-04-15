import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';

import { NotificationService } from '../../services/notification.service'
import { ProdutosService } from '../../services/produtos.service'

@Component({
  selector: 'app-cadastro',
  templateUrl: '../formulario.component.html',
  styleUrls: ['../formulario.component.scss']
})
export class CadastroComponent implements OnInit {

  title = "Cadastro de Produtos"
  formProdutos!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.initForm()
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

  submit() {
    const payload = this.formProdutos.value

    this.produtosService.createProduct(payload)
      .pipe(take(1))
      .subscribe({
        next: data => {
          console.log('Produto => Created successful', data)
          this.router.navigate(['produtos'])
          this.notificationService.showSuccessNotification('Criado com sucesso !!')
        },
        error: error => {
          console.error('Produto => There was an error!', error);
          this.notificationService.showErrorNotification('Erro no servidor')
        }
      })
  }

}
