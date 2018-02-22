import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import ReactSwipe from "react-swipe";
import {Link} from "react-router";
import css from "./css";


class MosqueFinder extends React.Component {

	constructor() {
		super();
	}

	componentDidUpdate(){
		this.render();
	}


	render() {

		let desktopMobile = this.props.desktop ? (
			<div>
				<div className="c-mosque-finder-half c-notification-mosque-finder"></div>
			</div>
		) : "";

		return (
			<InlineCss namespace="mosquefinder" stylesheet={css.mosquefinder(this.props.arabic)}>
			<section id="mosque-finder" className="page-section">
					<div className="container">
						<div className="has-bg has-mosque-bg">
							<header>
								<div className="section-symbol"></div>
								<h2>{lang(this.props.language, "mosqueFinder")}</h2>
							</header>
							<div className="content">
								<div className="subsection">
									<ul className="list-unstyled">
										<li>
											<h3>{lang(this.props.language, "mosqueBoxOneTitle")}</h3>
											<p>{lang(this.props.language, "mosqueBoxOneText")}</p>
										</li>
										<li>
											<h3>{lang(this.props.language, "mosqueBoxTwoTitle")}</h3>
											<p>{lang(this.props.language, "mosqueBoxTwoText")}</p>
										</li>
										<li>
											<h3>{lang(this.props.language, "mosqueBoxThreeTitle")}</h3>
											<p>{lang(this.props.language, "mosqueBoxThreeText")}</p>
										</li>
									</ul>
									<div className="image-container">
										<img src="app/assets/images/content/promotional/mosquefinder/mosque-phone.png" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				
			</InlineCss>
		);
	}


};

export default MosqueFinder;