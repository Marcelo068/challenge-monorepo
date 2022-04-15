import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Produtos } from '../interfaces/produtos'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(
    protected httpClient: HttpClient
  ) { }

  getProduct(skip?: number, take?: number){
    let queryParams = ''
    if(skip || take){
      queryParams = `?skip=${skip}&take=${take}`
    }

    return this.httpClient.get<Produtos[]>(`${environment.apiUrl}/produtos`  + queryParams)
  }

  getOneProduct(id: string) {
    return this.httpClient.get<Produtos[]>(`${environment.apiUrl}/produtos/${id}`)
  }

  createProduct = (itens: Produtos) => {
    return this.httpClient.post(`${environment.apiUrl}/produtos`, itens)
  }

  updateProduct = (id: string, itens: Produtos) => {
    return this.httpClient.patch(`${environment.apiUrl}/produtos/${id}`, itens)
  }

  deleteProduct = (id: string) => {
    return this.httpClient.delete(`${environment.apiUrl}/produtos/${id}`)
  }
}
