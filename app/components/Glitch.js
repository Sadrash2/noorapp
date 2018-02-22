import React from "react";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/colors";
import {Link, RouterContext} from "react-router";
import ReactDOM from "react-dom";
import config from "../config";


class Glitch extends React.Component {

	componentDidMount() {
		var $ = require('jquery');
        $('#UserCPMenu').addClass('logout');
		$('.c-application-button').css('display','none');
	}
	
	render() {

		const {arabic} = this.props;

		return (
			<InlineCss stylesheet={Glitch.css(arabic)} namespace="Glitch">
				<div className="o-background-color"></div> 
				<div className="o-glitch-container">
					<div className="o-glitch-form">
						<h1 className="o-heading-glitch">You've found a Glitch!</h1>
						<p className="c-break">You've found yourself in a weird place.</p>
						<p className="c-break">Probably not the place you were looking for.</p>
						<p className="c-break">\ ( ˆ o ˆ ) /</p>
					</div>
				</div>
			</InlineCss>
		);
	}


	static css(arabicToggle) {

		const base = `
		& {
			padding-top: 65px;
		}
		.o-heading-glitch {
			line-height: normal;
			font-size: xx-large;
			font-weight: 500;
			line-height: 2em;
		}
		.o-glitch-form {
			width: 30%;
			margin: 0 auto;
			margin-top: 5%;
		}
		.o-glitch-form p {
			line-height: 2em;
		}
		.o-glitch-container {
			text-align: center;
		}
		.o-background-color {
			background-color: #ECE8E1;
    		width: 100%;
    		height: 30em;
    		z-index: -1;
    		position: absolute;
		}	
		& > .o-glitch-container .o-glitch-form {
			padding: 2em;
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			background-color: white;
			box-shadow: 0px 1px 3px #999999;
		
		& > .o-glitch-container .o-glitch-form label {
			color: #746A5A;
			font-size: 0.8em;
			line-height: 2.5em;
		
		& > .o-glitch-container {
			padding: 4% 0;	
			max-width: 500px;
			margin: 0 auto;
		}
		.o-glitch-form > header > h1 {
			font-weight: 500;
			font-size: 2.0em;
			color: #4D4D4D;
			line-height: 2em;
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

Glitch.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default Glitch;