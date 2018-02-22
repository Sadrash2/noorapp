import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import ReactSwipe from "react-swipe";
import MosqueFinder from "./MosqueFinder";
import {Link} from "react-router";
import css from "./css";

export class NoorAlerts extends React.Component {
	constructor() {
		super();
	}

	componentDidUpdate(){
		this.render();
	}

	render() {

		return(
		<InlineCss namespace="nooralerts" stylesheet={css.noorAlerts(this.props.arabic)}>
		<div className="c-notifications">
			<h2>{lang(this.props.language, "notifications")}</h2>
			<p>{lang(this.props.language, "notificationsText")}</p>
			
			<div className="c-notification-mobiles">
				<div>
					<div className="c-half c-notification-phone-one"></div>
				</div>
			</div>
		</div>
		</InlineCss>
		);
	}
	
};