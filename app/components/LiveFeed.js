import React from "react";
import Router from "react-router";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/colors";
import {Link} from "react-router";
import config from "../config";
import functions from "../scss/styleFunctions";

class LiveFeed extends React.Component {


	render() {

		return (
			<InlineCss namespace="startscreen" stylesheet={LiveFeed.css(this.props.arabic)}>

				<div id="instafeed">

						<iframe src="https://www.powr.io/plugins/instagram-feed/view?unique_label=6171cb1d_1464938470&external_type=iframe" 
						width="100%" height="600" frameborder="0"></iframe>

					{/* 
						//for launch
						<script src="//www.powr.io/powr.js" external-type="html"></script> 
	 					<div class="powr-instagram-feed" id="6171cb1d_1464938470"></div>


					*/}

				</div>
			</InlineCss>
		);
	}

	static css(arabicToggle) {

		const base = `
		&{
			padding: 4.5% 5%;
		}
		& iframe{
			width: 100%; 
			border: 0; 
			overflow: hidden;
			height: 910px;

		}

		& .powr-instagram-feed{
			height: 750px;
		}


		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}


};

export default LiveFeed;