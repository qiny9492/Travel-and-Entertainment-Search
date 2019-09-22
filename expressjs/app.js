
const yelp = require('yelp-fusion');
const moment = require('moment');
const express = require('express');
const request = require('request');
const jdenticon = require('jdenticon');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());

var placeid;
var pagetoken;
var keyword;
var category;
var radius;
var lat;
var lon;
//var photourl_arr = [];
var location;
var address;
var api;
var req_query;
var geo_key = 'AIzaSyDgwkQA5FheyFvuKJYIrZ45FitW-BP4agI';
//var places_key = 'AIzaSyCNK0dJUVv9d8ryIpLvxKYe5gGtGwqav8k';
var places_key = 'AIzaSyDMT9zSoNmPRxr8hg71R9WLyFuruBCSEJo';
var yelp_key = 'O2tHeiTfADwolzEvc3EVk7mHPf34c6OW0xxrTlkLY18Q7RWIulk4809RtQNdD_P91TQR5v3B5yHdna69tTGuKVXxQhjZnpplxTDAMliMRCDBrWb9wVeuRpPqB-3OWnYx';


var city;
var state;
var country;
var yelp_name;
var address1;

var yelp_lat;
var yelp_lon;


var now = moment.utc();

//var str = "Monday: 10:00 AM - 1:00 AM";
//var index = str.indexOf(" ");
//var text = str.substr(index+1)
console.log(now.day());
//console.log(moment("2018-02-04 18:23:16").unix());


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// respond with "hello world" when a GET request is made to the homepage
app.get('/', cors(), function(req, res) {
    //res.send('hello');
    //console.log(req);
    api = req.query.api;
    req_query = req.query;

    // console.log(api);
    // console.log(req.query);
    // console.log('res',res);

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "*");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (api=='places') {
        get_places_url(res);
    }
    if (api=='nextpage') {
        get_next_page(res);
    }
    if (api=='details') {
        get_details(res);
    }
    if (api=='yelp') {
        get_yelp_match(res);
    }
});

function get_details(res) {
    placeid = encodeURIComponent(req_query.placeid);
    var details_url = 'https://maps.googleapis.com/maps/api/place/details/json?';
    details_url = details_url + 'placeid=' + placeid + '&key=' + places_key;
    console.log(details_url);
    
    var place_name;
    var f_addr;
    var phone;
    var price;
    var rating;
    var google_page;
    var website;
    var open_now;
    var weekday_text;
    var utc_offset;
    var photoref_arr = [];
    var photowidth_arr = [];
    var photoheight_arr = [];
    var photourl_arr = [];
    var utcseconds_arr = [];
    var google_reviews;
    var local;
    var day;
    var p_id;
    var p_loc;
    var localtime_arr=[];
    var adr_address;
    
    var place_lat;
    var place_lon;
    
    request.get({
        url: details_url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(body); // Print the json response
            res.setHeader('content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            //res.setHeader('Access-Control-Allow-Origin', 'http://cindynodejs.us-east-2.elasticbeanstalk.com');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
            //res.header("Access-Control-Allow-Headers", "X-Requested-With");
            place_name = body.result.name;
            f_addr = body.result.formatted_address;
            phone = body.result.international_phone_number;
            price = body.result.price_level;
            rating = body.result.rating;
            google_page = body.result.url;
            website = body.result.website;
//            open_now = body.result.opening_hours.open_now;
//            weekday_text = body.result.opening_hours.weekday_text;
            open_now = "";
            weekday_text = "";
            utc_offset = body.result.utc_offset
            google_reviews = body.result.reviews;
            adr_address = body.result.adr_address;
            place_lat = body.result.geometry.location.lat;
            place_lon = body.result.geometry.location.lng;
            
            p_id = body.result.place_id;
            

            
            
            local = now.utcOffset(utc_offset);
            day = local.day();
            console.log(day);
            
            
            for (var k=0; k<body.result.reviews.length; k++) {
                localtime_arr.push(moment.unix(body.result.reviews[k].time - utc_offset).format("YYYY-MM-DD HH:mm:ss"));
                utcseconds_arr.push(body.result.reviews[k].time);
            }
            
             for (var j=0; j<body.result.photos.length; j++) {
                var photoref = body.result.photos[j].photo_reference;
                var photowidth = body.result.photos[j].width;
                var photoheight = body.result.photos[j].height;
                var photo_req = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth='+photowidth+'&photoreference='+photoref+'&key='+ places_key;
                 photourl_arr.push(photo_req);
     
                //get_photo_url(photo_req);
                
             }
                 
             var data_arr = [place_name, f_addr, phone, price, rating, google_page, website, open_now, weekday_text, day, google_reviews,photourl_arr, localtime_arr, adr_address, place_lat, place_lon, utcseconds_arr, location, lat, lon, address,p_id];
            
             res.json(data_arr);

   
            } 
            
            
        })

    
}


