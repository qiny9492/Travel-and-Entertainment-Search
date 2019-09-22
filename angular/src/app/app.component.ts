import { Component } from '@angular/core';
import {GetplacesService} from "./getplaces.service";
import {} from 'googlemaps';
import { MapsAPILoader } from '@agm/core';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  // url = 'http://localhost:8081/app.js';
  // query = '?keyword=usc&category=cafe&radius=10&lat_js=34.0223519&lon_js=-118.285117&address=usc';
  //
  // constructor(private serv:GetplacesService) {}
  //
  // onSubmit() {
  //   this.serv.getApi(this.url,this.query )
  //     .subscribe(
  //       (response) => console.log(response),
  //       (error) => console.log(error)
  //     );
  // }
  // constructor(private maps:MapsAPILoader){
  //
  // }


}
