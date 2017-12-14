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
  constructor(private custimizeService: CustomizeService) { 
    this.homepage = new CustomizeModel("5a318957e0f4037c9ec08d77","home","")
    this.seedspage = new CustomizeModel("5a3189a0b5d7a6494dcb3d10","seeds","")
  }

  ngOnInit() {
    this.custimizeService.getImages().subscribe(data => {      
      this.homepage.imgUrl = data[0].imgUrl;
      this.seedspage.imgUrl = data[1].imgUrl
    },
      err => {
        console.log(err)
      })
  }

  update(){
    console.log('wwww')
  }

}
