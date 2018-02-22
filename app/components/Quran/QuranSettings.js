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
import calldata from "../../components/apiCall";
import globalFunction from "../GlobalFunction";
import globalQuranFunction from "../../components/Quran/GlobalQuranFunction";
import css from "../User/userCss";

var id, stateCity, countryState, password;
var quranLanguage = "AyahTextEnglish";
var isReadmore=false;
var $ = require('jquery');

class QuranSettings extends React.Component {

	constructor(args) {
		super(args);
	}

	handleViewFlip(e) {
		$('#c-viewflipmode-button').click();

		var flipmode;
		if(e.target.checked){
			flipmode = "readmode";
		}else{
			flipmode = "pagemode";
		}
		var opt = {"email":Cookies.readCookie('user'),"changemode":flipmode}
		calldata.passFormDataWithoutCallback("UserData", "updateChangeMode", opt)
	}

	//change translation of the quran after clicking on the button
	handleTranslation(e) {
		$('#c-translation-button').click();

		var translation;
		if(e.target.checked){
			translation = "ar";
		}else{
			translation = "en";
		}
		var opt = {"email":Cookies.readCookie('user'),"langmode":translation}
		calldata.passFormDataWithoutCallback("UserData", "updateLangMode", opt)
	}

	handleNightMode(e) {
		$('#c-nightmode-button').click();

		var nightmode;
		if(e.target.checked){
			nightmode = "on";
		}else{
			nightmode = "off";
		}
		var opt = {"email":Cookies.readCookie('user'),"nightmode":nightmode}
		calldata.passFormDataWithoutCallback("UserData", "updateNightMode", opt)
	}

	handleViewMode(e) {
		$('#c-viewmode-button').click();
		var viewmode;
		if(e.target.checked){
			viewmode = "ayaview";
		}else{
			viewmode = "suraview";
		}
		var opt = {"email":Cookies.readCookie('user'),"viewmode":viewmode}
		calldata.passFormDataWithoutCallback("UserData", "updateViewMode", opt)
	}

	callApi(){
		var opt = Cookies.readCookie('user');
		var flipmode, langmode, nightmode, viewmode;
		if(opt!=""){
			calldata.passRequest("UserData", "fetch", opt, function(data){
				var response = JSON.parse(data);
				
				if(response.state === 200) {
					if(response.success.changemode == "readmode"){
						$('#cmn-toggle-flipmode').attr('checked', true);
						flipmode = "readmode";
					}else{
						$('#cmn-toggle-flipmode').attr('checked', false);
						flipmode = "pagemode";
					}
					if(response.success.langmode == "ar"){
						$('#cmn-toggle-translation').attr('checked', true);
						langmode = "ar";						
					}else{
						$('#cmn-toggle-translation').attr('checked', false);
						langmode = "en";
					}
					if(response.success.nightmode == "on"){
						$('#cmn-toggle-nightmode').attr('checked', true);
						nightmode = "on";
					}else{
						$('#cmn-toggle-nightmode').attr('checked', false);
						nightmode = "off";
					}
					if(response.success.viewmode == "ayaview"){
						$('#cmn-toggle-viewmode').attr('checked', true);
						viewmode = "ayaview";
					}else{
						$('#cmn-toggle-viewmode').attr('checked', false);
						viewmode = "suraview";
					}
				} else {
					globalFunction.addUserData(opt);
						flipmode = "pagemode";
						langmode = "en";
						nightmode = "off";
						viewmode = "suraview";
				}

				var quranState = {
		    		"flipmode":flipmode,
		    		"langmode":langmode,
		    		"nightmode":nightmode,
		    		"viewmode":viewmode
		    	}
		    	Cookies.writeCookie('quranstate', JSON.stringify(quranState), 3)
		    	});

		}
	}

	componentDidUpdate(){
		this.callApi();
	}

	componentDidMount(){
		this.callApi();
	}

	render() {

		return (	
			<InlineCss stylesheet={css.userSettingsContent(this.props.arabic)} namespace="QuranSettings">
				<div className="o-usersettings-container">
					<div className="c-usersettings-form__group">					
						<label>Change Mode</label>
						<div className="switch">
							<label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="cmn-toggle-flipmode">
							  <input type="checkbox" id="cmn-toggle-flipmode" className="mdl-switch__input" onClick={this.handleViewFlip.bind(this)} />
							  <span className="mdl-switch__label"></span>
							</label>
						</div>
					</div>
					<div className="c-usersettings-form__group">
						<label>Arabic</label>
						<div className="switch">
							<label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="cmn-toggle-translation">
							  <input type="checkbox" id="cmn-toggle-translation" className="mdl-switch__input" onClick={this.handleTranslation.bind(this)} />
							  <span className="mdl-switch__label"></span>
							</label>
						</div>
					</div>
					<div className="c-usersettings-form__group">
						<label>Night Mode</label>
						<div className="switch">
							<label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="cmn-toggle-nightmode">
							  <input type="checkbox" id="cmn-toggle-nightmode" className="mdl-switch__input" onClick={this.handleNightMode.bind(this)} />
							  <span className="mdl-switch__label"></span>
							</label>
						</div>
					</div>
					<div className="c-usersettings-form__group">
						<label>Aya View</label>
						<div className="switch">
							<label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="cmn-toggle-viewmode">
							  <input type="checkbox" id="cmn-toggle-viewmode" className="mdl-switch__input" onClick={this.handleViewMode.bind(this)}/>
							  <span className="mdl-switch__label"></span>
							</label>
						</div>
					</div>
				</div>
			</InlineCss>
		);
	}

};

QuranSettings.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default QuranSettings;