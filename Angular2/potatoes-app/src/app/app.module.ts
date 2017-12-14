import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthenticationModule } from './components/authentication/auth.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginFormComponent } from './components/authentication/login-form/login-form.component';
import { RegisterFormComponent } from './components/authentication/register-form/register-form.component';
import { ArticlesComponent } from './components/article/articles/articles.component';
import { AddArticleComponent } from './components/article/add-article/add-article.component';
import { ArticlesService } from './core/services/article/article.service';
import { EditArticleComponent } from './components/article/edit-article/edit-article.component';
import { CommentsService } from './core/services/comments/comments.service';
import { AdminService } from './core/services/admin/admin.service';
import { CustomizeComponent } from './components/customize/customize.component';
import { CustomizeService } from './core/services/cusomize/customize.service';
import { AddSeedComponent } from './components/seeds/add-seed/add-seed.component';
import { EditSeedComponent } from './components/seeds/edit-seed/edit-seed.component';
import { DetailSeedComponent } from './components/seeds/detail-seed/detail-seed.component';
import { SeedsComponent } from './components/seeds/seeds/seeds.component';
import { DetailArticleComponent } from './components/article/detail-article/detail-article.component';
import { SeedService } from './core/services/seeds/seed.service';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './guards/auth.guard.service.guard';
import { ValidationService } from './core/services/validation/validation.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ArticlesComponent,
    AddArticleComponent,
    EditArticleComponent,
    DetailArticleComponent,
    CustomizeComponent,
    AddSeedComponent,
    EditSeedComponent,
    DetailSeedComponent,
    SeedsComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AuthenticationModule,
    FormsModule,                               
    ReactiveFormsModule                     
  ],
  providers: [ArticlesService, CommentsService, AdminService, CustomizeService, SeedService, AuthGuard, ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
