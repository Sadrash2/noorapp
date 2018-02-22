import React from "react";
import InlineCss from "react-inline-css";
import lang from "../languages/lang";
import {Link, Router} from "react-router";
import StartScreen from "./OnePager/StartScreen";
import Discover from "./OnePager/Discover";
import Features from "./OnePager/Features";
import Feedback from "./OnePager/Feedback";
import JobOpportunities from "./JobPortal/JobOpportunities";
import Footer from "./Footer";
import {NoorAlerts} from "./OnePager/NoorAlerts";
import {PlaceHolder} from "./OnePager/PlaceHolder";
import Test from "./OnePager/Test";

class OnePager extends React.Component {

	constructor(args) {
		super(args);
	}

	render() {
		return (
			<InlineCss stylesheet={OnePager.css(this.props.arabic)} namespace="OnePager">
				
				<StartScreen 
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
				{/* <Test 
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} /> */}
				<Discover 
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
				<Features 
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
				
				{/* <NoorAlerts
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} /> */}
				<Feedback
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
				<Footer
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
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
export default OnePager;