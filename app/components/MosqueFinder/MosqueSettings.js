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
import globalQuranFunction from "../../components/Quran/GlobalQuranFunction";
import css from "../User/userCss";


var id, stateCity, countryState, password;
var quranLanguage = "AyahTextEnglish";
var isReadmore=false;

class MosqueSettings extends React.Component {

	constructor(args) {
		super(args);
	}

	handleTravel(e) {
		var $ = require ('jquery')

		var travelmode;
		if(e.target.checked){
			travelmode = 1;
		}else{
			travelmode = 0;
		}
		var opt = {"email":Cookies.readCookie('user'),"travelmode":travelmode}
		calldata.passFormDataWithoutCallback("UserData", "updateTravelMode", opt)
	}

	callApi(){
		var $ = require ('jquery')
		var opt = Cookies.readCookie('user');
		if(opt!=""){
			calldata.passRequest("UserData", "fetch", opt, function(data){
				var response = JSON.parse(data);
				
				if(response.state === 200) {
					if(response.success.travelmode){
						$('#cmn-toggle-travelmode').attr('checked', true);
					}else{
						$('#cmn-toggle-travelmode').attr('checked', false);
					}
					
				} else {
					calldata.passRequestWithoutCallback("UserData", "add", opt);
				}
	    	});
		}
	}

	componentDidMount(){
		this.callApi();
	}

	render() {

		return (	
			<InlineCss stylesheet={css.userSettingsContent(this.props.arabic)} namespace="MosqueSettings">
				<div className="o-usersettings-container">
					<div className="c-usersettings-form__group">
						<label>Travel Mode</label>
						<div className="switch">
							<label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="switch-1">
							  <input type="checkbox" id="cmn-toggle-travelmode" className="mdl-switch__input"  onClick={this.handleTravel.bind(this)} />
							  <span className="mdl-switch__label"></span>
							</label>
						  	{/*<input id="cmn-toggle-travelmode" className="cmn-toggle cmn-toggle-round-flat" type="checkbox" onClick={this.handleTravel.bind(this)} />
						  	<label htmlFor="cmn-toggle-travelmode"></label>*/}
						</div>
					</div>
				</div>
			</InlineCss>
		);
	}

};

MosqueSettings.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default MosqueSettings;