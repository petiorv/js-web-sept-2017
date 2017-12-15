import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../../core/services/article/article.service';
import { ArticleModel } from '../../../core/models/aritcles/article.model';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AddCommentModel } from '../../../core/models/comment/Addcomment.model';
import { CommentModel } from '../../../core/models/comment/comment.model';
import { CommentsService } from '../../../core/services/comments/comments.service';
import { AdminService } from '../../../core/services/admin/admin.service';
import { ValidationService } from '../../../core/services/validation/validation.service';
import { AuthenticationService } from '../../authentication/auth.service';

@Component({
  selector: 'potatoes-detail-article',
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.css']
})
export class DetailArticleComponent implements OnInit {
  model: ArticleModel;
  comment: AddCommentModel;
  comments: [CommentModel];
  articles: [ArticleModel];
  isAdmin: boolean;
  success: boolean;
  fail: boolean;
  forEdit: string;
  loggedUser: string;
  checker: boolean;
  updateComment: boolean;
  currentError: string;
  isLogged: boolean;

  constructor(private articleService: ArticlesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private commentService: CommentsService,
    private adminService: AdminService,
    private validationService: ValidationService,
    private authService: AuthenticationService
  ) {
    this.model = new ArticleModel("", "", "", "", "", "");
    this.comment = new AddCommentModel("", "", "", "");
    this.checker = true;
    this.updateComment = true;
    this.isLogged = this.adminService.isUserLogged();
  }

  ngOnInit() {
    this.loggedUser = this.adminService.getLoggedUser();
    this.isAdmin = this.adminService.isAdmin();
    this.activatedRoute.params.subscribe((params: Params) => {
      this.articleService.detailsArticle(params['id']).subscribe(data => {
        this.model._id = params['id'];
        this.model.title = data.title;
        this.model.imgUrl = data.imgUrl;
        this.model.description = data.description;
        this.model.date = data.date;
        this.model.author = data.author;
        this.commentService.getComments(this.model._id).subscribe(data => {
          this.comments = data;
          console.log(this.comments);
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

  deleteComment(id) {
    this.commentService.deleteComment(id, localStorage.getItem('authtoken')).subscribe(data => {
      this.commentService.getComments(this.model._id).subscribe(data => {
        this.comments = data;
      })
    })
  }

  editComment(id) {
    this.forEdit = id;
  }

  saveComment(id, newContent) {
    this.updateComment = this.validationService.validateObj(this.comment)
    this.currentError = id;
    this.commentService.getCurrentComment(id).subscribe(data => {
      this.comment = data;
      this.comment.content = newContent;
      this.updateComment = this.validationService.validateObj(this.comment);
      if (this.updateComment) {
        this.commentService.updateComment(id, this.comment, localStorage.getItem('authtoken')).subscribe(data => {
          this.commentService.getComments(this.model._id).subscribe(data => {
            this.comments = data;
            this.forEdit = '';
            this.updateComment = true;
          })
        })
      }
      setTimeout(() => {
        this.updateComment = true;
      }, 3000)

    }, err => {

    });


  }

  addComment() {
    let d = new Date();
    let strDate = d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
    this.comment.articleId = this.model._id;
    this.comment.author = localStorage.getItem('username');
    this.comment.date = strDate;

    this.checker = this.validationService.validateObj(this.comment)
    if (this.checker) {
      this.commentService.addComment(this.comment).subscribe(data => {
        this.comment = new AddCommentModel("", "", "", "");
        this.commentService.getComments(this.model._id).subscribe(data => {
          this.comments = data;
        })
      }, err => {
        this.router.navigate(['/login'])
      })
    }
    setTimeout(() => {
      this.checker = true;
    }, 3000)
  }

}

