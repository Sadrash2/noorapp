import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import {Link} from "react-router";
import ReactDOM from "react-dom";
import Footer from "../Footer";
import HelpSupport from "../Questions";
import config from "../../config";
import functions from "../../scss/styleFunctions";
import validation from "../../components/GlobalValidation";
import globalFunction from "../../components/GlobalFunction";
import css from "./userCss";
import ChangePassword from "./UserChangePassword";

var id, stateCity, countryState, password;
class UserSettings extends React.Component {

	constructor(args) {
		super(args);
	}

	handleTab(e){
    	var $ = require ('jquery')
    	$('.c-usersettingstab__button').removeClass('active');
    	$('.usersettings-tabcontent').css('display','none');
    	var id = e.target.id;
    	$('#'+id).addClass('active');
    	id = id.split('-');
    	var action = id[0];
	    document.getElementById(action).style.display = "block";
    }

	componentDidMount() {
		var $ = require ('jquery')
    	$('.usersettings-tabcontent').css('display','none');
		$('#HelpSupport-tab').addClass('active');
	    document.getElementById("HelpSupport").style.display = "block";
	}

	render() {

		return (	
			<InlineCss stylesheet={css.userContent(this.props.arabic)} namespace="UserSettings">
				<div className="o-usersettings__tab">
					<button id="HelpSupport-tab" className="c-usersettingstab__button" onClick={this.handleTab.bind(this)}>
						Help & Support
					</button>
					<button id="ChangePassword-tab" className="c-usersettingstab__button" onClick={this.handleTab.bind(this)}>
						Change Password
					</button>
				</div>
				<div className="o-usersettings-padding">
					<div id="HelpSupport" className="usersettings-tabcontent">
					 	<HelpSupport
							language={this.props.language}
							desktop={this.props.desktop}
							arabic={this.props.arabic} />
					</div>
					<div id="ChangePassword" className="usersettings-tabcontent">
					  	<ChangePassword
							language={this.props.language}
							desktop={this.props.desktop}
							arabic={this.props.arabic} />
					</div>
				</div>
			</InlineCss>
		);
	}

};

UserSettings.contextTypes = {
	router: React.PropTypes.object.isRequired,
};
export default UserSettings;