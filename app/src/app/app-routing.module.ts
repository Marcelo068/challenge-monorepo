import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CadastroComponent } from './produtos/cadastro/cadastro.component';
import { EditarComponent } from './produtos/editar/editar.component';
import { ListaComponent } from './produtos/lista/lista.component';

const routes: Routes = [
  {
    path: 'produtos',
    component: ListaComponent,
  },
  {
    path: 'produtos/criar',
    component: CadastroComponent,
  },
  {
    path: 'produtos/editar/:id',
    component: EditarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
