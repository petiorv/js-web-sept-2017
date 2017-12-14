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
import { DetailArticleComponent } from './components/article/detail-article/detail-article.component';
import { AddSeedComponent } from './components/seeds/add-seed/add-seed.component';
import { SeedsComponent } from './components/seeds/seeds/seeds.component';
import { EditSeedComponent } from './components/seeds/edit-seed/edit-seed.component';

import { AuthGuard } from './guards/auth.guard.service.guard';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'addArticle', canActivate: [AuthGuard], component: AddArticleComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'articles/details/:id', component: DetailArticleComponent },
  { path: 'articles/edit/:id', canActivate: [AuthGuard], component: EditArticleComponent },
  { path: 'customize', canActivate: [AuthGuard], component: CustomizeComponent },
  { path: 'addSeed', canActivate: [AuthGuard], component: AddSeedComponent },
  { path: 'seeds', component: SeedsComponent },
  { path: 'seeds/edit/:id', canActivate: [AuthGuard], component: EditSeedComponent },
  { path: '**', component: ErrorComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
