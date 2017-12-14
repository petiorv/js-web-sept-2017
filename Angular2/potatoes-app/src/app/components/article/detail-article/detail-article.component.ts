import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../core/services/article/article.service';
import { ArticleModel } from '../../../core/models/aritcles/article.model';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AddCommentModel } from '../../../core/models/comment/Addcomment.model';
import { CommentModel } from '../../../core/models/comment/comment.model';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { AdminService } from '../../../core/services/admin/admin.service';

@Component({
  selector: 'potatoes-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailtArticleComponent implements OnInit {
  model: ArticleModel;
  comment: AddCommentModel;
  comments: [CommentModel];
  articles: [ArticleModel];
  isAdmin: boolean;
  success: boolean;
  fail: boolean;

  constructor(private articleService: ArticlesService,
              private activatedRoute: ActivatedRoute, 
              private router: Router,
              private commentService: CommentsService,
              private adminService: AdminService
            ) {
    this.model = new ArticleModel("", "", "", "", "", "");
    this.comment = new AddCommentModel("", "", "", "");
  }

  ngOnInit() {
    this.isAdmin = this.adminService.isAdmin();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.articleService.detailsArticle(params['id']).subscribe(data => {
        this.model._id = params['id'];
        this.model.title = data.title;
        this.model.imgUrl = data.imgUrl;
        this.model.description = data.description;
        this.model.date = data.date;
        this.model.author = data.author;
        this.commentService.getComments(this.model._id).subscribe(data =>{
          this.comments = data;
        })
      })
    });
  }

  updateArticle() {
    let authtoken = localStorage.getItem('authtoken');
    this.articleService.updateArticle(this.model._id, this.model, authtoken).subscribe(data => {
      this.success = true;
      setTimeout(() => {
        this.router.navigate(['articles'])
      }, 3000);
    },
      err => {
        this.fail = true;
      })
  }

  addComment(){
    let d = new Date();
    let strDate = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    this.comment.articleId = this.model._id;
    this.comment.author = localStorage.getItem('username');
    this.comment.date = strDate;
    this.commentService.addComment(this.comment).subscribe(data =>{
      this.comment = new AddCommentModel("", "", "", "");
      this.commentService.getComments(this.model._id).subscribe(data =>{
        this.comments = data;
      })
    })
    console.log(this.comment.content)

  }

}

export class DetailArticleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
