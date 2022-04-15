import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

/* Module */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'  
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Component */
import { AppComponent } from './app.component';
import { OptionsComponent } from './components/options/options.component';
import { ListaComponent } from './produtos/lista/lista.component';
import { CadastroComponent } from './produtos/cadastro/cadastro.component';
import { InputValidationComponent } from './components/input-validation/input-validation.component';
import { EditarComponent } from './produtos/editar/editar.component';



@NgModule({
  declarations: [
    AppComponent,
    OptionsComponent,
    ListaComponent,
    CadastroComponent,
    InputValidationComponent,
    EditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
