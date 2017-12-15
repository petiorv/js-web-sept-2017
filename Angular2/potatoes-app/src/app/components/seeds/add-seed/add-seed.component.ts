import { Component, OnInit } from '@angular/core';
import { AddSeedModel } from '../../../core/models/seeds/add-seed.model';
import { SeedService } from '../../../core/services/seeds/seed.service';
import { ArticleModel } from '../../../core/models/aritcles/article.model';
import { ArticlesService } from '../../../core/services/article/article.service';
import { ValidationService } from '../../../core/services/validation/validation.service';

@Component({
  selector: 'potatoes-add-seed',
  templateUrl: './add-seed.component.html',
  styleUrls: ['./add-seed.component.css']
})
export class AddSeedComponent implements OnInit {

  checker: boolean;
  model: AddSeedModel;
  articles: [ArticleModel];
  fail: boolean;
  success: boolean;

  constructor(private seedService: SeedService, private articleService: ArticlesService, private validationService: ValidationService) {
    this.model = new AddSeedModel("", "", "", "", "", "", "", "")
    this.checker = true;
  }

  ngOnInit() {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
    })
  }

  addSeed() {
    this.checker = this.validationService.validateObj(this.model)
    if (this.checker) {
      this.seedService.addSeed(this.model).subscribe(data => {
        this.model = new AddSeedModel("", "", "", "", "", "", "", "");
        this.success = true;
      },
        err => {
          this.fail = true;
        })
    }
    setTimeout(() => {
      this.checker = true;
    }, 3000);
  }
}
