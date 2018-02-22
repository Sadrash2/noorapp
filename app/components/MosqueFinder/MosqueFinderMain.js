import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import functions from "../../scss/styleFunctions";
import Cookies from "../../components/Cookies";
import ReactDOM from "react-dom";
import globalFunction from "../../components/GlobalFunction";
import validation from "../../components/GlobalValidation";
import PrayTimes from "../../components/PrayTimesFunction";
import {Gmaps, Marker} from 'react-gmaps';
import config from "../../config";
import css from "./MosqueFinderCSS";
import Draggable, {DraggableCore} from 'react-draggable';
import globalBetaFunction from "../../components/ClosedBeta/GlobalBetaFunction";
import colors from "../../scss/colors";
import toastr from 'toastr';

var Menu = require('react-burger-menu').slide;
var mosqueList, map, marker, newmarker, infowindow,mosqueid, trafficLayer, prayerName, prayerTime, menuWidth, latitude, longitude;
var mosqueMarker = []; 
var mosqueposition, distance, duration, mosqueNameMarkerLbl, mosqueFullAddressMarkerLbl, mosqueimage, thismosque, newmosqueLocation, resizeTimer, betaEmail, token, userID;
var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "blue" } });
var targetOnHover = 0, isHover = false, menuState = false, firstChecker = true, requestmosque = false, isAutoLocation = false, feedbackSession = false, alert=false, isnearestMosques = false;
var userLocation ={ latitude: 0, longitude: 0 };
var windowHeight=0, windowWidth=0;
var buttonX=0, buttonY=70;
var fetchFavMosqueFunction,showDirectionFunction,removeFavouriteMosqueFunction,addRecentMosqueFunction ;

var $ = require('jquery');

class MosqueFinderMain extends React.Component {
  
  ////////// Search bar and Suggestion Functions //////////
  //Search bar onChange event
  handleSearchChange(e) {
        if (e.target.value != "") {
        if(/^[a-zA-Z ]*$/.test(e.target.value) != false) {
          this.loadMosque(e.target.value);
        } 
    } else {
      $( "#c-suggestion-ul" ).empty();
    }
  } // handleSearchChange(e)
  //searchbox keyboard enter event
  searchboxKeyboardEnter() {
    var $ = require('jquery')
    var selectedList = 0;
    if (isHover == true) {
      $("#"+"suggestion-"+targetOnHover).removeClass('is-selected');
      selectedList = targetOnHover;
    } else {
      $("#"+"suggestion-"+(targetOnHover - 1)).removeClass('is-selected');
      selectedList = (targetOnHover - 1);
    }
    document.getElementById("c-search-input").value = mosqueList[selectedList].mosquename;
    $("#c-suggestion-ul").hide(300);
    $("#c-search-input").blur();

    //Do your function here
    this.listClickandEnterFunction(mosqueList[selectedList].mosquename);
  } // searchboxKeyboardEnter()
  //keyboard and click events for the search bar and suggestion list
  //only searchbox event, and nothing else.
  searchSuggestionEvent() {
    $(document).off('mouseup');
    $("#c-search-input").off('keydown');

    //event when you are not clicking the searchbar or the suggestion ul
    clickEvent = clickEvent.bind(this);
    $(document).mouseup(clickEvent);
    function clickEvent(e) {
        var ULContainer = $("#c-suggestion-ul");
        var SearchContainer = $("#c-search-input"); 
        if (!ULContainer.is(e.target) && !SearchContainer.is(e.target)) 
        {
            $("#"+"suggestion-"+(targetOnHover - 1)).removeClass('is-selected');
            ULContainer.hide(300);
        } else {
           if (e.target.value != "") {
              this.loadMosque(e.target.value);
            }
            ULContainer.show();
            targetOnHover = 0;
        }
    } // function clickEvent(e)

    keyboardClickEvent = keyboardClickEvent.bind(this);
    $("#c-search-input").keydown(keyboardClickEvent);
    function keyboardClickEvent(e){
      if($("#c-suggestion-ul li").length != 0) {
        if (e.keyCode == 38) {
          if (isHover == true) {
            $("#"+"suggestion-"+targetOnHover).removeClass('is-selected');
            targetOnHover = 0;
          }
          isHover = false;
          if (targetOnHover != 0) {
              $("#"+"suggestion-"+(targetOnHover - 1)).removeClass('is-selected');
              targetOnHover --;
              $("#"+"suggestion-"+(targetOnHover - 1)).addClass('is-selected');
          }
        }else if (e.keyCode == 40) {
          if (isHover == true) {
            $("#"+"suggestion-"+targetOnHover).removeClass('is-selected');
            targetOnHover = 0;
          }
          isHover = false;
          if (mosqueList.length == targetOnHover) {
              $("#"+"suggestion-"+(targetOnHover - 1)).removeClass('is-selected');
              targetOnHover = 0;
          }
          if (targetOnHover == 0) {
              $("#"+"suggestion-"+targetOnHover).addClass('is-selected');
              targetOnHover ++;
          } else {
            $("#"+"suggestion-"+(targetOnHover - 1)).removeClass('is-selected');
            $("#"+"suggestion-"+targetOnHover).addClass('is-selected');
            targetOnHover ++;
            } 
          } else if (e.keyCode == 13) {
          this.searchboxKeyboardEnter();
            }
      } // if($("#c-suggestion-ul li").length != 0)
    } // function keyboardClickEvent(e)
  } // searchSuggestionEvent() 

  //search suggestion list click event  
  suggestionListClick(liNumber) {
    this.listClickandEnterFunction(mosqueList[liNumber].mosquename);
  } // suggestionListClick(liNumber)

  //Menu open and close event
  isMenuOpen(state) {
    var mapSearchBoxValue="";
    if (state != "first") {
        mapSearchBoxValue = document.getElementById("c-search-input").value;
        menuState = state.isOpen;
    } else {
        if (firstChecker == true) {
            firstChecker = false;
        } 
    }   
    //mapview
    if (menuState == false) {
      $('.o-sidebar-search-box').empty();
      $('.o-search-box')
          .append('<input type="text" id ="c-search-input" class="c-search-input"  placeholder='+lang(this.props.language, "mosqueFinderSearch")+' />'
                   + '<div id="o-suggestion-wrap" class="o-suggestion-wrap">'
                   + '<ul id="c-suggestion-ul" class="c-suggestion-ul">'
                   + '</ul>'
                   + '</div>');
      if(mapSearchBoxValue != "") {
        document.getElementById("c-search-input").value = mapSearchBoxValue;
      } 
      searchOnChange=searchOnChange.bind(this);
      $('#c-search-input').on('input',searchOnChange);
    } else {
      $('.o-search-box').empty();
      $('.o-sidebar-search-box')
          .append('<input type="text" id ="c-search-input" class="c-sidebar-search-input" placeholder='+lang(this.props.language, "mosqueFinderSearch")+' />'
            + '<span class="c-search-icon"><i class="material-icons">search</i></span>'
                   + '<div id="o-suggestion-wrap" class="o-sidebar-suggestion-wrap">'
                   + '<ul id="c-suggestion-ul" class="c-sidebar-suggestion-ul">'
                   + '</ul>'
                   + '</div>');
      document.getElementById("c-search-input").value = mapSearchBoxValue;
      searchOnChange=searchOnChange.bind(this);
      $('#c-search-input').on('input',searchOnChange);
    }
    function searchOnChange(e){
      this.handleSearchChange(e);
    }
    this.searchSuggestionEvent();
  } // isMenuOpen(state)

  switchSidebar(sidebar) {
    $('#o-mosquedetail-panel').hide();
    $('#o-direction-panel').hide();
    $('#o-newmosque-panel').hide();
    if(sidebar == "form") {
      $('#o-newmosque-panel').show();
    } else if(sidebar == "detail") {
      $('#o-mosquedetail-panel').show();
    } else if(sidebar == "direction") {
      $('#o-direction-panel').show();      
    }
    $('aside').show();    
  }

  //Search Box Enter and Clicks - Fixit
  listClickandEnterFunction(newValue) {
    getMosqueByNameFunction=getMosqueByNameFunction.bind(this);
    globalFunction.getMosqueByName(newValue, getMosqueByNameFunction);
    function getMosqueByNameFunction(data){
      var response = JSON.parse(data);
      latitude = parseFloat(response.success.lat);
      longitude = parseFloat(response.success.lng);
      if(response.state === 200) {
        var mosqueMarkerCreate=this.mosqueMarkerCreate.bind(this);
        globalFunction.getMosqueSearchResult(newValue,mosqueMarkerCreate) ; 
      } else {
        toastr.error('Something went wrong, please check your connection!')   
      }         
    }
  } // listClickandEnterFunction(newValue)

