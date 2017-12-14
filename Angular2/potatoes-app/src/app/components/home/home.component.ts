import { Component, OnInit } from '@angular/core';
import { CustomizeModel } from '../../core/models/customize/customize.model';
import { CustomizeService } from '../../core/services/cusomize/customize.service';

@Component({
  selector: 'potatoes-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  homepage: CustomizeModel
  constructor(private customizeService: CustomizeService) {
    this.homepage = new CustomizeModel("5a318957e0f4037c9ec08d77", "home", "", "");
  }

  ngOnInit() {
    this.customizeService.getAll().subscribe(data => {
      for(let page of data){
        if(page._id === this.homepage._id){
          this.homepage = page
        }
      }
    })
  }

}
