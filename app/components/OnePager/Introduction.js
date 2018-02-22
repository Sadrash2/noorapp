import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import {Link} from "react-router";
import css from "./css";

class Introduction extends React.Component {

	componentDidUpdate(){
		this.render();
	}

	render() {

		return (
			<InlineCss namespace="introduction" stylesheet={css.introduction(this.props.arabic)}>
				<div className="c-introduction-description">
					Von Haus aus einfach zu bedienen, intuitiv konzipiert und elegant geschmiedet - eine starke Basis für dich.
				</div>

				<div className="c-introduction-mobiles">
					<div className="c-left-mobile" dangerouslySetInnerHTML={{__html: svgMobile}}></div>
					<div className="c-center-mobile" dangerouslySetInnerHTML={{__html: svgMobile}}></div>
					<div className="c-right-mobile" dangerouslySetInnerHTML={{__html: svgMobile}}></div>
				</div>

				<div className="c-introduction-text">
					<p>Was uns in unseren Glauben vereint, formt unsere persönlichkeit. NOOR kann nach deinen eigenen Bedürfnisse angepasst werden, so dass du den Islam auf deinen eigenen Weg erleben kannst.</p>
					<p>Eine einfache und innovative Oberfläche ist der Grundstein von NOOR, der es dir erlaubt, sowohl den Hauptbildschirm als auch alle Dienste kinderleicht anzupassen. Von Haus aus </p>
				</div>


			</InlineCss>
		);
	}


};

export default Introduction;