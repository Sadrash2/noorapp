import colors from "../../scss/colors";
import functions from "../../scss/styleFunctions";

let cssFunction = {
	discover: function(arabicToggle){
		const arabic = ``;
		return `

			button {
				font-family:"Neue Frutiger 1450 W01",Helvetica,Arial,sans-serif;
			}

			& {
				display: flex;
				flex-direction: column;
				width: 100%;
				background-color: ${colors.white};
			}
			& h3 {
				font-weight: 300;
				text-align: center;
			}

			& .o-slides > div {
				position: relative;
				z-index: 3;
			}
			& .c-discover-graphic-area {
				height: 380px;
				background-color: ${colors.dirtBackground};
			}

			& .discover-description {
				padding: 0 23px;
			}

			& .c-discover-title {
				padding: 28px 23px 15px;
				line-height: 32px;
				text-align: center;
				font-weight: 100;
				color: ${colors.dirtText};
				letter-spacing: 1px;
			}

			.o-discover-box-one .c-discover-graphic-area, .o-discover-box-two .c-discover-graphic-area, .o-discover-box-three .c-discover-graphic-area {
				background-size: cover !important;
				background-position: center center !important;
			}
			.o-discover-box-one .c-discover-graphic-area {
				background: transparent url('app/assets/images/content/promotional/discover/mobile/discover-one.png') no-repeat;
			}
			.o-discover-box-two .c-discover-graphic-area {
				background: transparent url('app/assets/images/content/promotional/discover/mobile/discover-two.png') no-repeat;
			}
			.o-discover-box-three .c-discover-graphic-area {
				background: transparent url('app/assets/images/content/promotional/discover/mobile/discover-three.png') no-repeat;
			}
			@media (max-width: 991px) {
				& {
					padding-top: 32px;
					padding-bottom: 32px;
				}
				& h3 {
					padding: 0 32px 23px;
					font-size: 4.0rem;
					line-height: 44px;
				}
				& .c-discover-phones {
					display: none;
				}
				& .o-discover-arrows {
					position: relative;
					top: 75px;
					z-index: 1;
				}
				& .o-discover-arrows > .c-left-arrow,  & .o-discover-arrows > .c-right-arrow {
					position: absolute;
					min-height: 380px;
					width: 120px;
				}
				& .o-discover-arrows > div {
					opacity: 1.0;
					transition: all 0.2s ease-in-out;
				}
				& .o-discover-arrows > div:hover {
					opacity: 0.75;
					cursor: pointer;
				}
				& .o-discover-arrows > .c-left-arrow {
					left: 0;
					background: transparent url('app/assets/images/ui/swipe/arrow-left-bg.png') repeat-y;
				}
				& .o-discover-arrows > .c-right-arrow {
					right: 0;
					background: transparent url('app/assets/images/ui/swipe/arrow-right-bg.png') repeat-y;
				}
				& .o-discover-arrows > .c-left-arrow:after {
					display: block;
					width: 120px;
					height: 380px;
					content: "";
					background: transparent url('app/assets/svg/ui/swipe/arrow-left.svg') no-repeat;
					background-position: center center;
				}
				& .o-discover-arrows > .c-right-arrow:after {
					display: block;
					width: 120px;
					height: 380px;
					content: "";
					background: transparent url('app/assets/svg/ui/swipe/arrow-right.svg') no-repeat;
					background-position: center center;
				}
				& .o-discover-dots {
					display: flex;
					justify-content: center;
					padding: 32px 0;
				}
				& .o-discover-dots > div {
					background-color: white;
					border: 1px solid ${colors.orange};
					width: 16px;
					height: 16px;
					border-radius: 50%;
					margin: 0 5.5px;
				}
				& .o-discover-dots > div.active {
					background-color: ${colors.orange};
					border-color: ${colors.orange};
				}
			}
			@media (min-width: 992px) {
				& {
					padding-top: 4% !important;
					padding-bottom: 4% !important;
					height: 100%;
					z-index: 13;
					position: relative;
				}
				h3 {
					font-size: 5.6rem;
					line-height: 61px;
				}
				& .c-discover-phones {
					position: absolute;
					bottom: -20%;
					left: 0;
					z-index: 2;
					height: 90%;
					width: 100%;
					background: transparent url('app/assets/images/content/promotional/discover/desktop/discover-phones.png') no-repeat;
					background-position: center center;
					background-size: contain;
				}
				& .o-slides {
					display: flex;
					justify-content: space-between;
				}
				& .o-slides > div { flex-basis: 31%; }
				& .o-slides > div > div { padding: 0; }
				& .o-slides > div > .c-discover-title {
					font-size: 2.8rem;
					margin-top: 46px;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
					font-weight: 300;
				}
				& .o-slides > div > .c-discover-graphic-area  {
					display: none !important;
				}
			}

			@media (min-width: 992px) {
				& .phone-animation {
					position: absolute;
					height: 1775px;
				}
				& .phone-animation > div {
					background-size: 50% !important;
				}
				& .phone-animation > .shadow-one {
					position: absolute;
					bottom: -12px;
					height: 1286px;
					width: 2036px;
					background: transparent url('app/svg/discover-shadow-one.png') no-repeat;
				}
				& .phone-animation > .phone-one {
					position: absolute;
					bottom: 250px;
					left: 125px;
					z-index: 2;
					height: 1026px;
					width: 1518px;
					background: transparent url('app/svg/discover-phone-one.png') no-repeat;
				}
				& .phone-animation > .shadow-second {
					position: absolute;
					z-index: 3;
					left: 170px;
					bottom: 15px;
					height: 1298px;
					width: 1776px;
					background: transparent url('app/svg/discover-shadow-two.png') no-repeat;
				}
				& .phone-animation > .phone-second {
					position: absolute;
					z-index: 4;
					left: 183px;
					bottom: 350px;
					height: 1116px;
					width: 1404px;
					background: transparent url('app/svg/discover-phone-two.png') no-repeat;
				}
				& .phone-animation > .shadow-three {
					position: absolute;
					z-index: 5;
					left: 130px;
					bottom: 240px;
					height: 1370px;
					width: 1456px;
					background: transparent url('app/svg/discover-shadow-three.png') no-repeat;
				}
				& .phone-animation > .phone-three {
					position: absolute;
					z-index: 6;
					left: 380px;
					bottom: 475px;
					height: 1204px;
					width: 1148px;
					background: transparent url('app/svg/discover-phone-three.png') no-repeat;
				}
			}

		` + (arabicToggle ? arabic : "");

	},
	features: function(arabicToggle){
		const arabic = ``;
		return `
			& .c-feature-pad {
				display: block;
				padding-left: 23px;
				background: transparent url('app/assets/images/content/promotional/quran/ipad.png') no-repeat;

			}
			& .o-feature-navigation {
				display: flex;
				flex-wrap: wrap;
				padding: 0 23px;
				background-color: ${colors.white};
				font-size: 1.2rem;
				font-weight: 600;
				letter-spacing: 1px;
				text-transform: uppercase;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
			}
			& .c-active-bar {
				width: 100%;
				margin-top: 12px;
			}

			& .c-quran-reader {
				width: 50%;
				height: 20px;
				text-align: center;
			}

			& .c-mosque-finder {
				width: 50%;
				text-align: center;
			}

			& .c-active-bar div.active {
				transform: translateX(100%);
			}

			& .c-active-bar div{
				height: 5px;
				width: 50%;
				background-color: #D9AF81;
				transition: transform 0.3s ease;
			}

			& .o-quran-container {
				display: flex;
				flex-direction: column-reverse;
			}

			& .o-features-arrows {
				position: relative;
			}

			& .o-features-arrows > .c-left-arrow,  & .o-features-arrows > .c-right-arrow {
				position: absolute;
				min-height: 380px;
				width: 120px;
			}
			& .o-features-arrows > div {
				opacity: 1.0;
				transition: all 0.2s ease-in-out;
			}
			& .o-features-arrows > div:hover {
				opacity: 0.75;
				cursor: pointer;
			}
			& .o-features-arrows > .c-left-arrow {
				left: 0;
				background: transparent url('app/assets/images/ui/swipe/arrow-left-bg.png') repeat-y;
			}
			& .o-features-arrows > .c-right-arrow {
				right: 0;
				background: transparent url('app/assets/images/ui/swipe/arrow-right-bg.png') repeat-y;
			}
			& .o-features-arrows > .c-left-arrow:after {
				display: block;
				width: 120px;
				height: 380px;
				content: "";
				background: transparent url('app/assets/svg/ui/swipe/arrow-left.svg') no-repeat;
				background-position: center center;
			}
			& .o-features-arrows > .c-right-arrow:after {
				display: block;
				width: 120px;
				height: 380px;
				content: "";
				background: transparent url('app/assets/svg/ui/swipe/arrow-right.svg') no-repeat;
				background-position: center center;
			}
			& .o-features-dots {
				display: flex;
				justify-content: center;
				padding: 32px 0;
			}

			& .o-features-dots div {
				background-color: white;
				border: 1px solid ${colors.orange};
				width: 16px;
				height: 16px;
				border-radius: 50%;
				margin: 0 5.5px;
			}

			& .o-features-dots div.active {
				background-color: ${colors.orange};
				border-color: ${colors.orange};
			}

			& .c-quran-box-graphic-area {
				height: 380px;
				background-color: ${colors.dirtBackground};
			}

			& .c-quran-box-graphic-area {
				background-size: contain !important;
			}
			 & .o-quran-container > div > div > .o-quran-box:first-child .c-quran-box-graphic-area, & .c-quran-boxes > .o-quran-box:first-child .c-quran-box-graphic-area {
				background: transparent url('app/assets/images/content/promotional/quran/features-family.png') no-repeat;
				background-position: center center !important;
			}

			& .o-quran-container > div > div > .o-quran-box:nth-child(2) .c-quran-box-graphic-area, & .c-quran-boxes > .o-quran-box:nth-child(2) .c-quran-box-graphic-area {
				background: transparent url('app/assets/images/content/promotional/quran/features-wheel.png') no-repeat;
				background-position: center center !important;
			}

			& .o-quran-container > div > div > .o-quran-box:last-child .c-quran-box-graphic-area, & .c-quran-boxes > .o-quran-box:last-child .c-quran-box-graphic-area {
				background: transparent url('app/assets/images/content/promotional/quran/features-audio.png') no-repeat;
				background-position: center center !important;
			}


			& .c-quran-box-description {
				padding: 0 23px;
				text-align: center;
			}

			& .c-quran-box-title {
				padding: 28px 23px 15px;
				min-height: 107px;
				font-size: 2.8rem;
				line-height: 32px;
				text-align: center;
				font-weight: 100;
				letter-spacing: 1px;
			}
			& .o-quran-content {
				padding: 0 0 0;
				background-color: ${colors.startscreen};
			}
			& .c-feature-boxes-title {
				padding: 0;
				font-size: 2.8rem;
				line-height: 32px;
				text-align: left;
			}
			@media (max-width: 991px) {
			& .c-feature-header {
				background-color: ${colors.white};
				padding: 32px 23px;
				border-top: 1px solid ${colors.startscreen};
				text-align: center;
			}
			& .c-feature-header > h2 {
				font-size: 4.0rem;
				line-height: 44px;
				font-weight: 300 ;
				letter-spacing: 1px;
			}
			& .c-feature-boxes-title {
				display: none;
			}
		}
		@media (min-width: 992px) {
			& { background-color: ${colors.dirtWhite}; }
			& .c-featureList { padding: 0; }
			& .c-feature-boxes-title {
				margin-bottom: 32px;
				font-size: 5.6rem;
				line-height: 61px;
				font-weight: 300;
				letter-spacing: 1px;
			}
			& .o-quran-content > .o-quran-container-outer {
				padding-top: 4% !important;
				padding-bottom: 4% !important;
			}
			& .o-quran-content > .o-quran-container-outer > .o-quran-container {
				padding: 0;
				display: flex;
				justify-content: space-between;
			}
			& .o-quran-content > .o-quran-container-outer > .o-quran-container > .c-quran-boxes {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				width: 100%;
				margin-bottom: 4%;
			}
			& .o-quran-content > .o-quran-container-outer > .o-quran-container > .c-quran-boxes > div.o-quran-box {
				margin: 23px;
				width: 33%;
			}
			& .o-quran-content > .o-quran-container-outer > .o-quran-container > .c-quran-boxes > div.o-quran-box .c-quran-box-title {
				padding: 28px 0 15px !important;
				text-align: left !important;
			}
			& .o-quran-content > .o-quran-container-outer > .o-quran-container > .c-quran-boxes > div.o-quran-box .c-quran-box-description {
				padding: 0 !important;
				text-align: left !important;
			}
			& .o-quran-content > .o-quran-container-outer > .o-quran-container > .c-quran-image {
				width: 100%;
				position: relative;
				margin-bottom: 38%;
			}
			& .o-quran-content > .o-quran-container-outer > .o-quran-container > .c-quran-image > .c-feature-pad {
				position: absolute;
				top: 0;
				height: 861px;
				width: 100%;
				background-position: top center !important;
				background-size: contain;
			}
			& .o-quran-content > .notifications > .notification-title {
				font-size: 5.6rem;
				line-height: 61px;
				font-weight: 300;
				letter-spacing: 1px;
			}
			& .o-quran-content > .notifications > .notification-mobiles {
				display: flex;
				justify-content: space-between;
				padding: 32px 0 0 !important;
			}
			& .o-quran-content > .notifications > .notification-mobiles > div {
				width: 40%;
			}
			& .o-quran-content > .notifications > .notification-mobiles > div > h3 {
				font-size: 2.8rem;
				line-height: 32px;
			}
		}
		` + functions.responsivePadding("#features .o-quran-content > .o-quran-container-outer") + (arabicToggle ? arabic : "");

	},
	feedback: function(arabicToggle){
		const arabic = ``;
		const responsiveSocialMedia = functions.responsivePadding("#feedback .o-social-media");
		const responsiveContactForm = functions.responsivePadding("#feedback .c-contact-form");
		return `

			${responsiveSocialMedia}

			& .o-beta-container {
				background-color: ${colors.startscreen};
				padding: 32px 23px;
			}

			& .o-beta-program h2 {
				font-size: 2.8rem;
				line-height: 32px;
				margin-bottom: 23px;
				text-align: center;
			}

			& .o-beta-program p {
				margin-bottom: 15px;
			}

			& .join-the-beta, #feedback .i-want-newsletter {
				height: 42px;
				border: 1px solid ${colors.boxBackgroundColor};
				-webkit-box-shadow: 2px 2px 0 0 rgba(116,106,90,0.33);
				box-shadow: 2px 2px 0 0 rgba(116,106,90,0.33);
				border-radius: 3px;
				position: relative;
				text-align: center;
				padding-top: 10px;
				margin-bottom: 5px;
			}

			& .checkbox {
				position: absolute;
				height: 24px;
				width: 24px;
				background-color: white;
				border: 2px solid ${colors.orange};
				top: 8px;
				left: 8px;
				border-radius: 5px;
			}

			& .o-input-container {
				background-color: rgba(255,255,255,1.0);
				height: 60px;
				margin-top: 60px;
				display: flex;
				align-items: center;
			}

			& .o-input-container .c-submit {
				flex: 1;
				background-color: ${colors.orange};
				height: 40px;
				line-height: 41px;
				margin-right: 10px;
				text-align: center;
				color: white;
				letter-spacing: 2px;
				font-weight: 400;
				font-size: 1.4rem;
			}

			& .o-input-container .c-input {
				flex: 3;
				margin-left: 15px;
				height: 40px;
				margin-right: 15px;
				border: 0;
				font-size: 1.6rem;
				color: #746a5a;
				background-color: rgba(255,255,255,0);
			}

			c-input:focus,	
			select:focus,
			textarea:focus,
			button:focus {
			    outline: none;
			}

			& .timeline-tail {
				height: 150px;
				display: flex;
				padding: 0 23px;
			}

			& .line {
				width: 4px;
				flex-shrink: 0;
				background-color: ${colors.orange};
			}

			& .o-social-media {
				background-color: ${colors.startscreen};
			}

			& .c-social-media-header {
				padding: 32px 23px;
				color: ${colors.orange};
			}

			& .social-media-content {
				background-color: ${colors.dirtWhite};
				padding: 32px 23px;
			}

			& .o-social-media .intro {
				font-size: 21px;
				margin-bottom: 25px;
			}

			& .c-social-link {
				height: 60px;
				background-color: white;
				margin-bottom: 20px;
			}

			& .o-social-media-container {
				padding: 1px 23px;
			}

			& .c-social-link{
				display: flex;
				align-items: center;
			}

			& .c-social-link .o-text {
				text-indent: 20px;
			}

			& .c-fblogo {
				height: 60px;
			}

			& .c-instagramlogo {
				height: 42px;
				padding: 0 9px;
			}

			& .c-twitterlogo {
				height: 34px;
				padding: 0 10px;
			}

			& .c-mediumlogo {
				height: 34px;
				padding: 0 9px;
			}

			& .c-contact-form {
				background-color: ${colors.dirtWhite};
			}

			& .c-contact-form h2 {
				color: ${colors.orange};
				margin-bottom: 20px;
			}

			& .c-contact-form p {
				margin-bottom: 30px;
			}

			#feedback .c-contact-form c-input[type=text] {
				height: 40px;
				background-color: rgba(255,255,255,0.33);
				border: 1px solid white;
				width: 100%;
				font-size: 14px;
				padding: 0 10px;
				border-radius: 2px;
			}

			#feedback .c-contact-form .input-message textarea {
				width: 100%;
				border: 1px solid white;
				background-color: rgba(255,255,255,0.66);
				min-height: 140px;
				font-size: 14px;
				padding: 10px;
			}

			#feedback .input-question {
				margin-bottom: 50px;
			}

			#feedback .input-email, #feedback .input-name {
				margin-bottom: 15px;
			}

			#feedback .input-submit {
				background-color: ${colors.orange};
				height: 40px;
				border-radius: 5px;
				box-shadow: 0 2px 0 0 #A6581F;
				margin-top: 10px;
				text-align: center;
				padding-top: 10px;
				color: white;
			}



			@media (max-width: 767px) {
				& .c-social-media-header > h2 {
					font-size: 4.0rem;
					line-height: 44px;
					text-align: center;
				}
				& .o-social-media-container {
					padding: 0 0 23px;
					display: flex;
					flex-direction: row;
					flex-grow: 1;
					justify-content: center;
				}
				& .c-social-link {
					margin-bottom: 0;
					margin-right: 23px;
					width: 60px;
					cursor: pointer;
				}
				& .c-social-link > svg {
					height: 23px;
				}
				& .c-social-link:hover {
					opacity: 0.75;
				}
				& .c-social-link > .o-text {
					display: none;
				}
			}
			@media (min-width: 768px) {
				#App > div#feedback {
					padding: 0;
					
				}

				#feedback .o-beta-container {
					background-color: ${colors.startscreen};
					padding-bottom: 64px !important;
				}

				#feedback div.o-beta-program {
					margin: 0 20%;
					padding: 2% 5%;
					background-color: ${colors.startscreen};
				}

				#feedback .checkboxes {
					display: flex;
				}

				#feedback .checkboxes > div {
					flex: 1;
				}

				#feedback .join-the-beta {
					margin-right: 25px;
				}

				#feedback .o-beta-program > p, #feedback .o-beta-program > div {
					margin-left: 10%;
					margin-right: 10%;
				}

				#feedback .o-input-container {
					margin-top: 20px;
				}

				#feedback .timeline-tail {
					justify-content: center;
				}

				#feedback .o-social-media {
					display: flex;
					flex-wrap: wrap;
				}

				#feedback .o-social-media .c-social-media-header {
					padding-top: 64px !important;
					flex: 1;
					text-align: center;
					color: ${colors.orange};
				}

				#feedback .o-social-media .social-media-content {
					flex: 0.55;
					color: white;
				}

				#feedback .o-social-media .o-social-media-container {
					flex-basis: 100%;
					display: flex;
					justify-content: space-between;
				}

				#feedback .o-social-media .o-social-media-container .c-social-link {
					width: 23%;
				}

				#feedback .o-social-media .o-social-media-container .c-social-link .o-text {
					margin-left: 2px;
				}

				#feedback .square {
					position: absolute;
					width: 24px;
					height: 24px;
					background-color: ${colors.orange};
					left: 50%;
					margin-left: -12px;
					margin-top: -22px;
					border-radius: 1px;
					transform: rotate(45deg);
				}

				#feedback .c-contact-form {
					padding: 32px 23px;
				}

				#feedback .c-contact-form .the-form {
					display: flex;
					padding-top: 40px;
					padding-bottom: 40px;
				}

				#feedback .c-contact-form .the-form .left {
					flex: 0.4;
					margin-right: 80px;
				}

				#feedback .c-contact-form .the-form .right {
					flex: 0.6;
					display: flex;
					flex-wrap: wrap;
				}

				#feedback .c-contact-form .input-email {
					flex-shrink: 1;
					flex-basis: 45%;
					margin-right: 5%;

				}

				#feedback .c-contact-form .input-name {
					flex-shrink: 1;
					flex-basis: 45%;
				}

				#feedback .input-message {
					flex-basis: 100%;
				}

				#feedback .input-submit {
					flex-basis: 20%;
					margin-left: auto;
				}


			}

			${responsiveContactForm}

		` + (arabicToggle ? arabic : "");
	},
	introduction: function(arabicToggle){
		const arabic = ``;
		return `
			& {
				width: 100%;
				background-color: ${colors.dirtWhite};
			}

			& .c-introduction-text {
				padding: 23px;
				margin-top: -100px;
				position: relative;
				z-index: 10;
				background-color: ${colors.dirtWhite};
			}

			& .c-introduction-text p{
				padding-bottom: 6px;
			}

			& .c-introduction-description {
				color: ${colors.dirtText};
				font-size: 24px;
				padding: 40px 36px 10px 36px;
			}

			& .c-introduction-mobiles .c-center-mobile {
				margin: 0 auto;
				width: 185px;
				position: relative;
				z-index: 5;
			}

			& .c-introduction-mobiles {
				position: relative;
				overflow: hidden;
			}

			& .c-introduction-mobiles .c-left-mobile {
				position: absolute;
				width: 185px;
				left: 50%;
				margin-left: -240px;
				top: 42px;
				z-index: 0;
			}

			& .c-introduction-mobiles .c-right-mobile {
				position: absolute;
				width: 185px;
				left: 50%;
				margin-left: 55px;
				top: 42px;
				z-index: 0;
			}

			@media (min-width: 768px) {
				#App > div#introduction {
					background-color: white;
					position: relative;
					padding-top: 100px;
				}

				#introduction .c-introduction-description {
					padding: 0 50% 0 10%;
					
				}

				#introduction  .c-introduction-mobiles {
					position: absolute;
					left: 60%;
					top: 50px;
					z-index: 11;
					width: 40%;
				}
				
				#introduction .c-introduction-mobiles .c-center-mobile {
					top: 86px;
					left: 90px;
					margin-left: 0;
				}

				#introduction .c-introduction-mobiles .c-left-mobile {
					left: 0;
					top: 132px;
					margin-left: 0;
				}

				#introduction  .c-introduction-mobiles .c-right-mobile {
					left: 180px;
					top: 42px;
					margin-left: 0;
					z-index: 12;
				}

				#introduction .c-introduction-text {
					margin-top: 0;
					padding: 0 50% 0 10%;
					background-color: white;
				}
			}

		` + (arabicToggle ? arabic : "");
	},
	mosqueFinder: function(arabicToggle){
		const arabic = ``;
		return `

			& .c-mosquetitle {
				font-size: 2.8rem;
				line-height: 32px;
				text-align: left;
				margin-bottom: 32px;
				font-weight: 300;
			}

			& {
				display: flex;
				flex-direction: column;
				height: 50%;
				width: 100%;
				background: ${colors.dirtLightBackground} url('app/assets/images/content/promotional/mosquefinder/map-bg.jpg') no-repeat;
				background-size: cover;
			}

			& .o-mosquefinder-boxes {
				height: 100%;
				background-color: ${colors.white};
				padding: 23px;
			}

			& .o-mosquefinder-box .graphic-area {
				background-color: ${colors.dirtBackground};
				height: 163px;
			}

			& .o-mosquefinder-box {
				padding-bottom: 20px;
			}

			& .o-mosquefinder-box h3 {
				font-size: 2.0rem;
				line-height: 22px;
				margin-bottom: 6px;
			}

			& .o-mosquefinder-description {
				padding: 92px 23px 0;
			}

			& .c-mosque-finder-half {
				height: 220px;
				overflow: hidden;
				margin: 30px 0;
			}

			.c-mosque-phone {
					position: relative;
					bottom: 0;
					left: 0;
					display: block;
					height: 450px;
					background: transparent url('app/assets/images/content/promotional/mosquefinder/mosque-phone.png') no-repeat;
					background-position: top center;
			}

			@media (min-width: 768px) {

				#mosquefinder .c-mosquetitle {
					margin-bottom: 64px;
					padding-top: 0;
					font-size: 5.6rem;
					line-height: 61px;s
					font-weight: 500;
					letter-spacing: 1px;
				}

				#mosquefinder .o-mosquefinder-container {
					display: flex;
					justify-content: center;
					position: relative;
					height: 100%;
					padding: 4% 0 !important;
				}

				#mosquefinder .o-mosquefinder-description {
					padding-top: 0;
				}

				#mosquefinder .c-mosque-phone {
					display: block;
					height: 835px;
					width: 678px;
					background: transparent url('app/assets/images/content/promotional/mosquefinder/mosque-phone.png') no-repeat;
				}
				#mosquefinder .o-mosquefinder-boxes {
					position: absolute;
					top: 0;
					height: 100%;
					right: 0;
					padding: 4%;
				}

				#mosquefinder .o-mosquefinder-box {
					display: flex;
					flex-direction: row;
					margin-bottom: 32px;
				}

				#mosquefinder .o-mosquefinder-content {
					flex: 1.5;
				}

				#mosquefinder .o-mosquefinder-box h3 {
					font-size: 2.8rem;
					line-height: 32px;
					margin: 5px 0 15px 0;
				}

				#mosquefinder .c-mosque-finder-half {
					margin-top: 10px;
				}
					.c-notification-mosque-finder {
					position: relative;
					bottom: 0;
					rigth: 0;
					display: block;
					height: 385px;
					background: transparent url('app/assets/images/content/promotional/alerts/notification-phone-one.png') no-repeat;
					background-position: top left !important;
				}

			}
			@media (max-width: 991px) {
				.c-mosque-phone {
					width: 100%;
					background-size: cover;
				}
				h2.c-mosquetitle {
					display: none;
				}
			}
			@media (min-width: 768px) and (max-width: 1199px) {
				#mosquefinder .o-mosquefinder-boxes {
					width: 65%;
				}
				#mosquefinder .o-mosquefinder-box {
					width: 50%;
				}
			}
			@media (min-width: 1199px) {
				#mosquefinder .o-mosquefinder-boxes {
					padding-left: 275px;
					width: 50%;
				}
				#mosquefinder .c-mosque-phone {
					background-position: center center !important;
					z-index: 2;
				}
			}
			@media (min-width: 1506px) {
				#mosquefinder .o-mosquefinder-boxes {
					width: 50%;
				}
				#mosquefinder .o-mosquefinder-box {
					width: 50%;
				}
			}

			@media screen and (min-color-index:0) 
			and(-webkit-min-device-pixel-ratio:0) and (min-width: 992px) { @media
			{
			    & > .o-mosquefinder-container { min-height: 960px; }
			}}
			@media screen and (min-color-index:0) 
			and(-webkit-min-device-pixel-ratio:0) and (min-width: 769px) and (max-width: 991px) { @media
			{
			   	& > .o-mosquefinder-container { min-height: 650px; }
			}}


		` + (arabicToggle ? arabic : "");
	},
	noorAlerts: function(arabicToggle) {
		const arabic = ``;
		return `
			
			& .c-notifications {
				padding: 4% 23px;
				background-color: white;
				@media (max-width: 768px) {
					padding: 32px 23px;
				}
				text-align: center;
			}

			& {
				display: flex;
				flex-direction: column;
				width: 100%;
				background-color: ${colors.dirtLightBackground} no-repeat;
				text-align: center;
			}

			& h2 {
				margin-bottom: 23px;
			}

			& .mobile.c-half {
				height: 220px;
				overflow: hidden;
				margin: 30px 0;
			}

			& .c-notifications h2 {
				padding: 23px 0;
				font-size: 4.0rem;
				line-height: 4.4rem;
				font-weight: 300;
			}

			& .c-notification-mobiles {
				padding-top: 32px;
			}

			& .c-notifications {
				padding: 4% 23px;
			}

			.c-notification-phone-one {
					position: relative;
					bottom: 0;
					left: 0;
					margin: 0 auto;
					display: block;
					height: 495px;
					width: 360px;
					background: transparent url('app/assets/images/content/promotional/alerts/notification-phone-one.png') no-repeat;
					background-position: top center !important;
				}


			@media (min-width: 992px) {

				#nooralerts .c-notifications h2 {
					font-size: 2.8rem;
					line-height: 32px;
					padding-top: 0;
				}

				#nooralerts .c-notifications {
					padding: 4%;
				}

				#nooralerts .c-notification-mobiles {
					display: flex;
					justify-content: space-between;
					padding: 4% 18% 0;
					position: relative;
				}

				#nooralerts .c-notification-mobiles > div {
					display: flex;
					flex-direction: column-reverse;
				}

				#nooralerts .c-notifications {
					padding-top: 4%;
				}

				#nooralerts .mobile.c-half {
					margin-top: 10px;
				}

				#nooralerts .c-notification-mobiles > div {
					width: 100% !important;

				}
					& .c-notifications h2 {
					font-size: 5.6rem;
					line-height: 61px;
					font-weight	500;
				}
			}		
			

		` + (arabicToggle ? arabic : "");
	},
	placeHolder: function(arabicToggle) {
		const arabic = ``;
		return `


			& .o-app-notifications div > h3 {
				font-weight: 300 !important;
				color: ${colors.grayText} !important;
			}

			& .o-placeholder-notifications {
				text-align: center;
				background-color: ${colors.white};
			}

			.c-placeholder-title {
				padding: 0 0 4%;
				font-size: 4.0rem;
				line-height: 44px;
				font-weight: 300;
			}

			& .c-placeholder-icon-cts {
				background: transparent url('app/assets/images/content/promotional/features/features-cts.png') no-repeat;
			}

			& .c-placeholder-icon-qibla {
				background: transparent url('app/assets/images/content/promotional/features/features-quibla.png') no-repeat;
			}

			& .o-placeholder-mobiles > div {
				margin-bottom: 0;
			}

			& .o-placeholder-mobiles > div > h3 {
				font-size: 2.0rem;
				line-height: 22px;
				margin-bottom: 6px;
			}

			@media (max-width: 991px) {
				& .o-placeholder-content {
					padding: 4% 0;
				}
				.c-placeholder-title {
					padding-top: 32px;
				}
				& .o-placeholder-mobiles > div:first-child {
					margin-bottom: 64px;
				}
				& .o-placeholder-notifications > .o-app-notifications {
					padding: 64px 0 !important;
					border-bottom: 1px solid ${colors.startscreen};
				}
				& .o-placeholder-notifications > .o-app-notifications > div > h3, & .o-placeholder-notifications > .o-app-notifications > div > span {
					display: block;
					padding: 0 23px;
				}
				& .o-placeholder-notifications > .o-app-notifications > div > .c-placeholder-icon {
					width: 100% !important;
				}
				& .o-placeholder-notifications > .o-app-notifications > div:first-child {
					margin-bottom: 64px !important;
				}
				& .c-placeholder-icon {
					margin-bottom: 32px;
					display: block;
					height: 270px;
					background-size: contain !important;
					background-position: center center !important;
					background-color: ${colors.startscreen} !important;
					text-align: center;
				}
			}
			@media (min-width: 992px) {
				& .o-placeholder-notifications {
					padding-top: 4% !important;
					padding-bottom: 8% !important;
				}
				.c-placeholder-title {
					font-size: 5.6rem;
					line-height: 61px;
				}
				.o-app-notifications {
					display: flex;
					flex-direction: row;
					justify-content: center;
				}
				.o-app-notifications > div {
					width: 50%;
				}
				.o-app-notifications > div .c-placeholder-icon {
					display: block;
					width: 100%;
					margin-bottom: 32px;
					height: 270px;
 					background-position: center center !important;
					background-size: contain !important;
				}
			}
		` + functions.responsivePadding("#features .c-featureList > .o-placeholder-container > .o-placeholder-notifications") + (arabicToggle ? arabic : "");
	},
	startScreen: function(arabicToggle) {
		const arabic = ``;
		return `
			& {
				display: flex;
				flex-direction: column;
				height: 100%;
				width: 100%;
				background-color: transparent;
				background-image: url('app/assets/svg/brand/wave.svg');
				background-repeat: no-repeat;
				padding-top: 66px;
				
			}
			& .c-startscreen-contenttitle {
				color: ${colors.orange};
				letter-spacing: 1px;
				margin-top: 32px;
				margin-bottom: 32px;
				font-weight: 100;
			}
			& .c-startscreen-description {
				font-size: 2.0rem;
				line-height: 30px;
				color: ${colors.dirtText};
				letter-spacing: 1px;
				font-weight: 100;
			}
			@media (max-width: 1299px) {
				& {
					background-size: contain;
					background-position: center bottom;
				}
				& .c-startscreen-phone {
					display: none;
				}
				& .c-startscreen-content {
					position: absolute;
					top: 15%;
					padding: 0 23px;
				}
				& .c-startscreen-contenttitle {
					font-size: 4.0rem;
					line-height: 44px;
					text-align: center;
				}
				& .c-startscreen-description {
					text-align: center;
				}
			}
			@media (max-width: 414px) and (max-height: 736px) {
				& {
					background-position-y: bottom;
					background-position-x: 87%;
					background-size: 240%;
				}
			}
			@media (min-width: 1300px) {
				& {
					position: relative;
					background-size: 170% !important;
					background-position-x: 88%;
					background-position-y: bottom;
				}
				& .c-startscreen-phone {
					position: absolute;
					right: 0;
					bottom: 8%;
					height: 100%;
					width: 26%;
					margin-right: 18%;
					background: transparent url('app/assets/images/content/promotional/introduction/startscreen-phone.png') no-repeat;
					background-size: contain;
					background-position-y: bottom;
				}
				& .c-startscreen-content {
					position: absolute;
					top: 30%;
					z-index: 2;
					width: 31%;
				}
				.c-startscreen-contenttitle {
					margin-top: 0;
					font-size: 6.4rem;
					line-height: 68px;
					text-align: left;
				}
				.c-startscreen-description {
					text-align: left;
				}
			}			
			@media (min-width: 2130px) {
				& .c-startscreen-contenttitle {
					width: 60%;
				}
				& .c-startscreen-description {
					width: 70%;
				}
			}
		` + functions.responsivePadding("#startscreen")  + (arabicToggle ? arabic : "");
	}
};




export default cssFunction;