import React from "react";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/colors";
import {Link, RouterContext} from "react-router";
import ReactDOM from "react-dom";
import config from "../config";


class Footer extends React.Component {
	
	render() {

		const {arabic} = this.props;

		return (
			<InlineCss stylesheet={Footer.css(arabic)} namespace="Footer">

				
				<div className="c-container">
					<div className="left-footer">
						<div className="footer-linklist">
							<ul>
								<li><Link to={config.root + "/faq"}>{lang(this.props.language, "footerLinkHelp")}</Link></li>
								<li><Link to={config.root + "/jobs"}>{lang(this.props.language, "footerLinkJobs")}</Link></li>
								{/*<li><Link to={config.root + "/faq"}>Help</Link></li>
								<li><Link to={config.root + "/"}>Home</Link></li>
								<li><Link to={config.root + "/jobs"}>Job opportunities</Link></li>*/}
							</ul>
						</div>
					</div>
					{/*<div className="right-footer">
						<h3>Job opportunities</h3>
						<p>asdasdasads</p>
						<Link to={config.root + "/jobs"} className="button purple">Watch all our openings</Link>
						<Link to={config.root + "/jobs"} className="button">Send an unsolicited application</Link>
					</div>*/}
				</div>
				

				<div className="c-footer-line c-container">
					<p className="c-attribution">&copy; 2016 NOOR Technology MENA</p>
				</div>
			</InlineCss>
		);
	}


	static css(arabicToggle) {

		const base = `

			& {
				padding: 16px 23px;
				margin-bottom: 80px;
			}

			& .c-container {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}

			& .c-container > .right-footer {
				margin-top: 32px;
			}

			& .c-container > .left-footer > h3 {
				font-size: 2.0rem;
				line-height: 22px;
				margin-bottom: 6px;
			}

			& .footer-linklist {
				margin: 15px 0;
				font-size: 1.2rem;
			}

			& .footer-linklist ul {
				margin: 0 auto;
				display: flex;
				flex-direction: row;
				max-width: 200px;
			}

			& .footer-linklist ul li {
				flex: 1;
				margin: 0;
				padding: 0;
				list-style: none;
				text-align: center;
			}

			& .footer-linklist ul li  a {
				color: ${colors.grayText};
			}

			& .c-footer-line {
				font-size: 1.2rem;
				text-align: center;
			}

			& .c-footer-line > div {
				display: flex;
				align-items: center;
			}

			& .c-container button {
				width: 100%;
			}

			@media (min-width: 768px) {

				& {
					position: relative;
				}

				#Footer .c-container > * {
					width: 100%;
					margin-top: 0;
				}

				#Footer .c-container {
					flex-direction: row;
				}

				#Footer .c-container > .right-footer {
					margin-top: 0px !important;
				}

				#Footer .c-footer-line > div {
					position: absolute;
					bottom: 12px;
				}
			}
			


		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

Footer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default Footer;