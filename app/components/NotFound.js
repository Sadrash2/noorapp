import React from "react";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/colors";
import {Link, RouterContext} from "react-router";
import ReactDOM from "react-dom";
import config from "../config";


class NotFound extends React.Component {

	componentDidMount() {
		var $ = require('jquery')
        $('#UserCPMenu').addClass('logout');
		$('.c-application-button').css('display','none');
	}
	
	render() {

		const {arabic} = this.props;

		return (
			<InlineCss stylesheet={NotFound.css(arabic)} namespace="NotFound">
				<div className="o-notFound-container">
					<div className="c-notFound-job">
						<h1>Page was not found</h1>
						<p className="c-break">Unfortunately we could not find the page you were looking for.</p>
					</div>
				</div>
			</InlineCss>
		);
	}


	static css(arabicToggle) {

		const base = `

			div#react-root {
				background-color: white;
			}

			& {
				padding-top: 120px;
			}

			& h1 {
				margin-bottom: 5px;
				text-align: center;
			}

			& .c-notFound-job {
				background-color: ${colors.dirtLightBackground};
				padding-top: 40px;
				padding-bottom: 40px;
				text-align: center;
			}

			& .c-notFound-job h2 {
				text-align: center;
				padding-top: 20px;
				padding-bottom: 40px;
			}

			& .c-notFound-job ul {
				padding: 0 20px;
				list-style-type: square;
			}

			@media (min-width: 768px) {

			}
			


		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

NotFound.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default NotFound;