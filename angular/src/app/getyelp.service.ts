import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class GetyelpService {

  constructor(private http:HttpClient) { }
  getApi(nodejsurl:string, query:string) {

    //const headers = new HttpHeaders({"Access-Control-Allow-Origin": "*"});
    const url = nodejsurl + query;
    return this.http.get(url);
    //return this.http.get(url,{headers:headers});
  }

}



