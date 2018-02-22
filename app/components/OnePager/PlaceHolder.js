import React from "react";
import Router from "react-router";
import {Link} from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import ReactSwipe from "react-swipe";
import MosqueFinder from "./MosqueFinder";
import Features from "./Features";
import css from "./css";

export class PlaceHolder extends React.Component {

	constructor() {
		super();

	}

	componentDidUpdate(){
		this.render();
	}

	render() {

		let shownApp = (
			<div className="o-placeholder-container">
				<div className="o-placeholder-notifications">
				<div className="o-placeholder-content">
					<h3 className="c-placeholder-title">Notifications</h3>
					<div className="o-placeholder-mobiles o-app-notifications">
						<div>
							<div className="c-placeholder-icon c-placeholder-icon-cts"></div>
							<h3>{lang(this.props.language, "callToPrayer")}</h3>
							<div className="c-placeholder-mobile c-placeholder-half"></div>
							{lang(this.props.language, "callToPrayerText")}
						</div>
						<div>
						<div className="c-placeholder-icon c-placeholder-icon-qibla"></div>
							<h3>{lang(this.props.language, "quiblah")}</h3>
							<div className="c-placeholder-mobile c-placeholder-half"></div>
							{lang(this.props.language, "quiblahText")}
							
						</div>
						
					</div>
					</div>

				</div>

			</div>);

		return (
			<InlineCss namespace="features" stylesheet={css.placeHolder(this.props.arabic)}>

			<section id="notifications" className="page-section">
				<div className="container">
					<header>
						<div className="section-symbol"></div>
						<h2>{lang(this.props.language, "notificationsTitle")}</h2>
					</header>
					<div className="content">
						<div id="quibla" className="subsection">
							<div className="image-container">
								<img src="app/assets/images/content/promotional/features/device-quibla.png" />
							</div>
							<div className="image-content">
								<h3>{lang(this.props.language, "quiblah")}</h3>
								<p>{lang(this.props.language, "quiblahText")}</p>
							</div>
						</div>
						<div id="call-to-prayer" className="subsection">
							<div className="image-container">
								<img src="app/assets/images/content/promotional/features/device-ctp.png" />
							</div>
							<div className="image-content">
								<h3>{lang(this.props.language, "callToPrayer")}</h3>
								<p>{lang(this.props.language, "callToPrayerText")}</p>
							</div>
						</div>

						<div className="pattern01">
						</div>
						<div className="pattern02">
						</div>
						<div className="pattern03">
						</div>
						<div className="pattern04">
						</div>
						<div className="pattern05">
						</div>
					</div>
				</div>
			</section>
				
			</InlineCss>
		);
	}


};