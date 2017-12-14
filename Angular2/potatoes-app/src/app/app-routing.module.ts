import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterFormComponent } from './components/authentication/register-form/register-form.component'
import { LoginFormComponent } from './components/authentication/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { AddArticleComponent } from './components/article/add-article/add-article.component';
import { ArticlesComponent } from './components/article/articles/articles.component';
import { EditArticleComponent } from './components/article/edit-article/edit-article.component';
import { CustomizeComponent } from './components/customize/customize.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'addArticle', component: AddArticleComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/details/:id', component: EditArticleComponent },
  { path: 'customize', component: CustomizeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
