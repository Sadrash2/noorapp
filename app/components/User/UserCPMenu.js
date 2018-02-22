import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import {Link} from "react-router";
import ReactDOM from "react-dom";
import UserNotification from "./UserNotification";
import QSettings from "../Quran/QuranSettings";
import MSettings from "../MosqueFinder/MosqueSettings";
import config from "../../config";
import functions from "../../scss/styleFunctions";
import validation from "../../components/GlobalValidation";
import globalFunction from "../../components/GlobalFunction";
import moment from "moment-hijri";
import css from "./userCss";

var Menu = require('react-burger-menu').slide;
var preTab = "";
var UserLocation = { latitude: 3.1657265, longitude: 101.6918819 };
var check, menuWidth, count = 1, profileImage = (<img src="app/assets/images/content/promotional/users/default-profile.jpg" />);
var betaEmail;
class UserCPMenu extends React.Component {

	constructor(args) {
		super(args);

	}

	//Fetch Users Details
	callApi(){
		var user = betaEmail;
		var $ = require ('jquery')
		getData = getData.bind(this);
		globalFunction.getUserFetch(user, getData);

		function getData(data) {
			var response = JSON.parse(data);
			if(response.state === 200) {
				var avatar = response.success.avatar;
            	if(avatar != ""){
            		avatar = avatar.split('/');
            		avatar = avatar[avatar.length-1];

            		$('.c-ham-avatar').attr('src', "app/bridge/avatarUploads/"+avatar);
            		var url = "app/bridge/avatarUploads/"+avatar;
            		profileImage = (<img src={url} />);
            		if(count === 1) {
            			count += 1;
            			this.forceUpdate();
            		}
            	}else {
            		$('.c-ham-avatar').attr('src', "app/assets/images/content/promotional/users/default-profile.jpg");
            		profileImage = (<img src="app/assets/images/content/promotional/users/default-profile.jpg" />);

            	}
            	var name = response.success.firstName + " " + response.success.lastName;
            	$('#userCPName').text(name);

            	var background = response.success.coverphoto;
                if(background != ""){
                	background = background.split('/');
                	background = background[background.length-1];
                	background = background.split('&');

                	$('.o-usercp-userdetails').css('background-image', 'url("app/bridge/avatarUploads/'+background[0]+'")');
                }else {
                	$('.o-usercp-userdetails').css('background-color', 'black');
                }

            }
		}
	}

	//Get Current Location and print as address
	getLocation() {
		var $ = require ('jquery')
		var pos;
		$('#userCPAddress').text("");

		if (navigator.geolocation) {
	       	navigator.geolocation.getCurrentPosition(function(position) {
		        pos = {
		          lat: position.coords.latitude,
		          lng: position.coords.longitude
		        };
		        var geocoder = new google.maps.Geocoder();
    			var latLng = new google.maps.LatLng(pos.lat, pos.lng);

    			if (geocoder) {
				    geocoder.geocode({ 'latLng': latLng}, function (results, status) {

				    	if (status == google.maps.GeocoderStatus.OK) {
				    		var address;
				    		for (var i = 0; i < results[0].address_components.length; i++)
					        {
						        var shortname = results[0].address_components[i].short_name;
						        var longname = results[0].address_components[i].long_name;
						        var type = results[0].address_components[i].types;
						        if (type.indexOf("locality") != -1)
						        {
						            address = longname + ", ";
						        }
						        if (type.indexOf("country") != -1)
						        {
						            address += longname;
						        }
					        }
					        $('#userCPAddress').text(address);
				    	}
				    });
				  }      
		    }, function() {
		       handleLocationError();
		    });
	    } else {
	    	//Browser doesn't support Geolocation
	    	handleLocationError();
	    }

	    function handleLocationError(){
        	var userLocation = { latitude: 3.1657265, longitude: 101.6918819 };
			$('#userCPAddress').text("");

	    }
	}

	//Get Islamic Date
	islamicDateTimer() {
	    //Hijri date from moment-hijri
	    let date = moment().format('iD iMMMM iYYYY');
	    var $ = require ('jquery')

	    $('#userCPIslamicDate').text(date);
	}

