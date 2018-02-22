import React from "react";
import InlineCss from "react-inline-css";
import lang from "../languages/lang";
import {Link, Router} from "react-router";
import StartScreen from "./OnePager/StartScreen";
import Discover from "./OnePager/Discover";
import Features from "./OnePager/Features";
import MosqueFinder from "./OnePager/MosqueFinder";
import Feedback from "./OnePager/Feedback";
import JobOpportunities from "./JobPortal/JobOpportunities";
import Footer from "./Footer";
import {NoorAlerts} from "./OnePager/NoorAlerts";
import {PlaceHolder} from "./OnePager/PlaceHolder";
import Test from "./OnePager/Test";
import cssFajar from "./cssGlobalFajar";
import Cookies from "./Cookies";
import config from "../config";
import cssMaghrib from "./cssGlobalMaghrib";

class OnePager extends React.Component {
	componentDidMount() {
		this.context.router.push(config.root + "/Glitch");
	}
	constructor(args) {
		super(args);
	}

	componentDidUpdate(){
		var timeStatus = Cookies.readCookie('currentTimeStatus');
		//this.render();

	}

	render() {
		var styleOnePager;
		var timeStatus = Cookies.readCookie('currentTimeStatus');
		if(timeStatus == 'Fajr'){
			styleOnePager = cssFajar.onePager(this.props.arabic);
		} else if(timeStatus == "Maghrib") {
			styleOnePager = cssMaghrib.onePager(this.props.arabic);
		} else {
			var d = new Date();
    		var n = d.getHours();
			if (6 < n && n < 19 ) {
				styleOnePager = cssFajar.onePager(this.props.arabic);
			} else {
				styleOnePager = cssMaghrib.onePager(this.props.arabic);
			}
		} 
		 return (
			<InlineCss stylesheet={styleOnePager} namespace="OnePager">
				
				{/*<StartScreen 
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
				<Test 
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
				<Discover 
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
				<Features 
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
				<PlaceHolder 
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
				<MosqueFinder 
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
				
				<NoorAlerts
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} /> 
				<Feedback
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
				<Footer
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />*/}
			</InlineCss>
		);
	}

	static css(arabicToggle) {

		const base = `
			& {
				height: 100%;
			}
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;
	}
};
OnePager.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default OnePager;