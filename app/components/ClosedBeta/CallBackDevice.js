import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import {Link} from "react-router";
import ReactDOM from "react-dom";
import Footer from "../Footer";
import globalFunction from "../../components/GlobalFunction";
import validation from "../../components/GlobalValidation";
import config from "../../config";
import functions from "../../scss/styleFunctions";

class CallBackDevice extends React.Component {

	componentDidMount() {
		var $ = require('jquery')
		$('.c-application-button').css('display','none');
        $('#UserCPMenu').addClass('logout');	
   	}

  render() {
    return (
     	<InlineCss stylesheet={CallBackDevice.css(this.props.arabic)} namespace="CallBackDevice">
     		<div className="" id="fallbackmessage"></div>  
     		<div className="o-background-color"></div>  
     		<div className="o-signup-container">   			
     			<div className="o-signup-form">
	     			<header>   				
	     				<h3 className="o-heading-singup text-center">Thanks for continuing the registration</h3>
	     				<h4 className="text-center text-danger"> Please use the device you started with and click on the link you are given.</h4>
	     			</header>
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
				.text-center{
					text-align:center;
				}
				.is-required{
					width: 100%;
					padding: 2%; 
					font-size: 1em;
					border: 1px solid #DDDDDD;
					outline: none;
					border-color:red;
				}
				.o-heading-singup {
					line-height: normal;
					font-size: xx-large;
					font-weight: 500;
				}
				.c-input {
					width: 100%;
					padding: 2%; 
					font-size: 1em;
					border: 1px solid #DDDDDD;
					outline: none;
				}

				.o-button-wrapper {
					margin: 1em;
					padding: 0 10%;
					text-align: center;
				}

				.c-start-button {
					background-color: #C79269;
					color: white;
					border:none;
					font-size: 1.2em;
					outline: none;
					width: 100%;
					padding: 1em 0;
				}
				.c-start-button:hover {
					background-color: #DBA982;
				}

				ul { 
					list-style:none;
					color: rgb(160,160,160);
				}

				li {
					margin-bottom: 0.7em;
				}
				.o-signup-main {
					width:100%;
					height: auto;
					font-size:1.0em;
					font-weight: 500;
				}
				.o-background-color {
					background-color: #ECE8E1;
    				width: 100%;
    				height: 30em;
    				z-index: -1;
    				position: absolute;
				}	
				& > .o-signup-container .o-signup-form {
					padding: 2em;
					display: flex;
					flex-direction: column;
					flex-wrap: wrap;
					background-color: white;
					box-shadow: 0px 1px 3px #999999;
				}

				& > .o-signup-container .o-signup-form label {
					color: #746A5A;
					font-size: 0.8em;
					line-height: 2.5em;
				}

				& > .o-signup-container {
					padding: 4% 20%;	
				}

				.o-signup-form > header > h2 {
					font-weight: 500;
					font-size: 2.0em;
					color: #4D4D4D;
					line-height: 1.4em;
				}

				.o-signup-form > p {
					word-wrap: break-word;
					width: 100%;
					
					margin-bottom: 10%;
					text-align: center;
					text-align: -webkit-center;
					text-align: -moz-center;
				}
				.text-danger{
					color:red;
				}

				{/* Mobile (Landscape)
				================================================== */}
				@media only screen and (min-width: 280px) and (max-width: 767px) {
					& > .o-signup-container {
						padding: 5% 12% 5%;	
					}
				}

				{/* Tablet (Portrait)
				================================================== */}
				@media only screen and (min-width: 768px) and (max-width: 959px) {
					& > .o-signup-container {
						padding: 5% 22% 5%;		
					}
				}
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

CallBackDevice.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default CallBackDevice;