	componentDidMount() {
		var $ = require ('jquery')
		if($('#UserCPMenu').hasClass('logout')){

		}else {
			var url = window.location.search;
			var queryStart = url.indexOf("?") + 1;
	        var queryEnd  = url.indexOf("#") + 1 || url.length + 1;
	        var query = url.slice(queryStart, queryEnd - 1);
	        var pairs = query.replace(/\+/g, " ").split("&");
	        if(pairs[0] != ""){
	        	var emailPairs = pairs[0].replace(/\+/g, " ").split("="),
		        parms = {}, i, n, v, nv;
		        betaEmail = emailPairs[1];
		        betaEmail = betaEmail.replace("%40","@");
				$('.usercp-tabcontent').css('display','none');
				$('#tablinks-Notification').addClass('active');
		   	 	document.getElementById("Notification").style.display = "block";
				this.callApi();
				this.getLocation();
				this.islamicDateTimer();
	        }else {
	        	$('#UserCPMenu').addClass('logout');
	        }
		}		
	}

	componentDidUpdate() {
		var $ = require ('jquery')
		if($('#UserCPMenu').hasClass('logout')){

		}else {
			var url = window.location.search;
			var queryStart = url.indexOf("?") + 1;
	        var queryEnd  = url.indexOf("#") + 1 || url.length + 1;
	        var query = url.slice(queryStart, queryEnd - 1);
	        var pairs = query.replace(/\+/g, " ").split("&");
	        if(pairs[0] != ""){
	        	var emailPairs = pairs[0].replace(/\+/g, " ").split("="),
		        tokenPairs = pairs[1].replace(/\+/g, " ").split("="),
		        parms = {}, i, n, v, nv;
		        betaEmail = emailPairs[1];
		        betaEmail = betaEmail.replace("%40","@");
				$('.usercp-tabcontent').css('display','none');
				$('#tablinks-Notification').addClass('active');
		   	 	document.getElementById("Notification").style.display = "block";
				this.callApi();
				this.getLocation();
				this.islamicDateTimer();
	        }else {
	        	$('#UserCPMenu').addClass('logout');
	        }
		    this.render();
		}
	}

	//Tab Change Function
	handleChangeTab(e){
    	var $ = require ('jquery')
    	$('.usercp-tablinks').removeClass('active');
    	$('.usercp-tabcontent').css('display','none');
    	var id = e.target.id;
    	$('#'+id).addClass('active');
    	id = id.split('-');
    	var action = id[1];
	    if(action != "Settings") {
	    	document.getElementById(action).style.display = "block";	    	
	    } else {
	    	var url = window.location.pathname;
			url = url.split("/");
			url = url[url.length-1];
			if(url.startsWith("QuranMain")) {
				action = "Q" + action;
	    		document.getElementById(action).style.display = "block";
			} else if(url.startsWith("MosqueFinder")){
				action = "M" + action;
	    		document.getElementById(action).style.display = "block";
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
			<InlineCss stylesheet={css.userCPMenu(this.props.arabic)} namespace="UserCPMenu">
				<Menu id="UserCPHamburgerMenu" width={ menuWidth } customBurgerIcon={ profileImage } isOpen={check} right>
			      	<div className="o-usercp-userdetails">
			      		<img className="c-ham-avatar" />
				      	<div className="c-usercp-name">
				      		<h2 id="userCPName"></h2>
				      	</div>
				      	<div className="c-usercp-details">
				      		<i className="fa fa-map-marker"></i>
				      		<div className="c-usercp-markerdetails">
				      			<date id="userCPIslamicDate" className="c-usercp-islamicdate"></date>
				      			<label id="userCPAddress" className="c-usercp-address"></label>
				      		</div>
				      	</div>
			      	</div>
			      	<div className="o-usercp-tab">
							
						<ul className="usercp-tab">
						  	<li><a href="#" className="usercp-tablinks" id="tablinks-Notification" onClick={this.handleChangeTab.bind(this)}>{lang(this.props.language, "cpMenuElementNotification")}</a></li>
						  	<li><a href="#" className="usercp-tablinks" id="tablinks-Settings" onClick={this.handleChangeTab.bind(this)}>{lang(this.props.language, "cpMenuElementSettings")}</a></li>
						</ul>

						<div className="o-usercp-scrollcontent">	
							<div id="Notification" className="usercp-tabcontent">
							 	<UserNotification
									language={this.props.language}
									desktop={this.props.desktop}
									arabic={this.props.arabic} />
							</div>
							<div id="QSettings" className="usercp-tabcontent">
							  	<QSettings
									language={this.props.language}
									desktop={this.props.desktop}
									arabic={this.props.arabic} />
							</div>
							<div id="MSettings" className="usercp-tabcontent">
							  	<MSettings
									language={this.props.language}
									desktop={this.props.desktop}
									arabic={this.props.arabic} />
							</div>
						</div>
					</div>
			    </Menu>
			</InlineCss>
		);
	}

};

UserCPMenu.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default UserCPMenu;