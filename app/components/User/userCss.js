import functions from "../../scss/styleFunctions";
import colors from "../../scss/colors";

let cssFunction = {
	userEmpty: function(arabicToggle) {
		const arabic = ``;
		return `` + (arabicToggle ? arabic : "");
	},
	userMosqueContent: function(arabicToggle) {
		const arabic = ``;

		return `
			.o-fallback-container {
				background-color: #FFF0F0;
				color: #FF0D0D;
				border: 1px solid;
				padding: 10px;
				margin: 10px 0;
			}

			ul.c-fallback-results {
				list-style-type: none;
			}
			/*crop-center*/
			.thumbnail {
				position: relative;
			  	width: 100%;
				height: 50%;
				overflow: hidden;
			}
			.thumbnail img {
				position: absolute;
				left: 50%;
				top: 50%;
				height: auto;
				width: 100%;
				-webkit-transform: translate(-50%,-50%);
				  -ms-transform: translate(-50%,-50%);
				      transform: translate(-50%,-50%);
			}
			.thumbnail img.portrait {
				width: 100%;
				height: auto;
			}			

			.clearfix() {
				&:before,
				&:after {
					content: " ";
					display: table;
			 	}
				&:after {
					clear: both;
				}
			}
			.c-facebook__hidden {
				display:none;
			}

			.o-userfavmosque-fallback {
				box-shadow: 0px 1px 3px #999999;
				padding: 4%;
				margin: 1em 4%;
				text-align: center;
			}

			& > .o-userfavmosque-container header {
				padding-top: 130px;
			}

			.o-userfavmosque-sync__form {
				position: relative;
				margin-top: 15px;
			}

			.o-userfavmosque-sync__form > .o-userfavmosque-padding {
				position: absolute;
				right: 0;
			}

			.o-userfavmosque-sync__form > .o-userfavmosque-padding > .fa-google-plus {
				color: #FF5959;
			}

			.o-userfavmosque-sync__form > .o-userfavmosque-padding > .fa-facebook-square {
				color: #4A90E2;
			}

			.o-userfavmosque-sync__form > .o-userfavmosque-padding > i {
				font-size: 2rem;
				cursor: pointer;
			}

			.o-userfavmosque-sync__form > .o-userfavmosque-padding > label, .o-userfavmosque-sync__form > .o-userfavmosque-padding > i{
				margin-right: 8px;
			}

			.o-userfavmosque-bar > .o-userfavmosque-padding {
				display: flex;
				flex-direction: row;
				padding-top: 30px;
			}

			.is-required { 
				width: 100%;
				padding: 12px 12px 8px;
			    background-color: white;
			    border: 1px solid red;
			    font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
			    font-size: 1.6rem;
			    text-indent: 0;
			    line-height: 1.42857143;
			    color: #746A5A;
			    outline: none;
			}

			.c-userfavmosque-input { 
				width: 80%;
				padding: 12px 12px 8px;
			    background-color: white;
			    border: 1px solid #CCCCCC;
			    font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
			    font-size: 1.6rem;
			    text-indent: 0;
			    line-height: 1.42857143;
			    color: #746A5A;
			    outline: none;
			}

			.c-userfavmosque-input__action {
				width: 20%;
				border-radius: 0px;
				padding: 12px 12px 8px;
			    font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
			    font-size: 1.8rem;
			    text-indent: 0;
			    line-height: 1.42857143;
			    margin-top: 0;
			    outline: none;
			}

			button.is-primary {
				border: 0px;
				background-color: transparent;
				color: #C79269;
			}

			button.is-orangeprimary {
				border: 0px;
				background-color: #C79269;
				color: white;
			}

			.o-form__button {
				padding: 16px 23px;
				font-size: 1.6rem;
				font-weight: 600;
				letter-spacing: 0.6px;
			}

			.o-userfavmosque__tab {
				display: flex;
				flex-direction: row;
				color: #C79269;
				align-items: center;
				border-bottom: 1px rgba(0,0,0,0.12);
				border-bottom-style: groove;
				margin-bottom: 1em;
			}
			.c-userfavmosquetab__button {
				background-color: transparent;
				color: #C79269;
				border: none;
				font-size: 1.6rem;
				padding: 1em 2em 1em 0;
				outline: none;
			}

			.c-userfavmosquetab__button.active {
				color: black;
			}

			.c-remove {
				background-color: transparent;
				border: none;
				font-size: 2rem;
				position: absolute;
				top: 0;
				right: 0;				
			}

			.c-userfavmosque__detail {
				text-align: center;
			}

			.c-userfavmosque__detail > h2 {
				margin: 0;
				font-size: 1.8em;
			}

			.c-userfavmosquestatus__form {
				background-color: #D7D0C6;
				color: #908575;
				white-space: nowrap;
				font-size: 0.8em;
				font-weight: 500;
				padding: 3px 15px;
				border-radius: 25px;
				margin-top: 4%;
			}

			.o-userfavmosque-result {
				padding-top: 1em;
			}

			ul.o-userfavmosque-results li.c-userfavmosque {
				margin: 1%;
				padding: 0;
				height: 300px;
				width: calc(100% * (1/4) - 2%);
				list-style: none;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-bottom: 23px;
				background-color: white;
				position: relative;
			}

			.c-userfavmosque__avatar {
				width: 8em;
				border-radius: 50%;
				margin-top: 10%;
			}

			.c-userfavmosque__pic {
				width: 100%;
				height: auto;
			}

			.c-removemosque {
    			font-size: 1.2rem;
    			font-weight: 400;
    			position: relative;
    			bottom: 4%;
    			width: 100%;
    			color: #C79269 !important;
				font-family: inherit;
				text-transform: none;
			}

			.c-removemosque > i {
				font-size: 1.6rem;
				margin-bottom: 2px;
			}

			.c-removemosque button {
				justify-content: center;
			}

			ul.o-userfavmosque-results li.c-userfavmosque:last-child { 
				margin-bottom: 0; 
			}

			ul.o-userfavmosque-results li.c-userfavmosque > h2 {
				color: #716554;
				font-size: 1em;
				font-weight: 500;
				text-align: center;
				letter-spacing: 0.75px;
			}

			ul.o-userfavmosque-results li.c-userfavmosque > label {
				text-align: center;
				font-size: 0.8em;
				line-height: 1.5em;
				font-weight: 100;
			}

			ul.o-userfavmosque-results li.c-userfavmosque > p {
				display: none;
			}

			ul.o-userfavmosque-results li.c-userfavmosque > button > i {
				margin-right: 8px;
			}

			li.c-userfavmosque {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 15px;
			}

			

			div.o-userfavmosque-padding::-webkit-scrollbar {
            	  width: 6px;
            	}
	
            	div.o-userfavmosque-padding::-webkit-scrollbar-track {
            	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
            	    border-radius: 10px;
            	    background-color: #f0f0f0;
            	}               
            	div.o-userfavmosque-padding::-webkit-scrollbar-thumb {
            	    border-radius: 10px;
            	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
            	    background-color: #888;
            	}

			.c-actionfriend {
				background-color: transparent;
    			border: none;
    			font-size: 2.5rem;
    			margin-top: 0;
    			bottom: 4%;
    			position: absolute;
    			margin: 0 20%;
    			outline: none;
			}

			.c-actionfriend.c-check {
				left: 0;
			}

			.c-actionfriend.c-close {
				right: 0;
			}

			.c-actionfriend > .fa-check {
				color: lightgreen;
			}

			.c-actionfriend > .fa-close {
				color: red;
			}

			@media (max-width:768px) {
				& > .o-userfavmosque-container header {
					padding-left: 4%;
				}

				.o-userfavmosque-sync__form > .o-userfavmosque-padding {
					padding-right: 4%;
				}

				ul.o-userfavmosque-results li.c-userfavmosque {
					/*width: calc(100% * (1/2) - 5%);*/
					width: 100%;
					text-align:center;
				}

				ul.o-userfavmosque-results {
					text-align: -webkit-center;
					display: flex;
					flex-wrap: wrap;
					flex: 1;
					justify-content: center;
				}

				.o-userfavmosque-bar > .o-userfavmosque-padding {
					padding-left: 4%;
					padding-right: 4%;
				}

				.c-userfavmosque-input { 
					width: 70%;
					font-size: 0.9em;
				}

				.c-userfavmosque-input__action {
					width: 30%;
					white-space: nowrap;
					font-size: 0.9em;
				}

				ul.o-userfavmosque-results li.c-userfavmosque > h2 {
					margin-top: 0.8em;
					margin-bottom: 0.8em;
				}

				.c-userfavmosquestatus__form {
					margin-top: 0.8em;
				}

				.o-userfavmosque__tab {
					margin: 0 4% 1.5em 4%;
				}

			}

			@media (min-width: 768px) {

				& ul.o-userfavmosque-results {
					display: flex;
					flex-wrap: wrap;
				}
				& ul.o-userfavmosque-results {
					margin-bottom: 32px;
				}
				& ul.o-userfavmosque-results li.c-userfavmosque > h2 {
					font-weight: 500;
					padding: 10px;
				}
				& ul.o-userfavmosque-results {
					flex: 1;
					color: black;
					font-size: 2.0rem;
					line-height: 38px;
					letter-spacing: 1.05px;
				}
				ul.o-userfavmosque-results li.c-userfavmosque {
					display: flex;
					flex-direction: column;
					align-items: center;
					line-height: 2.5rem;
					font-size: 1.5rem;
					font-weight: 100;
					color: #716554;
				}
				
			}

		` + (arabicToggle ? arabic : "");
	},
userContent: function(arabicToggle) {
		const arabic = ``;
		const responsiveUserCPContent = functions.responsivePadding(".o-usercpcontent-padding");

		return `
			 * {
	          -moz-transition:all 100ms ease;
	          -o-transition:all 100ms ease;
	          -webkit-transition:all 100ms ease;
	          transition:all 100ms ease;

	        }
			${responsiveUserCPContent}
			.o-remove__avatar {
				position: absolute;
				top: 35%;
				left: 39%;
				outline: none;
				background-color: white;
				border: none;
				border-radius:50%;
				font-size: 3rem;
				opacity: 0;
			}
			.o-remove__avatar:hover {
				opacity: 0.7;
				transition: opacity .25s ease-in-out;
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
	                z-index:22;
	                padding-top: 6px;
				}
			.o-fallback-container {
				background-color: #FFF0F0;
				color: #FF0D0D;
				border: 1px solid;
				padding: 10px;
				margin: 10px 0;
			}

			.o-fallback-container.success {
				background-color: #DFF0D8;
				color: #3C763D;
			}

			ul.c-fallback-results {
				list-style-type: none;
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

			select .c-selection {
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
			.c-questionlist {
				list-style: none;
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

			.c-questionlistener > .u-select__wrapper > i {
				color:black;
			}
			.c-questionlistener > .u-select__wrapper {
				width: 20%;
			}

			.c-questionlistener > .u-select__wrapper > select {
				padding: 6px 21px 6px 11px;
				width: 100%;
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

			/* The Modal (background) */
			.modal {
			  display: none; /* Hidden by default */
			  position: fixed; /* Stay in place */
			  z-index: 100; /* Sit on top */
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
			/*crop-center*/
			.thumbnail {
				position: relative;
			  	width: 100%;
				height: 50%;
				overflow: hidden;
			}
			.thumbnail img {
				position: absolute;
				left: 50%;
				top: 50%;
				height: auto;
				width: 100%;
				-webkit-transform: translate(-50%,-50%);
				  -ms-transform: translate(-50%,-50%);
				      transform: translate(-50%,-50%);
			}
			.thumbnail img.portrait {
				width: 100%;
				height: auto;
			}
			

			.clearfix() {
				&:before,
				&:after {
					content: " ";
					display: table;
			 	}
				&:after {
					clear: both;
				}
			}
			.c-facebook__hidden {
				display:none;
			}

			.usercpcontent-tabcontent {
			    display: none;
			    -webkit-animation: fadeEffect 1s;
			    animation: fadeEffect 1s;
			    padding-left: 1em;
			    padding-right: 1em;
			}

			.o-usercpcontent-fallback {
				box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.2),0 1px 5px 0 rgba(0,0,0,.12);
				padding: 4%;
				text-align: center;
			}

			

			div.c-usercpcontent-content::-webkit-scrollbar {
            	  width: 6px;
            	}
	
            	div.c-usercpcontent-content::-webkit-scrollbar-track {
            	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
            	    border-radius: 10px;
            	    background-color: #f0f0f0;
            	}               
            	div.c-usercpcontent-content::-webkit-scrollbar-thumb {
            	    border-radius: 10px;
            	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
            	    background-color: #888;
            	}

			& > .o-usercpcontent-container {
				padding-top: 74px;
			}

			.o-usercpcontent-sync__form {
				position: relative;
				margin-top: 15px;
			}

			.o-usercpcontent-sync__form > .o-userinvite-padding {
				position: absolute;
				right: 0;
			}

			.o-usercpcontent-sync__form > .o-userinvite-padding > .fa-google-plus {
				color: #FF5959;
			}

			.o-usercpcontent-sync__form > .o-userinvite-padding > .fa-facebook-square {
				color: #4A90E2;
			}

			.o-usercpcontent-sync__form > .o-userinvite-padding > i {
				font-size: 2rem;
				cursor: pointer;
			}

			.o-usercpcontent-sync__form > .o-userinvite-padding > label, .o-usercpcontent-sync__form > .o-userinvite-padding > i{
				margin-right: 8px;
			}

			.o-usercpcontent-bar > .o-userinvite-padding {
				display: flex;
				flex-direction: row;
				padding-top: 30px;
				margin-bottom: 16px;
			}

			.is-required { 
				width: 100%;
				padding: 12px 12px 8px;
			    background-color: white;
			    border: 1px solid red;
			    font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
			    font-size: 1.6rem;
			    text-indent: 0;
			    line-height: 1.42857143;
			    color: #746A5A;
			    outline: none;
			}

			.c-usercpcontent-input { 
				width: 80%;
				padding: 12px 12px 8px;
			    background-color: white;
			    border: 1px solid #CCCCCC;
			    font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
			    font-size: 1.6rem;
			    text-indent: 0;
			    line-height: 1.42857143;
			    color: #746A5A;
			    outline: none;
			}

			.c-usercpcontent-input__action {
				width: 20%;
				border-radius: 0px;
				padding: 12px 12px 8px;
			    font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
			    font-size: 1.8rem;
			    text-indent: 0;
			    line-height: 1.42857143;
			    margin-top: 0;
			    outline: none;
			}

			button.is-primary {
				border: 0px;
				background-color: transparent;
				color: #C79269;
			}

			button.is-orangeprimary {
				border: 0px;
				background-color: #C79269;
				color: white;
			}

			.o-form__button {
				padding: 16px 23px;
				font-size: 1.6rem;
				font-weight: 600;
				letter-spacing: 0.6px;
			}

			.o-usercpcontent-padding > .u-select__wrapper > select {
				position: absolute;
				right: 0;
				z-index: 0;
			}

			.o-usercpcontent__tab {
				display: flex;
				flex-direction: row;
				position: relative;
				color: #e8d0bd;
				align-items: center;
				border-bottom: 1px rgba(0,0,0,0.12);
				border-bottom-style: groove;
				margin-bottom: 1em;
			}

			.c-usercpcontenttab__button {
			    background-color: transparent;
			    color: #e8d0bd;
			    border: none;
			    font-size: 1.6rem;
			    margin-top: 10px;
			    outline: none;
			    border-radius: 0;
			    text-transform: none;
			    font-family: inherit;
				// padding: 1em 2em 0em 2em;
				height: auto;
			}

			.c-usercpcontenttab__button:hover, .c-usercpcontenttab__button:focus, .c-usercpcontenttab__button:active {
				background: none;
			}

			.c-usercpcontenttab__button.active {
				color: #C79269;
				border-bottom: 2px solid;
			}

			.o-usersettings__tab {
				display: flex;
				color: #999999;
				flex-direction: row;
				align-items: center;
				border-bottom: 1px rgba(0,0,0,0.12);
				border-bottom-style: groove;
				margin-bottom: 1em;
			}
			.c-usersettingstab__button {
				background-color: transparent;
				color: #999999;
				border: none;
				font-size: 1.2rem;
				margin: 0;
				padding: 1em 2em 1em 0;
				outline: none;
			}

			.c-usersettingstab__button.active {
				color: #4d4d4d;
			}

			.o-userfriendsfamily__tab {
				display: flex;
				color: #999999;
				flex-direction: row;
				align-items: center;
				border-bottom: 1px rgba(0,0,0,0.12);
				border-bottom-style: groove;
				margin-bottom: 1em;
			}
			.c-userfriendsfamilytab__button {
				background-color: transparent;
				color: #999999;
				border: none;
				font-size: 1.2rem;
				margin: 0;
				padding: 1em 2em 1em 0;
				outline: none;
			}

			.c-userfriendsfamilytab__button.active {
				color: #4d4d4d;
			}
			.o-userpeople__tab {
				display: flex;
				color: #999999;
				flex-direction: row;
				align-items: center;
				border-bottom: 1px rgba(0,0,0,0.12);
				border-bottom-style: groove;
				margin-bottom: 1em;
			}
			.c-userpeopletab__button {
				background-color: transparent;
				color: #999999;
				border: none;
				font-size: 1.2rem;
				margin: 0;
				padding: 1em 2em 1em 0;
				outline: none;
			}

			.c-userpeopletab__button.active {
				color: #4d4d4d;
			}

			.c-remove {
				background-color: transparent;
				border: none;
				font-size: 2rem;
				position: absolute;
				top: 0;
				right: 0;
			}

			.c-usercpcontent__wrap > .u-select__wrapper > select {
				display: block;
				padding: 3px 40px 3px 10px;
				background-color: #C79269;
				color: white!important;
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

			.c-usercpcontent__wrap > .u-select__wrapper {
				position: relative;
				background-color: white;
				height: 1em;
				margin-bottom: 1em;
			}
			.c-usercpcontent__wrap > .u-select__wrapper > i {
				position: absolute;
				top: -10px;
				right: 12px;
				height: 46px;
				line-height: 46px;
				font-size: inherit;
				color: white;
				z-index: 1;
			}

			.c-usercpcontent__wrap > .u-select__wrapper:before {
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

			input[type='checkbox'] {
				visibility: hidden;
			}
	
			input[type='checkbox']:checked + span:before,
			input[type='checkbox']:not(:checked) + span:before{
			    content:' ';
			    display:inline-block;
			    width: 25px;
			    height:25px;
			    position: relative;
			    top:4px;
			    border: 1px solid #bbb;
			    background: white;
			    margin-right: 1em;
			    box-shadow: inset 0 1px 1px 0 rgba(0,0,0,.1);
			}

			input[type='checkbox']:hover + span:before {
			  background: #F2F0ED;
			  box-shadow: inset 0 0 0 2px white;
			}

			input[type='checkbox']:checked + span:before {
			  background: #E0DDD6;
			  box-shadow: inset 0 0 0 2px white;
			}

			.o-usercpcontent-result {
				padding-top: 1em;
			}

			ul.o-usercpcontent-results li.c-usercpcontent {
				margin: 1%;
				padding: 0;
				width: 100%;
				list-style: none;
				display: flex;
				flex-direction: row;
				margin-bottom: 23px;
				background-color: white;
				border-bottom: 1px solid #DFDFDF;
				position: relative;
			}

			.c-usercpcontent__avatar {
				width: 4em;
				border-radius: 50%;
				margin: 8px;
			}

			.c-usercpcontent__pic {
				width: 100%;
				height: auto;
			}

			.c-removemosque button {
				justify-content: center;
			}

			ul.o-usercpcontent-results li.c-usercpcontent:last-child { 
				margin-bottom: 0; 
			}

			ul.o-usercpcontent-results li.c-usercpcontent > .c-usercpcontent__wrap > h2 {
				color: #716554;
				font-size: 0.9em;
				font-weight: 500;
				text-align: center;
				letter-spacing: 0.75px;
			}

			ul.o-usercpcontent-results li.c-usercpcontent > .c-usercpcontent__wrap > label {
				text-align: center;
				font-size: 0.8em;
				line-height: 1.5em;
				font-weight: 100;
			}

			ul.o-usercpcontent-results li.c-usercpcontent > .c-usercpcontent__wrap > p {
				display: none;
			}

			ul.o-usercpcontent-results li.c-usercpcontent > button > i {
				margin-right: 8px;
			}

			li.c-usercpcontent {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 15px;
			}

			.c-usercpcontent__wrap {
				display: flex;
				flex-direction: column;
				align-items: baseline;
			}

			.c-usercpcontent-button__wrap {
				position: absolute;
				right: 0;
			}

			.c-actionfriend {
				background-color: transparent;
    			border: none;
    			font-size: 2.5rem;
    			margin-top: 0;
    			outline: none;
			}

			.c-actionfriend > .fa-check {
				color: lightgreen;
			}

			.c-actionfriend > .fa-close {
				color: red;
			}

			.c-extendtab {
				margin-bottom: 3em;
				margin-right: 0.8em;
				padding-bottom: 2em;
				position: absolute;
				top: -8px;
				right: 0;
				z-index: 21;
				display: flex;
				flex-direction: row;
			}
			ul.c-maintab-dropdown {
				list-style: none;
			}
			.o-wrappertab-dropdown {
				outline: none;
				position:absolute;
				cursor: pointer;
				bottom: -1.5rem;
				right: -1.5rem;
				width: 30px;
				text-align: -webkit-center;
			    text-align: center;
			    text-align: -moz-center;
			}
			.o-wrappertab-dropdown:after {
				content: "";
			    width: 0;
			    height: 0;
			    position: absolute;
			    right: 15px;
			    top: 50%;
			    margin-top: -3px;
			    border-width: 6px 6px 0 6px;
			}
			li > button.c-usercpcontenttab__button {
				margin: 5px 0;
			}
			.o-wrappertab-dropdown .c-maintab-dropdown {
			  /* Size & position */
			    position: absolute;
			    top: 140%;
			    right: -6px;
			    width: 165px;
			    /* Styles */
			    background: white;
			    border-radius: inherit;
			    border: 1px solid rgba(0,0,0,0.17);
			    box-shadow: 0 0 5px rgba(0,0,0,0.1);
			    font-weight: normal;
			    transition: all 0.5s ease-in;
			    list-style: none;

			    /* Hiding */
			    opacity: 0;
			    pointer-events: none;
			}

			.o-wrappertab-dropdown .c-maintab-dropdown li button {
			    display: block;
			    padding: 10px;
			    text-decoration: none;
			    color: #e8d0bd;
			    border-bottom: 1px solid #e6e8ea;
			    box-shadow: inset 0 1px 0 rgba(255,255,255,1);
			    transition: all 0.3s ease-out;
				z-index: 99;
			    width: 100%;
			    text-align: left;
			}

			.o-wrappertab-dropdown .c-maintab-dropdown li:first-of-type button {
			    border-radius: 7px 7px 0 0;
			    padding-bottom: 15px;
			}

			.o-wrappertab-dropdown .c-maintab-dropdown li:last-of-type button {
			    border-radius: 0 0 7px 7px;
			    border: none;
			}

			/* Hover state */

			.o-wrappertab-dropdown .c-maintab-dropdown li button:hover{
			    color: #C79269;
			}

			.o-wrappertab-dropdown .c-maintab-dropdown:after {
			    content: "";
			    width: 0;
			    height: 0;
			    position: absolute;
			    bottom: 100%;
			    right: 15px;
			    border-width: 0 6px 6px 6px;
			    border-style: solid;
			    border-color: #fff transparent;    
			}

			.o-wrappertab-dropdown .c-maintab-dropdown:before {
			    content: "";
			    width: 0;
			    height: 0;
			    position: absolute;
			    bottom: 100%;
			    right: 13px;
			    border-width: 0 8px 8px 8px;
			    border-style: solid;
			    border-color: rgba(0,0,0,0.1) transparent;    
			}

			.o-wrappertab-dropdown.active .c-maintab-dropdown {
			    opacity: 1;
			    pointer-events: auto;
			}

			@media (max-width:768px) {

				.o-usercpcontent-container, .o-usersettings__tab {
					margin : 0 4% 1.5em 4%;
				}

				& > .o-usercpcontent-container header {
					padding-left: 4%;
				}

				.o-usercpcontent-sync__form > .o-usercpcontent-padding {
					padding-right: 4%;
				}

				ul.o-usercpcontent-results li.c-usercpcontent {
					width: 100%;
					text-align:center;
				}

				ul.o-usercpcontent-results {
					text-align: -webkit-center;
					display: flex;
					flex-wrap: wrap;
					flex: 1;
					justify-content: center;
				}

				.o-usercpcontent-bar > .o-usercpcontent-padding {
					padding-left: 4%;
					padding-right: 4%;
				}

				.c-usercpcontent-input { 
					width: 70%;
					font-size: 0.9em;
				}

				.c-usercpcontent-input__action {
					width: 35%;
					white-space: nowrap;
					font-size: 0.9em;
				}

				ul.o-usercpcontent-results li.c-usercpcontent > h2 {
					margin-top: 0.8em;
					margin-bottom: 0.8em;
				}

				.c-usercpcontentstatus__form {
					margin-top: 0.8em;
				}

				.o-usercpcontent__tab {
					margin: 0 4% 1.5em 4%;
				}

				.o-usercpcontent-padding > .u-select__wrapper > select {
					position: absolute;
					left: 4%;
				}

			}

			.c-application-button {
				right: 2em!important;
			    top: 20px !important;
			    height: 20px !important;
			    width: 20px !important;
			    display: block;
			    z-index: 9 !important;
			}

			@media (min-width: 768px) {

				& ul.o-usercpcontent-results {
					display: flex;
					flex-wrap: wrap;
				}
				& ul.o-usercpcontent-results {
					margin-bottom: 32px;
				}
				& ul.o-usercpcontent-results li.c-usercpcontent > h2 {
					font-weight: 500;
					padding: 10px;
				}
				& ul.o-usercpcontent-results {
					flex: 1;
					color: black;
					font-size: 2.0rem;
					line-height: 38px;
					letter-spacing: 1.05px;
				}
				ul.o-usercpcontent-results li.c-usercpcontent {
					display: flex;
					flex-direction: row;
					line-height: 2.5rem;
					font-size: 1.5rem;
					font-weight: 100;
					color: #716554;
				}
				.o-application-menu {
					right: 2.725em!important;
				}
				
			}

			@media (max-width: 768px) {
				.o-noorLogo-icon {
					text-align: left!important;
				}
				
				.o-application-menu {
		           right: 1.3em !important;
		           top: 3.05em !important;
		        }
			}


			{/* Mobile (Landscape)
            ================================================== */}
            @media only screen and (min-width: 280px) and (max-width: 767px) {
              .modal {
                padding: 8% 0% 0%;
              }
              .c-questionlist-container > h1 {
                line-height: 1em;
                font-size: 3rem;
                margin: 0;
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
              .c-questionlistener > .u-select__wrapper {
              	width:100%;
              }
              .c-questionlistener input {
                width: 100%;
                margin: 0px 8px 11px 8px;
              }
            }
            {/* Tablet (landscape)
            ================================================== */}
            @media only screen and (min-width: 1024px) {
              .modal {
                padding: 8% 0% 0%;
              }
              button.is-save {
                width: 50%;
              }
            }

            {/* Tablet (Portrait)
            ================================================== */}
            @media only screen and (min-width: 768px) and (max-width: 992px) {
              .modal {
                padding: 8% 0% 0%;
              }
              button.is-save {
                width: 80%;
              }
              	.o-usercpcontent__tab {
					margin: 0 4% 1.5em 4%;
				}
				.o-usercpcontent-container, .o-usersettings__tab {
					margin : 0 4% 1.5em 4%;
				}
            }

            {/* Safari Only
		      ================================================== */}
		      @media screen and (min-width:0\0) {
		          .c-feedback-button {
		            padding-left: 0.45em;
		          }
		      }

		` + (arabicToggle ? arabic : "");
	},

userSettingsContent: function(arabicToggle) {
		const arabic = ``;

		return `
			.clearfix() {
			  &:before,
			  &:after {
			    content: " ";
			    display: table;
			  }
			  &:after {
			    clear: both;
			  }
			}
			/* Accordion Design */
            .accordion {
              	cursor: pointer;
              	outline: none;
              	transition: 0.4s;
            }
            div.usersettings-panel {
              	max-height: 0;
              	overflow-y: hidden;
              	transition: 0.6s ease-in-out;
              	opacity: 0;
            }
            div.usersettings-panel.active {
              	opacity: 1;
              	max-height: 200px;
				padding: 3% 0;
              	background-color: #1F6370;
            }
            div.usersettings-panel > label {
            	padding-left: 4%;
            }

            div.usersettings-panel > label i {
            	font-size: 1.3em;
            	margin-right: 0.5em;
            }
			.c-usersettings-form__group.usersettings-panel {
				padding: 0;
			}
			
			/*Toggle customization*/
			.cmn-toggle {
			  	position: absolute;
			  	margin-left: -9999px;
			  	visibility: hidden;
			  	border: none;
			}
			.cmn-toggle + label {
			  	display: block;
			  	position: relative;
			  	cursor: pointer;
			  	outline: none;
			  	user-select: none;
			}
			input.cmn-toggle-round-flat + label {
			  	padding: 2px;
			  	width: 40px;
			  	height: 26px;
			  	background-color: ${colors.mosqueThird};
			  	border-radius: 30px;
			  	transition: background 0.4s;
			}
			input.cmn-toggle-round-flat + label:before,
			input.cmn-toggle-round-flat + label:after {
			  	display: block;
			  	position: absolute;
			  	content: "";
			}
			input.cmn-toggle-round-flat + label:before {
			  	top: 1px;
			  	left: 1px;
			  	bottom: 1px;
			  	right: 1px;
			  	background-color: ${colors.mosqueThird};
			  	border-radius: 60px;
			  	transition: background 0.4s;
			}
			input.cmn-toggle-round-flat + label:after {
			  	top: 2px;
			  	left: 2px;
			  	bottom: 2px;
			  	width: 22px;
			  	background-color: ${colors.quranAppSidebarBg};
			  	border-radius: 22px;
			  	transition: margin 0.4s, background 0.4s;
			}
			input.cmn-toggle-round-flat:checked + label {
			  	background-color: ${colors.mosqueThird};
			}
			input.cmn-toggle-round-flat:checked + label:after {
			  	margin-left: 14px;
			  	background-color: ${colors.quranAppSidebarBg};
			}
			
			
			.c-usersettings-form__group > label {
				display: block;
				cursor: pointer;
				font-size: 1.4rem;
			}
			.c-usersettings-form__group {
				display: flex;
				flex-flow: row wrap;
				justify-content: space-between;
				width: 100%;
				cursor: pointer;
				padding: 3% 4%;
			}
			footer.o-usersettings__footer {
				padding: 3%;
				text-align: -webkit-center;
				text-align: -moz-center;
				text-align: center;
				position: absolute;
				bottom: 0;
				width: 100%;
				background-color: #17444D;
			}
			.c-usersettings-logout > label {
				display: block;
				cursor: pointer;
				font-size: 1.4rem;
				font-weight: 600;
			}
			.c-usersettings-logout > i {
				margin-right: 8px;
				float: left;
				position: absolute;
				left: 125px;
			}
			.c-usersettings-logout {
				cursor: pointer;
			}
			@media (max-height: 830px) {
				div.o-usersettings-padding {
            		overflow-y: scroll;
            		max-height: 48vh;
            	}
	
            	div.o-usersettings-padding::-webkit-scrollbar {
            	  width: 6px;
            	}
	
            	div.o-usersettings-padding::-webkit-scrollbar-track {
            	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
            	    border-radius: 10px;
            	    background-color: #f0f0f0;
            	}               
            	div.o-usersettings-padding::-webkit-scrollbar-thumb {
            	    border-radius: 10px;
            	    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
            	    background-color: #888;
            	}
	
			}
			@media (max-height: 768px) {
				div.o-usersettings-padding {
            		overflow-y: scroll;
            		max-height: 43vh;
            	}
	
			}
			
		` + (arabicToggle ? arabic : "");
	},

	userCPMenu: function(arabicToggle) {
		const arabic = ``;

		return `
			.bm-burger-button > img {
				border-radius: 50%;
			}
			#UserCPHamburgerMenu {
				z-index: 101!important;
				height: 100vh!important;
			}

			#UserCPMenu.logout {
				display: none;
			}
			/* Position and sizing of burger button */
			#UserCPMenu > div > .bm-burger-button {
			  	position: fixed;
			  	width: 60px;
			  	height: 60px;
			  	right: 5px;
			  	left: auto;
			  	top: 5px;
			  	z-index:100!important;
			  	border-radius: 50%;
			}

			/* Color/shape of burger icon bars */
			#UserCPHamburgerMenu > .bm-burger-bars {
			  	background: #373a47;
			}

			/* Position and sizing of clickable cross button */
			#UserCPHamburgerMenu > div > .bm-cross-button {
			 	height: 24px;
			 	width: 24px;
			 	top: 16px!important;
			}

			/* Color/shape of close button cross */
			#UserCPHamburgerMenu > div > .bm-cross-button > span > .bm-cross {
			  	background: #bdc3c7;
			}

			/* General sidebar styles */
			#UserCPHamburgerMenu > .bm-menu {
				background: ${colors.quranAppSidebarBg};
				padding: 0;
				font-size: 1.15em;
			}

			/* Morph shape necessary with bubble or elastic */
			#UserCPMenu > div > .bm-morph-shape {
			  	fill: #373a47;
			}

			/* Wrapper for item list */
			#UserCPHamburgerMenu > .bm-menu > .bm-item-list {
				color: ${colors.mosqueThird};
				padding: 0;
				font-weight: 300;
			}

			/* Styling of overlay */
			#UserCPMenu > div > .bm-overlay {
			  	background: rgba(0, 0, 0, 0.3);
			}

			.c-ham-avatar {
			    max-height: 75px;
			    max-width: 75px;
			    display: block;
			    border-radius: 50%;
			    cursor: pointer;
			    width: 100%;
			    height: 100%;
			}

			.c-usercp-name {
				padding: 8px 0 16px;
				font-size: 1.3rem;
			}

			.c-usercp-details {
				display: flex!important;
				flex-direction: row;
				align-items: baseline;
				font-size: 1.5rem;
			}

			.c-usercp-details > i {
				margin-right: 8px;
			}

			.c-usercp-markerdetails {
				display: flex;
				flex-direction: column;
			}

			.o-usercp-userdetails {
				padding: 16px;
				background-color: black;
				color: white;
			}

			/* Styling of tab */
			ul.usercp-tab {
			    list-style-type: none;
			    margin: 0;
			    padding: 0;
			    overflow: hidden;
			    background-color: ${colors.mosqueSecondary};
    			-webkit-box-shadow: 5px -1px 10px black;
    			box-shadow: 5px -1px 10px black;
			}

			ul.usercp-tab li {float: left;}

			ul.usercp-tab li a {
			    display: inline-block;
			    height: 48px;
			    max-height: 48px;
			    color: ${colors.mosqueThird};
			    text-align: center;
			    padding: 0 16px;
			    text-decoration: none;
			    transition: 0.3s;
			    font-size: 1.5rem;
			    line-height: 48px;
			}

			ul.usercp-tab li a:hover {
			    color: white;
			}

			ul.usercp-tab li a:focus, .usercp-tablinks.active {
			    color: white;
			}

			.usercp-tabcontent {
			    display: none;
			    -webkit-animation: fadeEffect 1s;
			    animation: fadeEffect 1s;
			}

		` + (arabicToggle ? arabic : "");
	},
	userChangePasswordContent: function(arabicToggle) {
		const arabic = ``;

			return `
				.o-fallback-container {
					background-color: #FFF0F0;
					color: #FF0D0D;
					border: 1px solid;
					padding: 10px;
					margin: 10px 0;
				}

				.o-fallback-container.success {
					background-color: #DFF0D8;
					color: #3C763D;
				}

				ul.c-fallback-results {
					list-style-type: none;
				}

				.clearfix() {
				  &:before,
				  &:after {
				    content: " ";
				    display: table;
				  }
				  &:after {
				    clear: both;
				  }
				}
				a, button {
					cursor: pointer;
				}
				.u-small-font-size {
					font-size: 1.4rem;
				}
				.c-changepwd > .is-required {
					display: block;
					width: 100%;
					padding: 6px 12px;
					background-color: white;
					border: 1px solid #C54D4D;
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 1.2rem;
					font-weight: 500;
					text-indent: 0;
					line-height: 1.42857143;
					color: #746A5A;
					box-shadow: inset 0 2px 1px 0 rgba(197,77,77,0.075);
					transition: border-color .25s ease-in-out;
					-webkit-appearance: none;
				    -moz-appearance: none;
				    appearance: none;
				}
				.c-form__group > label {
					display: block;
					font-size: 1.4rem;
				}
				.o-form__input {
					display: block;
					width: 100%;
					padding: 12px 12px 8px;
					background-color: white;
					border: 1px solid rgba(0,0,0,0.075);
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 1.4rem;
					font-weight: 600;
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
				button.is-changesubmit {
					border: 0px;
					background-color: #C79269;
					float: right !important;
					color: white;
					margin-top: 0px;
					padding: 12px 12px 8px;
					font-size: 1.4rem;
					font-weight: 600;
					letter-spacing: 0.6px;
					display: block;
					width: 100%;
				}

				& div.o-container__content > section.o-container__section:first-child {
					background-color: transparent;
				}

				& div.o-container__content > section.o-container__section:nth-child(2) {
					border-bottom: 1px solid #F2F0ED;
				}

				& section.o-container__section {
					padding-top: 50px;
					padding-bottom: 50px;
					padding-right: 300px;
					padding-left: 300px;
				}

				& section.o-container__section > h3 {
					margin-bottom: 16px;
					font-size: 2.0rem;
					line-height: 23px;
					color: black;
					font-weight: 500;
				}

				.c-form__group {
					margin-bottom: 32px;
				}

				.o-upload__field {
					padding: 16px 23px;
					background-color: #E0DDD6;
					font-size: 1.4rem;
					font-weight: 600;
					cursor: pointer;
					transition: opacity .25s ease-in-out;
				}

				.is-required_upload_field {
					padding: 15px 22px;
					background-color: #E0DDD6;
					font-size: 1.4rem;
					font-weight: 600;
					cursor: pointer;
					transition: opacity .25s ease-in-out;
					border: 1px solid #C54D4D;
					transition: border-color .25s ease-in-out;
				}

				.o-upload__field:hover {
					opacity: 0.75;
				}

				.o-upload__field > i {
					margin-right: 16px;
				}

				footer.o-container__footer {
					padding: 23px;
				}
				@media (max-width:768px) {
					& > .o-changepassword-container header {
						padding-left: 4%;
					}

					.o-changepassword-sync__form > .o-changepassword-padding {
						padding-right: 4%;
					}

					ul.o-changepassword-results li.c-changepassword {
						width: calc(100% * (1/2) - 5%);
						text-align:center;
					}

					ul.o-changepassword-results {
						text-align: -webkit-center;
					}

					.o-changepassword-bar > .o-changepassword-padding {
						padding-left: 4%;
						padding-right: 4%;
					}

					.c-changepassword-input { 
						width: 70%;
						font-size: 0.9em;
					}

					.c-changepassword-input__action {
						width: 30%;
						white-space: nowrap;
						font-size: 0.9em;
					}

					ul.o-changepassword-results li.c-changepassword > h2 {
						margin-top: 0.8em;
						margin-bottom: 0.8em;
					}

					.c-changepasswordstatus__form {
						margin-top: 0.8em;
					}

					& section.o-container__section {
						padding: 23px;
					}

				}
				@media (min-width: 768px) {
					& > .o-changepassword-container header >.o-changepassword-padding h1 {
						font-size: 3.6rem;
						line-height: 48px;
						letter-spacing: 0.85px;
					}
					& > .o-changepassword-container .c-changepassword__form >.o-changepassword-padding .o-container__content {
						background-color: white;
						box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.12);
					}
					& > .o-changepassword-container .c-changepassword__form {
						padding: 0;
					}
					.o-half__row {
						width: 50% !important;
					}
					.o-half__row > .c-form__group {
						width: 100% !important;
					}
					.o-container__row {
						display: flex;
						flex-flow: row wrap;
						justify-content: space-between;
					}
					.o-container__row > .c-form__group {
						width: 100%;
					}
					.o-container__row > .c-form__group2 {
						width: 49;
					}
					.has-three-elements > .c-form__group {
						width: 32% !important;
					}
				}
						` + (arabicToggle ? arabic : "");
	},
userProfileContent: function(arabicToggle) {
		const arabic = ``;

			return `

				.text-danger{
					color:red;
					font-size:12px;
				}
				#c-email {
					background-color: #efefef;
					
				}
				#c-dob {
					border: none;
					box-shadow: none;
				}
				.c-submit__form {
					padding-left: 41%;
				}
				.overlay__date {
					position: absolute;
					z-index: 1;
				}
				
				.o-fallback-container {
					background-color: #FFF0F0;
					color: #FF0D0D;
					border: 1px solid;
					padding: 10px;
					margin: 10px 0;
				}
				.o-fallback-container.success {
					background-color: #DFF0D8;
					color: #3C763D;
				}

				ul.c-updatebg-dropdown {
					list-style: none;
				}

				ul.c-fallback-results {
					list-style-type: none;
				}

				.clearfix() {
				  &:before,
				  &:after {
				    content: " ";
				    display: table;
				  }
				  &:after {
				    clear: both;
				  }
				}
				.c-bgUpdate__action {
					display: none;
					float: right;
				}
				.c-bgUpdate__action > button {
					margin: 0 5px;
				}
				.c-img__background {
					width:100%;
				}
				.c-uploadbg__form {
					margin-bottom: 3em;
					padding-bottom: 2em;
					position: relative;
					z-index: 19;
					display: flex;
					flex-direction: row;
				}
				.c-profileform__background {
					height: 250px;
					width: 100%;
					background-color: #ECE8E1;
					margin-bottom: 3%;
					overflow: hidden;
					position: absolute;
					z-index: 2;
					left: 0;
				}
				.c-profileform__background > div {
					height: 100%;
					padding-top: 10px;
				}
				.c-upload__background:disabled {
					cursor: auto;
					opacity: 0.2;
				}
				.c-upload__background > i {
					margin-right: 8px;
				}
				.c-upload__background {
					background-color: white;
					border: none;
					box-shadow: 1px 1px 1px 1px;
					outline: none;
					border-radius: 0;
					top: 19%;
					opacity:0.8;
					z-index: 98;
					margin:0;
				}
				.o-wrapper-dropdown {
					background-color: white;
					color: #4d4d4d;
					border: none;
					box-shadow: 0px 1px 3px #999999;
					outline: none;
					border-radius: 0;
					top: 38%;
					opacity:0.8;
					z-index: 99;
					margin:0;
					position:absolute;
					padding: 5px 10px;
					cursor: pointer;
					width: 200px;
					font-size: 1.2rem;
				}
				.o-wrapper-dropdown:hover {
					opacity: 1;
				}
				.o-wrapper-dropdown.active.on {
					opacity: 1!important;
				}
				.o-wrapper-dropdown:after {
					content: "";
				    width: 0;
				    height: 0;
				    position: absolute;
				    right: 15px;
				    top: 50%;
				    margin-top: -3px;
				    border-width: 6px 6px 0 6px;
				    border-style: solid;
				    border-color: #8aa8bd transparent;
				}
				.o-wrapper-dropdown .c-updatebg-dropdown {
				  /* Size & position */
				    position: absolute;
				    top: 140%;
				    left: 0;
				    right: 0;

				    /* Styles */
				    background: white;
				    border-radius: inherit;
				    border: 1px solid rgba(0,0,0,0.17);
				    box-shadow: 0 0 5px rgba(0,0,0,0.1);
				    font-weight: normal;
				    transition: all 0.5s ease-in;
				    list-style: none;

				    /* Hiding */
				    opacity: 0;
				    pointer-events: none;
				}

				.o-wrapper-dropdown .c-updatebg-dropdown li button {
				    display: block;
				    padding: 10px;
				    text-decoration: none;
				    color: #e8d0bd;
				    border-bottom: 1px solid #e6e8ea;
				    box-shadow: inset 0 1px 0 rgba(255,255,255,1);
				    transition: all 0.3s ease-out;
					z-index: 99;
				    width: 100%;
				    text-align: left;
				}

				.o-wrapper-dropdown .c-updatebg-dropdown li:first-of-type button {
				    border-radius: 7px 7px 0 0;
				}

				.o-wrapper-dropdown .c-updatebg-dropdown li:last-of-type button {
				    border-radius: 0 0 7px 7px;
				    border: none;
				}

				/* Hover state */

				.o-wrapper-dropdown .c-updatebg-dropdown li button:hover{
				    color: #C79269;
				}

				.o-wrapper-dropdown .c-updatebg-dropdown:after {
				    content: "";
				    width: 0;
				    height: 0;
				    position: absolute;
				    bottom: 100%;
				    right: 15px;
				    border-width: 0 6px 6px 6px;
				    border-style: solid;
				    border-color: #fff transparent;    
				}

				.o-wrapper-dropdown .c-updatebg-dropdown:before {
				    content: "";
				    width: 0;
				    height: 0;
				    position: absolute;
				    bottom: 100%;
				    right: 13px;
				    border-width: 0 8px 8px 8px;
				    border-style: solid;
				    border-color: rgba(0,0,0,0.1) transparent;    
				}

				.o-wrapper-dropdown.active .c-updatebg-dropdown {
				    opacity: 1;
				    pointer-events: auto;
				}

				.c-form__avatar {
					position: relative;
					display: flex;
					justify-content: center;
					align-items:center;
					flex-direction: column;
					z-index:18;
					margin-bottom: 4em;
				}
				.c-avatar {
				    width: 13em;
				    height: 13em;
				    display: block;
				    border-radius: 50%;
				    padding: 30px;
				    box-shadow: 1px 1px 1px 1px;
				    background-color: white;
				}
				.u-icon__wrapper {
					z-index: 98;
					position: relative;
				}
				.o-upload__camera {
					position: absolute;
					left: 35%;
					bottom: 5px;
					border: none;
					font-size: 3.5rem;
					outline: none;
					background-color: transparent;
					opacity: 0.6;
				}
				.o-upload__camera:hover {
					opacity: 1;
				}

				.c-address__group {
					width: 100%!important;
				}
				.o-profilecontainer__row > button.is-submit {
				    border: 0px;
				    background-color: #C79269;
				    color: white;
				    padding: 0px 23px;
				    text-transform: inherit;
				    float: right !important;
				    letter-spacing: 0.6px;
				}

				.u-small-font-size {
					font-size: 1.4rem;
				}
				.is-required {
					display: block;
					width: 100%;
					padding: 12px 12px 8px;
					background-color: white;
					border: 1px solid #C54D4D;
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 1.4rem;
					font-weight: 600;
					text-indent: 0;
					line-height: 1.42857143;
					color: #746A5A;
					box-shadow: inset 0 2px 1px 0 rgba(197,77,77,0.075);
					transition: border-color .25s ease-in-out;
					-webkit-appearance: none;
				    -moz-appearance: none;
				    appearance: none;
				}
				.c-profileform__group > label {
					display: block;
					font-size: 1.2rem;
					font-weight: 600;
				}
				.o-profileform__input:focus, select:focus {
					box-shadow: 0px;
	  				outline: 0 none;
				}
				.u-profileselect__wrapper {
					position: relative;
					background-color: white;
					margin-bottom: 10px;
				}
				.u-profileselect__wrapper > i {
					position: absolute;
					top: 0;
					right: 12px;
					height: 46px;
					line-height: 46px;
					font-size: inherit;
					color: inherit;
					z-index: 1;
				}

				.u-profileselect__wrapper > i.active {
					position: absolute;
					top: 0;
					right: 12px;
					height: 46px;
					line-height: 46px;
					font-size: inherit;
					color: inherit;
					z-index: 0;
				}

				.u-profileselect__wrapper:before {
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
				.u-profileselect__wrapper > select, .o-profileform__input {
					display: block;
					width: 100%;
					padding: 12px 12px 8px;
					background-color: transparent;
					border: 1px solid rgba(0,0,0,0.075);
					border-radius: 0;
					font-size: 1.4rem;
					font-weight: 600;
					line-height: 1.42857143;
					color: #746A5A!important;
					box-shadow: 0 2px 1px 0 rgba(0,0,0,0.075);
					transition: border-color ease-in-out .15s;
					-webkit-appearance: none;
					-moz-appearance: none;
	    			appearance: none;
	    			font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
				}
				.u-profileselect__wrapper > select {
					position: relative;
	    			z-index: 0;
					
				}
				.u-profileselect__wrapper > select.active {
					position: relative;
					display: block;
					width: 100%;
					padding: 12px 12px 8px;
					background-color: transparent;
					border: 1px solid rgba(0,0,0,0.075);
					border-radius: 0;
					font-size: 1.4rem;
					font-weight: 600;
					line-height: 1.42857143;
					color: #746A5A;
					box-shadow: 0 2px 1px 0 rgba(0,0,0,0.075);
					transition: border-color ease-in-out .15s;
					-webkit-appearance: none;
					-moz-appearance: none;
	    			appearance: none;
	    			z-index: 1;
				}
				select:hover, select:focus {
					border-color: #E0DDD6;
				}
				
				& > .o-userprofile-container header {
					padding-top: 130px;
					margin-bottom: 2%;
				}

				& div.o-container__content > section.o-profilecontainer__section {

				}

				& section.o-profilecontainer__section {
					padding: 23px;
				}

				& section.o-profilecontainer__section > h3 {
					margin-bottom: 16px;
					font-size: 2.0rem;
					line-height: 23px;
					color: black;
					font-weight: 500;
				}

				& section.o-profilecontainer__section > h2 {
					font-size: 1.3em;
					padding: 0.5em 0;
					margin-bottom: 0.5em;
					font-weight: 300;
				}

				.c-profileform__group {
					margin-bottom: 32px;
				}

				.o-upload__field {
					padding: 16px 23px;
					background-color: #E0DDD6;
					font-size: 1.4rem;
					font-weight: 600;
					cursor: pointer;
					transition: opacity .25s ease-in-out;
				}

				.is-required_upload_field {
					padding: 15px 22px;
					background-color: #E0DDD6;
					font-size: 1.4rem;
					font-weight: 600;
					cursor: pointer;
					transition: opacity .25s ease-in-out;
					border: 1px solid #C54D4D;
					transition: border-color .25s ease-in-out;
				}

				.o-upload__field:hover {
					opacity: 0.75;
				}

				.o-upload__field > i {
					margin-right: 16px;
				}

				footer.o-container__footer {
					padding: 0 22px 22px 22px;
				}
				@media (min-width: 768px) {
					& > .o-userprofile-container .c-userprofile__form >.o-userprofile-padding .o-container__content {
						background-color: white;
					}
					.o-half__row {
						width: 50% !important;
					}
					.o-half__row > .c-profileform__group {
						width: 100% !important;
					}
					.o-profilecontainer__row {
						display: flex;
						flex-flow: row wrap;
						justify-content: space-between;
					}
					.o-profilecontainer__row > .c-profileform__group {
						width: 49%;
					}
					.has-three-elements > .c-profileform__group {
						width: 32% !important;
					}
				}
				@media (max-width:768px) {
					& > .o-userprofile-container header {
						padding-left: 4%;
					}

					.o-userprofile-sync__form > .o-userprofile-padding {
						padding-right: 4%;
					}

					ul.o-userprofile-results li.c-userprofile {
						width: calc(100% * (1/2) - 5%);
						text-align:center;
					}

					ul.o-userprofile-results {
						text-align: -webkit-center;
					}

					.o-userprofile-bar > .o-userprofile-padding {
						padding-left: 4%;
						padding-right: 4%;
					}

					.c-userprofile-input { 
						width: 70%;
						font-size: 0.9em;
					}

					.c-userprofile-input__action {
						width: 30%;
						white-space: nowrap;
						font-size: 0.9em;
					}

					ul.o-userprofile-results li.c-userprofile > h2 {
						margin-top: 0.8em;
						margin-bottom: 0.8em;
					}

					.c-userprofilestatus__form {
						margin-top: 0.8em;
					}
					.c-submit__form {
						padding-left: 0%;
					}

					& button.c-submit {
						width: 100%;
					}
				}
				
			` + (arabicToggle ? arabic : "");
	},
	userForgetPasswordContent: function(arabicToggle) {
		const arabic = ``;
			const responsiveUserCPContent = functions.responsivePadding(".o-forgetpassword-padding");

			return `
				${responsiveUserCPContent}
				.o-fallback-container {
					background-color: #FFF0F0;
					color: #FF0D0D;
					border: 1px solid;
					padding: 10px;
					margin: 10px 0;
				}
				.o-fallback-container.success {
					background-color: #DFF0D8;
					color: #3C763D;
				}

				ul.c-fallback-results {
					list-style-type: none;
				}

				.clearfix() {
				  &:before,
				  &:after {
				    content: " ";
				    display: table;
				  }
				  &:after {
				    clear: both;
				  }
				}
				a, button{
					cursor: pointer;
				}
				.u-small-font-size {
					font-size: 1.4rem;
				}
				.is-required {
					display: block;
					width: 100%;
					padding: 12px 12px 8px;
					background-color: white;
					border: 1px solid #C54D4D;
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 1.4rem;
					font-weight: 600;
					text-indent: 0;
					line-height: 1.42857143;
					color: #746A5A;
					box-shadow: inset 0 2px 1px 0 rgba(197,77,77,0.075);
					transition: border-color .25s ease-in-out;
					-webkit-appearance: none;
				    -moz-appearance: none;
				    appearance: none;
				}
				.c-form__group > label {
					display: block;
					font-size: 1.4rem;
				}
				.o-form__input {
					display: block;
					width: 100%;
					padding: 12px 12px 8px;
					background-color: white;
					border: 1px solid rgba(0,0,0,0.075);
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 1.4rem;
					font-weight: 600;
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
				.o-form__button {
					margin-top: 0px;
					padding: 12px 12px 8px;
					font-size: 1.4rem;
					font-weight: 600;
					letter-spacing: 0.6px;
					display: block;
					width: 100%;
				}
				button.is-primary {
					border: 0px;
					background-color: #C79269;
					color: white;
				}
				.is-large {
					padding: 23px 32px;
					font-size: 1.9rem;
				}
				.is-block {
					display: block;
					width: 100%;
				}
				.is-left {
					float: left !important;
				}
				.is-right {
					float: right !important;
				}

				& > .o-forgetpassword-container header {
					padding: 64px 0;
				}

				& > .o-forgetpassword-container header >.o-forgetpassword-padding h1 {
					margin-bottonm: 32px;
					font-size: 2.4rem;
					line-height: 33px;
					font-weight: 500;
					letter-spacing: 0.57px;
				}

				& > .o-forgetpassword-container header >.o-forgetpassword-padding p {
					font-size: 2.0rem;
					line-height: 28px;
				}

				& div.o-container__content > section.o-container__section {

				}

				& div.o-container__content > section.o-container__section:first-child {
					background-color: #F2F0ED;
				}

				& div.o-container__content > section.o-container__section:nth-child(2) {
					border-bottom: 1px solid #F2F0ED;
				}

				& section.o-container__section {
					padding: 23px;
				}

				& section.o-container__section > h3 {
					margin-bottom: 16px;
					font-size: 2.0rem;
					line-height: 23px;
					color: black;
					font-weight: 500;
				}

				.c-form__group {
					margin-bottom: 32px;
				}

				.o-upload__field {
					padding: 16px 23px;
					background-color: #E0DDD6;
					font-size: 1.4rem;
					font-weight: 600;
					cursor: pointer;
					transition: opacity .25s ease-in-out;
				}

				.is-required_upload_field {
					padding: 15px 22px;
					background-color: #E0DDD6;
					font-size: 1.4rem;
					font-weight: 600;
					cursor: pointer;
					transition: opacity .25s ease-in-out;
					border: 1px solid #C54D4D;
					transition: border-color .25s ease-in-out;
				}

				.o-upload__field:hover {
					opacity: 0.75;
				}

				.o-upload__field > i {
					margin-right: 16px;
				}

				footer.o-container__footer {
					padding: 23px;
				}
				@media (min-width: 768px) {
					& > .o-forgetpassword-container header >.o-forgetpassword-padding h1 {
						font-size: 3.6rem;
						line-height: 48px;
						letter-spacing: 0.85px;
					}
					& > .o-forgetpassword-container .c-forgetpassword__form >.o-forgetpassword-padding .o-container__content {
						background-color: white;
						box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.12);
					}
					& > .o-forgetpassword-container .c-forgetpassword__form {
						padding: 0;
					}
					.o-half__row {
						width: 50% !important;
					}
					.o-half__row > .c-form__group {
						width: 100% !important;
					}
					.o-container__row {
						display: flex;
						flex-flow: row wrap;
						justify-content: space-between;
					}
					.o-container__row > .c-form__group {
						width: 69%;
					}
					.o-container__row > .c-form__group2 {
						width: 30%;
					}
					.has-three-elements > .c-form__group {
						width: 32% !important;
					}
				}
						` + (arabicToggle ? arabic : "");
	},
	userRegistrationContent: function(arabicToggle) {
		const arabic = ``;
			const responsiveUserCPContent = functions.responsivePadding(".o-registration-padding");

			return `
				${responsiveUserCPContent}
				.o-fallback-container {
					background-color: #FFF0F0;
					color: #FF0D0D;
					border: 1px solid;
					padding: 10px;
					margin: 10px 0;
				}
				.o-fallback-container.success {
					background-color: #DFF0D8;
					color: #3C763D;
				}

				ul.c-fallback-results {
					list-style-type: none;
				}

				.clearfix() {
				  &:before,
				  &:after {
				    content: " ";
				    display: table;
				  }
				  &:after {
				    clear: both;
				  }
				}
				a, button{
					cursor: pointer;
				}
				.u-small-font-size {
					font-size: 1.4rem;
				}
				.is-required {
					display: block;
					width: 100%;
					padding: 12px 12px 8px;
					background-color: white;
					border: 1px solid #C54D4D;
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 1.4rem;
					font-weight: 600;
					text-indent: 0;
					line-height: 1.42857143;
					color: #746A5A;
					box-shadow: inset 0 2px 1px 0 rgba(197,77,77,0.075);
					transition: border-color .25s ease-in-out;
					-webkit-appearance: none;
				    -moz-appearance: none;
				    appearance: none;
				}
				.c-form__group > label {
					display: block;
					font-size: 1.4rem;
				}
				.o-form__input {
					display: block;
					width: 100%;
					padding: 12px 12px 8px;
					background-color: white;
					border: 1px solid rgba(0,0,0,0.075);
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 1.4rem;
					font-weight: 600;
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
				.o-form__button {
					padding: 16px 23px;
					font-size: 1.6rem;
					font-weight: 600;
					letter-spacing: 0.6px;
				}
				button.is-primary {
					border: 0px;
					background-color: #C79269;
					color: white;
				}
				.is-large {
					padding: 23px 32px;
					font-size: 1.9rem;
				}
				.is-block {
					display: block;
					width: 100%;
				}
				.is-left {
					float: left !important;
				}
				.is-right {
					float: right !important;
				}




				& {
					padding-top: 66px;
				}

				& > .o-registration-container header {
					padding: 64px 0;
				}

				& > .o-registration-container header >.o-registration-padding h1 {
					margin-bottonm: 32px;
					font-size: 2.4rem;
					line-height: 33px;
					font-weight: 500;
					letter-spacing: 0.57px;
				}

				& > .o-registration-container header >.o-registration-padding p {
					font-size: 2.0rem;
					line-height: 28px;
				}

				& div.o-container__content > section.o-container__section {

				}

				& div.o-container__content > section.o-container__section:first-child {
					background-color: #F2F0ED;
				}

				& div.o-container__content > section.o-container__section:nth-child(2) {
					border-bottom: 1px solid #F2F0ED;
				}

				& section.o-container__section {
					padding: 23px;
				}

				& section.o-container__section > h3 {
					margin-bottom: 16px;
					font-size: 2.0rem;
					line-height: 23px;
					color: black;
					font-weight: 500;
				}

				.c-form__group {
					margin-bottom: 32px;
				}

				.o-upload__field {
					padding: 16px 23px;
					background-color: #E0DDD6;
					font-size: 1.4rem;
					font-weight: 600;
					cursor: pointer;
					transition: opacity .25s ease-in-out;
				}

				.is-required_upload_field {
					padding: 15px 22px;
					background-color: #E0DDD6;
					font-size: 1.4rem;
					font-weight: 600;
					cursor: pointer;
					transition: opacity .25s ease-in-out;
					border: 1px solid #C54D4D;
					transition: border-color .25s ease-in-out;
				}

				.o-upload__field:hover {
					opacity: 0.75;
				}

				.o-upload__field > i {
					margin-right: 16px;
				}

				footer.o-container__footer {
					padding: 23px;
				}
				@media (min-width: 768px) {
					& > .o-registration-container header >.o-registration-padding h1 {
						font-size: 3.6rem;
						line-height: 48px;
						letter-spacing: 0.85px;
					}
					& > .o-registration-container .c-registration__form >.o-registration-padding .o-container__content {
						background-color: white;
						box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.12);
					}
					& > .o-registration-container .c-registration__form {
						padding: 0;
					}
					.o-half__row {
						width: 50% !important;
					}
					.o-half__row > .c-form__group {
						width: 100% !important;
					}
					.o-container__row {
						display: flex;
						flex-flow: row wrap;
						justify-content: space-between;
					}
					.o-container__row > .c-form__group {
						width: 49%;
					}
					.has-three-elements > .c-form__group {
						width: 32% !important;
					}
				}
						` + (arabicToggle ? arabic : "");
	},
	userLoginContent: function(arabicToggle) {
		const arabic = ``;

			return `
				input[type='checkbox'] {
					visibility: hidden;
				}
				.o-fallback-container {
					background-color: #FFF0F0;
					color: #FF0D0D;
					border: 1px solid;
					padding: 10px;
					margin: 10px 0;
				}

				.checkbox-inline > span {
					font-size: 0.8em;
				}

				.o-container-forgetpassword > p, .o-container-forgetpassword > button {
					font-size: 0.8em;
				}

				ul.c-fallback-results {
					list-style-type: none;
				}

				input[type='checkbox']:checked + span:before,
				input[type='checkbox']:not(:checked) + span:before{
				    content:' ';
				    display:inline-block;
				    width: 17px;
				    height:17px;
				    position: relative;
				    top:4px;
				    border: 1px solid #bbb;
				    background: white;
				    margin-right: 1em;
				    box-shadow: inset 0 1px 1px 0 rgba(0,0,0,.1);
				}

				input[type='checkbox']:hover + span:before {
				  background: #F2F0ED;
				  box-shadow: inset 0 0 0 2px white;
				}

				input[type='checkbox']:checked + span:before {
				  background: #E0DDD6;
				  box-shadow: inset 0 0 0 2px white;
				}

				.o-container-checkbox {
					padding-bottom: 10px;
				}

				.o-container-textboxfield {
					position: relative;
					background-color: white;

				}

				.o-container-textboxfield > i {
					position: absolute;
					top: 0;
					left: 12px;
					height: 46px;
					line-height: 46px;
					font-size: inherit;
					color: inherit;
					z-index: 1;
				}

					

				.is-required {
				    display: block;
					width: 100%;
					padding: 12px 35px 8px;
					background-color: white;
					border: 1px solid #C54D4D;
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 1.4rem;
					font-weight: 600;
					text-indent: 0;
					line-height: 1.42857143;
					color: #746A5A;
					box-shadow: inset 0 2px 1px 0 rgba(197,77,77,0.075);
					transition: border-color .25s ease-in-out;
					-webkit-appearance: none;
				    -moz-appearance: none;
				    appearance: none;
				}

				.o-login-container {
					position: absolute;
					padding: 10% 30% 20% 30%;
					width: 100%;
				
					
				}

				.o-container {
					background-color: white;
					box-shadow: 0 1px 3px #999999;
					padding: 4%;
				}

				.o-container-header {
					margin-bottom: 20px;
					padding-top: 20px;
					padding-left: 10px;
					padding-right: 10px;
				}

				.o-container-textbox {
					padding-left: 10px;
					padding-right: 10px;
					height: 100px;
				}

				.o-login-input {
					display: block;
					width: 100%;
					padding: 12px 35px 8px;
					background-color: white;
					border: 1px solid rgba(0,0,0,0.075);
					font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
					font-size: 1.4rem;
					font-weight: 600;
					text-indent: 0;
					line-height: 1.42857143;
					color: #746A5A;
					box-shadow: inset 0 2px 1px 0 rgba(0,0,0,0.075);
					transition: border-color .25s ease-in-out;
					-webkit-appearance: none;
				    -moz-appearance: none;
				    appearance: none;
				    margin-bottom: 0.5em;
				}

				.o-login-input:focus, select:focus {
					box-shadow: 0px;
	  				outline: 0 none;
				}

				.o-container-button {
					width: 100%;
					height: 60px;
					padding-left: 10px;
					padding-right: 10px;
				}

				.c-signup-button {
	   				width: 49%;
	   				float:left;
	   				margin-top: 0px;
					padding: 12px 12px 8px;
					font-size: 1.4rem;
					font-weight: 600;
					letter-spacing: 0.6px;
					display: block;
				}

				.c-login-button {
					width: 49%;
					padding: 12px 12px 8px;
					font-size: 1.4rem;
					font-weight: 600;
					letter-spacing: 0.6px;
					display: block;
					float: right;
					margin-top: 0px;
				}

				p {
					float:left;
					margin-right: 5px;
				}

				.c-forgetpassword-button {
					background:none;
	     			border:none; 
	     			padding:0!important;
	     			font: inherit;
	     			border-bottom:1px solid #444; 
	     			cursor: pointer;
				}
				.o-form__button {
					margin-top: 0px;
					padding: 12px 12px 8px;
					font-size: 1.4rem;
					font-weight: 600;
					letter-spacing: 0.6px;
					display: block;
					cursor: pointer;
				}
				button.is-primary {
					border: 0px;
					background-color: #C79269;
					color: white;
				}
				.is-large {
					padding: 23px 32px;
					font-size: 1.9rem;
				}
				.is-block {
					display: block;
					width: 100%;
				}
				.is-left {
					float: left !important;
				}
				.is-right {
					float: right !important;
				}

				
						` + (arabicToggle ? arabic : "");
	}
};




export default cssFunction;