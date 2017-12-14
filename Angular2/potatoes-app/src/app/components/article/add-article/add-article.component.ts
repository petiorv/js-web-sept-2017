import { Component, OnInit } from '@angular/core';
import { AddArticleModel } from '../../../core/models/aritcles/add-article.model';
import { ArticlesService } from '../../../core/services/article/article.service';
import { ArticleModel } from '../../../core/models/aritcles/article.model';
import { AdminService } from '../../../core/services/admin/admin.service';
import { Router, ActivatedRoute, Params } from "@angular/router";


@Component({
  selector: 'potatoes-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {

  isAdmin: boolean;
  model: AddArticleModel;
  articles: [ArticleModel]

  constructor(private articleService: ArticlesService, private adminService : AdminService, private router: Router) {
    this.model = new AddArticleModel("", "", "", "");
  }

  ngOnInit() {
    this.isAdmin = this.adminService.isAdmin();
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
    },
      err => {

      })
  }

  editArticle(_id) {
    this.router.navigate(['articles/details/' + _id]);
  }

  addArticle() {
    let d = new Date();
    let strDate = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    this.model.author = localStorage.getItem('username');
    this.model.date = strDate;
    this.articleService.addArticle(this.model).subscribe(data => {
      this.model = new AddArticleModel("", "", "", "");
      this.articleService.getArticles().subscribe(data =>{
        this.articles = data;
      });
      
    },
      err => {
        console.log(err)
      })
  }



}
