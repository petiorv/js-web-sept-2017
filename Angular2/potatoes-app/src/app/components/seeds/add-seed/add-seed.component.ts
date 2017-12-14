import { Component, OnInit } from '@angular/core';
import { AddSeedModel } from '../../../core/models/seeds/add-seed.model';
import { SeedService } from '../../../core/services/seeds/seed.service';
import { ArticleModel } from '../../../core/models/aritcles/article.model';
import { ArticlesService } from '../../../core/services/article/article.service';

@Component({
  selector: 'potatoes-add-seed',
  templateUrl: './add-seed.component.html',
  styleUrls: ['./add-seed.component.css']
})
export class AddSeedComponent implements OnInit {
  model: AddSeedModel;
  articles: [ArticleModel];
  fail: boolean;
  success: boolean;

  constructor(private seedService: SeedService, private articleService: ArticlesService) {
    this.model = new AddSeedModel("", "", "", "", "", "", "", "")

  }

  ngOnInit() {
    this.articleService.getArticles().subscribe(data => {
      this.articles = data;
    })
  }

  addSeed() {
    console.log(this.model)
    this.seedService.addSeed(this.model).subscribe(data => {
      this.model = new AddSeedModel("", "", "", "", "", "", "", "");
      this.success = true;
    },
      err => {
        this.fail = true;
      })
  }
}
