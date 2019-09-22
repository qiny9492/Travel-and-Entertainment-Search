import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable()
export class IpapiService {

  constructor(private http:HttpClient) { }
  getIp() {
    // const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.0223519,-118.285117&radius=16090&type=cafe&keyword=usc&key=AIzaSyCNK0dJUVv9d8ryIpLvxKYe5gGtGwqav8k';
    // const url = 'http://localhost:8081/app.js?keyword=usc&category=cafe&radius=10&lat_js=34.0223519&lon_js=-118.285117&address=usc';
    const url = 'http://ip-api.com/json';
    return this.http.get(url);

  }

}
