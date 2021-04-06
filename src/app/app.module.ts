import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { UsuarioService } from './usuario/usuario-service';
import { AuthService } from './autenticacao/auth-service';
import { AngularFirestore } from 'angularfire2/firestore';
import { HeaderComponent } from './header/header.component';
import { ProdutoComponent } from './produto/produto.component';
import { ProdutoService } from './produto/produto.service';
import { LojaComponent } from './loja/loja.component';
import { UploadService } from './upload/upload.service';
import { AngularFireStorageModule } from 'angularfire2/storage';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LoginComponent,
    PrincipalComponent,
    HeaderComponent,
    ProdutoComponent,
    LojaComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [UsuarioService, ProdutoService, AuthService, AngularFirestore, UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
