import { Component, OnInit } from '@angular/core';
import { ArticleModel } from '../../../core/models/aritcles/article.model';
import { ArticlesService } from '../../../core/services/article/article.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AdminService } from '../../../core/services/admin/admin.service';

@Component({
  selector: 'potatoes-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: [ArticleModel];
  fail: boolean;
  isAdmin: boolean;
  constructor(private articleService: ArticlesService, private router: Router, private adminService: AdminService) { }

  ngOnInit() {
    this.loadArticles();
    this.isAdmin = this.adminService.isAdmin();
  }

  loadArticles() {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data.sort((a, b) => a._kmd.lmt <= b._kmd.lmt);
    },
      err => {
        console.log('kurec')
      });
  }

  deleteArticle(_id) {
    let authToken = localStorage.getItem('authtoken')
    this.articleService.deleteArticle(_id, authToken).subscribe(data => {
      this.loadArticles();
    },
      err => {
        this.fail = true;
      })
  }

  editArticle(_id) {
    this.router.navigate(['articles/details/' + _id]);
  }

}
