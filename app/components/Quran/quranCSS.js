import functions from "../../scss/styleFunctions";
import colors from "../../scss/colors";

let cssFunction = {
	quranMain: function(arabicToggle) {
		const arabic = ``;
		return `
				& {
					padding-top: 0;
					width:100%;
					height:100%;
				}

				* {
					-moz-transition:all 100ms ease;
					-o-transition:all 100ms ease;
					-webkit-transition:all 100ms ease;
					transition:all 100ms ease;

				}

				/* question form modal */
				.c-errorClass {
					border: 1px solid #f90c0c;
					padding: 5px 0px 5px;
					margin: 0px 8px 10px 19px;
					font-size: 1.4rem;
					text-align: center;
					background: rgba(236, 21, 21, 0.15);
					color: #000;
					display: none;
				}
				.o-question-wrapper {
					width:100%;
					height: auto;
					font-size:1.0em;
					font-weight: 500;
					padding: 50px;
				}
				li.c-questionlistener > .u-select__wrapper {
					margin: 0 8px;
				}
				.c-questionlist-container > h1 {
					font-weight: 500;
					padding: 20px 0 30px;
					text-align: center;
				}

				li.c-questionlistener > input, li.c-questionlistener > .u-select__wrapper > select{
					border: 1px solid rgba(0,0,0,0.075);
					box-shadow: 0 1px 3px rgba(0,0,0,0.075);
				}

				.o-form__input {
					display: block;
					width: 100%;
					padding: 6px 12px;
					background-color: white;
					border: 1px solid rgba(0,0,0,0.075);
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 1.2rem;
					font-weight: 500;
					text-indent: 0;
					line-height: 1.42857143;
					color: #746A5A;
					box-shadow: inset 0 2px 1px 0 rgba(0,0,0,0.075);
					transition: border-color .25s ease-in-out;
					-webkit-appearance: none;
					  -moz-appearance: none;
					  appearance: none;
				}
				.o-form__input:focus, select:focus {
				box-shadow: 0px;
				  outline: 0 none;
				}

				.o-form__input::-webkit-input-placeholder { 
					color: #a79a87;
				}

				.o-newquestion-list {
					text-align: center;
					padding-bottom: 10px;
				}

				.add-new {
					background: none;
					border: none;
					margin: 0 auto;
					color: #c79269;
					font-size: 0.8em;
				}

				.add-new:focus {
					outline: none;
				}

				select {
					padding: 6px 21px 6px 11px;
					display: block;
					background-color: transparent;
					color: #4D4D4D!important;
					border: 1px solid rgba(0,0,0,0.075);
					border-radius: 2px;
					font-size: 1.2rem;
					line-height: 1.42857143;
					transition: border-color ease-in-out .15s;
					-webkit-appearance: none;
					-moz-appearance: none;
					appearance: none;
					z-index: 1;
					outline: none;
				}
				select:hover, select:focus {
					border-color: #E0DDD6;
				}

				.u-select__wrapper {
					position: relative;
					background-color: white;
					height: 1em;
					margin-bottom: 1em;
				}
				.u-select__wrapper > i {
					position: absolute;
					top: -7px;
					right: 10px;
					height: 46px;
					line-height: 46px;
					font-size: inherit;
					color: #4D4D4D;
					z-index: 1;
				}

				.u-select__wrapper:before {
					display: block;
					position: absolute;
					top: 0;
					right: 0;
					height: 34px;
					width: 34px;
					line-height: 34px;
					font-family: FontAwesome;
					font-size: inherit;
					color: inherit;
					content: "\f107";
				}

				ol.o-question-inner li {
					font-size: 0.8em;
					padding-bottom: 11px;
					display: flex;
				}
				.o-summarycomments__form {
					display: flex;
					flex-direction: column;
					padding: 40px 0 11px;
				}

				.o-summarycomments__form > textarea {
					font-size: 1.2rem;
                	resize: none;
					margin: 0px;
					width: 100%;
					border: 1px solid rgba(0,0,0,0.075);
					background-color: rgba(255,255,255,0.66);
					min-height: 140px;
				}

				.o-summary__action > button {
					border: none;
					outline: none;
					width: 34%;
					font-size: 1.5rem;
					line-height: 1.427;
				}
				.o-summary__action {
					display: flex;
					flex-direction: row;
					justify-content: space-around;
					padding: 0 20%;
				}
				button.is-save {
				    background-color: #C79269 !important;
				    color: white !important;
				    padding: 0;
				    font-family: inherit;
				    font-weight: inherit;
				    text-transform: inherit;
				}

				/* The Modal (background) */
				.modal {
				  display: none; /* Hidden by default */
				  position: fixed; /* Stay in place */
				  z-index: 999 !important; /* Sit on top */
				  padding-top: 10em; /* Location of the box */
				  padding-left: 15%;
				  padding-right: 15%;
				  left: 0;
				  top: 0;
				  width: 100%; /* Full width */
				  height: 100%; /* Full height */
				  overflow: auto; /* Enable scroll if needed */
				  background-color: rgb(0,0,0); /* Fallback color */
				  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
				}

				/* Modal Content */
				.modal-content {
				  position: relative;
				  background-color: #fefefe;
				  margin: auto;
				  padding: 0;
				  border: 1px solid #888;
				  width: 80%;
				  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
				  -webkit-animation-name: animatetop;
				  -webkit-animation-duration: 0.4s;
				  animation-name: animatetop;
				  animation-duration: 0.4s
				  color: #444444;
				}

				/* Add Animation */
				@-webkit-keyframes animatetop {
				  from {top:-300px; opacity:0}
				  to {top:0; opacity:1}
				}

				@keyframes animatetop {
				  from {top:-300px; opacity:0}
				  to {top:0; opacity:1}
				}

				/* The Close Button */

				.closeModalBtn {
				  float: right;
				  font-size: 1.5em;
				  padding: 0.5em;
				  font-weight: 600;
				  color: #746a5a;
				  background: transparent;
				  border: none;
				  margin: 10px;
				}

				.closeModalBtn:hover,
				.closeModalBtn:focus {
				  text-decoration: none;
				  cursor: pointer;
				  outline: none;
				}

				.modal-header {
				  padding: 1em;
				}l

				.modal-header h2 {
					font-size: 2em;
				}

				.modal-body {
					padding: 1em;
					font-size: 1em;
					font-weight: 300;
				}

				.modal-footer {
				  padding: 1em;
				}

				.c-feedback-button {
					border-radius: 50%;
	                font-size: 2.5rem;
	                font-weight: 600;
	              	height: 40px;
	                width: 40px;
	                border: none;
	                color: white;
	                background-color: #de3131;
	                outline:none;
	                position:absolute;
	                z-index:20;
	                padding-top: 0.25em;
				}

				.o-app-title {
					visibility:visible;
				}

				.float-right {
					float:right;
				}

				.c-error-message {
					background-color: #fff0f0;
					color: #ff0d0d;
					font-size: 2.0em;
					width: 100%;
					height: 70px;
				}

				{/*Audio Player
				=============================================*/}

				.o-audioplayer-container {
					height: 4.5em;
					width: 80%;
					margin-left: 10%;
					padding-left: 1.4em;
					color: ${colors.quranAppSidebarIconActive};
					position: relative;
					z-index: 0;
					background: ${colors.quranAppSidebarBg};
				}
				.o-audioplayer-container.isNightMode {
					color: black;
					background: #eee;
				}
				.o-audioplayer-container > div {
					position: absolute;
				}
				.o-audioplayer-container .o-audioplayer-playpause {
					border-right: 1px solid #555;
					border-right-color: rgba( 0, 0, 0, .25 );
				}
				.o-audioplayer-container .o-audioplayer-download {
					border-left: 1px solid #111;
					border-left-color: rgba( 0, 0, 0, .25 );
				}
				.o-audioplayer-container *,
				.o-audioplayer-container *:before,
				.o-audioplayer-container *:after {
					-webkit-transition: color .25s ease, background-color .25s ease, opacity .5s ease;
					-moz-transition: color .25s ease, background-color .25s ease, opacity .5s ease;
					-ms-transition: color .25s ease, background-color .25s ease, opacity .5s ease;
					-o-transition: color .25s ease, background-color .25s ease, opacity .5s ease;
					transition: color .25s ease, background-color .25s ease, opacity .5s ease;
				}

				.c-audioplayer {
					width: 0px; 
					height: 0px; 
					visibility: hidden;
				}

				.o-audioplayer-playpause {
					width: 3.5em; 
					height: 100%;
					text-align: center;
					cursor: pointer;
					text-decoration: none;
					z-index: 2;
					top: 0;	
					left: 0;
					padding: 22px 8px 8px 8px;
				}

				.o-audioplayer-playpause:hover,
				.o-audioplayer-playpause:focus {
					background-color: rgba(0,0,0,0.3);
				}

				#c-playbutton-icon {
					color: ${colors.quranAppSidebarIconActive};
				}
				#c-playbutton-icon.isNightMode {
					color: black;
				}
				#c-download-icon {
					color: ${colors.quranAppSidebarIconActive};
				}
				#c-download-icon.isNightMode {
					color: black;
				}

				.o-audioplayer-track-title {
					width: 7.0em; 
					height: 50%;
					top: 0.5em;
					left: 4.5em;
					font-size:1em;
				}

				.audioplayer-time {
					height: 50%;
					line-height: 2.375em; 
					text-align: center;
					z-index: 2;
					top: 0;
					text-decoration: none;
					right:6em;
					font-size:1em;
				}

				.o-audioplayer-currenttime {
					float:left;
				}

				.o-audioplayer-bar {
					height: 0.875em; 
					background-color: #222;
					cursor: pointer;
					z-index: 1;
					top: 65%;
					right: 6em; 
					left: 4.500em; 
					margin-top: -0.438em; 
				}

				.audioplayer-novolume .o-audioplayer-bar {
					right: 4.375em; 
				}

				.o-audioplayer-bar div {
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
				}

				.o-audioplayer-bar,
				.o-audioplayer-bar div,
				.o-audioplayer-volume-adjust div {
					-webkit-border-radius: 4px;
					-moz-border-radius: 4px;
					border-radius: 4px;
				}

				.o-audioplayer-bar,
				.o-audioplayer-volume-adjust > div {
					-webkit-box-shadow: -1px -1px 0 rgba( 0, 0, 0, .5 ), 1px 1px 0 rgba( 255, 255, 255, .1 );
					-moz-box-shadow: -1px -1px 0 rgba( 0, 0, 0, .5 ), 1px 1px 0 rgba( 255, 255, 255, .1 );
					box-shadow: -1px -1px 0 rgba( 0, 0, 0, .5 ), 1px 1px 0 rgba( 255, 255, 255, .1 );
				}

				.o-audioplayer-bar-loaded {
					background-color: rgba(255,255,255,0.3);
					z-index: 1;
				}

				.o-audioplayer-bar-played {
					background: #eee;
					z-index: 2;
				}

				.o-audioplayer-volume-adjust div div,
				.o-audioplayer-bar-played {
					-webkit-box-shadow: inset 0 0 5px rgba( 255, 255, 255, .5 );
					-moz-box-shadow: inset 0 0 5px rgba( 255, 255, 255, .5 );
					box-shadow: inset 0 0 5px rgba( 255, 255, 255, .5 );
				}

				.o-audioplayer-duration {
					float:right;
				}

				.o-audioplayer-volume {
					width: 2.5em; 
					height: 100%;
					border-left: 1px solid #111;
					border-left-color: rgba( 0, 0, 0, .25 );
					text-align: center;
					cursor: pointer;
					z-index: 2;
					top: 0;
					right: 41px;
					padding: 25px 8px 8px 8px;

				}

				.o-audioplayer-volume:hover,
				.o-audioplayer-volume:focus {
					background-color: rgba(0,0,0,0.3);
				}

				.o-audioplayer-volume-button a{
					width: 100%;
					height: 100%;
				}

				.o-audioplayer-volume:not(:hover) .o-audioplayer-volume-adjust {
					opacity: 0;
				}

				.o-audioplayer-volume:hover .o-audioplayer-volume-adjust {
					top: auto;
					bottom: 100%;
				}

				.audioplayer-novolume .o-audioplayer-volume {
					display: none;
				}

				.audioplayer-play,
				.audioplayer-pause,
				.o-audioplayer-volume a {
					-webkit-filter: drop-shadow( 1px 1px 0 #000 );
					-moz-filter: drop-shadow( 1px 1px 0 #000 );
					-ms-filter: drop-shadow( 1px 1px 0 #000 );
					-o-filter: drop-shadow( 1px 1px 0 #000 );
					filter: drop-shadow( 1px 1px 0 #000 );
				}

				#c-volumebutton-icon {
					color: ${colors.quranAppSidebarIconActive};
					font-size: 1.3em;
				}
				#c-volumebutton-icon.isNightMode {
					color: black;
				}

				.o-audioplayer-volume-adjust {
					height: 6.25em; 
					cursor: default;
					position: absolute;
					left: 0;
					right: -1px;
					top: -9999px;
					background: ${colors.quranAppSidebarBg};
					{/*background: -webkit-gradient( linear, left top, left bottom, from( #444 ), to( #222 ) );
					background: -webkit-linear-gradient( top, #444, #222 );*/}
					background: -moz-linear-gradient( top, #444, #222 );
					background: -ms-radial-gradient( top, #444, #222 );
					background: -o-linear-gradient( top, #444, #222 );
					background: linear-gradient( top, #444, #222 );
				}

				.o-audioplayer-download {
					position: absolute;
					right: 0;
					width: 2.5em; 
					height: 100%;
					text-align: center;
					cursor: pointer;
					text-decoration: none;
					z-index: 2;
					top: 0;	
					padding: 22px 8px 8px 8px;
				}
				.o-audioplayer-download:hover,
				.o-audioplayer-download:focus {
					background-color: rgba(0,0,0,0.3);
				}

				.o-audioplayer-volume-adjust > .o-audioplayer-volume-bar {
					width: 40%;
					height: 79%;
					background-color: #222;
					cursor: pointer;
					position: relative;
					z-index: 1;
					margin: 30% auto 0;
				}

				.o-audioplayer-volume-adjust .o-audioplayer-volume-bar .o-audioplayer-volume-bar-played {
					width: 100%;
					height: 100%;
					position: absolute;
					bottom: 0;
					left: -0.2px;
					background: #eee;
				}

				.o-audioplayer-volume-adjust {
					-webkit-box-shadow: -2px -2px 2px rgba( 0, 0, 0, .15 ), 2px -2px 2px rgba( 0, 0, 0, .15 );
					-moz-box-shadow: -2px -2px 2px rgba( 0, 0, 0, .15 ), 2px -2px 2px rgba( 0, 0, 0, .15 );
					box-shadow: -2px -2px 2px rgba( 0, 0, 0, .15 ), 2px -2px 2px rgba( 0, 0, 0, .15 );
				}




				{/*==========================================*/}


				button.settings-button {
					display: none;
				}

				.c-title-label {
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 3.4rem;
					font-weight: 300;
					text-indent: 0;
					line-height: 1.42857143;
					color: ${colors.quranContentSurahColor};
				}
				.c-starter-label {
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 2.4rem;
					font-weight: 300;
					text-indent: 0;
					line-height: 1.42857143;
					color: ${colors.quranContentSurahColor};
				}
				.c-juz-title-label {
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 2.6rem;
					font-weight: 600;
					text-indent: 0;
					line-height: 57px;
					color: ${colors.quranContentJuzColor};
				}
				.c-title-label.isNightMode {
					color: white;
				}
				.c-starter-label.isNightMode {
					color: white;
				}
				.c-juz-title-label.isNightMode {
					color: white;
				}

				.c-quran-title {
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 2em;
					font-weight: 200;
					text-indent: 0;
					line-height: 1;
					color: ${colors.quranFourth};
				}
				.c-quran-title.isNightMode{
					color: white;
				}

				.o-quran-title-wrapper {
					margin-top:0.8em;
	                margin-left:4.3em;
	                float: left;
				}
				.o-readbutton-wrapper {
					display:flex;
					flex-direction: row;
				    align-items: center;
				    justify-content: center;
				    margin-bottom: 30px;
				}
				.o-spinner-wrapper {
				    font-size:1.0em;
				}

				#c-spinner-icon {
					color:black;
				}

				#c-spinner-icon.isNightMode {
					color:white;
				}

				.o-nextprevious-wrapper {
				}
				.c-readmore-previous-button {
					height:50px; 
				    width:50px;
				    font-size:2.0em;
				    float:left;
				    border-radius: 50%;			
	                font-weight: 300;
	                border: none;
	                color: ${colors.quranAppSidebarIconActive};
	                background-color: transparent;
	                outline:none;
				}
				.c-readmore-previous-button.isNightMode {
					color: black;
	                background-color: white;	
				}
				.c-readmore-next-button {
					height:50px; 
				    width:50px;
				    font-size:2.0em;
				    float:left;
				    border-radius: 50%;			
	                font-weight: 300;
	                border: none;
	                color: ${colors.quranAppSidebarIconActive};
	                background-color: transparent;
	                outline:none;
				}
				.c-readmore-next-button.isNightMode {
					color: black;
	                background-color: white;
				}
				.c-readmore-button {
					padding: 10px 25px;
				    color: white;
				    background-color: white;
				    border: 1px solid ${colors.quranAppSidebarIconActive};
				    color: ${colors.quranAppSidebarIconActive};
				    border: none;
				    font-size: 1em;
				    font-weight: 400;
				    outline:none;
				}
				.c-readmore-button:hover {
					color: ${colors.quranAppSidebarIconHover};
				}
				.c-readmore-button.isNightMode {
				    border: 0px;
				}
				.o-page-title-button {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: center;
				}
				.o-page-title-button button {
					margin: 1em 0.2em;
				}

				.c-search-result-div {
					display:flex;
					flex-direction:row;
				}
				.c-span-number {
					height: 20px;
				    display: block;
				    margin-right: 36px
				    font-weight: 600;
				}
				.c-span-first {
					flex:6;
					display: block;
					height: 20px;
					max-height: 20px;
					line-height: 27px;
					font-size: 1.6rem;
					font-weight: 500;
					color: black;
				}
				.c-span-second {
					flex:4;
					display: block;
					font-size: 2.0rem;
					text-align: right;
					color: black;
				}
				ul { list-style:none; }
				.o-search-result-wrapper {
				    height: 500px;
				    width: 100%;
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 1.4rem;
					font-weight: 400;
					text-indent: 0;
					line-height: 1.42857143;
					color: white;
					background-color: white;
					transition: border-color .25s ease-in-out;
					-webkit-appearance: none;
				    -moz-appearance: none;
				    appearance: none;
				    border-bottom: 1px solid rgba(255,255,255,0.3);
					border-top: none;
					border-left: none;
					border-right: none;
					overflow-y: auto;
				    overflow-x:hidden;
				}
				.o-search-result-wrapper::-webkit-scrollbar {
				    width: 12px;
				}
				.o-search-result-wrapper::-webkit-scrollbar-track {
				  { /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);*/}
				    background-color:rgb(71,117,128); 
				}
				.o-search-result-wrapper::-webkit-scrollbar-thumb {
				    border-radius: 10px;
				    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
				    background-color:rgb(61,107,118); 
				}

				.o-search-firstpage {
					width: 100%;
					background-color: ${colors.quranFourth};
					padding: 16px;
					word-wrap: break-word;
				}
				.c-firstpage-title {
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-weight: 100;
					text-indent: 0;
					font-size: 1.6rem;
					color: ${colors.quranThird};
				}
				.c-firstpage-title i {
					margin-right: 8px;
				}
				.o-firstpage-juz-div {
					margin: 8px 0;
				}
				.c-firstpage-juz-span {
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 1.4rem;
					font-weight: 400;
					text-indent: 0;
					color: ${colors.quranThird};
				}
				.c-firstpage-juz2-span {
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 1.4rem;
					font-weight: 400;
					text-indent: 0;
					color: ${colors.quranThird};
				}
			

				.c-search-title {
					height: 48px;
				    width: 100%;
				    background-color: ${colors.quranFourth};
				    color: white;
				    font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
				    font-size: 1.6rem;
				    font-weight: 600;
				    text-indent: 0;
				    line-height: 48px;
				    padding-top: 0;
				    padding-left: 16px;
				}
				#c-sura-ul {
					width:100%;
					height:auto;
				}
				#c-sura-ul li { 
					cursor:pointer; 
					outline:none;
					margin:0;
					height: auto;
					max-height: 72px;
					padding: 24px 16px;
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
	                font-size: 1.7rem;
	                font-weight: 400;
	                text-indent: 0;
	                line-height: 1.42857143;
	                background-color: ${colors.quranAppListClearBg};
	                border-bottom: 1px solid ${colors.quranAppListClearSeparator};
	                color: #4D4D4D;
					-webkit-touch-callout: none; {/* iOS Safari */}
					-webkit-user-select: none;   {/* Chrome/Safari/Opera */}
					-khtml-user-select: none;    {/* Konqueror */}
					-moz-user-select: none;      {/* Firefox */}
					-ms-user-select: none;       {/* Internet Explorer/Edge */}
					user-select: none;    
				}
				#c-sura-ul li:hover {
					background-color:rgba(0,0,0, 0.1); 
				}

				#c-juz-ul {
					width:100%;
					height:auto;
				}
				#c-juz-ul li {
					cursor:pointer; 
					outline:none;
					margin:0;
					height: auto;
					min-height: 70px;
					padding: 24px 16px;
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
	                font-size: 1.7rem;
	                font-weight: 400;
	                text-indent: 0;
	                line-height: 1.42857143;
	                background-color: white;
	                border-bottom: 1px solid #D8D8D8;
	                color: #4D4D4D;
					-webkit-touch-callout: none; {/* iOS Safari */}
					-webkit-user-select: none;   {/* Chrome/Safari/Opera */}
					-khtml-user-select: none;    {/* Konqueror */}
					-moz-user-select: none;      {/* Firefox */}
					-ms-user-select: none;       {/* Internet Explorer/Edge */}
					user-select: none;    
				}
				#c-juz-ul li:hover {
					background-color:rgba(0,0,0, 0.1); 
				}

				#c-aya-ul {
					width:100%;
					height:auto;
				}
				#c-aya-ul li {
					cursor:pointer; 
					outline:none;
					margin:0;
					height: auto;
					min-height: 70px;
					padding: 24px 16px;
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
	                font-size: 1.7rem;
	                font-weight: 400;
	                text-indent: 0;
	                line-height: 1.42857143;
	                background-color: white;
	                border-bottom: 1px solid #D8D8D8;
	                color: #4D4D4D;
					-webkit-touch-callout: none; {/* iOS Safari */}
					-webkit-user-select: none;   {/* Chrome/Safari/Opera */}
					-khtml-user-select: none;    {/* Konqueror */}
					-moz-user-select: none;      {/* Firefox */}
					-ms-user-select: none;       {/* Internet Explorer/Edge */}
					user-select: none;    
				}
				#c-aya-ul li:hover {
					background-color:rgba(0,0,0, 0.1); 
				}
				
				
			
				.plSel { 
					background-color:rgba(0,0,0, 0.3)!important; 
					cursor:default!important;
					color: white;
				}
				.o-title-lastread {
					font-size: 1.4rem;
					color: ${colors.quranFourth};
				}
				.o-title-sura {
					display:flex;
					flex-direction: row;
					align-items: baseline;
					height: 48px;
					max-height: 48px;
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
	                font-size: 1.8rem;
	                font-weight: 400;
	                text-indent: 0;
	                line-height: 48px;
				}
				.o-title-sura span:first-child {
					font-size: 2.0rem;
					font-weight: 600;
				}
				.o-title-sura span:last-child {
					font-size: 2.4rem;
				}
				.o-quran-sidebar-container {
					width:100%;
					height:90%;
					display: flex;
					flex-direction: row;
					overflow-x:hidden;
					overflow-y:auto;
					background-color: white;
					//padding-bottom: 20px;
					//align-items:stretch;
				}
				.o-quran-sidebar-title {
					flex: 1;
					min-height: 136px;
					height: 136px;
					background-color: ${colors.quranPrimary};
					padding: 8px 16px;
					color: ${colors.quranThird};
				}
				h6.o-app-title {
					margin: 16px 0 8px;
					font-size: 2.0rem;
					font-weight: 600;
					color: white;
					line-height: 26px;
				}
				.o-quran-sidebar-main {
					flex: 9;
					//overflow-y: scroll;
				}
				 
				{/* Position and sizing of burger button */}
				#o-topbar-container > div > .bm-burger-button {
				  	position: fixed;
				  	width: 20px!important;
				  	height: 20px!important;
				  	top: 87px!important;
				  	left: 30px;
				 	z-index: 100; 
				 	color: black;
				}
				#o-topbar-container > div > .bm-burger-button:hover {
					opacity: 0.5;
				}
				#o-topbar-container > div > .bm-burger-button.active {
					position: fixed;
				  	width: 20px;
				  	height: 20px;
				  	top: 87px!important;
				  	left: 20px;
				 	z-index: 100;
				}

				{/* Color/shape of burger icon bars */}
				#o-topbar-container > div > .bm-burger-button > span > .bm-burger-bars {
				  background: ${colors.quranAppSidebarIconActive};
				}
				#o-topbar-container > div > .bm-burger-button > span > .bm-burger-bars.isNightMode {
					background: white;
				}
				#o-topbar-container > div > #c-menu-wrapper {
					top: 65px;
				}
				{/* Position and sizing of clickable cross button */}
				#o-topbar-container > div > #c-menu-wrapper > div > .bm-cross-button {
				  height: 24px;
				  width: 24px;
				  top: 20px !important;
				  right: 16px !important;
				}
				{/* Color/shape of close button cross */}
				#o-topbar-container > div > #c-menu-wrapper > div > .bm-cross-button > span > .bm-cross {
				  background: ${colors.quranAppSidebarIconActive};
				}
				#o-topbar-container > div > #c-menu-wrapper > div > .bm-cross-button > span > .bm-cross:hover {
					background: ${colors.quranAppSidebarIconHover};
				}
				{/* General sidebar styles */}
				#c-menu-wrapper > .bm-menu {
				  background: ${colors.quranAppSidebarBg};
				  {/*padding: 2.5em 1.5em 0;*/}
				  font-size: 1.15em;
				  z-index:100;
				  box-shadow: 2px 4px 5px ${colors.mosqueAppSidebarShadow};
 	  		     -webkit-box-shadow: 2px 4px 5px ${colors.mosqueAppSidebarShadow};
				}
				{/* Morph shape necessary with bubble or elastic */}
				.bm-morph-shape {
				  fill: #373a47;
				}
				{/* Wrapper for item list */}
				#o-topbar-container > div > #c-menu-wrapper > .bm-menu > .bm-item-list {
				  color: #b8b7ad;
				  {/*padding: 0.8em;*/}
				}
				{/* Styling of overlay */}
				#o-topbar-container > div > .bm-overlay {
				  background: rgba(0, 0, 0, 0.3);
				}
				.c-search-engine {
					
				}
				.o-search-container {
					position: absolute;
					top: 20px;
					margin-bottom: 0.5em;
					padding: 0 0.5em 0.5em 0;
					width: 80%;
				}
				#UserCPMenu > div > .bm-burger-button {
			        position: fixed;
			        width: 60px!important;
			        height: 60px!important;
			        right: 12px!important;
			        left: auto!important;
			        top: 10px!important;
			        z-index: 999!important;
			        border-radius: 50%;
			    }

				.c-application-button {
				    right: 100px !important;
				    top: 28px !important;
				    height: 20px;
				    width: 20px;
				    z-index:999!important;
				}
				.o-application-menu {
		           right: 5.96em!important;
		        }
				@media (max-width: 768px) {
					.c-search-icon {
						right: 72px;
					}
				    .c-application-button {
				      top: 1.7em !important;
				      right: 60px !important;
				      height: 20px;
				    }
					.o-application-menu {
			           	right: 3.46em !important;
			           	top: 3.5em !important;
			        }
			        #UserCPMenu > div > .bm-burger-button {
				        position: fixed;
				        width: 40px!important;
				        height: 40px!important;
				        right: 12px!important;
				        left: auto!important;
				        top: 18px!important;
				        z-index: 999!important;
				        border-radius: 50%;
				    }
				}
				.o-search-container input:focus {
					background-color: ${colors.quranPrimary};
					color: ${colors.quranFourth};
				}
				.c-search-icon {
					position: absolute;
					top: 2px;
					right: 2px;
					z-index: 1;
					border-radius: 50%;
	                font-weight: 300;
	                font-size: 1.6rem; 
	              	height: 20px;
	                width: 20px;
	                border: none;
	                outline:none;
	                color: ${colors.quranAppSidebarIconActive};
	                background-color: transparent;
	                text-align:center;
				}
				.c-search-input {
					display: block;

					width: 90%;
					padding: 0 0 3px 0;
					background-color: transparent;
					border: none;
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 2.0rem;
					font-weight: 500;
					line-height: 26px;
					color: ${colors.quranFourth};
					transition: border-color .25s ease-in-out;
					-webkit-appearance: none;
				    -moz-appearance: none;
				    appearance: none;
				    outline: none;
				}
			
				.o-quran-container_isDayMode {
					padding: 0 0 0 0;
					height:100%;
					width:100%;
					background-color:white;
					overflow:auto;
				}
				.o-quran-container_isNightMode {
					padding: 0 0 0 0;
					height: 100%;
					width: 100%;
					background-color: #444444;
					overflow:auto;
				}

				.is-daymode_o-topbar-container {
					width: 100%;
					position:fixed;
					background-color: white;
					border: none;
					padding-top:65px;
					z-index:50;
				}
				.is-nightmode_o-topbar-container {
					
					width: 100%;
					position:fixed;
					background-color: #444444;
					border: none
					padding-top:65px;
					z-index:50;
				}
				.zindex {
					z-index: 998!important;
				}
				.is-daymode_o-bottom-container {
					height: 70px;
					width: 100%;
					position:fixed;
					bottom:0;
					background-color: white;	
				}
				.is-nightmode_o-bottom-container {
					height: 70px;
					width: 100%;
					position:fixed;
					background-color: #444444;
					bottom:0;	
				}
				.is-daymode_o-main-container {
					width:100%;
					height:auto;
					overflow-x: auto;
					overflow-y: hidden;
					padding-top: 70px;
					background-color: white;
					color: #746A5A;
					margin-bottom:60px;
					margin-top:65px;
				}
				.is-nightmode_o-main-container {
					width:100%;
					height:auto;
					overflow: auto;
					padding-top: 70px;
					background-color: #444444;
					color: #746A5A;
					margin-bottom:60px;
					margin-top:65px;
				}

				.is-daymode_o-title-area {
					display:flex;
					font-size: 25px;
					padding-top: 10px;
					padding-bottom: 10px;
					color: #C79269;	
				}
				.is-nightmode_o-title-area {
					display:flex;
					font-size: 25px;
					padding-top: 10px;
					padding-bottom: 10px;
					color: white;
				}
				.o-sura-title {
					flex: 1;
					text-align: center;
				}
				.o-page-title {
					flex: 1;
					text-align: center;
				}
				.o-juz-title {
					flex: 1;
					text-align: center;
				}
				.o-text-container {
					display: flex;
					height: 100%;
				}
				.o-previousbutton-area {
					display: flex;
					align-items: center;
					flex: 1;
				}
				
				.c-previous-button {
					float:right;
					border-radius: 50%;
	                font-size: 4.3rem;
	                font-weight: 300;
	              	height: 75px;
	                width: 75px;
	                border: none;
	                color: ${colors.quranAppSidebarIconActive};
	                background-color: transparent;
	                outline:none;
	                padding-right: 0.5em;
	                padding-top: 0.3em;
	                margin-left: auto;
				}
				.c-previous-button:hover {
					color: ${colors.quranAppSidebarIconHover};
				}
				.c-previous-button.isNightMode {	
	                color: black;
	                background-color: white;
				}
				.c-previous-button.isNightMode:hover {
					opacity: 0.5;
				}
				.o-nextbutton-area {
					display: flex;
					align-items: center;
					flex: 1;
				}
				.c-next-button {
					float:left;
					border-radius: 50%;
	                font-size: 4.3rem;
	                font-weight: 300;
	              	height: 75px;
	                width: 75px;
	                border: none;
	                color: ${colors.quranAppSidebarIconActive};
	                background-color: transparent;
	                outline:none;
	                padding-left: 0.5em;
	                padding-top: 0.3em;
	                margin-right: auto;
				}
				.c-next-button:hover {
					color: ${colors.quranAppSidebarIconHover};
				}
				.c-next-button.isNightMode {	
	                color: black;
	                background-color: white;
				}
				.isNightMode:hover {
					opacity: 0.5;
				}
				
				.o-ayamode-div {
					margin-bottom: 32px;
					padding-bottom: 2.0em;
					border-bottom: 1px solid ${colors.quranAppListClearSeparator};
					border-top: none;
					border-left: none;
					border-right: none;
				}
				.o-ayamode-div.isNightMode {
					border-bottom: 1px solid white;
				}
				.o-text-area {
					padding: 1.0em 1.5em 1.0em 1.5em;
					cursor: pointer;
				}
				.o-center-mainarea {
					flex: 8;
				}
				.text-left {
					text-align:left;
				}
				.text-right {
					text-align:right;	
				}
				.text-center {
					text-align:center;	
				}
				.arabic-text{
					direction:rtl;
				}
				.c-text {	
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 2.4rem;
					font-weight: 400;
					text-indent: 0;
					word-spacing: 0.2em;
					line-height: 2.4;
					color: ${colors.quranFourth};
					line-height: 48px;
    				padding: 16px 16px 16px 8px
				}
				.c-text.isNightMode {
					color:white;
				}
			
				.c-text:hover {	
					background-color: rgba(0,0,0,0.1);
					transition: background-color ease-in-out .20s;
				}
				.c-text.isNightMode:hover {	
					background-color: rgba(0,0,0,0.4);
					transition: background-color ease-in-out .20s;
				}
				.c-text.active {
					font-weight: 500;
					background-color: ${colors.quranThird};
					transition: background-color ease-in-out .20s;
				}
				.c-text.active.isNightMode {
					background-color: black;
				}
				.c-text.is-favourite {
					color: ${colors.quranFourth}; 
					font-weight: 700;
				}
				.c-text.is-favourite.isNightMode {
					color: yellow; 
				}
				.c-text-icon {
					margin-right: 16px;
					text-align:center;
					display:inline-block;
				    background-image:url("app/assets/images/content/promotional/quran/quranReader/bg-aya-no.png");
				    background-repeat: no-repeat;
				    width:50px;
				    height:75px;
				    background-size: 50px 75px;
				    font-size: 0.8em;
				    padding-top: 0.8em;
				}
				.c-text-icon.isNightMode {
				    background-image:url("app/assets/images/content/promotional/quran/quranReader/bg-aya-no-nightmode.png");
				    color: #444444;
				}

				.c-favourite-span {
	                font-size: 1.8rem;
	                font-weight: 300;
	                border: none;
	 				color: black;
	                outline:none;
	                cursor:pointer;
	                margin-top: 0.5em;
				}

				.favourite {
					color: #F5A623;
				}

				.c-translation-button {
					width: 100%;
				}
				.c-favourite-button {
					border-radius: 50%;
	                font-size: 2.3rem;
	                font-weight: 300;
	              	height: 40px;
	                width: 40px;
	                border: none;
	                color: ${colors.quranAppSidebarIconActive};
	                background-color: transparent;
	                outline:none;
				}
				.c-favourite-button:hover {
					color: ${colors.quranAppSidebarIconHover};
				}
				.c-share-button {
					border-radius: 50%;
	                font-size: 2.3rem;
	                font-weight: 300;
	              	height: 40px;
	                width: 40px;
	                border: none;
	                color: ${colors.quranAppSidebarIconActive};
	                background-color: transparent;
	                outline:none;
				}
				.c-share-button:hover {
					color: ${colors.quranAppSidebarIconHover};
				}
				.o-topbar-button-wrapper {
					float: right;
					height: 60px;
					line-height: 60px;
					width: auto;
					padding-top: 10px;
					right: 30px;
				}
				.c-topbar-button {
	                font-weight: 300;
	                font-size: 1.6rem;
	                padding: 20px 0;
	                margin-top: 0;
	                margin-right: 16px;
	              	height: 20px;
	                width: 20px;
	                border: none;
	                outline:none;
	                float:right;
	                color: ${colors.quranAppSidebarIconActive};
	                background-color: transparent;
				}
				.c-topbar-button:hover {
					color: ${colors.quranAppSidebarIconHover};
				}
				.c-topbar-button.isNightMode {
	                color: white;
				}

				.c-viewflipmode-button {
					border-radius: 20%;
	                font-weight: 300;
	                font-size: 1.5rem; 
	              	height: 30px;
	                width: 50px;
	                border: none;
	                outline:none;
	                margin-top:1.0em;
	                margin-right:1.0em;
	                float:right;
	                color: ${colors.quranAppSidebarIconActive};
	                background-color: transparent;
	                font-weight: 500;
				}
				.c-viewflipmode-button:hover {
					color: ${colors.quranAppSidebarIconHover};
				}
				.c-viewflipmode-button.isNightMode {
	                color: white;
	                background-color: transparent; 
				}
				.c-viewflipmode-button.isNightMode:hover {
					opacity: 0.5;
				}

				.c-translation-button {
					border-radius: 20%;
	                font-weight: 300;
	                font-size: 1.5rem; 
	              	height: 30px;
	                width: 50px;
	                border: none;
	                outline:none;
	                margin-top:1.0em;
	                margin-right:1.0em;
	                float:right;
	                color: ${colors.quranAppSidebarIconActive};
	                background-color: transparent;
	                font-weight: 500;
				}
				.c-translation-button:hover {
					color: ${colors.quranAppSidebarIconHover};
				}
				.c-translation-button.isNightMode {
	                color: white;
	                background-color: transparent; 
				}
				.c-translation-button.isNightMode:hover {
					opacity: 0.5;
				}

				{/*Web (Large Screen)*/}
				@media (min-width: 2000px) {
					.o-search-result-wrapper {
						height: 1000px;
					}

					.c-text {
						font-size: 2.8rem;
						font-weight: 400;
						text-indent: 0;
						word-spacing: 0.2em;
						line-height: 2.6;
					}
					.c-text-icon {
					    width:50px;
					    height:75px;
					    padding-top: 0.4em;
					    background-size: 50px 75px;
					}
					.c-text.active {
						font-weight: 500;
						background-color: ${colors.quranThird};
						transition: background-color ease-in-out .20s;
					}
					.c-text.is-favourite {
						color: ${colors.quranFourth};
						font-weight: 700;
					}

					.c-title-label {
						font-size: 1.8em;
					}

					.c-starter-label {
						font-size: 2.8rem;
					}

					.c-juz-title-label {
						font-size: 1.4em;
						line-height: 1.82857143;
					}
					#demo-quran-overlay{
						font-size:20px;
					}
					#demo-quran-overlay .demo1{
						top:6em;
					}
					#demo-quran-overlay .demo2{
						top:27em;
					}
				}

				{/* Mobile (Landscape)
				================================================== */}
				@media screen and (min-width: 180px) and (max-width: 767px) {
					.c-previous-button {
		                font-size: 2.3rem;
		              	height: 40px;
		                width: 40px;  
		                padding-right:0.65em;
		                padding-top: 0.4em;     
		            }
		            .c-next-button {
						font-size: 2.3rem;
		              	height: 40px;
		                width: 40px;
		                padding-left:0.65em;
		                padding-top: 0.4em;     
					}
					.c-quran-title {
						font-size: 1.4em;
					}
					
					.o-quran-title-wrapper {
						margin-top:1.2em;
		                margin-left:3.6em;
					}
					#demo-quran-overlay{
						font-size:16px;
					}
					#demo-quran-overlay .demo1{
						top:9em;
					}
					#demo-quran-overlay .demo2{
						top:30em;
					}
					.c-text {
						font-size: 1.8rem;
						font-weight: 400;
						text-indent: 0;
						word-spacing: 0.2em;
						line-height: 2.0;
					}
					.c-input-green{
					    background: rgba(1, 1, 1, 0.5);
					    border-radius: 50%;
					    width: 120PX;
					    height: 120px;
					    line-height: 50px;
					    color: white;
					    padding: 10px;
					    font-size: 26px;
					    font-weight: 200;
					    border: none;
					    cursor: pointer;
				    }
					.c-text-icon {
					    width:40px;
					    height:55px;
					    padding-top: 0.95em;
					    background-size: 40px 55px;
					}

					.c-title-label {
						font-size: 1.0em;
					}

					.c-starter-label {
						font-size: 1.8rem;
					}

					.c-juz-title-label {
						font-size: 0.8em;
					}

					.c-favourite-span {
		                font-size: 1.5rem;
					}

					.o-audioplayer-playpause {
						width: 2.5em; 
					}
					.o-audioplayer-track-title {
						width: 7.0em; 
						height: 50%;
						top: 0.8em;
						left: 4.0em;
						font-size:0.8em;
					}

					.audioplayer-time {
					    line-height: 2.375em;
					    top: 0.5em;
					    text-decoration: none;
					    right: 7em;
					    font-size:0.8em;
					}

					.o-audioplayer-bar {
						right: 6em; 
						left: 3.3em; 
						margin-top: -0.438em; 
					}
					.modal {
						padding: 8% 0% 0%;
					}
					.c-questionlist-container > h1 {
						line-height: 1em;
						font-size: 3rem;
						margin:0;
					}
					button.is-save {
						width: 100%;
					}
					.u-select__wrapper {
						flex-basis: 40px;
					}
					.c-questionlistener {
						flex-direction: column;
					}
					.c-questionlistener label {
						padding-left: 4%;
					}
					.u-select__wrapper select {
						width: 100%;
					}
					.c-questionlistener input {
						width: auto;
						margin: 0px 8px 11px 8px;
					}
					.c-questionlistener > .u-select__wrapper {
						width: auto;
					}
				}
				{/* Tablet (Landscape)
				================================================== */}
				@media screen and (min-width: 1024px) {
					.modal {
						padding: 8% 0% 0%;
					}
					#demo-quran-overlay .demo1{
						top:6em;
					}
					#demo-quran-overlay{
						font-size:24px;
					}
					button.is-save {
						width: 50%;
					}
				}
				{/* Tablet (Portrait)
				================================================== */}
				@media screen and (min-width: 768px) and (max-width: 959px) {
					.c-previous-button {
		                font-size: 3.3rem;
		              	height: 60px;
		                width: 60px;
		                padding-top: 0.4em;            
		            }
		            .c-next-button {
						font-size: 3.3rem;
		              	height: 60px;
		                width: 60px;
		                padding-top: 0.4em;     
					}
					.c-quran-title {
						font-size: 1.6em;
					}
					.o-quran-title-wrapper {
						margin-top:1em;
		                margin-left:4.3em;
					}

					.c-text {
						font-size: 2.0rem;
						font-weight: 400;
						text-indent: 0;
						word-spacing: 0.2em;
						line-height: 2.4;
					}
					.c-text-icon {
					    width:45px;
					    height:60px;
					    padding-top:0.75em;
					    background-size: 45px 60px;
					}
					.c-title-label {
						font-size: 1.4em;
					}

					.c-starter-label {
						font-size: 2.0rem;
					}

					.c-juz-title-label {
						font-size: 1.2em;
					}

					.c-favourite-span {
		                font-size: 1.7rem;
					}
					.modal {
						padding: 8% 0% 0%;
					}
					button.is-save {
						width: 100%;
					}
				}

				@media screen and (min-width:0\0) {
					.c-search-input {
						padding: 0 0 3px 0;
					}
				}

		` +(arabicToggle ? arabic : "");
	}
};




export default cssFunction;