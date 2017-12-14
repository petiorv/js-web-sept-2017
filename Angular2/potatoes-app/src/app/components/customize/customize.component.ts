import { Component, OnInit } from '@angular/core';
import { CustomizeModel } from '../../core/models/customize/customize.model';
import { CustomizeService } from '../../core/services/cusomize/customize.service';

@Component({
  selector: 'potatoes-customize',
  templateUrl: './customize.component.html',
  styleUrls: ['./customize.component.css']
})
export class CustomizeComponent implements OnInit {
  homepage: CustomizeModel;
  seedspage: CustomizeModel;
  isUpdated: boolean;
  fail: boolean;

  constructor(private custimizeService: CustomizeService) {
    this.homepage = new CustomizeModel("5a318957e0f4037c9ec08d77", "", "", "")
    this.seedspage = new CustomizeModel("5a3189a0b5d7a6494dcb3d10", "", "", "")
  }

  ngOnInit() {
    this.custimizeService.getAll().subscribe(data => {
      for (let page of data) {
        if (page._id === this.homepage._id) {
          this.homepage = page;
        }
        if (page._id === this.seedspage._id) {
          this.seedspage = page;
        }
      }
    },
      err => {
        this.fail = true;
      });
  }

  updateHomePage() {
    this.custimizeService.UpdateImages(this.homepage._id, this.homepage, localStorage.getItem('authtoken')).subscribe(data => {
      this.homepage = data;
      this.isUpdated = true;
    }, err => {
      this.fail = true;
    })
  }

  updateSeedsPage() {
    this.custimizeService.UpdateImages(this.seedspage._id, this.seedspage, localStorage.getItem('authtoken')).subscribe(data => {
      this.seedspage = data;
      this.isUpdated = true;
    }, err => {
      this.fail = true;
    })
  }

}
