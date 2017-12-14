import { Component, OnInit } from '@angular/core';
import { SeedService } from '../../../core/services/seeds/seed.service';
import { SeedModel } from '../../../core/models/seeds/seed.model';
import { AdminService } from '../../../core/services/admin/admin.service';
import { Router } from '@angular/router';
import { CustomizeService } from '../../../core/services/cusomize/customize.service';
import { CustomizeModel } from '../../../core/models/customize/customize.model';

@Component({
  selector: 'potatoes-seeds',
  templateUrl: './seeds.component.html',
  styleUrls: ['./seeds.component.css']
})
export class SeedsComponent implements OnInit {
  seedsPage: CustomizeModel
  seeds: [SeedModel];
  isAdmin: boolean;
  deleted: boolean;
  constructor(private seedService: SeedService, private adminService: AdminService, private router: Router, private customizeService: CustomizeService) {
    this.seedsPage = new CustomizeModel("5a3189a0b5d7a6494dcb3d10", "seeds", "", "");
  }

  ngOnInit() {
    this.isAdmin = this.adminService.isAdmin();
    this.customizeService.getAll().subscribe(data => {
      for(let page of data){
        if(page._id === this.seedsPage._id){
          this.seedsPage = page
        }
      }
    })
    this.seedService.getSeeds().subscribe(data => {
      this.seeds = data;
    })
  }

  editSeed(id) {
    this.router.navigate(['/seeds/edit/' + id])
  }

  related(articleId) {
    this.router.navigate(['/articles/details/' + articleId])
  }

  deleteSeed(id) {
    this.seedService.deleteSeed(id, localStorage.getItem('authtoken')).subscribe(data => {
      this.deleted = true;
      setTimeout(() => {
        this.deleted = false;
        this.seedService.getSeeds().subscribe(data => {
          this.seeds = data;
        })
      }, 3000);
    }, err => {
      console.log(err)
    })

  }
}
