import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { AuthGuard } from './autenticacao/auth-guard';
import { UsuarioComponent } from './usuario/usuario.component';
import { ProdutoComponent } from './produto/produto.component';
import { LojaComponent } from './loja/loja.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'principal', component: PrincipalComponent, canActivate:[AuthGuard]},
  {path: 'usuario', component: UsuarioComponent},
  {path: 'produto', component: ProdutoComponent},
  {path: 'loja', component: LojaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