  //load suggestions, suggestion mouseOver and click event
  loadMosque(mosquename) {
    $("#c-suggestion-ul").empty();   
    loadSearchResult=loadSearchResult.bind(this);
    globalFunction.getMosqueSearchResult(mosquename, loadSearchResult);
    function loadSearchResult(data){
      var response = JSON.parse(data);
      if(response.state === 200) {
        mosqueList = response.success;
        for (var i = 0; i < mosqueList.length; i++) {
            //append playlist into UL
            $( "#c-suggestion-ul" ).append($('<li></li>')
              .attr("id", "suggestion-"+i)
              .text(mosqueList[i].mosquename)); 
        }
        ////li click event
        suggestionLiClick=suggestionLiClick.bind(this);
        $("#c-suggestion-ul li").click(suggestionLiClick)
        function suggestionLiClick(e){
          var splitter = e.currentTarget.id;
          var stringArray = splitter.split("-");
          this.suggestionListClick(parseInt(stringArray[1]));
          $("#"+"suggestion-"+targetOnHover).removeClass('is-selected');
        } // function suggestionLiClick(e)

        $("#c-suggestion-ul li").mouseover(function(e){
          if (isHover == true) {
            $( "#"+"suggestion-"+targetOnHover).removeClass('is-selected');
          }
          if (isHover == false) {
            $( "#"+"suggestion-"+ (targetOnHover - 1)).removeClass('is-selected');
            isHover = true;
          } 
          var splitter = e.currentTarget.id;
          var stringArray = splitter.split("-");
          targetOnHover = parseInt(stringArray[1]);
          $( "#"+"suggestion-"+ targetOnHover).addClass('is-selected');
        }) // $("#c-suggestion-ul li").mouseover
      }else {
      } // if(response.state === 200)
    } // function loadSearchResult(data)
  } // loadMosque(mosquename)

  initMap() {
    var pos = { lat: userLocation.latitude, lng: userLocation.longitude };
    if(this.isAutoLocation == true){
      isnearestMosques = true;
      $('.o-search-box').show();
      $('.bm-burger-button').show();
      $('#requestMosqueButton').show();
      $('#requestCurrentLocationButton').show();
      //Nearest Mosque List
      nearestMosqueFunction=nearestMosqueFunction.bind(this);
      globalFunction.NearestMosques(userLocation.latitude, userLocation.longitude, nearestMosqueFunction);
      function nearestMosqueFunction(data){
        var nearestMosques = data;
        var i = 0;
        LoopArray = LoopArray.bind(this);
        LoopArray = LoopArray.bind(pos);

        LoopArray(nearestMosques);
        function LoopArray(mosqueArray) {
          var mosqueLat = nearestMosques[i][1];
          var mosqueLng = nearestMosques[i][2];
          var image = mosqueArray[i][5];
          image = image.split('/');
          image = image[image.length-1];
          
          distenceCallback=distenceCallback.bind(this);
          this.getDistance(userLocation.latitude,userLocation.longitude,mosqueLat,mosqueLng,distenceCallback);
          function distenceCallback(distance,duration){ // closed

            document.getElementById('nearme-table').innerHTML = document.getElementById('nearme-table').innerHTML +
            '<li class="c-sidebar" id='+i+'>' +
              '<div class="c-sidebar-container listmosque-container">' +
              '<header>' +
                '<h5 id="nameMosque'+i+'" >'+mosqueArray[i][0]+'</h5>' +
              '</header>' +
              '<div class="c-sidebar-content">' +
               '<label class="c-mosque-distance">' + distance +' '+lang(this.props.language, 'mosqueFinderAwayIn')+' '+mosqueArray[i][3]+' </label>' +
               '<div class="c-nearme-time"><i class="fa fa-clock-o"></i><label>' + duration +' ' +lang(this.props.language, 'mosqueFinderAway')+'</label>' +
              '</div></div>' +
             '</div>' +
             '<div class="c-sidebar-image">'+
              '<img src="app/bridge/mosque/'+image+'" />' +
             '</div>' +
            '</li>';
            i++;
            if(i < nearestMosques.length) {
              LoopArray(nearestMosques);   
            } // if(i < response.success.length) 
        
            //OnClick for nearest mosque
            var $ = require('jquery'); 
            var nearestMosquesL = $('#nearme-table li');
            nearestMosqueFunction=nearestMosqueFunction.bind(this);
            nearestMosquesL.click(nearestMosqueFunction);
            function nearestMosqueFunction(e) {
              var mosqueName = document.getElementById('nameMosque'+e.currentTarget.id).innerHTML; 
              searchResultFunction=searchResultFunction.bind(this);
              globalFunction.getMosqueSearchResult(mosqueName, searchResultFunction);
  
              function searchResultFunction(data) {
                var response = JSON.parse(data);
                var mosqueMarkerCreate=this.mosqueMarkerCreate.bind(this);
                globalFunction.getMosqueSearchResult(mosqueName,mosqueMarkerCreate) ;
              } // function searchResultFunction(data)
            } // function nearestMosqueFunction(e) {
          } // function distenceCallback(distance,duration)
        } // function LoopArray(mosqueArray)
      } // nearestMosqueFunction(data)

      map.setCenter(pos);
      map.setZoom(14);
      marker = new google.maps.Marker({ map: map, draggable: false, animation: google.maps.Animation.DROP,position: {lat: pos.lat, lng: pos.lng}, title: 'Click to zoom' });
      marker.addListener('click', function() { map.setZoom(18); map.setCenter(marker.getPosition());});
    } else {
      toastr.info('Please enter your location');
      $('.o-search-box').hide();
      $('.bm-burger-button').hide();
      $('#requestMosqueButton').hide();
      $('#requestCurrentLocationButton').hide();
      map.setCenter(pos);
      map.setZoom(3);
    } // if(isAutoLocation == true)

    // google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
    //     //this part runs when the mapobject is created and rendered
    //     var $ = require('jquery');
    //     $("#loading").fadeOut(500);
    // });
    googleMapListener=googleMapListener.bind(this);
    google.maps.event.addListener(map, 'click', googleMapListener); 
    ////////////////////////////////////////////////////
    function googleMapListener(e) {
      directionsDisplay.setMap(null);
      this.closeNav(); 
      if(requestmosque) {
        if(newmarker!=null) {
          newmarker.setMap(null);
        }
        if(trafficLayer!=null) {
          trafficLayer.setMap(null);
        }
        var image = "app/assets/images/content/promotional/mosquefinder/icon-add-new-mosque-marker.png";
        newmarker = new google.maps.Marker({
          position: e.latLng,
          map: map,
          animation: google.maps.Animation.DROP,
          icon:image
        });
        newmosqueLocation = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        }; 
        this.clearForm();
        this.switchSidebar('form');
        // $('#o-newmosque-panel').addClass("slideRight").show();
      }         
    } // function googleMapListener(e)    
    map.getCenter(); // fozi
  } // initMap() 

  loadFavouriteMosque() {
    var opt = betaEmail;
    var mosqueName;
    fetchFavMosqueFunction=fetchFavMosqueFunction.bind(this);
    globalFunction.getFavouriteMosqueFetch(opt, fetchFavMosqueFunction);
    function fetchFavMosqueFunction(data){
      var response = JSON.parse(data);
      $("#favouritemosque-table li").remove();
      if(response.state === 200) {
          var i = 0;
          LoopArray = LoopArray.bind(this);
          LoopArray(response.success);
          function LoopArray(mosqueArray) {
            var mosqueLat = mosqueArray[i].lat;
            var mosqueLng = mosqueArray[i].lng;
            distenceCallback=distenceCallback.bind(this);
            this.getDistance(userLocation.latitude,userLocation.longitude,mosqueLat,mosqueLng,distenceCallback);
            function distenceCallback(distance,duration)  {
                var mosqueNameLbl = mosqueArray[i].mosquename;
                var mosqueAddressLbl = mosqueArray[i].addressline1;
                var mosqueDistanceLbl = distance;
                var mosqueDurationLbl = duration;
                var mosqueimage = mosqueArray[i].image;
                mosqueimage = mosqueimage.split('/');
                  mosqueimage = mosqueimage[mosqueimage.length-1];
                $('#favouritemosque-table')
                 .append('<li class="c-sidebar" id='+i+'>' +
                  '<i class="fa fa-star-o"></i>' +
                   '<div class="c-sidebar-container">' +
                    '<header>' +
                     '<h5 id="favMosqueName'+i+'">'+mosqueNameLbl+'</h5>' +
                    '</header>' +
                    '<div class="c-sidebar-content">' +
                     '<label class="c-mosque-distance">' + mosqueDistanceLbl +' '+lang(this.props.language, 'mosqueFinderAwayIn')+' '+mosqueAddressLbl+' </label>' +
                     '<div class="c-nearme-time"><i class="fa fa-clock-o"></i><label>' + mosqueDurationLbl +' ' +lang(this.props.language, 'mosqueFinderAway')+'</label></div>' +
                    '</div>' +
                   '</div>' +
                   '<div class="c-sidebar-image">' +
                    '<img src="app/bridge/mosque/'+mosqueimage+'" />' +
                   '</div>' +
                  '</li>');
                var favoriteMosqueL = $('#favouritemosque-table li');
                favMosqueClickFunction=favMosqueClickFunction.bind(this);
                favoriteMosqueL.click(favMosqueClickFunction);
                function favMosqueClickFunction(e) {
                  mosqueName = document.getElementById('favMosqueName'+e.currentTarget.id).innerHTML;
                  var mosqueMarkerCreate=this.mosqueMarkerCreate.bind(this);
                  globalFunction.getMosqueSearchResult(mosqueName,mosqueMarkerCreate) ;                        
                } // function favMosqueClickFunction(e)
                i++;
                if(i < response.success.length) {
                  LoopArray(response.success);   
                } // if(i < response.success.length) 
            } // function distenceCallback(distance,duration)
          } // function LoopArray(mosqueArray)
      } // if(response.state === 200) 
    } // function fetchFavMosqueFunction(data)
  } //  loadFavouriteMosque() 

  loadRecentlyMosque() { 
      var pos = { lat: userLocation.latitude, lng: userLocation.longitude};
      var currentPosition = pos;
      var recentmosqueList = [];
      var opt = Cookies.readCookie('userid');
      recentMosqueSearchedFunction = recentMosqueSearchedFunction.bind(this);
      globalFunction.getRecentMosque(opt,recentMosqueSearchedFunction);
      function recentMosqueSearchedFunction(data) {
        var response = JSON.parse(data);
        for (var i = 0; i < response.success.length; i++) {
          recentmosqueList.push(response.success[i].mosquename);
        }
        fetchMosqueByNameFunction=fetchMosqueByNameFunction.bind(this);
        $("#recentsearch-table li").remove();
        if(recentmosqueList == "false" || recentmosqueList.length === 0) {
          $('#recentsearch-table')
                 .append('<li class="c-sidebar"">' +
                   '<div class="c-sidebar-container listmosque-container">' +
                    '<header>' +
                     '<h5>No Recent Search</h5>' +
                    '</header>' +
                    '<div class="c-sidebar-content">' +
                     '<label class="c-mosque-distance"></label>' +
                     '<div class="c-nearme-time"></label></div>' +
                    '</div>' +
                   '</div>' +
                   '<div class="c-sidebar-image">' +
                   '</div>' +
                  '</li>');
        }else{
          for(var i = 0; i < recentmosqueList.length; i++) {
            globalFunction.getMosqueByName(recentmosqueList[i], fetchMosqueByNameFunction, i);
          }
        }
        function fetchMosqueByNameFunction(data, i){
          var response = JSON.parse(data);
            if(response.state === 200) {
              var response = JSON.parse(data);
              var mosqueDif = 0;
              var lat = response.success.lat;
              var lng = response.success.lng;
              var mosquename = response.success.mosquename;
              var mosqueimage = response.success.image;
                  mosqueimage = mosqueimage.split('/');
                      mosqueimage = mosqueimage[mosqueimage.length-1];
              
              distenceCallback=distenceCallback.bind(this);
              this.getDistance(userLocation.latitude, userLocation.longitude, lat, lng,distenceCallback);
              function distenceCallback(distance,duration)  {
                distance = distance;
                duration = duration;
                $('#recentsearch-table')
                 .append('<li class="c-sidebar" id="recentSearch-'+i+'">' +
                   '<div class="c-sidebar-container listmosque-container">' +
                    '<header>' +
                     '<h5 id="recentMosqueName-'+i+'">'+mosquename+'</h5>' +
                    '</header>' +
                    '<div class="c-sidebar-content">' +
                     '<label class="c-mosque-distance">' + distance +' '+lang(this.props.language, 'mosqueFinderAwayIn')+' '+response.success.addressline1+' </label>' +
                     '<div class="c-nearme-time"><i class="fa fa-clock-o"></i><label>' + duration+' '+lang(this.props.language, 'mosqueFinderAway')+'</label></div>' +
                    '</div>' +
                   '</div>' +
                   '<div class="c-sidebar-image">' +
                    '<img src="app/bridge/mosque/'+mosqueimage+'" />' +
                   '</div>' +
                  '</li>');

                var recentMosqueL = $('#recentsearch-table li');
                recentMosqueClickFunction=recentMosqueClickFunction.bind(this);
                recentMosqueL.click(recentMosqueClickFunction);
                function recentMosqueClickFunction(e) {
                  var recentId = e.currentTarget.id;
                  recentId = recentId.split("-");
                  var mosqueName = document.getElementById('recentMosqueName-'+recentId[1]).innerHTML;
                  mosqueNameMarkerLbl = mosqueName;
                  var mosqueMarkerCreate=this.mosqueMarkerCreate.bind(this);
                  globalFunction.getMosqueSearchResult(mosqueName,mosqueMarkerCreate) ;
                } // function recentMosqueClickFunction(e)
              } // function distenceCallback(distance,duration) // for menu
            } // if(response.state === 200)
        } // function fetchMosqueByNameFunction(data, i)
      }
  } // loadRecentlyMosque() 