function get_yelp_match(res) {
    
    yelp_name = req_query.name;
    address1 = req_query.address1;
    city = req_query.city;
    state = req_query.state;
    country = req_query.country;
    yelp_lat = req_query.lat;
    yelp_lon = req_query.lon;
    
    console.log(address1,city,state,country);
    const searchRequest = {
        
        name: req_query.name,
        address1: req_query.address1,
        city: req_query.city,
        state: req_query.state,
        country: "US",
        latitude: req_query.lat,
        longitude: req_query.lon
        
//        name: "Good Grub Vending",
//        address1: "758 N Point St",
//        city: "San Francisco",
//        state: "CA",
//        country: "US",
//        latitude: "37.8061104",
//        longitude: "-122.4195633"

    };
    const client = yelp.client(yelp_key);

    
    client.search(searchRequest).then(response => {
        const firstResult = response.jsonBody.businesses[0];
        const bus_id = firstResult.id;
        
        get_yelp_reviews(bus_id,res);
        
        console.log(firstResult);
        
        
//        const prettyJson = JSON.stringify(firstResult, null, 4);
//        
//        
//        res.setHeader('content-type', 'application/json');
//        res.header("Access-Control-Allow-Origin", "*");
//        res.header("Access-Control-Allow-Headers", "X-Requested-With");
//        res.json(prettyJson);
        }).catch(e => {
            console.log(e);
        });
    
}

function get_yelp_reviews(bus_id,res) {
    
    

    const client = yelp.client(yelp_key);

    client.reviews(bus_id).then(response => {
        console.log(response.jsonBody.reviews[0].text);

        res.setHeader('content-type', 'application/json');
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
        res.json(response.jsonBody.reviews);
        
    }).catch(e => {
        console.log(e);
    });
   
}

//function get_photo_url(photo_req) {
//    request.get({
//        url: photo_req
//    }, function (error, response, body) {
//
//        if (!error && response.statusCode === 200) {
//            console.log('photo_url',body); // Print the response
//            
//            var png = jdenticon.toPng(body);
//            fs.writeFileSync("./")
//        }
//
//    })
//}

function get_next_page(res) {
    pagetoken = encodeURIComponent(req_query.pagetoken);
    var next_page_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    next_page_url = next_page_url + 'pagetoken='+ pagetoken + '&key=' + places_key;
    console.log(next_page_url);
    
    var lat_arr =[];
    var lon_arr =[];
    var icon_arr =[];
    var name_arr = [];
    var addr_arr =[];
    var placeid_arr = [];
    
    
    request.get({
        url: next_page_url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            console.log(body); // Print the json response
            res.setHeader('content-type', 'application/json');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
            var len = body.results.length;
            var next_page_token= body.next_page_token;
            for (var i=0; i<len ; i++) {

                lat_arr.push(body.results[i].geometry.location.lat);
                lon_arr.push(body.results[i].geometry.location.lng);
                icon_arr.push(body.results[i].icon);
                name_arr.push(body.results[i].name);
                addr_arr.push(body.results[i].vicinity);
                placeid_arr.push(body.results[i].place_id);
            }

            var data_arr = [lat, lon, next_page_token, lat_arr, lon_arr, icon_arr, name_arr, addr_arr,placeid_arr];

            
            res.json(data_arr);
            //console.log(res);
            
        }

    })
}



function get_places_url(res) {

    keyword = encodeURIComponent(req_query.keyword);
    category = encodeURIComponent(req_query.category);
    radius = encodeURIComponent(req_query.radius * 1609);
    lat = encodeURIComponent(req_query.lat);
    lon = encodeURIComponent(req_query.lon);
    address = encodeURIComponent(req_query.address);
    location = req_query.location;




    if (location == 'here' && lat != "" && lon != "") {

        get_places(res);
    }
    if (location == 'other_loc') {

        get_geocode(address,res);

    }


}


function get_places(res) {


    var places_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    places_url = places_url + 'location=' + lat + ',' + lon + '&radius=' + radius + '&type=' + category + '&keyword=' + keyword + '&key=' + places_key;

    console.log(places_url);

    var lat_arr =[];
    var lon_arr =[];
    var icon_arr =[];
    var name_arr = [];
    var addr_arr =[];
    var placeid_arr = [];

    request.get({
        url: places_url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            //console.log(body); // Print the json response

            res.setHeader('content-type', 'application/json');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
            var len = body.results.length;
            var next_page_token= body.next_page_token;
            for (var i=0; i<len ; i++) {

                lat_arr.push(body.results[i].geometry.location.lat);
                lon_arr.push(body.results[i].geometry.location.lng);
                icon_arr.push(body.results[i].icon);
                name_arr.push(body.results[i].name);
                addr_arr.push(body.results[i].vicinity);
                placeid_arr.push(body.results[i].place_id);
            }

            var data_arr = [lat, lon, next_page_token, lat_arr, lon_arr, icon_arr, name_arr, addr_arr,placeid_arr];



            res.json(data_arr);
            //console.log(res);
        }

    })



}


function get_geocode(addr,res){
    var geo_url = 'https://maps.googleapis.com/maps/api/geocode/json?';
    geo_url = geo_url + 'address='+ addr + '&key=' + geo_key;
    console.log(geo_url);
    request.get({
        url: geo_url,
        json: true
    }, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            res.setHeader('content-type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
            console.log(body); // Print the json response
            lat = body.results[0].geometry.location.lat;
            lon = body.results[0].geometry.location.lng;
            get_places(res);
        }

    })


}



app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
});

//app.use(express.static(path.join(_dirname,'dist')));
//app.get('/',(req,res)=>{
//    res.sendFile(path.join(_dirname,'dist/index.html'));
//});
// console.log(url);
// console.log(query);

