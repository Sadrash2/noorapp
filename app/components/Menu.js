import React from "react";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/colors";
import {Link, RouterContext} from "react-router";
import ReactDOM from "react-dom";
import config from "../config";


class Menu extends React.Component {
	constructor(args) {
		super(args);
	}

	handleLogoClick(event) {
		this.context.router.push(config.root + "/");
	}

	handlescroll() {
		//console.log("scrolling");
		let $ = require("jquery");
		$("#headClassID").addClass("is-moving");
		//console.log();
        if ($(document).scrollTop() == 0) {
            $("#headClassID").removeClass("is-moving");
        }
    }

	componentDidMount() {
		let $ = require("jquery");
		$(document).on("click", ".scrollTo", function(e) {
			e.preventDefault();
			let target = $(this).attr("data-target");
			$('html, body').animate({
                scrollTop: $(target).offset().top -15
            }, 0);
		})
		document.addEventListener('scroll', this.handlescroll);
	}
	render() {
		
		const {
			handleHamburgerClick, 
			state, 
			language, 
			desktop, 
			handleToggleLanguage,
			arabic
		} = this.props;


		const headerClasses = desktop ? "header desktop" : "header";
		const mobileMenuClasses = desktop ? "mobile-menu desktop" : "mobile-menu";
		const mobileMenuActive = state ? " active" : "";
		return (
			<InlineCss stylesheet={Menu.css(arabic)} namespace="Menu">
				<div className={headerClasses} id="headClassID">
					<Link to={config.root+'/'} className="o-menu-logo scrollTo" data-target="#startscreen">NOOR</Link>
					

					<div className="o-desktop-menu">
						<Link to={config.root+'/'}><a href="#" className="scrollTo" data-target="#startscreen">{lang(this.props.language, "menuLinkRamadan")}</a></Link>
						<Link to={config.root+'/livefeed'}><a href="">{lang(this.props.language, "menuLinkLiveFeed")}</a></Link>
						<Link to={config.root+'/'}><a href="#" className="scrollTo" data-target="#discover">{lang(this.props.language, "menuLinkFeatures")}</a></Link>
						<Link to={config.root+'/'}><a href="#" className="scrollTo" data-target="#feedback">{lang(this.props.language, "menuLinkConnect")}</a></Link>
						<Link to={config.root+'/MosqueFinder'}><a href="">Mosque Finder</a></Link>
						<Link to={config.root+'/QuranMain'}><a href="">Quran Reader</a></Link>
						{/*<Link to={config.root + "/faq"}>Help</Link>
						<Link to={config.root + "/jobs"}>Jobs</Link>*/}
						{/*<Link to={config.root + "/press"}>Press</Link>*/}
						<a href="#" className="c-hidden" onClick={handleToggleLanguage}>{lang(language, "switchLanguage")}</a>	
					</div>


					<div className={"o-hamburger-menu" + mobileMenuActive} onClick={handleHamburgerClick} ref="hamburger">
						<div className="c-hamburger c-hamburger-first"></div>
						<div className="c-hamburger c-hamburger-second"></div>
						<div className="c-hamburger c-hamburger-third"></div>
					</div>
				</div>
				
				<div className={mobileMenuClasses + mobileMenuActive} ref="mobileMenu" id="mobileHeadClassID">
					<div className="o-menu-header">
						<div></div>
						<div className="c-change-language c-hidden" onClick={handleToggleLanguage}>{lang(language, "switchLanguage")}</div>
					</div>
					<ul className="o-menu-navigation">
						<li>
							<Link to={config.root+'/'}><a href="#" className="scrollTo" onClick={handleHamburgerClick} data-target="#startscreen">{lang(this.props.language, "menuLinkRamadan")}</a></Link>
						</li>
						<li>
							<Link to={config.root+'/livefeed'}><a href="" onClick={handleHamburgerClick} >{lang(this.props.language, "menuLinkLiveFeed")}</a></Link></li>
						<li>
							<Link to={config.root+'/'}><a href="#" className="scrollTo" onClick={handleHamburgerClick} data-target="#discover">{lang(this.props.language, "menuLinkFeatures")}</a></Link>
						</li>
						<li>
							<Link to={config.root+'/'}><a href="#" className="scrollTo" onClick={handleHamburgerClick} data-target="#feedback">{lang(this.props.language, "menuLinkConnect")}</a></Link>
						</li>
						{/*<li>
							<Link to={config.root + "/faq"}>Help</Link>
						</li>
						<li>
							<Link to={config.root + "/jobs"}>Jobs</Link>
						</li>*/}
						{/*<li>
							<Link to={config.root + "/press"}>Press</Link>
						</li>*/}
					</ul>
				</div>
			</InlineCss>
		);
	}


