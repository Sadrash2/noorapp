import colors from "../scss/colors";
import functions from "../scss/styleFunctions";

let cssGlobalMaghribFunction = {
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
				color: ${colors.orange};
			}


			
			header.site-header {
				background-color: ${colors.dirtWhite};
				background-image: url('app/assets/images/brand/night.jpg');
				background-size: cover;
				background-repeat: no-repeat;
				color: white;
			}

			header.site-header .container .content h1 {
				color: ${colors.orange};
			}

			header.site-header .welcome {
				color: ${colors.orange};
			}
			
		` + (arabicToggle ? arabic : "");
	}
};

export default cssGlobalMaghribFunction;