import colors from "../scss/colors";
import functions from "../scss/styleFunctions";

let cssGlobalFajarFunction = {
	onePager: function(arabicToggle) {
		const arabic = ``;
		return `

			#Menu .header {
				height: 100px;
			}

			.is-moving {
					height: 66px !important;
			}
		
			#Menu .header a {
				color: white;
			}

			#Menu .header .o-hamburger-menu .c-hamburger {
				background-color: white;
			}

			header.site-header {
				background-color: ${colors.dirtWhite};
				background-image: linear-gradient(-180deg, #0B7CA0 0%, #B8FFDC 100%);
				color: white;
			}

			.o-menu-logo {
				background-image: url('app/assets/images/brand/logo-white-nonretina.png') !important;
			}

			@media 
			(-webkit-min-device-pixel-ratio: 2), 
			(min-resolution: 192dpi) { 
			    .o-menu-logo {
					background-image: url('app/assets/images/brand/logo-white-retina.png') !important;
					background-size: contain;
				}
			}

		` + (arabicToggle ? arabic : "");
	}
};

export default cssGlobalFajarFunction;