	static css(arabicToggle) {

		const base = `

			& {
				position: fixed;
				width: 100%;
				z-index: 100;
			}
			


			.is-moving {
				background-color: rgba(255, 255, 255, 0.98);
				box-shadow: 0 -2px 5px 0 #000000;
				transition: all 0.5s ease-in-out;
			}

			.is-moving a {
				color: ${colors.orange} !important;
			}

			.is-moving .o-hamburger-menu .c-hamburger {
				background-color: ${colors.orange} !important;
			}

			.c-hidden {
				display: none !important;
			}

			& .header{
				width: 100%;
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-between;
				align-items: center;
				height: 66px;
				padding: 23px;
			}

			& .header.desktop .o-hamburger-menu {display: none;} 

			& .mobile-menu.desktop {
				display: none;
			}

			& .header .o-hamburger-menu {
				width: 40px;
				height: 40px;
				// background-color: ${colors.white};
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				padding: 5px 0;
			}

			& .header .o-hamburger-menu .c-hamburger.c-hamburger-second {
				transition: width 0.2s ease, background-color 0.2s ease;
			}

			& .header .o-hamburger-menu.active .c-hamburger.c-hamburger-second {
				// background-color: ${colors.white};
				width: 1px;
			}

			& .header .o-hamburger-menu.active .c-hamburger.c-hamburger-first {
				transform: translateY(10px) rotate(-45deg);
				width: 38px;
			}

			& .header .o-hamburger-menu.active .c-hamburger.c-hamburger-third {
				transform: translateY(-10px) rotate(45deg);
				width: 38px;
			}

			& .header .o-hamburger-menu .c-hamburger {
				width: 27px;
				height: 5px;
				background-color: ${colors.orange};
				border-radius: 1px;
				transition: transform 0.2s ease, width 0.2s ease;
			}

			& .mobile-menu.desktop {
				display: none;
			}

			& .mobile-menu{
				position: fixed;
				height: 100%;
				width: 75%;
				background-color: rgba(24,24,24, 1.0);
				top: 0;
				left: 0;

				

				-moz-transform: translateX(-750px);
				-webkit-transform: translateX(-750px);
				-o-transform: translateX(-750px);
				-ms-transform: translateX(-750px);
				transform: translateX(-750px);

				-webkit-transition: transform 200ms ease-in-out;
				-moz-transition: transform 200ms ease-in-out;
				-ms-transition: transform 200ms ease-in-out;
				-o-transition: transform 200ms ease-in-out;
				transition: transform 200ms ease-in-out;
			}

			& .mobile-menu .o-menu-header {
				width: 100%;
				display: flex;
				flex-wrap: nowrap;
				justify-content: space-between;
				align-items: center;
				height: 80px;
				padding: 23px;
				
			}

			& .mobile-menu .o-menu-navigation li a {
				display: block;
				padding: 6px 23px;
				font-size: 2.0rem;
				color: white;
				letter-spacing: 0.6px;
			}

			& .mobile-menu .o-menu-navigation li a:hover {
				opacity: 0.75;
			}

			& .mobile-menu .menu-title {
				color: ${colors.white};
				padding-left: 23px;
				font-size: 24px;
			}

			& .mobile-menu .o-menu-header .c-change-language {
				color: ${colors.grayText}
			}

			& .mobile-menu.active {
				-moz-transform: translateX(0);
				-webkit-transform: translateX(0);
				-o-transform: translateX(0);
				-ms-transform: translateX(0);
				transform: translateX(0);
			}

			& .o-desktop-menu{
				display: none;
			}

			.o-menu-logo {
				display: block;
				height: 45px;
				width: 193px;
				background-color: transparent;
				background-image: url('app/assets/images/brand/logo-nonretina.png');
				background-repeat: no-repeat;
				background-size: contain;
				text-indent: -9999px;
				transition: all .25s ease-in-out;


			}
			.is-moving .o-menu-logo {
				background-image: url('app/assets/images/brand/logo-nonretina.png') !important;
				background-size: contain;
			}
			.o-menu-logo:hover {
				opacity: 0.75;
			}

			@media 
			(-webkit-min-device-pixel-ratio: 2), 
			(min-resolution: 192dpi) { 
			    .o-menu-logo {
					background-image: url('app/assets/images/brand/logo-retina.png');
					background-size: contain;
				}
				.is-moving .o-menu-logo {
					background-image: url('app/assets/images/brand/logo-retina.png') !important;
					background-size: contain;
				}
			}

			@media (min-width: 992px) {
				#Menu {
					top: 0;
					left: 0;
				}

				#Menu .o-desktop-menu {
					display: block;
				}

				#Menu .o-desktop-menu a{
					display: inline-block;
					margin-right: 1.5em;
					letter-spacing: 0.6px;
				}

				.desktop {
					padding: 0 4% !important;
				}
				
			}

			@media (min-width: 992px) {
				.desktop {
					padding: 0 8% !important;

				}
			}

			@media (min-width: 1106px) {
				.desktop {
					padding: 0 12% !important;
				}
			}

			@media (min-width: 1506px) {
				.desktop {
					padding: 0 19% !important;
				}
			}


		`;

		const arabic = `
			& .mobile-menu{
				left: 100%;
				-moz-transform: translateX(0);
				-webkit-transform: translateX(0);
				-o-transform: translateX(0);
				-ms-transform: translateX(0);
				transform: translateX(0);
				
			}
			& .mobile-menu.active {
				-moz-transform: translateX(-264px);
				-webkit-transform: translateX(-264px);
				-o-transform: translateX(-264px);
				-ms-transform: translateX(-264px);
				transform: translateX(-264px);
			}

			& .header .o-hamburger-menu {
				order: -1;
			}

			& .mobile-menu .o-menu-header .c-change-language {
				order: -1;
			}
		`;

		return arabicToggle ? base + arabic : base;

	}

};

Menu.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default Menu;