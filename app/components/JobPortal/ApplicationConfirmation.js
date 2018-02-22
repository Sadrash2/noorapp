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
//import fontawesomecss from "../../components/JobPortal/fontawesomecss.css";

/* todo list 
travel to homepage function
implement correct images
*/

class ApplicationConfirmation extends React.Component {

	constructor(args) {
		super(args);
		
	}

	handleHomepageClick() {
		this.context.router.push(config.root + "/");
	}


	render() {
		return (
			<InlineCss stylesheet={ApplicationConfirmation.css(this.props.arabic)} namespace="ApplicationConfirmation">
				<div className="o-applicationconfirmation-container has-padding">
					<div className ="o-confirmationsection">
						<div className="u-circle has-icon">
							<i className="fa fa-check"></i>
						</div>
						<div className="c-modal__content">
							<h1>{lang(this.props.language, "applicationConfirmationModalTitle")}</h1>
							<p>{lang(this.props.language, "applicationConfirmationModalDescription")}</p>
							<button className = "o-homepagebutton c-submit o-form__button is-transparent is-centered" type="button" onClick={(this.handleHomepageClick.bind(this))}>
							{lang(this.props.language, "applicationConfirmationControlBack")}
							</button>
						</div>
					</div>
				</div>
				<Footer
					language={this.props.language}
					desktop={this.props.desktop}
					arabic={this.props.arabic} />
			</InlineCss>
		);
	}


	static css(arabicToggle) {

		const base = `
			.o-form__button {
				padding: 16px 23px;
				font-size: 1.6rem;
				font-weight: 600;
				letter-spacing: 0.6px;
				cursor: pointer;
			}

			button.is-transparent {
				background-color: transparent;
				border: 2px solid #746A5A;
				color: #746A5A;
				transition: all .25s ease-in-out;
			}

			button.is-transparent:hover {
				border: 2px solid #E0DDD6;
				color: #E0DDD6;
			}

			button.is-centered {
				margin: 0 auto;
			}


			& {
				padding-top: 66px;
			}

			& .o-confirmationsection {
				margin-top: 64px;
				padding: 64px;
				background-color: white;
				box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.12);
				text-align: center;
			}

			& .o-confirmationsection .u-circle {
				display: block;
				margin: 0 auto;
				height: 120px;
				width: 120px;
				background-color: #E0DDD6;
				border-radius: 50%;
			}

			& .o-confirmationsection .u-circle i {
				font-size: 5.6rem;
				color: white;
				line-height: 120px;
			}

			& .o-confirmationsection .c-modal__content h1 {
				margin: 64px 0;
				font-size: 5.6rem;
				font-weight: 100;
				-webkit-animation-duration: 1.5s;
  				animation-duration: 1.5s;
  				-webkit-animation-fill-mode: both;
  				animation-fill-mode: both;
				animation-name: fadeInDown;
				-webkit-animation-name: fadeInDown;
			}

			& .o-confirmationsection .c-modal__content p {
				margin-bottom: 32px;
				font-size: 2.0rem;
				line-height: 28px;
				-webkit-animation-duration: 1.5s;
  				animation-duration: 1.5s;
  				-webkit-animation-fill-mode: both;
  				animation-fill-mode: both;
				animation-name: fadeInUp;
				-webkit-animation-name: fadeInUp;
			}

			& .o-confirmationsection .c-modal__content button {
				-webkit-animation-duration: 1.5s;
  				animation-duration: 1.5s;
  				-webkit-animation-fill-mode: both;
  				animation-fill-mode: both;
				animation-name: fadeInUp;
				-webkit-animation-name: fadeInUp;
			}

			@media (min-width: 768px) {
				& > .o-applicationconfirmation-container header h1 {
					font-size: 3.6rem;
					line-height: 48px;
					letter-spacing: 0.85px;
				}
			}
			@media (min-width: 768px) and (max-width: 991px) {
				& > .o-applicationconfirmation-container header {
					height: 300px;
					max-height: 300px;
				}
			}
			@media (min-width: 992px) {
				& > o-applicationconfirmation-container header {
					height: 500px;
					max-height: 500px;
				}
			}
			@keyframes fadeInUp {
			  from {
			    opacity: 0;
			    -webkit-transform: translate3d(0, 100%, 0);
			    transform: translate3d(0, 100%, 0);
			  }
			  to {
			    opacity: 1;
			    -webkit-transform: none;
			    transform: none;
			  }
			}
			@keyframes fadeInDown {
			  from {
			    opacity: 0;
			    transform: translate3d(0, -100%, 0);
			  }

			  to {
			    opacity: 1;
			    transform: none;
			  }
			}

			.fadeInDown {
			  animation-name: fadeInDown;
			}
		` + functions.responsivePadding(".has-padding");

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

ApplicationConfirmation.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default ApplicationConfirmation;