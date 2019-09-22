import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap";
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule} from "agm-direction";
import {BsDropdownModule} from "ngx-bootstrap";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';

import {HttpClientModule} from "@angular/common/http";
import {GetplacesService} from "./getplaces.service";
import {IpapiService} from "./ipapi.service";
import { ResultsTableComponent } from './results-table/results-table.component';
import { DetailsTabsComponent } from './details-tabs/details-tabs.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,

    ResultsTableComponent,
    DetailsTabsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBwkjWZVQEpOBKuSoHtcs8jkwLxEGPumCg',
      libraries: ['places']

    }),
    AgmDirectionModule,
    GooglePlaceModule

  ],
  providers: [
    GetplacesService,
    IpapiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