//mosuqe marker creator
  mosqueMarkerCreate(data) {
    var response = JSON.parse(data);
    mosqueimage = response.success[0].image;
    mosqueimage = mosqueimage.split('/');
    mosqueimage = mosqueimage[mosqueimage.length-1];
    var mosqueName = response.success[0].mosquename;
    mosqueid = response.success[0].id;
    latitude = parseFloat(response.success[0].lat);
    longitude = parseFloat(response.success[0].lng);
    var pos = {lat: latitude, lng: longitude};
    map.setCenter(pos);
    
    var image = "app/assets/images/content/promotional/mosquefinder/map-marker.png";
    var marker = new google.maps.Marker({
      position: pos,
      icon: image
    });
    mosqueMarker.push(marker);
    if(mosqueMarker.length<5) {
      for(var i=0; i < mosqueMarker.length; i++){
        mosqueMarker[i].setMap(map);                  
      }
    }else if(mosqueMarker.length>=5) {
      mosqueMarker[0].setMap(null);
      mosqueMarker.shift();
      for(var i=0; i < mosqueMarker.length; i++){
        mosqueMarker[i].setMap(map);
      }
    }
    map.setZoom(18);
    var  callListener = callListener.bind(this);
    marker.addListener('click', callListener);
    function callListener() {
      var markerListener=this.markerListener(response,mosqueimage,mosqueName);
    }
    var opt = betaEmail;
    fetchFavMosqueFunction = this.fetchFavMosqueFunction.bind(this);
    globalFunction.getFavouriteMosqueFetch(opt, fetchFavMosqueFunction);
    userID = parseInt(Cookies.readCookie('userid'));
    this.addRecentlyMosque(userID);
  }

  markerListener(response,mosqueimage,mosqueName) { 
    mosqueFullAddressMarkerLbl = response.success[0].addressline1 + ", " + response.success[0].addressline2 + ",<br />" + response.success[0].postcode + " " + response.success[0].city + ", " + response.success[0].country;
    mosqueNameMarkerLbl = mosqueName;
    var key = 0;
    var link = "https://www.google.com/maps/place/" + mosqueNameMarkerLbl.replace(" ", "+");
    var distanceCallback=this.distanceCallback.bind(this);
    this.getDistance(userLocation.latitude, userLocation.longitude, response.success[0].lat, response.success[0].lng, distanceCallback);     
  }

  distanceCallback(distance,duration)  {
    var content = '<div id="'+mosqueNameMarkerLbl+'" class="iw-container">' +
                    '<div class="o-sidebar-container">' +
                      '<div class="o-sidebar-mosque">' +
                        '<div class="iw-title">'+mosqueNameMarkerLbl+'</div>' +
                        '<div class="iw-content">' +
                          mosqueFullAddressMarkerLbl +
                        '</div>' +
                        '<div class="iw-distance"><div class="mosque-distance"><i class="fa fa-clock-o"></i><span>'+ distance +' '+lang(this.props.language, 'mosqueFinderAway')+' '+ duration +' '+lang(this.props.language, 'mosqueFinderRemaining')+'</span></div>'+
                      '</div>' + 
                    '</div>' +
                    '<div class="iw-direction">' +
                      '<button id="showdirection" type="button"><i class="material-icons">near_me</i></button>'+
                    '</div>' +
                    '<div class="iw-prayertime">' +
                      '<img class="c-prayertime-icon" src="app/assets/images/content/promotional/mosquefinder/icon-prayer.png"/>' +
                      '<div class="c-prayertime-content">' +
                        '<span>'+lang(this.props.language, 'mosqueFinderNextPrayer')+'</span>' +
                        '<span><label id="prayer-name" class="c-prayertime"></label> '+lang(this.props.language, 'mosqueFinderStartAt')+' <label id="prayer-time" class="c-prayertime"></label></span>' +
                        '<span>'+lang(this.props.language, 'mosqueFinderIn')+' <label id="c-countdown"></label></span>' +
                      '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="iw-favourite">' +
                      '<button id="favMosque" type="button"><i id="favouriteMosqueButton" class="fa fa-star-o"></i> '+lang(this.props.language, 'mosqueFinderSaveFavouriteMosque')+'</button>'+
                    '</div>' +
                  '</div>';
    
    document.getElementById("o-mosquedetail-container").innerHTML = content;
    $('.o-sidebar-container').css('background-image', 'url(app/bridge/mosque/' + mosqueimage + ')');

    var opt = betaEmail;
    fetchFavMosqueFunction = this.fetchFavMosqueFunction.bind(this);
    globalFunction.getFavouriteMosqueFetch(opt, fetchFavMosqueFunction);
    this.switchSidebar('detail');    // check if FavMosque
    
                
    /////////////////////////////Favourites FUNCTION /////////////////////////////////
    var opt = {
      "mosqueid": mosqueid,
      "email": betaEmail
    }

    favMosqueClickFunction=favMosqueClickFunction.bind(this);
    $('#favMosque').click(favMosqueClickFunction);
    function favMosqueClickFunction() {
      if (document.getElementById('favouriteMosqueButton').className == 'fa fa-star') {
        removeFavouriteMosqueFunction = this.removeFavouriteMosqueFunction.bind(this);
        globalFunction.removeFavouriteMosque(opt, removeFavouriteMosqueFunction);
        this.loadFavouriteMosque();
      } else {
          //adds the favorite mosque details to the database
          addFavouriteMosqueFunction=addFavouriteMosqueFunction.bind(this);
          globalFunction.addFavouriteMosque(opt, addFavouriteMosqueFunction);

          function addFavouriteMosqueFunction(data){
            var addresponse = JSON.parse(data);
            if(addresponse.state === 200) {
              this.loadFavouriteMosque();              
              document.getElementById('favMosque').innerHTML = '<i id="favouriteMosqueButton" class="fa fa-star"></i> '+lang(this.props.language, 'mosqueFinderSaveFavouriteMosque2');
              document.getElementById('favMosque').style.color = '#F5A623';
            } else if(addresponse.state === 3003) {
            
            } else {
            
            } // if(addresponse.state === 200)
          } // function addFavouriteMosqueFunction(data)
      } // if (document.getElementById('favouriteMosqueButton').className == 'fa fa-star')
    } // function favMosqueClickFunction() 

    showDirectionFunction=showDirectionFunction.bind(this);
    $('#showdirection').on('click', showDirectionFunction);
    function showDirectionFunction(){ mosqueposition = { lat: latitude, lng: longitude };
      this.getDirection(mosqueNameMarkerLbl, "DRIVING");
    } // function showDirectionFunction
  } // function distenceCallback(distance,duration) // for marker  

  //fetch mosques
  fetchFavMosqueFunction(data){
    var $ = require('jquery');
    var response = JSON.parse(data);
    if(response.state === 200) {
      for (var i=0;i<response.success.length;i++){
        var mosquename = response.success[i].mosquename;
        if (mosquename === mosqueNameMarkerLbl) {
           $('#favMosque').html('<i id="favouriteMosqueButton" class="fa fa-star"></i> '+lang(this.props.language, 'mosqueFinderSaveFavouriteMosque2'));
           $('#favMosque').css('color','#F5A623');
        } 
      }
    } 
  }

  //remove fav mosque
  removeFavouriteMosqueFunction(data){
    var addresponse = JSON.parse(data);
    if(addresponse.state === 200) {
      this.loadFavouriteMosque();
      document.getElementById('favMosque').innerHTML = '<i id="favouriteMosqueButton" class="fa fa-star-o"></i> '+lang(this.props.language, 'mosqueFinderSaveFavouriteMosque')+'';
      document.getElementById('favMosque').style.color = '#999999';
    } else if(addresponse.state === 3003) {
      toastr.info("The mosque is already your favorite");
    } else {
      toastr.error("There was an error, please re-try");
    } 
  }

  addRecentlyMosque(userID){
    var opt = {
      "userid": userID,
      "mosqueid": mosqueid
    };
    globalFunction.addRecentMosque(opt);
    this.loadRecentlyMosque();    
  }

  ////////// Navigations Functions //////////
  closeNav() {
    $('aside').hide();
    var screenSize = screen.width;
    if (screenSize > 768) {
        directionsDisplay.setMap(null);
      if(trafficLayer!=null) {
        trafficLayer.setMap(null);
      }      
    }  
    if(newmarker!=null) {
      newmarker.setMap(null);
    }      
    $('.o-newmosque-form').show();
    $('.o-newmosque-button').show();
    $('.o-newmosque-response').remove();
  } // closeNav()

  backNav() {
    this.switchSidebar('detail');
  } // backNav()

  getTravelingOption(e) {
    var option = e.currentTarget.id;
    var masjid = $('#o-to-label').text();
    this.getDirection(masjid, option);   
  } // getTravelingOption(e)

  getDirection(masjid, travelOption) {
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById('o-direction-container'));
      var originLocation = { lat: userLocation.latitude, lng: userLocation.longitude };
      var isAvailableDirection = false;
      directionFunction = directionFunction.bind(this);
      directionsService.route({
        origin: originLocation,
        destination: mosqueposition,
        provideRouteAlternatives: true,
        durationInTraffic: true,
        travelMode: google.maps.TravelMode[travelOption]
      }, directionFunction);
      function directionFunction(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
          if(travelOption == 'DRIVING') {
            if($('#WALKING').hasClass("is-active")) {
              $('#WALKING').removeClass("is-active");
            } else if($('#BICYCLING').hasClass("is-active")) {
              $('#BICYCLING').removeClass("is-active");
            }
            $('#DRIVING').addClass("is-active");
            trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);
          }
          else if(travelOption == 'WALKING') {
            trafficLayer.setMap(null);
          } else {
            trafficLayer.setMap(null);
          }
          document.getElementById('o-to-label').innerHTML = masjid;
          $('#errorMesaage').hide();
          this.switchSidebar('direction');
        } else {
          trafficLayer.setMap(null);
          $('#o-mosquedetail-panel').hide();
          var statusBike = status.toString();
          var errorMsg = "Directions request failed due to no available route." ;
          if(statusBike == "ZERO_RESULTS") {
            toastr.error(errorMsg);
          }
        }
      }
  } // getDirection(masjid, travelOption)

  ////////// New Mosque Functions //////////
  onClickCurrentLocation(){
    map.panTo(marker.getPosition(), 3000);
  }
  //Validate Mosque Form
  validateForm() {   
    let mosqueFileData = document.getElementById('mosqueUpload').value;
    let mosquename = this.refs.mosquename.value;
    let imamname = this.refs.imamname.value;
    let phone = this.refs.phone.value;
    let email = this.refs.email.value;
    let website = this.refs.website.value;
    var validateFinal = validation.MosqueEntryFormValidation(mosqueFileData, mosquename, imamname, phone, email, website);
    var validArray = validateFinal.valid;
    var messageArray = validateFinal.message;
    var validChecker = true;
    var allErrorMessage = "";
    
    //avatar
    if (validArray[0] == false) {
      document.getElementById('c-mosque-photo').className='is-photo-required o-form-input';
      validChecker = false;
      allErrorMessage = allErrorMessage + messageArray[0] + "\n";
    } else {
      document.getElementById('c-mosque-photo').className='o-form-input';
    }

    //mosquename
    if (validArray[1] == false) {
      document.getElementById('c-mosque-name').className='mdl-textfield__input is-required';
      validChecker = false;
      allErrorMessage = allErrorMessage + messageArray[1] + "\n";
    } else {
      document.getElementById('c-mosque-name').className='mdl-textfield__input';
    }

    //imamname
    if (validArray[3] == false) {
      document.getElementById('c-imam-name').className='mdl-textfield__input is-required';
      validChecker = false;
      allErrorMessage = allErrorMessage + messageArray[2] + "\n";
    } else {
      document.getElementById('c-imam-name').className='mdl-textfield__input';
    }
    
    //phone
    if (validArray[2] == false) {
      document.getElementById('c-phoneNo').className='mdl-textfield__input is-required';
      validChecker = false;
      allErrorMessage = allErrorMessage + messageArray[3] + "\n";
    } else {
      document.getElementById('c-phoneNo').className='mdl-textfield__input';
    }

    //email
    if (validArray[4] == false) {
      document.getElementById('c-email').className='mdl-textfield__input is-required';
      validChecker = false;
      allErrorMessage = allErrorMessage + messageArray[4] + "\n";
    } else {
      document.getElementById('c-email').className='mdl-textfield__input';
    }

    //website
    if (validArray[5] == false) {
      document.getElementById('c-website-link').className='mdl-textfield__input is-required';
      validChecker = false;
      allErrorMessage = allErrorMessage + messageArray[5] + "\n";
    } else {
      document.getElementById('c-website-link').className='mdl-textfield__input';
    }

    //FinalCheck if false show error message
    if (validChecker == true) {
      return true;
    } else {
      return false;
    }
  } // validateForm() 
  //clear new mosque form
  clearForm() {
    $('#c-mosque-photo').attr('src', '');
    $('#mosqueUpload').val(null);
    document.getElementById('c-mosque-name').value = '';
    document.getElementById('c-imam-name').value = '';
    document.getElementById('c-phoneNo').value = '';
    document.getElementById('c-email').value = '';
    document.getElementById('c-website-link').value = '';
  } // clearForm()
  //upload mosque picture
  readURL(){    
    var input = document.getElementById('mosqueUpload');
    if (input.files && input.files[0]) {
      var reader = new FileReader();
        reader.onload = function (e) {
          $('#c-mosque-photo').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
  } // readURL()
  handleCameraClick() {    
        $('#mosqueUpload').click();
  } // handleCameraClick()

  _handleSubmit(e) {
    var isValid = this.validateForm();
    if (isValid == true) {
      let mosquename = "";
      let imamname = "";
      let phone = "";
      let email = "";
      let website = "";

      if (this.refs.mosquename.value != "") {
        mosquename = this.refs.mosquename.value;
      }
      if (this.refs.imamname.value != "") {
        imamname = this.refs.imamname.value;
      }
      if (this.refs.phone.value != "") {
        phone = this.refs.phone.value;
      }
      if (this.refs.email.value != "") {
        email = this.refs.email.value;
      }
      if (this.refs.website.value != "") {
        website = this.refs.website.value;
      }

      var image = "";
      var lat = newmosqueLocation.lat.toString();
      var lng = newmosqueLocation.lng.toString();
      var geocoder = new google.maps.Geocoder();
      var latLng = new google.maps.LatLng(newmosqueLocation.lat, newmosqueLocation.lng);
  
      if (geocoder) {
        geocoder.geocode({ 'latLng': latLng}, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var addressline1 = "",
              addressline2,
              country,
              city,
              postcode,
              state;
            for (var i = 0; i < results[0].address_components.length; i++)
            {
              var shortname = results[0].address_components[i].short_name;
              var longname = results[0].address_components[i].long_name;
              var type = results[0].address_components[i].types;

              if (type.indexOf("street_number") != -1){
                  addressline1 = longname + ", ";
              }
              else if (type.indexOf("route") != -1){
                  addressline1 += longname;
              }
              else if (type.indexOf("sublocality") != -1){
                  addressline2 = longname;
              }
              else if (type.indexOf("locality") != -1){
                  city = longname;
              }
              else if (type.indexOf("administrative_area_level_1") != -1){
                  state = longname;
              }
              else if (type.indexOf("country") != -1){
                  country = longname;
              }
              else if (type.indexOf("postal_code") != -1){
                  postcode = longname;
              }
            }
            var opt = {
              "todate": new Date(),
              "mosquename": mosquename,
              "lat": lat,
              "lng": lng,
              "addressline1": addressline1,
              "addressline2": addressline2,
              "country": country,
              "city": city,
              "postcode": postcode,
              "state": state,
              "image": image,
              "imamname": imamname,
              "phone": phone,
              "email": email,
              "website": website
            }

            var request =  [ "MosqueEntry", "add", opt];
            var json = JSON.stringify(request);
            var form_data = new FormData();  
            form_data.append('request', json);
            var file_data = document.getElementById('mosqueUpload').files[0];              
            form_data.append('mosque', file_data);

            $.ajax({
              type: "POST",
              datatype: 'json',
              url: "./app/bridge/enter.php",
              data: form_data,
              cache: false,
              contentType: false,
                processData: false,
              success: function(data) {
                var response = JSON.parse(data);
                if(response.state === 200) {
                  $('.o-newmosque-form').hide();
                  $('.o-newmosque-button').hide();
                  var mosqueAdded = '<div class="o-newmosque-response">' +
                      '<hr size="1"></hr>'+
                      '<h2>Your request has been send.</h2>' +
                      '<h2>Waiting for approval.</h2>' +
                      '<h2>Thank you.</h2>' +
                    '</div>';
                  document.getElementById('o-newmosque-added').innerHTML = mosqueAdded;
                }
              }.bind(this)
            });
          }
        });
      }
    }
  } // _handleSubmit(e)s

  exit() {
    this.context.router.push(config.root + "/NotFound");
  }

  timeout() {
    this.context.router.push(config.root + "/graditude?email="+betaEmail+"&token="+token);
  }

  removeOverlay() {
            $("#demo-mosquefinder-overlay").remove();
  }

  displayOverlay(text) {
        $("<table id='demo-mosquefinder-overlay'><tbody><tr><td>" + text + "</td></tr></tbody></table>").css({
        "position": "fixed",
        "top": "0px",
        "left": "0px",
        "width": "100%",
        "height": "100%",
        "background-color": "rgba(0,0,0,.5)",
        "z-index": "10000",
        "vertical-align": "middle",
        "text-align": "center",
        "color": "#fff",
        "font-weight": "bold",
        "cursor": "pointer"
    }).appendTo("body");
  }

  componentDidMount() {
    $('aside').hide();
    $('#MosqueFinderMain').addClass('mdl-layout');    
    //Beta check email token url
    var url = window.location.search;
    if(url != "") {
          var queryStart = url.indexOf("?") + 1;
          var queryEnd  = url.indexOf("#") + 1 || url.length + 1;
          var query = url.slice(queryStart, queryEnd - 1);
          var pairs = query.replace(/\+/g, " ").split("&");
          if (pairs[0] == "" || pairs[1] == "" || pairs[0] == null || pairs[1] == null) {
            this.exit();
          } else {
            var emailPairs = pairs[0].replace(/\+/g, " ").split("="),
            tokenPairs = pairs[1].replace(/\+/g, " ").split("="),
            parms = {}, i, n, v, nv;
            betaEmail = emailPairs[1];
            token = tokenPairs[1];
            betaEmail = betaEmail.replace("%40","@");
            getUserData=getUserData.bind(this);
            var dataArray = { "email": betaEmail, "token": token}
            globalBetaFunction.getUserEmailToken(dataArray, getUserData);
            function getUserData(data){
              var response = JSON.parse(data);
              if(response.state === 200) {
                var array = response.success;
                comparefunction=comparefunction.bind(this);
                globalBetaFunction.compareTimeExpired(betaEmail, comparefunction);
                function comparefunction(data) {
                  if (data == "timeremain") {
                    compareStartfunction=compareStartfunction.bind(this);
                    globalBetaFunction.compareTimeStart(betaEmail, compareStartfunction);
                    function compareStartfunction(data) {
                      if (data == "timeremain") {

                      } else {
                        this.timeout();
                      }
                    }
                  } else {
                    this.timeout();
                  }
                }
                if (array[0].steps == 0) {
                  betaEmail = betaEmail.replace("@","%40");
                  this.context.router.push(config.root + "/SignUp?email="+betaEmail+"&token="+token);
                } else if (array[0].steps == 1) {
                  betaEmail = betaEmail.replace("@","%40");
                  this.context.router.push(config.root + "/NDA?email="+betaEmail+"&token="+token);
                } else if (array[0].steps == 2) {
                  betaEmail = betaEmail.replace("@","%40");
                  this.context.router.push(config.root + "/BetaRegisteration?email="+betaEmail+"&token="+token);
                } else if (array[0].steps == 3) {
                  betaEmail = betaEmail.replace("@","%40");
                  this.context.router.push(config.root + "/StartSession?email="+betaEmail+"&token="+token);
                } else if (array[0].steps == 4) {
                  betaEmail = betaEmail.replace("@","%40");
                  this.context.router.push(config.root + "/AboutPage?email="+betaEmail+"&token="+token);
                }      
              }
              else {
                this.exit();
              }
            } 
          }      
    } else {
      this.exit();
    }

        //overlay
    

    $('#UserCPMenu').removeClass('logout');
    $('.c-application-button').css('right','6.0em');
    $('.c-application-button').css('display','block');
    $('.o-application-menu').css('right','6.75em');
    this.closeNav();
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, { zoom: 14,
      disableDefaultUI: true
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    listenerAction = listenerAction.bind(this);
    searchBox.addListener('places_changed', listenerAction);

    function listenerAction(){
      var places = searchBox.getPlaces();
      var bounds = new google.maps.LatLngBounds();
      if (places.length == 0) { 
        return; 
      }
      userLocation = { latitude: places[0].geometry.location.lat(), longitude: places[0].geometry.location.lng() };
      
      var pos = {lat: userLocation.latitude, lng: userLocation.longitude}
      map.setCenter(pos);
      marker = new google.maps.Marker({ map: map, draggable: false, animation: google.maps.Animation.DROP,position: pos, title: 'Click to zoom' });
      marker.addListener('click', function() { map.setZoom(18); map.setCenter(marker.getPosition());});
      map.setZoom(14);
      map.getCenter();
      this.isAutoLocation = true;
      this.initMap();
      document.getElementById('pac-input').style.display = "none";
      this.loadMosque();
      this.loadFavouriteMosque();
      // this.closeNav();
      $('.o-search-box').empty();
      this.isMenuOpen("first");
      this.loadRecentlyMosque();
    }; // listenerAction

    
    if (navigator.geolocation) {
      var options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
      function success(pos) {
         //if demo not displayed
        if (Cookies.readCookie('mosque_demo')!=1){ 
          this.displayOverlay("<div class='demo1' style='position: absolute; top: 4em;margin-left: 3em;display: -webkit-box'> <img style='width:30px;padding:4px' src='app/assets/images/ui/arrow_left.gif'> Search mosques </div> <div class='demo2' style=' position: absolute;right: 2em;display: -webkit-box;'> Feedback <img style=' width: 30px;padding: 4px;' src='app/assets/images/ui/arrow_right.gif'></div><div class='demo3' style='position: absolute;float:right;right:5em;bottom:7em;display: -webkit-box'> Add a Mosque <img style='    width: 30px;transform: rotate(180deg);padding: 4px;position: absolute;top: 10px;right: -30px;' src='app/assets/images/ui/arrow_left.gif'></div> <input type='button' class='c-input-green remove_overlay' value='Got it?' >");
          Cookies.writeCookie('mosque_demo','1','3'); //off demo
        }
        $(".remove_overlay").click(function () {
            if ($("#demo-mosquefinder-overlay").length > 0) {
              $("#demo-mosquefinder-overlay").remove();
            }
        });

        var crd = pos.coords;
        userLocation = { latitude: crd.latitude, longitude:  crd.longitude }; 
        this.isAutoLocation = true;
        this.initMap();
        document.getElementById('pac-input').style.display = "none";
        this.loadMosque();
        this.loadFavouriteMosque();
        // this.closeNav();
        $('.o-search-box').empty();
        this.isMenuOpen("first");
        this.loadRecentlyMosque();
      };

      function error(err) {
        //if demo not displayed
        if (Cookies.readCookie('mosque_demo')!=1){ 
          this.displayOverlay("<div class='demo1' style='position: absolute; top: 4em;margin-left: 3em;display: -webkit-box'> <img style='width:30px;padding:4px' src='app/assets/images/ui/arrow_left.gif'> Enter your location </div> <div class='demo2' style=' position: absolute;right: 2em;display: -webkit-box;'> Feedback <img style=' width: 30px;padding: 4px;' src='app/assets/images/ui/arrow_right.gif'></div><input type='button' class='c-input-green remove_overlay' value='Got it?' >");
          Cookies.writeCookie('mosque_demo','1','3'); //off demo
        }
        $(".remove_overlay").click(function () {
          // alert('a');
            if ($("#demo-mosquefinder-overlay").length > 0) {
              $("#demo-mosquefinder-overlay").remove();
            }
        });
        userLocation = { latitude: 3.1657265, longitude: 101.6918819 };
        this.isAutoLocation = false;
        this.initMap();
        this.loadMosque();
        this.loadFavouriteMosque();
        // this.closeNav();
        $('.o-search-box').empty();
        this.isMenuOpen("first");
        this.loadRecentlyMosque();
      };
      success = success.bind(this);
      error = error.bind(this);
      navigator.geolocation.getCurrentPosition(success, error, options);
    } else {
      userLocation = { latitude: 3.1657265, longitude: 101.6918819 };
    }
    globalFunction.differentiate_device(betaEmail,token); //get the u_id, right device?

    userBurgerClick=userBurgerClick.bind(this);
    $('#UserCPMenu > div > .bm-burger-button').click(userBurgerClick);
    function userBurgerClick() {
        if (menuState == true) {
            menuState = false;
            this.forceUpdate();
        }
    }

    $('.bm-burger-button').click(hamBurgerClick);
    function hamBurgerClick() {
      if($('#o-mosques-panel').hasClass("inactive-display")) {
        $('#o-mosques-panel').removeClass("inactive-display");
        $('#o-mosquedetail-panel').addClass("inactive-display");
      }
    }
    appButtonClick=appButtonClick.bind(this);
    $('.c-application-button').click(appButtonClick);
    function appButtonClick() {
        if (menuState == true) {
            menuState = false;
            this.forceUpdate();
        }
    }


    $('#UserCPMenu > div > #UserCPHamburgerMenu').css('top', '0px');
    if(this.props.desktop) {        
      $('.o-noorLogo-icon').css("cssText","position: absolute; padding: 0; top: 88vh; bottom: 88%; margin-left: 0px; z-index: 1; width: 100%;");
      $('.c-application-button').css("cssText","z-index: 1;");
      this.forceUpdate();
    }else {
      $('.o-noorLogo-icon').css("cssText","position: absolute; padding: 0; top: 88vh; bottom: 88%; margin-left: 0px; z-index: 1; width: 100%;");
      $('.c-application-button').css("cssText","z-index: 1;");
    }
  } // componentDidMount()

  componentDidUpdate(){
    $('#UserCPMenu').removeClass('logout');
    $('.c-application-button').css('right','6.0em');
    $('.c-application-button').css('display','block');
    $('.o-application-menu').css('right','5.65em');
    this.render();
  }
  onClickRequestMosque() {
    if(requestmosque) {
      requestmosque = false;
      if(!(newmarker == null)) {
        newmarker.setMap(null);
      }      
      this.closeNav();
      $('#requestMosqueButton').attr('src', 'app/assets/images/content/promotional/mosquefinder/icon-add-mosque.png');
    } else {
      requestmosque = true;
            
      $('#requestMosqueButton').attr('src', 'app/assets/images/content/promotional/mosquefinder/icon-add-mosque-active.png');
    }
  }  
  onClickCurrentLocation() {
    map.panTo(marker.getPosition(), 3000);               
  } // onClickCurrentLocation()

  getDistance(originLat,originLng,destinationLat,destinationLng,distanceCallback) {
    var bounds = new google.maps.LatLngBounds;
    var service = new google.maps.DistanceMatrixService;
    var origin = {lat: parseFloat(originLat) , lng: parseFloat(originLng)};
    var destination = {lat: parseFloat(destinationLat), lng: parseFloat(destinationLng) };
    service.getDistanceMatrix({
      origins: [origin], // [origin1,origin2, ...]
      destinations: [destination], // [destination1,destination2, ...]
      travelMode: google.maps.TravelMode.DRIVING, // DRIVING, BICYCLING, TRANSIT, WALKING
      unitSystem: google.maps.UnitSystem.METRIC, // METRIC, IMPERIAL
      avoidHighways: false, // true, false
      avoidTolls: false // true, false
    }, function(response, status) {
      if (status !== google.maps.DistanceMatrixStatus.OK) {
        toastr.error("Unable to reach Google.");
      } else {
         var originList = response.originAddresses;
         var destinationList = response.destinationAddresses;
         for (var i = 0; i < originList.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            if(results[0].status === "ZERO_RESULTS") {
              alert=true;
              if (isnearestMosques == true){
                toastr.error("Google was unable to calculate the distance");
                isnearestMosques = false;
              }
            }
            else {
              distanceCallback(results[j].distance.text,results[j].duration.text);
            }
                
          }
        }
          
      }
    });
  } // getDistance(originLat,originLng,destinationLat,destinationLng,distenceCallback)

  handleCameraClick(e) {
    $('#mosqueUpload').click();
  } // handleCameraClick(e) 

  //handle Accordion
  handleAccordion(e) {
    var id = e.target.id;
    id = id.split('-')
    $('.panel').removeClass("active");
    $('#'+id[0]+'-panel').addClass("active");
  } // handleAccordion(e)

  componentWillUnmount() {
    $(window).off("resize");
  }

  componentWillMount() {
    
    windowHeight = window.innerHeight;
    windowWidth = window.innerWidth;
    buttonX = windowWidth - 65;
    buttonY = 170;
    resizeWindow=resizeWindow.bind(this);
    $(window).resize(resizeWindow);
    function resizeWindow(){
      clearTimeout(resizeTimer);
      timer=timer.bind(this);
      resizeTimer = setTimeout(timer, 250);
      function timer() {
         windowHeight = window.innerHeight;
          windowWidth = window.innerWidth;
          buttonX = windowWidth - 65;
          buttonY = 170;
        this.forceUpdate();            
      }
    }
  }

  handleFeedback() {
    this.getQuestionFeedback();
  }

  handleStart() {
    var $ = require('jquery')
    $('#c-feedback-button').off('click');
    $('#c-feedback-button').click(this.handleFeedback.bind(this));
  }

  handleDrag(e, ui) {
    
    buttonX = buttonX + ui.deltaX;
    buttonY = buttonY + ui.deltaY;
    $('#c-feedback-button').off('click');
  }

  handleStop() {
    var top = 0;
    var left = 0;
    var right = window.innerWidth;
    var bottom = window.innerHeight;
    var topCal = buttonY + top;
    var bottomCal = (bottom - 177) - buttonY;
    var leftCal = buttonX + left;
    var rightCal = right - buttonX
    var finalHeight = 0, finalWidth = 0;
    if (topCal < bottomCal){
      if (leftCal < rightCal) {
        if (leftCal > topCal) {
          finalHeight = -10;
          finalWidth = leftCal;
        } else {
          finalHeight = topCal;
          finalWidth = 0;
        } 
      } else {
        if (rightCal > topCal) {
          finalHeight = -10;
          finalWidth = right-rightCal;
        } else {
          finalHeight = topCal;
          finalWidth = (right - 65);
        }
      }
    } else {
      //finalHeight = (bottom - 206);
      if (leftCal < rightCal) { 
        if (leftCal > bottomCal) {
          finalHeight = (bottom - 177);
          finalWidth = leftCal;
        } else {
          finalHeight = topCal;
          finalWidth = 0;
        } 
      } else {
        if (rightCal > bottomCal) {
          finalHeight = (bottom - 177);
          finalWidth = right-rightCal;
        } else {
          finalHeight = topCal;
          finalWidth = (right - 65);
        }
      }
    }
    buttonX = finalWidth;
    buttonY = finalHeight;
    this.forceUpdate();
  } 

  getQuestionFeedback() {
    if(feedbackSession) {
      var modal = document.getElementById('myModal');
      modal.style.display = 'block';
    } else {
      feedbackSession = true;
      getQuestionForm = getQuestionForm.bind(this);
      globalBetaFunction.getFeedbackModal("mosque",getQuestionForm);
      function getQuestionForm(data) {
        
        $('body').append(data);
        var modal = document.getElementById('myModal');
        modal.style.display = 'block';
        $('.closeModalBtn').click(function(){        
          modal.style.display = "none";
          $('.c-errorClass').css('display','none');
        });
        $('.add-new').click(function() {
          var newNo = $('.o-question-inner').children().length + 1;
          $('#question-table').append(
              '<li class="c-questionlistener">' +
                '<label>'+newNo+'.</label>' +
                '<div class="u-select__wrapper">' +
                  '<select id="mosque-question-'+newNo+'" class="c-selection has-dropdown" ref="mosquequestion">' +
                    '<option selected disabled>-- Choose Bug --</option>' +
                    '<option value="Function Not Working">Function Not Working</option>' +
                    '<option value="Invalid Data">Invalid Data</option>' +
                    '<option value="Spelling mistakes">Spelling mistakes</option>' +
                    '<option value="Browser Compatibility">Browser Compatibility</option>' +
                    '<option value="Logic Error">Logic Error</option>' +
                    '<option value="Crashing Issues">Crashing Issues</option>' +
                  '</select>' +
                  '<i class="fa fa-angle-down"></i>' +
                '</div>' +
                '<input id="mosqueanswer'+newNo+'" class="o-form__input" type="text" placeholder="Comment..." />' +
                '<div class="u-select__wrapper">' +
                  '<select id="mosque-priority-'+newNo+'" class="c-selection has-dropdown" ref="mosquepriority">' +
                    '<option selected disabled>-- Choose priority --</option>' +
                    '<option value="Low">Low</option>' +
                    '<option value="Medium">Medium</option>' +
                    '<option value="High">High</option>' +
                    '<option value="Urgent">Urgent</option>' +
                    '<option value="Critical">Critical</option>' +
                  '</select>' +
                  '<i class="fa fa-angle-down"></i>' +
                '</div>' + 
              '</li>');
        });
        saveFeedback = saveFeedback.bind(this);
        $('.is-save').click(saveFeedback);
        function saveFeedback() {
            
            var feedbackData;
            var userEmail = betaEmail;
            var validateAll = globalBetaFunction.validateFeedbackForm("mosque");
            if(validateAll.errorMsg == "") {          
              for(var i=1; i<=validateAll.answerFill; i++) {
                  feedbackData = {
                    email: userEmail,
                    category: "mosque",
                    answer: $('#mosqueanswer'+i).val(),
                    priority: $('#mosque-priority-'+i).val(),
                    question: $('#mosque-question-'+i).val()
                  };
                  globalBetaFunction.addUserFeedback(feedbackData);
              }
              if(validateAll.extraFill) {
                feedbackData = {
                    email: userEmail,
                    category: "mosque",
                    answer: $('#othercomment').val(),
                    priority: "medium",
                    question: "general"
                };
                globalBetaFunction.addUserFeedback(feedbackData);    
              }
              modal.style.display = "none";
              modal.remove();
              feedbackSession = false;
              this.context.router.push(config.root + "/summary?email="+betaEmail+"&token="+token);
            }            
            else {
              $('.c-errorClass').text(validateAll.errorMsg);
              $('.c-errorClass').css('display','block');
            }       
        }
      }
    }
  }

  render() {
    if(this.props.desktop) {
      menuWidth= 400;    
    }else {
      menuWidth= 300;
    }

    return (  
    <InlineCss stylesheet={css.mosquefinderMain(this.props.arabic)} namespace="MosqueFinderMain">


      {/*<div id="loading">
        <div id="loading-center">
          <div id="loading-center-absolute">
            <div className="object" id="object_one"></div>
            <div className="object" id="object_two"></div>
            <div className="object" id="object_three"></div>
            <div className="object" id="object_four"></div>
          </div>
        </div> 
      </div>*/}
      <Draggable
           axis="both"
           grid={[10, 10]}
           zIndex={50}
           bounds={{top: -10, left: 0, right: windowWidth - 65, bottom: windowHeight - 177}}
           position={{x: buttonX, y: buttonY}}
           onStart={this.handleStart.bind(this)}
           onDrag={this.handleDrag.bind(this)}
           onStop={this.handleStop.bind(this)}>
         <button type="button" id="c-feedback-button" className="c-feedback-button">?</button>
      </Draggable>
      <aside className="o-app-sidebar slideRight">        
        <div id="o-direction-panel">
          <button className="backbtn" onClick={this.backNav.bind(this)}><i className="fa fa-angle-double-left"></i></button>
          <button className="closebtn" onClick={this.closeNav}><i className="material-icons">close</i></button>
          <div className="o-direction-option">  
            <div className="mdl-tabs mdl-js-tabs mdl-js-ripple-effect o-button-container">
              <div className="mdl-tabs__tab-bar">
                  <a href="#WALKING" className="mdl-tabs__tab o-button-option" id="WALKING" onClick={this.getTravelingOption.bind(this)}><i className="material-icons">directions_walk</i></a>
                  <a href="#BICYCLING" className="mdl-tabs__tab o-button-option" id="BICYCLING" onClick={this.getTravelingOption.bind(this)}><i className="material-icons">directions_bike</i></a>
                  <a href="#DRIVING" className="mdl-tabs__tab o-button-option" id="DRIVING" onClick={this.getTravelingOption.bind(this)}><i className="material-icons">directions_car</i></a>
              </div>
            </div>
            <div className="mdl-tabs__panel">
            </div>        
          </div>  
          <div className="o-direction-label">
            <div>
              <label className="o-label-panel">{lang(this.props.language, 'mosqueFinderTo')}</label>
              <div id="o-to-label"></div>
            </div>
          </div>     
          <div id="o-direction-container">
          <div id="errorMesaage" className="errorMessage"> </div> 
          </div>
        </div>
        <div id="o-mosquedetail-panel">
          <button className="closebtn color-turquoise" onClick={this.closeNav}><i className="material-icons">close</i></button>
          <div id="o-mosquedetail-container">
            <label id="prayer-name"></label>
            <label id="prayer-time"></label>
            <label id="c-countdown"></label>
          </div>
        </div>
        <div id="o-newmosque-panel">
          <button className="closebtn" onClick={this.closeNav}><i className="material-icons">close</i></button>
          <div id="o-newmosque-container">
            <div>
              <h2 className="c-newmosque__title">{lang(this.props.language, 'mosqueFinderAddNewMosque')}</h2>
            </div>
            <div className="o-newmosque-form">
              <div className="c-photo-input">
                <button onClick={this.handleCameraClick.bind(this)}><i className="material-icons">photo_camera</i></button>
                <input className="o-upload__field" id="mosqueUpload" type="file" accept="image/*" onChange={this.readURL.bind(this)} />
              </div>
              <div className="c-form-group">
                <label htmlFor="c-mosque-photo"><span className="o-required"><i className="fa fa-star"></i></span>{lang(this.props.language, 'mosqueFinderPhoto')}</label>
                <div>
                  <img id="c-mosque-photo" className="o-form-input" />
                </div>
              </div>
              <div className="mdl-grid">
                <div className="mdl-cell--12-col">
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input id="c-mosque-name" className="mdl-textfield__input" type="text" ref="mosquename"/>
                    <label htmlFor="c-mosque-name" className="mdl-textfield__label">{/*<span className="o-required"><i className="fa fa-star"></i></span>*/}{lang(this.props.language, 'mosqueFinderMosqueName')}</label>
                  </div>
                </div>
                <div className="mdl-cell--12-col">
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input id="c-imam-name" className="mdl-textfield__input" type="text" ref="imamname"/>
                    <label htmlFor="c-imam-name" className="mdl-textfield__label">{lang(this.props.language, 'mosqueFinderImamName')}</label>
                  </div>
                </div>
                <div className="mdl-cell--12-col">
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input id="c-phoneNo" className="mdl-textfield__input" type="text" ref="phone"/>            
                    <label htmlFor="c-phoneNo" className="mdl-textfield__label">{lang(this.props.language, 'mosqueFinderPhone')}</label>
                  </div>
                </div>
                <div className="mdl-cell--12-col">
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input id="c-email" className="mdl-textfield__input" type="text" ref="email"/>
                    <label htmlFor="c-email" className="mdl-textfield__label">{lang(this.props.language, 'mosqueFinderEmail')}</label>
                  </div>
                </div>
                <div className="mdl-cell--12-col">
                  <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input id="c-website-link" className="mdl-textfield__input" type="text" ref="website"/>
                    <label htmlFor="c-website-link" className="mdl-textfield__label">{lang(this.props.language, 'mosqueFinderWebsite')}</label>
                  </div> 
                </div>       
              </div>           
            </div>
            <button className="o-newmosque-button" onClick={this._handleSubmit.bind(this)}><i className="fa fa-plus-circle"></i>{lang(this.props.language, 'mosqueFinderAddNewMosque')}</button> 
            <div id="o-newmosque-added"></div>                   
          </div>
        </div>  
      </aside>
      <Menu id="hamBurgerMenu" width={ menuWidth } onStateChange={ this.isMenuOpen.bind(this) } isOpen={ menuState }>
        <div className="mdl-grid--no-spacing" id="o-mosques-panel">
            <div className="o-sidebar-search-box">
            </div>
          <div className="o-scroll-content">
            <div className="o-sidebar-content">
              <header>
                <div className="o-sidebar-headerpadding accordion">
                  <h3 id="nearme-accordion" className="c-nearme__title u-center-alignment" onClick={this.handleAccordion.bind(this)}>
                    <i className="material-icons">location_on</i> {lang(this.props.language, 'mosqueFinderNearMe')}</h3>
                </div>
              </header>
              <div id="nearme-panel" className="o-sidebar-nearme panel active">
                <ul className="o-sidebar-results" id="nearme-table">
                </ul>
              </div>
            </div>
            <div className="o-sidebar-content">
              <header>
                <div className="o-sidebar-headerpadding accordion">
                  <h3 id="recent-accordion" className="c-nearme__title u-center-alignment" onClick={this.handleAccordion.bind(this)}>
                    <i className="material-icons">history</i> {lang(this.props.language, 'mosqueFinderRecentSearch')}
                  </h3>
                </div>
              </header>
              <div id="recent-panel" className="o-sidebar-recentsearch panel">
                <ul className="o-sidebar-results" id="recentsearch-table">
                  <li className="c-sidebar">
                  </li>
                </ul>
              </div>
            </div> 
            <div className="o-sidebar-content">
              <header>
                <div className="o-sidebar-headerpadding accordion">
                  <h3 id="fav-accordion" className="c-nearme__title u-center-alignment" onClick={this.handleAccordion.bind(this)}>
                    <i className="material-icons">star_border</i> {lang(this.props.language, 'mosqueFinderMyFavourite')}
                  </h3>
                </div>
              </header>
              <div id="fav-panel" className="o-sidebar-favouritemosque panel">
                <ul className="o-sidebar-results" id="favouritemosque-table">
                  <li className="c-sidebar">
                  </li>
                </ul>
              </div>
            </div>
          </div> 
        </div>
      </Menu>
      <div id="map"></div>
      <div className="o-google-search">
          <input id="pac-input" className="controls fa fa-search" type="text" placeholder={lang(this.props.language, 'mosqueFinderEnterLocation')} />
      </div>
      <div className="o-search-box">
      </div>
      <button className="mdl-button mdl-js-button mdl-button--fab" type="button" className="mdl-button mdl-js-button mdl-button--fab requestmosqueButton" onClick={this.onClickRequestMosque.bind(this)}>
        <img src="app/assets/images/content/promotional/mosquefinder/icon-add-mosque.png" id="requestMosqueButton"/>
      </button>
      <button className="mdl-button mdl-js-button mdl-button--fab" type="button" className="mdl-button mdl-js-button mdl-button--fab currentLocationButton" onClick={this.onClickCurrentLocation.bind(this)}>
       <img src="app/assets/images/content/promotional/mosquefinder/button-current-location.png" id="requestCurrentLocationButton"/> 
      </button>         

      </InlineCss>
    );
  }

};
  
  MosqueFinderMain.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
export default MosqueFinderMain;