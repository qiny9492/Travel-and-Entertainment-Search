import {Component, Input, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {HttpEvent} from "@angular/common/http";

import { ResultsTableComponent } from "../results-table/results-table.component";

import {GetplacesService} from "../getplaces.service";
import {IpapiService} from "../ipapi.service";
import {promise} from "selenium-webdriver";
import checkedNodeCall = promise.checkedNodeCall;





@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  providers:[GetplacesService, IpapiService]
})
export class SearchFormComponent implements OnInit{

  res:any[];


  selected = '';
  keyword='';
  category='';
  distance='';
  location='';
  address='';
  lat='';
  lon='';
  apiType = 'places';
  //url = 'http://localhost:8081/';
  url = 'http://cindynodejs.us-east-2.elasticbeanstalk.com';
  query = '';

  //query = '?keyword=usc&category=cafe&radius=10&lat_js=34.0223519&lon_js=-118.285117&address=usc';
  //constructor() { }

  constructor(private getplacesService:GetplacesService, private ipapiService:IpapiService) {}

  ngOnInit(){

    this.selected = 'results';

    this.ipapiService.getIp()
      .subscribe(
        (response) => {
          let res_string = JSON.stringify(response);
          let ip_res = JSON.parse(res_string);
          this.lat = ip_res.lat;
          this.lon = ip_res.lon;
          console.log(ip_res);
        },
        (error) => console.log(error)


      );
  }


  //
  // onSubmit() {
  //   this.getplacesService.getApi(this.url,this.query )
  //     .subscribe(
  //       (response) => console.log(response),
  //       (error) => console.log(error)
  //     );
  // }

  onSubmit(form:NgForm) {
    console.log(form.value);
    this.keyword = form.value.keyword;
    this.category = form.value.category;
    this.distance = form.value.distance;
    this.location = form.value.location;
    this.address = form.value.address;



    this.query ='?keyword='+ this.keyword + '&category=' + this.category + '&radius=' + this.distance + '&lat='+ this.lat +'&lon='+this.lon+'&location='+this.location+'&address=' + this.address + "&api=" + this.apiType;

    console.log(this.query);
    this.getplacesService.getApi(this.url,this.query )
      .subscribe(
        (response) => {
          let res_string = JSON.stringify(response);
          this.res = JSON.parse(res_string);

          //console.log(this.res);
          // let table = new ResultsTableComponent();
          // table.setRes(this.res);
          // table.drawTable();

        },
      (error) => console.log(error)
      );


  }


  displayResults() {
    this.selected = 'results';
  }

  displayFavorites() {
    this.selected = 'favorites';
  }

  stringToQuery() {

  }

}
