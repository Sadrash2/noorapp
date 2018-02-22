import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import {Link} from "react-router";
import ReactDOM from "react-dom";
import Footer from "../Footer";
import config from "../../config";
import functions from "../../scss/styleFunctions";
import Cookies from "../../components/Cookies"; 
import validation from "../../components/GlobalValidation";
import css from "./userCss";
import globalFunction from "../../components/GlobalFunction";
import toastr from 'toastr';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

var betaEmail
var $ = require('jquery');

class UserFavouriteMosque extends React.Component {

	constructor(args) {
		super(args);
	}

	fetchFavMosque() {
		var opt = betaEmail;
		if(opt!=""){
			globalFunction.getFavouriteMosqueFetch(opt, function(data){
				var response = JSON.parse(data);
				if(response.state === 200) {
					$("#favmosque-table li").remove();
       				$('#fallback-favmosque').hide();
		            for(var i =0; i < response.success.length; i++){
		            	var image = response.success[i].image;
		            	var mosqueid = response.success[i].mosqueid;
		            	image = image.split('/');
                			image = image[image.length-1];
		            	$('#favmosque-table')
						         .append(
						         	'<li id="favMosqueContainer-'+mosqueid+'" class=" demo-card-square mdl-card mdl-shadow--2dp c-userfavmosque">' + 
						         		'<div class="mdl-card__title mdl-card--expand thumbnail">' +
											'<img id="mosque-img-'+mosqueid+'" src="app/bridge/mosque/'+image+'" />' +
										'</div>' +
										'<div class="mdl-card__supporting-text c-userfavmosque__detail">' +
											'<h2 id="favMosque-'+mosqueid+'">'+response.success[i].mosquename+'</h2>' +
											'<label class="c-userfavmosque__address">'+response.success[i].addressline1+', </label>' +
											'<label class="c-userfavmosque__country">'+response.success[i].country+'</label>' +
										'</div>' + 
										'<div class="mdl-card__actions mdl-card--border">' + 
											'<button id="removeFavMosque-'+mosqueid+'" type="button" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect c-removemosque is-primary" aria-haspopup="true" aria-expanded="false">' +
												'<i class="material-icons">close</i>' + ' ' + 'Remove Favourite' +
											'</button>' +
										'</div>' +
									'</li>');
						         // Get on screen image
						var screenImage = $("#mosque-img-"+i);
						var theImage = new Image();
						theImage.src = screenImage.attr("src");
						theImage.onload = function() {
							var imageWidth = theImage.width;
							var imageHeight = theImage.height;
							if(imageHeight > imageWidth) {
								screenImage.addClass('portrait');
							}
						}						
						deleteClick = deleteClick.bind(this);
						$('#removeFavMosque-'+mosqueid).click(deleteClick);
		            }
				}else {
       				$('#fallback-favmosque').show();
				}
	    	});
		}

		function deleteClick(e){
			var friendId = e.currentTarget.parentNode.parentNode.id;
			var id = e.currentTarget.id;
			id = id.split("-");
			var mosqueid = id[1];
			var opt = {"email": betaEmail,
						"mosqueid": mosqueid
					}
			globalFunction.removeFavouriteMosque(opt, function(data){
				var response = JSON.parse(data);
				if(response.state === 200) {
					toastr.success('Removed Favourite Mosque');
					$('#'+friendId).toggle('slide');
				}
	    	});
		}
	}

	componentDidMount() {
		var $ = require ('jquery')
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
		       	$('#fallback-favmosque').hide();
				this.fetchFavMosque();
	        }
	}

	render() {

		return (	
			<InlineCss stylesheet={css.userMosqueContent(this.props.arabic)} namespace="UserFavouriteMosque">
				<div className="o-userfavmosque-container">
					<div className="o-userfavmosque-result">
						<div id="fallback-favmosque" className="o-userfavmosque-fallback">
							<label>{lang(this.props.language, "favouriteMosqueFallback")}</label>
						</div>
						<div className="o-userfavmosque-padding">
							<ul className="o-userfavmosque-results" id="favmosque-table">							
							</ul>
						</div>
					</div>					
				</div>
			</InlineCss>
		);
	}

};

UserFavouriteMosque.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default UserFavouriteMosque;