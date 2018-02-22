import functions from "../../scss/styleFunctions";
import colors from "../../scss/colors";

let cssFunction = {
startScreen: function(arabicToggle) {
		const arabic = ``;
		return `


			@media (max-width: 767px) {
				.app {
					margin: 0 auto;
					margin-top: 60px;
				}
			}

			header.site-header {
				position: relative;
				min-height: 100vh;
			}

			header.site-header .container {
				padding-top: 66px;
				display: flex;
				min-height: 100vh;

				background-image: url('app/assets/svg/brand/wave.svg');
				background-position: bottom right;
				background-size: contain;
				background-repeat: no-repeat;
			}

			@media (max-width: 991px) {
				.container {
					padding: 0 15px;
				}
				#quran .container, #mosque-finder .container {
					padding: 0;
				}
			}
			header.site-header .splash-image-container img {
				max-height: 570px;
			}

			@media (max-width: 767px) {
				header.site-header .container {
					padding-top: 96px;
					flex-direction: column;
					background-size: 200%;
				}
				header.site-header .splash-image-container {
					
				}
			}
			@media (min-width: 768px) {
				header.site-header {
					max-height: 100vh;
				}
				header.site-header .container {
					flex-direction: row;
					height: 100vh;
					justify-content: space-between;
				}
				header.site-header .content {
					flex: 1;
					align-self: center;
					-webkit-box-ordinal-group: 2;
				    -moz-box-ordinal-group: 2;
				    -ms-flex-order: 2;
				    -webkit-order: 2;
				    order: 2;
				}
				header.site-header .splash-image-container {
					flex: 1;
					align-self: flex-end;
					-webkit-box-ordinal-group: 1;
				    -moz-box-ordinal-group: 1;
				    -ms-flex-order: 1;
				    -webkit-order: 1;
				    order: 1;
				}
			}

			.app {
				position: relative;
				color: white;
				z-index: 1;
				font-family: 'HelveticaNeue-UltraLight', 'Helvetica Neue UltraLight', 'Helvetica Neue', Arial;
				background: transparent url('app/assets/images/content/promotional/header/phone-mockup.png') no-repeat;
				background-size: 100% 100%;
			}

			.screen {
				position: relative;
				background: #632B3F;
				background: transparent url('app/assets/images/content/promotional/header/phone-mockup-bg.jpg') no-repeat;
				background-size: 100% 100%;
				transition: all .5s;
				overflow: hidden;
				-webkit-user-select: none;
			  	-moz-user-select: none;
			 	-ms-user-select: none;
				user-select: none;   
			}

			@media (max-width: 767px) {
				.app {
					width: 320px;
					height: 485px;
				}
				.screen {
					top: 57px;
					left: 62px;
					width: 196px;
					height: 348px;
				}
			}
			@media (min-width: 768px) {
				.app {
					width: 425px;
					height: 645px;
				}
				.screen {
					top: 76px;
					left: 83px;
					width: 259px;
					height: 463px;
				}
			}

			.toolbar {
				 position: absolute;
				 z-index: 9;
				 width: 100%;
				 color: #FFF;
				 padding: 2px 5px;
				 box-sizing: border-box;
				 opacity: .9;
				 font-size: 13px;
				 font-weight: 600;;
			}
			.toolbar ul {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}
			.toolbar i { font-size: 9px; }
			.toolbar i.icon-rss {
			  font-size: 15px;
			}
			.toolbar span.right {
			  float: right;
			  font-size: 13px;
			}
			.toolbar div.battery {
			  height: 8px;
			  width: 20px;
			  display: inline-block;
			  border: 1px solid #FFF;
			  position: relative;
			  padding: 1px;
			}

			.toolbar span.percentage {
				margin-right: 5px;
			}

			.toolbar div.battery .battery-load {
			  background: #4AD462;
			  height: 4px;
			  width: 80%;
			}
			.toolbar div.battery:after {
			  content: "";
			  height: 4px;
			  width: 2px;
			  display: block;
			  background: #FFF;
			  position: absolute;
			  right: -3px;
			  top: 2px;
			}


			.upcoming-prayer {
				position: relative;
				top: 87px;
				width: 97%;
				margin: 0 auto;
				padding: 5px;
				background-color: rgba(0, 0, 0, 0.15);
			}
			.upcoming-prayer span.prayer-caption {
				display: block;
				font-size: 0.8rem;
				color: rgba(255, 255, 255, 0.5);
				letter-spacing: 0.7px;
				line-height: 10px;
			}
			.upcoming-prayer .prayer-content {
				margin-top: -3px;
				display: block;
			}
			.upcoming-prayer span.prayer-name {
				font-size: 1.6rem;
				font-weight: 600;
			}
			.upcoming-prayer ul li:first-child span.prayer-name {
				word-spacing: 15px;
			}
			.upcoming-prayer ul li:nth-child(2) span.prayer-name {
				word-spacing: 15px;
			}
			.upcoming-prayer time {
				display: block;
				font-size: 1.0rem;
				line-height: 10px;
			}

			.upcoming-prayer ul {
				display: flex;
				flex-direction: row;
			}
			.upcoming-prayer ul li {
				padding: 3px;
				flex: 1;
				text-align: center;
			}
			.upcoming-prayer ul li .prayer-name {
				font-weight: 600;
				flex: 1;
			}
			.screen i[class*="icon-chevron"] {
			  position: absolute;
			  width: 256px;
			  text-align: center;
			  opacity: .2;
			  font-size: 30px;
			}
			.screen i.icon-chevron-up {
			  bottom: 5px;
			}
			.phone-content {
				position: relative;
				top: 70px;
			}
			.phone-content time {
				display: block;
				margin-bottom: 25px;
			  font-size: 7.2rem;
			  text-align: center;
			}
			@media (max-width: 767px) {
				.phone-content time {
					font-size: 5.6rem;
				}
			}
			.phone-content date {
				margin-bottom: -5px;
				display: block;
			  font-size: 12px;
			  text-align: center;
			  color: rgba(255, 255, 255, 0.5);
			  letter-spacing: 0.7px;
	
			}
			.screen .unlock {
			  position: absolute;
			  bottom: 40px;
			  text-align: center;
			  width: 100%;
			  font-size: 23px;
			  opacity: .5;
			  transition: opacity .5s;
			  cursor: pointer;
			}
			.screen .unlock:hover {
			  opacity: .8;
			}
			.screen .photo {
			  position: absolute;
			  bottom: 0px;
			  right: 5px;
			  font-size: 25px;
			  opacity: .5;
			  transition: opacity .5s;
			  cursor: pointer;
			  z-index: 2;
			}
			.screen .photo:hover {
			  opacity: .8;
			}
			.ramadan-daily-verse {
				position: relative;
				top: 95px;
				padding: 0 10%;
				font-size: 1.2rem;
				letter-spacing: 0.9px;
			}
			.ramadan-daily-verse span {
				font-weight: 600;
			}
			.ramadan-daily-verse p {
				line-height: 19px;
			}
			header.site-header .container .content h1 {
				margin-bottom: 15px;
				font-size: 4.8rem;
				line-height: 54px;
				font-weight: 100;
			}
			@media (min-width: 768px) {
				header.site-header .container .content h1 {
					max-width: 80%;
				}
			}

			header.site-header .daily-verse span {
				font-weight: 600;
			}
			header.site-header .daily-verse p {
				line-height: 28px;
			}
			header.site-header ul.ramadan-list {
				display: flex;
				margin-bottom: 30px;
			}

			@media (max-width: 767px) {
				header.site-header ul.ramadan-list {
					flex-direction: column;
				}
			}

			@media (min-width: 768px) {
				header.site-header ul.ramadan-list {
					flex-direction: row;
				}
				header.site-header .container .content ul li {
					flex: 1;
				}
			}

			header.site-header .powered-by {
				margin-top: 15px;
			}

			header.site-header .powered-by ul li a {
				display: block;
				height: 36px;
				width: 108px;
				text-indent: -9999px;
			} 

			header.site-header .powered-by ul li.AppStore a {
				margin-top: 5px;
				margin-bottom: 5px;
				background: transparent url('app/assets/images/content/promotional/header/button-apple.png') no-repeat;
			}

			header.site-header .powered-by ul li.GooglePlay a {
				background: transparent url('app/assets/images/content/promotional/header/button-google.png') no-repeat;
				margin-left: 120px;
				margin-top: -41px;
			}

			section#introduction .content > p {
				text-align: center;
				font-size: 2.0rem;
			}
			section#introduction .content ul {
				margin-top: 60px;
				margin-bottom: 60px;
			}
			section#introduction .content ul li {
				text-align: center;
				font-size: 2.0rem;
			}

			@media (max-width: 767px) {
				.image-container img {
					width: 100%;
					max-width: 100%;
				}
			}

			@media (min-width: 768px) {
				.image-container img {
					width: 100%;
					max-width: 73%;
				}
			}
			

			@media (min-width: 992px) {
				section#introduction .content > p {
					margin: 0 auto;
					font-size: 2.0rem;
					line-height: 28px;
					max-width: 854px;
				}
				section#introduction .content ul {
					margin-bottom: 120px;
				}
			}		


			

		` + (arabicToggle ? arabic : "");
	},
	discover: function(arabicToggle){
		const arabic = ``;
		return `
		#OnePager > div > section#introduction {
			padding-top: 12%
		}

			
			@media (min-width: 768px) {
				section#introduction .container {
					display: flex;
				}
			}

			
			section#introduction .content > p {
				text-align: center;
				font-size: 2.0rem;
			}
			section#introduction .content ul {
				margin-top: 60px;
				margin-bottom: 60px;
			}
			section#introduction .content ul li {
				text-align: center;
				font-size: 2.0rem;
			}
			@media (max-width: 991px) {
				section#introduction .container {
					flex-direction: column;
				}
			}
			@media (min-width: 992px) {
				section#introduction .container {
					flex-direction: row;
				}
				section#introduction h2 {
					text-align: left;
				}
				section#introduction .content > p {
					margin: 0 auto;
					font-size: 2.0rem;
					line-height: 28px;
					max-width: 854px;
					text-align: left;
				}
				section#introduction header {
					flex-basis: 43%;
				}

				section#introduction .content ul li {
					text-align: left;
					font-size: 2.0rem;
					line-height: 36px;
					list-style: disc;
					margin-left: 25px;
				}
			}
			section#introduction .image-container img {
				max-width: 100%;
			}

		` + (arabicToggle ? arabic : "");

	},
	features: function(arabicToggle){
		const arabic = ``;
		return `
		section#quran .section-symbol { background-image: url('app/assets/images/brand/icon-quran.png'); }
		@media (max-width: 767px) {
				.image-container img {
					width: 100%;
					max-width: 100%;
				}
			}

			@media (min-width: 768px) {
				.image-container img {
					width: 100%;
					max-width: 73%;
				}
			}
			section#quran h2 {
				margin-bottom: 30px;
			}

			section#quran ul {
				margin-bottom: 4%;
			}

			section#quran ul li h3 {
				margin-bottom: 15px;
				font-weight: 500;
			}

			section#quran ul li p {
				font-size: 1.4rem;
			}

			section#quran .wheel {
				position: relative;
				width: 100%;
			}

			section#quran .wheel img {
				position: absolute;
				left: 38%;
				margin-top: -8%;
				z-index: 1;
			}

			@media (max-width: 320px) {
				section#quran .wheel img {
					max-width: 75%;
				}
			}

			@media (max-width: 991px) {
				section#quran .wheel img {
					max-width: 43%;
				}
				section#quran ul li {
					margin-bottom: 30px;
				}
			}


			@media (min-width: 768px) and (max-width: 991px) {
				section#quran .image-container img {
					display: block;
					margin: 0 auto;
				}
			}
			@media (min-width: 992px) {
				section#quran .has-bg {
					height: 100vh;
				}

				section#quran ul {
					margin-bottom: 90px;
				}

				section#quran ul li {
					padding: 0 2%;
					text-align: center;
				}

				section#quran .wheel img  {
					max-width: 75%;
				}

				section#quran .image-container {
					position: absolute;
					left: 0;
					height: 100vh;
					width: 100%;
					max-height: 100vh;
				}

				section#quran .image-container img {
					display: block;
					margin: 0 auto;
				} 
			}
		` + (arabicToggle ? arabic : "");
	},
	placeHolder: function(arabicToggle) {
		const arabic = ``;
		return `

	@media (max-width: 767px) {
				.image-container img {
					width: 100%;
					max-width: 100%;
				}
			}

			@media (min-width: 768px) {
				.image-container img {
					width: 100%;
					max-width: 73%;
				}
			}
		section#notifications .section-symbol { background-image: url('app/assets/images/brand/icon-notification.png'); }
		section#notifications h2 {
				margin-bottom: 8%;
			}

			section#notifications h3 {
				font-size: 2.8rem;
				margin-bottom: 15px;
			}

			section#notifications .subsection {
				display: flex;
				align-items: start;
			}


		@media (max-width: 767px) {
				section#notifications .subsection {
					display: flex;
					align-items: start;
					padding-left: 0%;
					padding-bottom: 0px;
				}

				#quibla > .image-content {
					margin-bottom: 60px;
					-webkit-box-ordinal-group: 1;
				    -moz-box-ordinal-group: 1;
				    -ms-flex-order: 1;
				    -webkit-order: 1;
				    order: 1;
				    text-align: center;
				}

				#quibla > .image-container {
					width: auto;
				    -webkit-box-ordinal-group: 2;
				    -moz-box-ordinal-group: 2;
				    -ms-flex-order: 2;
				    -webkit-order: 2;
				    order: 2;
				}

				#call-to-prayer > .image-content {
					width: 48,72%;
					-webkit-box-ordinal-group: 1;
				    -moz-box-ordinal-group: 1;
				    -ms-flex-order: 1;
				    -webkit-order: 1;
				    order: 1;
				    text-align: center;
				}

				#call-to-prayer > .image-container {
					width: auto;
				    -webkit-box-ordinal-group: 2;
				    -moz-box-ordinal-group: 2;
				    -ms-flex-order: 2;
				    -webkit-order: 2;
				    order: 2;
				}
			}


			#call-to-prayer > .image-content {
				width: 48,72%;
				-webkit-box-ordinal-group: 1;
			    -moz-box-ordinal-group: 1;
			    -ms-flex-order: 1;
			    -webkit-order: 1;
			    order: 1;
			}

			#call-to-prayer > .image-container {
				width: auto;
			    -webkit-box-ordinal-group: 2;
			    -moz-box-ordinal-group: 2;
			    -ms-flex-order: 2;
			    -webkit-order: 2;
			    order: 2;
			}
			
			@media (max-width: 991px) {
				section#notifications img {
					display: block;
					margin: 0 auto;
					max-width: 40%;
				}
				#call-to-prayer > .image-container {
					width: auto;
				    -webkit-box-ordinal-group: 2;
				    -moz-box-ordinal-group: 2;
				    -ms-flex-order: 2;
				    -webkit-order: 2;
				    order: 2;
				}
				section#notifications .subsection {
					flex-direction: column;
					text-align: center;
				}
				#quibla > .image-content {
					margin-bottom: 60px;
					-webkit-box-ordinal-group: 1;
				    -moz-box-ordinal-group: 1;
				    -ms-flex-order: 1;
				    -webkit-order: 1;
				    order: 1;
				}

				#quibla > .image-container {
					width: auto;
				    -webkit-box-ordinal-group: 2;
				    -moz-box-ordinal-group: 2;
				    -ms-flex-order: 2;
				    -webkit-order: 2;
				    order: 2;
				}

				#quibla, #call-to-prayer, #call-to-prayer > .image-content {
					margin-bottom: 60px;
				}

				section#notifications .subsection {
					display: flex;
					flex-direction: column;
					align-items: stretch;
					align-content: space-between;
				}
				section#notifications .content {
					display: flex;
					flex-direction: column;
					align-items: stretch;
					align-content: space-between;
				}
			}
			@media (min-width: 992px) {
				section#notifications .subsection {
					flex-direction: row;
					padding-left: 20%;
				}

				#quibla > .image-content {
					max-width: 270px;
				}
				#quibla > .image-content, #call-to-prayer > .image-content {
					align-self: center;
				}
			}

		@media (min-width: 992px) {

				section#notifications .content {
					margin-bottom: 100px;
					max-height: 1000px;
				}
			
				section#notifications .pattern01 {
					position: relative;
					z-index: -9999999;
					width: 270px;
					height: 270px;
					bottom: 900px;
					left: 3%;
					background-image: url('app/assets/images/content/promotional/features/pattern-270.png');
				}

				section#notifications .pattern02 {
					position: relative;
					z-index: -9999999;
					width: 200px;
					height: 200px;
					bottom: 900px;
					left: 40%;
					background-image: url('app/assets/images/content/promotional/features/pattern-200.png');
				}

				section#notifications .pattern03 {
					position: relative;
					z-index: -9999999;
					width: 350px;
					height: 350px;
					bottom: 800px;
					left: 65%;
					background-image: url('app/assets/images/content/promotional/features/pattern-350.png');
				}

				section#notifications .pattern04 {
					position: relative;
					z-index: -9999999;
					width: 100px;
					height: 100px;
					bottom: 1500px;
					left: 75%;
					background-image: url('app/assets/images/content/promotional/features/pattern-100.png');
				}

				section#notifications .pattern05 {
					position: relative;
					z-index: -9999999;
					width: 100px;
					height: 100px;
					bottom: 1130px;
					left: 15%;
					background-image: url('app/assets/images/content/promotional/features/pattern-100.png');
				}
			}
			@media (max-width: 991px) {
				
				section#notifications .pattern01 img {
					display: none;
				}

				section#notifications .pattern02 img {
					display: none;
				}

				section#notifications .pattern03 img {
					display: none;
				}

				section#notifications .pattern04 img {
					display: none;
				}

				section#notifications .pattern05 img {
					display: none;
				}
}

		` + (arabicToggle ? arabic : "");
	},
	mosquefinder: function(arabicToggle){
		const arabic = ``;
		return `
		section#mosque-finder .section-symbol { background-image: url('app/assets/images/brand/icon-mosque.png'); }

			.has-mosque-bg {
				background-image: url(app/assets/images/content/promotional/mosquefinder/map-bg.jpg);
				background-repeat: no-repeat;
				background-size: cover;
				background-position: center bottom;

			}

			section#mosque-finder h2 {
				margin-bottom: 8%;
			}

			section#mosque-finder .subsection {
				display: flex;
			}

			section#mosque-finder .subsection .image-container {
				-webkit-box-ordinal-group: 1;
			    -moz-box-ordinal-group: 1;
			    -ms-flex-order: 1;
			    -webkit-order: 1;
			    order: 1;
			}

			section#mosque-finder .subsection ul {
				-webkit-box-ordinal-group: 2;
			    -moz-box-ordinal-group: 2;
			    -ms-flex-order: 2;
			    -webkit-order: 2;
			    order: 2;
			}

			section#mosque-finder .subsection ul li {
				margin-bottom: 30px;
			}

			section#mosque-finder .subsection ul li h3 {
				font-size: 2.8rem;
				margin-bottom: 15px;
			}

			@media (max-width: 767px) {
				section#mosque-finder .subsection{
					flex-direction: column;
				}
				section#mosque-finder .subsection img {
					display: block;
					position: top;
					bottom: -20%;
					margin: 0 auto;
					max-width: 75%;
				}
			}

			@media (min-width: 768px) {
				section#mosque-finder h2 {
					margin-bottom: 120px;
				}
				section#mosque-finder .subsection{
					flex-direction: row;
					justify-content: space-around;
				}
				section#mosque-finder .subsection > ul {
					flex: 1;
				}
				section#mosque-finder .subsection > ul li {
					width: 80%;
				}
				section#mosque-finder .subsection > .image-container {
					flex: 1;
				}
				section#mosque-finder .subsection > .image-container img {
					position: absolute;
					max-width: 330px;
					margin-top: -1%;
					margin-left: 4%
				}
			}

			section#mosque-finder .subsection > ul {
				padding: 30px;
				background-color: white;
			}

			@media (max-width: 767px) {
				section#mosque-finder {
					padding-bottom: 0px !important;
				}
			}
			@media (min-width: 768px) {
				section#mosque-finder {
					margin-bottom: 260px;
				}
			}
			
		` + (arabicToggle ? arabic : "");
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
				padding: 0 12px;
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
		

		` + (arabicToggle ? arabic : "");
	},
	noorAlerts: function(arabicToggle) {
		const arabic = ``;
		return `
			
		` + (arabicToggle ? arabic : "");
	},
	livefeed: function(arabicToggle) {
		const arabic = ``;
		return `

		#livefeed {
			padding-top: 126px !important;
			background-color: ${colors.dirtWhite};
		}

		#livefeed iframe {
			border: 0;
			height: 100vh;
		}
		#livefeed #appView .softLightShadow {
			box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.12);
			border-radius: 0 !important;
		}

		#livefeed .socialFeed .postItem {
			margin-bottom: 15px;
			border: 0px;
		}

		#livefeed .socialFeed .hoverEffect {
			transition: 0.25s ease-in-out;
			-webkit-transition: 0.25s ease-in-out;
			-moz-transition: 0.25s ease-in-out;
			-ms-transition: 0.25s ease-in-out;
			-o-transition: 0.25s ease-in-out;
		}
		#livefeed .socialFeed .postItem {
			color: black;
			text-align: left !important;
		}

		#livefeed .socialFeed .postFooter {
			color: #746a5a;
		}

		#livefeed .postUsername {
			opacity: 0.75;
		}

		` + (arabicToggle ? arabic : "");
	}
};




export default cssFunction;