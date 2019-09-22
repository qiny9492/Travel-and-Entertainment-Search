import {Component, Input, OnInit, OnChanges, TemplateRef, NgZone, ElementRef, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";
import {BsDropdownModule} from "ngx-bootstrap";
import {BsDropdownToggleDirective} from "ngx-bootstrap";
import { BsModalService } from "ngx-bootstrap";
import { BsModalRef } from "ngx-bootstrap";
import {GetyelpService} from "../getyelp.service";
import * as moment from 'moment';
import {} from 'googlemaps';
//import { MapsAPILoader} from "@agm/core";
// import {GooglePlaceDirective} from "ngx-google-places-autocomplete";
// import {Address} from "ngx-google-places-autocomplete/objects/address";

@Component({
  selector: 'app-details-tabs',
  templateUrl: './details-tabs.component.html',
  styleUrls: ['./details-tabs.component.css'],
  providers:[GetyelpService]
})

export class DetailsTabsComponent implements OnInit, OnChanges {


  @Input() details_res:any[];

  // @ViewChild("placeRef") placesRef: GooglePlaceDirective;

  //searchElementRef: ElementRef;

  alter = true;
  zoom;
  mode;
  dir;
  details;
  addr;
  name;
  phone;
  price;
  rating;
  google_page;
  website;
  open_now;
  weekday_text;
  day;

  adr_address;
  address1;
  city;
  state;
  country;
  place_lat;
  place_lon;

  // review section
  google_reviews;
  profile_url_arr = [];
  author_url_arr = [];
  author_name_arr = [];
  rating_arr = [];
  star_arr=[];
  time_arr = [];
  rtext_arr = [];

  google_profile = [];
  google_author_url = [];
  google_author_name = [];
  google_rating = [];
  google_star = [];
  google_time = [];
  google_rtext = [];


  yelp_reviews;
  yelp_profile = [];
  yelp_author_url = [];
  yelp_author_name = [];
  yelp_rating = [];
  yelp_star = [];
  yelp_time = [];
  yelp_rtext = [];

  yelp_utctime = [];
  index_order;

  reviews_select;
  rselect;
  order_select;

  ftime_arr=[];
  photourl_arr = [];
  col_one = [];
  col_two = [];
  col_three = [];
  col_four = [];


  twitter_url;
  query;
  twitter_link;


  hours;
  weekday_arr = [];
  hours_arr = [];

  today;

  percent;
  yelp_percent;

  selected;

  yelp_res;



  google_utc = [];
  yelp_utc = [];


  from_loc;
  to_loc;
  input_loc;

  loc_select;
  start_lat;
  start_lon;
  select_lat;
  select_lon;

  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private getyelpService:GetyelpService,
    // private mapsAPILoader: MapsAPILoader,
    // private ngZone: NgZone
  ) { }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }



  ngOnInit() {
    //console.log('get details success',this.details_res);

  }

  ngOnChanges() {


    this.zoom = 13;
    //this.loadAutocomplete();


    console.log('get details success',this.details_res);


    // this.getYelpReviews();
    this.selected = 'info';
    this.reviews_select = 'google';
    this.order_select = 'Default Order';
    this.rselect = 'Google Reviews';
    console.log('selected',this.selected);
    this.details = this.details_res;


    this.name = this.details_res[0];
    this.addr = this.details_res[1];
    this.phone = this.details_res[2];
    this.price = this.details_res[3];
    this.rating = this.details_res[4];
    this.google_page = this.details_res[5];
    this.website = this.details_res[6];
    this.open_now = this.details_res[7];
    this.weekday_text = this.details_res[8];
    this.day = this.details_res[9];
    this.google_reviews = this.details_res[10];
    this.photourl_arr = this.details_res[11];
    // this.photoref_arr = this.details_res[10];
    // this.photowidth_arr = this.details_res[11];
    // this.photoheight_arr = this.details_res[12];

    this.ftime_arr = this.details_res[12];
    this.adr_address = this.details_res[13];
    this.place_lat = this.details_res[14];
    this.place_lon = this.details_res[15];
    this.google_utc = this.details_res[16];
    this.loc_select = this.details_res[17];
    this.start_lat = this.details_res[18];
    this.start_lon = this.details_res[19];
    this.input_loc = this.details_res[20];


    this.to_loc = this.name + ', ' + this.addr;

    if (this.loc_select == 'here') {
      this.from_loc = 'Your Location';
    }
    if (this.loc_select == 'other_loc') {
      this.from_loc = this.input_loc;
    }

    this.select_lat = this.start_lat;
    this.select_lon = this.start_lon;
    this.mode = 'DRIVING';

    // get city, state, country, address1;
    this.getCity();
    //this.getYelpReviews();


    // rearrange week info
    this.day = 1;
    let today_info = this.weekday_text[this.day - 1];



    this.today = today_info.split(": ");

    for (let i = this.day; i < 7; i++) {
      let info = this.weekday_text[i];
      let info_arr = info.split(": ");
      this.weekday_arr.push(info_arr[0]);
      this.hours_arr.push(info_arr[1]);

      // console.log(this.weekday_arr);
      // console.log(this.hours_arr);
    }

    for (let j = 0; j<this.day - 1; j++) {
      let temp = this.weekday_text[j];
      let temp_arr = temp.split(": ");
      this.weekday_arr.push(temp_arr[0]);
      this.hours_arr.push(temp_arr[1]);
    }



    // check open or close


    if (this.open_now){
      let str = this.weekday_text[this.day - 1];
      let idx = str.indexOf(" ");
      let txt = str.substr(idx + 1);

      this.hours = 'Open now: ' + txt;

    } else {
      this.hours = 'Closed ';
    }


    // calculate rating percentage

    this.percent = (this.rating / 5) * 100 + '%';

    this.twitter_url = 'https://twitter.com/intent/tweet';

    let t_website;
    if (this.website != null) {
      t_website = this.website;
    } else {
      t_website = this.google_page;
    }
    let twitter_text = 'Check out '+ this.name + ' located at ' + this.addr + '. Website:' + t_website +'#TravelAndEntertainmentSearch';

    this.query = '?text=' + encodeURIComponent(twitter_text);

    this.twitter_link = this.twitter_url + this.query;
    console.log('twitter',this.twitter_link);


    for (let i=0;  i< this.google_reviews.length; i++) {
      this.profile_url_arr.push(this.google_reviews[i].profile_photo_url);
      this.author_name_arr.push(this.google_reviews[i].author_name);
      this.author_url_arr.push(this.google_reviews[i].author_url);
      this.rating_arr.push(this.google_reviews[i].rating);
      this.rtext_arr.push(this.google_reviews[i].text);
      this.time_arr.push(this.google_reviews[i].time);

    }

    this.index_order = Array.from(Array(this.google_reviews.length).keys());
    console.log('index',this.index_order);


    // get photo_urls
    let photo_len = this.photourl_arr.length;
    let min_col = Math.floor(photo_len / 4);
    let num_col = this.photourl_arr.length % 4;
    for (let j=0; j<min_col; j++) {
      this.col_one.push(this.photourl_arr[0+4*j]);
      this.col_two.push(this.photourl_arr[1+4*j]);
      this.col_three.push(this.photourl_arr[2+4*j]);
      this.col_four.push(this.photourl_arr[3+4*j]);
    }

    if (num_col == 1) {
      this.col_one.push(this.photourl_arr[photo_len - 1]);

    }
    if (num_col == 2) {
      this.col_one.push(this.photourl_arr[photo_len - 2]);
      this.col_two.push(this.photourl_arr[photo_len - 1]);
    }
    if (num_col == 3) {
      this.col_one.push(this.photourl_arr[photo_len - 3]);
      this.col_two.push(this.photourl_arr[photo_len - 2]);
      this.col_three.push(this.photourl_arr[photo_len - 1]);
    }

    let stars;
    for (let k=0; k<this.rating_arr.length; k++) {
      if (this.rating_arr[k] == 1) {
        stars = '<i class="fa fa-star"></i>';
      }
      if (this.rating_arr[k] == 2) {
        stars = '<i class="fa fa-star"></i><i class="fa fa-star"></i>';
      }
      if (this.rating_arr[k] == 3) {
        stars = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
      }
      if (this.rating_arr[k] == 4) {
        stars = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
      }
      if (this.rating_arr[k] == 5) {
        stars = '<i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>';
      }
      if (this.rating_arr[k] == 0) {
        stars = '';
      }
      this.star_arr.push(stars);
    }

    // this.google_profile = this.profile_url_arr;
    // this.google_author_url = this.author_url_arr;
    // this.google_author_name = this.author_name_arr;
    // this.google_rating = this.rating_arr;
    // this.google_star = this.star_arr;
    // this.google_rtext = this.rtext_arr;
    // this.google_time = this.time_arr;


    this.getYelpReviews();
  }

  getInfo(){
    this.selected = 'info';
  }

  getPhotos() {
    this.selected = 'photos';

  }

  getMap() {
    this.selected = 'map';
  }

  selectDriving() {
    this.mode = 'DRIVING';
  }

  selectBicycling() {
    this.mode = 'BICYCLING';
  }
  selectTransit() {
    this.mode = 'TRANSIT';
  }

  selectWalking() {
    this.mode = 'WALKING';
  }

  goDirections(){




    this.alter = true;

    console.log('go directions',this.place_lat,this.place_lon,this.select_lat,this.select_lon);
    this.dir = {
      origin: { lat: parseFloat(this.select_lat), lng: parseFloat(this.select_lon) },
      destination: { lat: this.place_lat, lng: this.place_lon }
    }
  }







  getReviews() {
    this.selected = 'reviews';
  }

  selectDefault() {
    this.order_select = 'Default Order';

    if (this.reviews_select == 'google') {
      this.index_order = Array.from(Array(this.google_reviews.length).keys());
      console.log('google index',this.index_order);
    }

    if (this.reviews_select == 'yelp') {
      this.index_order = Array.from(Array(this.yelp_res.length).keys());
      console.log('yelp index',this.index_order);
    }
  }

  selectHighest() {
    this.order_select = 'Highest Rating';
    let test=[];
    if (this.reviews_select == 'google') {
      test = this.rating_arr;
    }

    if (this.reviews_select == 'yelp') {
      test = this.yelp_rating;
    }

    let test_with_index = [];
    for (let i in test) {
      test_with_index.push([test[i], i]);
    }
    test_with_index.sort(function(left, right) {
      return left[0] > right[0] ? -1 : 1;
    });
    let indexes = [];
    test = [];
    for (let j in test_with_index) {
      test.push(test_with_index[j][0]);
      indexes.push(parseInt(test_with_index[j][1]));
    }
    this.index_order = indexes;
    console.log('highest',indexes);
  }

  selectLowest() {
    this.order_select = 'Lowest Rating';

    let test=[];
    if (this.reviews_select == 'google') {
      test = this.rating_arr;
    }

    if (this.reviews_select == 'yelp') {
      test = this.yelp_rating;
    }

    let test_with_index = [];
    for (let i in test) {
      test_with_index.push([test[i], i]);
    }
    test_with_index.sort(function(left, right) {
      return left[0] < right[0] ? -1 : 1;
    });
    let indexes = [];
    test = [];
    for (let j in test_with_index) {
      test.push(test_with_index[j][0]);
      indexes.push(parseInt(test_with_index[j][1]));
    }
    this.index_order = indexes;
    console.log('lowest',indexes);



  }

  selectMostRecent() {
    this.order_select = 'Most Recent';


    let test=[];
    if (this.reviews_select == 'google') {
      test = this.google_utc;
    }

    if (this.reviews_select == 'yelp') {
      test = this.yelp_utc;
    }

    let test_with_index = [];
    for (let i in test) {
      test_with_index.push([test[i], i]);
    }
    test_with_index.sort(function(left, right) {
      return left[0] > right[0] ? -1 : 1;
    });
    let indexes = [];
    test = [];
    for (let j in test_with_index) {
      test.push(test_with_index[j][0]);
      indexes.push(parseInt(test_with_index[j][1]));
    }
    this.index_order = indexes;
    console.log('most recent',indexes);
  }

  selectLeastRecent() {
    this.order_select = 'Least Recent';


    let test=[];
    if (this.reviews_select == 'google') {
      test = this.google_utc;
    }

    if (this.reviews_select == 'yelp') {
      test = this.yelp_utc;
    }

    let test_with_index = [];
    for (let i in test) {
      test_with_index.push([test[i], i]);
    }
    test_with_index.sort(function(left, right) {
      return left[0] < right[0] ? -1 : 1;
    });
    let indexes = [];
    test = [];
    for (let j in test_with_index) {
      test.push(test_with_index[j][0]);
      indexes.push(parseInt(test_with_index[j][1]));
    }
    this.index_order = indexes;
    console.log('least recent',indexes);
  }



  selectGoogle() {
    this.reviews_select = 'google';
    this.rselect = 'Google Reviews';
    this.order_select = 'Default Order';

    // this.profile_url_arr = this.google_profile;
    // this.author_url_arr =this.google_author_url;
    // this.author_name_arr = this.google_author_name;
    // this.rating_arr = this.google_rating;
    // this.star_arr = this.google_star;
    // this.rtext_arr = this.google_rtext;
    // this.time_arr = this.google_time;
    this.index_order = Array.from(Array(this.google_reviews.length).keys());
    console.log('google index',this.index_order);


  }

  selectYelp() {
    this.reviews_select = 'yelp';
    this.rselect = 'Yelp Reviews';
    this.order_select = 'Default Order';

    this.index_order = Array.from(Array(this.yelp_res.length).keys());
    console.log('yelp index',this.index_order);
    // this.profile_url_arr = this.yelp_profile;
    // this.author_url_arr =this.yelp_author_url;
    // this.author_name_arr = this.yelp_author_name;
    // this.rating_arr = this.yelp_rating;
    // this.star_arr = this.yelp_star;
    // this.rtext_arr = this.yelp_rtext;
    // this.time_arr = this.yelp_time;


  }

  getCity(){
    let arr1 = this.adr_address.split(',');
    console.log(arr1);

    //let idx1 = arr1[0].indexOf('>');
    let sub1 = arr1[0].substr(arr1[0].indexOf('>')+1);
    //let idx2 = sub1.indexOf('<');
    this.address1 = sub1.substr(0,sub1.indexOf('<'));

    let sub2 = arr1[1].substr(arr1[1].indexOf('>')+1);
    this.city = sub2.substr(0,sub2.indexOf('<'));

    let sub3 = arr1[2].substr(arr1[2].indexOf('>')+1);
    this.state = sub3.substr(0,sub3.indexOf('<'));

    let sub4 = arr1[3].substr(arr1[3].indexOf('>')+1);
    this.country = sub4.substr(0,sub4.indexOf('<'));
    console.log("addr",this.address1);
    console.log(this.city,this.state,this.country);
  }

  getYelpReviews(){
    let yelp_url = 'http://localhost:8081/';
    //let yelp_url = 'http://cindynodejs.us-east-2.elasticbeanstalk.com';
    let yelp_query = '?name=' + this.name + '&address1=' + this.address1  + '&city=' + this.city + '&state=' + this.state + '&country=' + this.country +'&lat=' + this.place_lat +'&lon=' + this.place_lon +'&api=yelp';
    console.log(yelp_query);
    this.getyelpService.getApi(yelp_url,yelp_query)
      .subscribe(
        (response) => {
          let res_string = JSON.stringify(response);
          this.yelp_res = JSON.parse(res_string);

          for (let i = 0; i <this.yelp_res.length; i++) {
            this.yelp_profile.push(this.yelp_res[i].user.image_url);
            this.yelp_author_url.push(this.yelp_res[i].url);
            this.yelp_author_name.push(this.yelp_res[i].user.name);
            this.yelp_rating.push(this.yelp_res[i].rating);

            this.yelp_time.push(this.yelp_res[i].time_created);
            this.yelp_rtext.push(this.yelp_res[i].text);
          }

          let stars;
          for (let k=0; k<this.yelp_rating.length; k++) {
            stars = '';
            for (let l=0; l<this.yelp_rating[k]; l++) {
              stars = stars + '<i class="fa fa-star"></i>';
            }

            this.yelp_star.push(stars);
          }




          for (let j=0; j<this.yelp_time.length; j++){
            this.yelp_utc.push(moment(this.yelp_time[j]).unix());
          }
          console.log(this.yelp_utc);




          console.log('yelp',this.yelp_res);


        },
        (error) => console.log(error)
      );
  }

  goList(){
    document.getElementById('details-table').style.display = 'none';
    document.getElementById('result').style.display = 'block';

  }


  // loadAutocomplete(){
  //   this.mapsAPILoader.load().then(() => {
  //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
  //       types: ["address"]
  //     });
  //     autocomplete.addListener("place_changed", () => {
  //       this.ngZone.run(() => {
  //         //get the place result
  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  //         //verify result
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }
  //
  //         //set latitude, longitude and zoom
  //         this.select_lat = place.geometry.location.lat();
  //         this.select_lon = place.geometry.location.lng();
  //         this.zoom = 12;
  //
  //       })
  //     })
  //     }
  //
  //   )
  //
  // }

  // public handleAddressChange(address:Address) {
  //
  // }

}
