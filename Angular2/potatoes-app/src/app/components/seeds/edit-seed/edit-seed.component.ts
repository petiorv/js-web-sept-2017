import { Component, OnInit } from '@angular/core';
import { SeedModel } from '../../../core/models/seeds/seed.model';
import { SeedService } from '../../../core/services/seeds/seed.service';
import { ArticleModel } from '../../../core/models/aritcles/article.model';
import { ArticlesService } from '../../../core/services/article/article.service';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AddSeedComponent } from '../add-seed/add-seed.component';


@Component({
  selector: 'potatoes-edit-seed',
  templateUrl: './edit-seed.component.html',
  styleUrls: ['./edit-seed.component.css']
})
export class EditSeedComponent implements OnInit {
  model: SeedModel;
  updateModel: AddSeedComponent;
  articles: [ArticleModel];
  fail: boolean;
  success: boolean;

  constructor(private seedService: SeedService, private articleService: ArticlesService, private activatedRoute: ActivatedRoute) {
    this.model = new SeedModel("", "", "", "", "", "", "", "", "")
    
  }

  ngOnInit() {
    this.articleService.getArticles().subscribe(data =>{
      this.articles = data;
      console.log(this.articles)
    })
    
    this.activatedRoute.params.subscribe((params: Params) => {
      this.seedService.detailsSeed(params['id']).subscribe(data =>{
        this.model = data;
        console.log(this.model)
      })
    })
    
  }

  update() {
    console.log(this.model)
    this.seedService.updateSeed(this.model._id,  this.model, localStorage.getItem('authtoken')).subscribe(data =>{
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 3000);
      
      this.model = data;
    })
  }
}
