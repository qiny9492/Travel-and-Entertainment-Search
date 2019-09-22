import { Component, OnInit, OnChanges, Input} from '@angular/core';
import {SearchFormComponent} from "../search-form/search-form.component";
import {GetplacesService} from "../getplaces.service";
import {promise} from "selenium-webdriver";
import {AgmCoreModule} from '@agm/core';
import {} from 'googlemaps';
import * as moment from 'moment';



@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css'],
  providers:[GetplacesService]

})

export class ResultsTableComponent implements OnInit, OnChanges{

  @Input() res:any[];


  place_res;

  lat_arr;
  lon_arr;
  icon_arr;
  name_arr;
  addr_arr;
  index_arr;
  placeid_arr;
  photourl_arr;
  next_page;
  len;

  place_name;
  f_addr;
  phone;
  price;
  rate;
  google_page;
  website;
  open_now;
  weekday_text;
  day;
  localday;
  google_reviews;


  disable_details = true;
  page_num;
  new_res;
  res_storage = [];

  details_res:any[];


  results;

  url = 'http://localhost:8081/';
  //url = 'http://cindynodejs.us-east-2.elasticbeanstalk.com';
  query = '';
  details_query = '';

  // test = 10;

  constructor(private getplacesService:GetplacesService) {


  }




  ngOnInit() {
    // this.results= this.res;
    // console.log('kaka',this.res);
    //
    // this.next_page = this.res[2];
    // console.log('next page',this.next_page);
    // this.icon_arr = this.res[5];
    // this.name_arr = this.res[6];
    // this.addr_arr = this.res[7];
    // this.len = this.name_arr.length;
    //
    // this.index_arr = new Array(this.len);
    //
    // for (var i = 0; i < this.index_arr.length; i++) {
    //   this.index_arr[i] = i + 1;
    // }
    // console.log(this.index_arr);
    // console.log(this.icon_arr);

  }

  ngOnChanges(){
    this.disable_details = true;
    console.log('origin details_res',this.details_res);
    this.place_res = '';

    this.place_name = '';
    this.f_addr = '';
    this.phone = '';
    this.price ='';
    this.rate ='';
    this.google_page ='';
    this.website ='';
    this.open_now ='';
    this.weekday_text = [];
    this.day = '';
    this.localday = '';
    this.google_reviews = [];




    this.page_num = 0;
    this.res_storage = [];
    this.photourl_arr = [];
    this.res_storage.push(this.res);



    this.results= this.res;
    console.log('kaka',this.res);
    this.lat_arr = this.res[0];
    this.lon_arr = this.res[1];
    this.next_page = this.res[2];
    console.log('next page',this.next_page);
    this.icon_arr = this.res[5];
    this.name_arr = this.res[6];
    this.addr_arr = this.res[7];
    this.placeid_arr = this.res[8];
    this.len = this.name_arr.length;

    this.index_arr = new Array(this.len);

    for (var i = 0; i < this.index_arr.length; i++) {
      this.index_arr[i] = i + 1;
    }
    console.log(this.index_arr);
    console.log(this.icon_arr);
    //console.log('onchange this.place_res',this.place_res);



  }



  onClick(i){

  }

  onNext() {
    if (this.next_page != null) {

      this.query = '?pagetoken='+ this.next_page + "&api=nextpage";
      console.log(this.query);
      this.getplacesService.getApi(this.url,this.query )
        .subscribe(
          (response) => {
            let res_string = JSON.stringify(response);
            this.new_res = JSON.parse(res_string);

            this.page_num++;
            // check if res is already stored
            let writein = true;

            if ((this.page_num + 1) <= this.res_storage.length) {
              writein = false;
            }

            console.log('writein',writein);

            // if not exist, store the res
            if (writein){
              this.res_storage.push(this.new_res);
            }


            this.res = this.new_res;
            //console.log('next res',this.res);
            console.log('storage length',this.res_storage.length);

            this.onUpdate();


          },
          (error) => console.log(error)
        );
    }
  }

  onPrevious() {


    if(this.page_num >= 1) {
      this.page_num--;
      console.log('storage length',this.res_storage.length);
      this.res = this.res_storage[this.page_num];
      this.onUpdate();
    }


  }




  onUpdate(){




    this.results= this.res;
    console.log('page number',this.page_num + 1);
    console.log(this.res);
    this.next_page = this.res[2];
    this.icon_arr = this.res[5];
    this.name_arr = this.res[6];
    this.addr_arr = this.res[7];
    this.placeid_arr = this.res[8];
    this.len = this.name_arr.length;

    this.index_arr = new Array(this.len);

    for (var i = 0; i < this.index_arr.length; i++) {
      this.index_arr[i] = i + 1;
    }

  }


  goDetails(event:any){
    // id start from 1
    let id  = event.target.id;
    let place_id = this.placeid_arr[id - 1];
    let lati = parseFloat(this.lat_arr[id - 1]);
    let long = parseFloat(this.lon_arr[id - 1]);
    console.log('place id',place_id);
    this.details_query = '?placeid='+ place_id + "&api=details";

    this.getplacesService.getApi(this.url,this.details_query )
      .subscribe(
        (response) => {
          let res_string = JSON.stringify(response);
          this.details_res = JSON.parse(res_string);

          this.disable_details = false;
          console.log('details',this.details_res);


        },
        (error) => console.log(error)
      );



    // Call details api from client side

    // let map = new google.maps.Map(document.getElementById('map_hide'), {
    //   center: {lat: lati, lng: long},
    //   zoom: 15
    // });
    // let request = {
    //   placeId: place_id
    // };
    //
    // let service = new google.maps.places.PlacesService(map);
    //
    //
    //
    // service.getDetails(request, (place, status) => {
    //   if (status == google.maps.places.PlacesServiceStatus.OK) {
    //     console.log('place',place);
    //     //getPhotoUrl(place);
    //
    //     let photos = place.photos;
    //     if (!photos) {
    //       return;
    //     }
    //     for (let n = 0; n< photos.length; n++) {
    //       let wid = photos[n].width;
    //       let hei = photos[n].height;
    //       let icon = photos[n].getUrl({'maxWidth': wid, 'maxHeight': hei});
    //       this.photourl_arr.push(icon);
    //
    //     }
    //
    //     this.place_res = place;
    //     console.log('this.place_res',this.place_res);
    //     this.place_name = this.place_res.name;
    //     this.f_addr = this.place_res.formatted_address;
    //     this.phone = this.place_res.international_phone_number;
    //     this.price = this.place_res.price_level;
    //     this.rate = this.place_res.rating;
    //     this.google_page = this.place_res.url;
    //     this.website = this.place_res.website;
    //     this.open_now = this.place_res.opening_hours.open_now;
    //     this.weekday_text = this.place_res.opening_hours.weekday_text;
    //     this.day = this.place_res.utc_offset;
    //     this.google_reviews = this.place_res.reviews;
    //
    //
    //     let now = moment.utc();
    //     console.log('now',now);
    //     let local = now.utcOffset(this.day);
    //     console.log('local',local);
    //     this.localday = local.day();
    //
    //     console.log('localday',this.localday);
    //
    //     this.details_res = [this.place_name,this.f_addr,this.phone,this.price,this.rate,this.google_page,this.website,this.open_now,this.weekday_text, this.localday, this.google_reviews,this.photourl_arr];
    //     console.log('details_res',this.details_res);
    //
    //   }
    // });







    document.getElementById('result').style.display = 'none';

  }

  clickDetails() {
    document.getElementById('details-table').style.display = 'block';
    document.getElementById('result').style.display = 'none';
  }
}
