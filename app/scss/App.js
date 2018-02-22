import colors from "./colors";


const style = `


	body {
		font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
		font-size: 1.6rem;
		font-weight: 500;
		line-height: 23px;
		-webkit-text-stroke-width: .6px;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		
		color: ${colors.dirtText};
		background-color: white;
		// background-color: ${colors.dirtWhite};
	}

	.o-main-top-menu {
		position:absolute;
		width:100%;
	}

	.quranIcon {
		padding-top: 0.9rem;
	}

	.o-noorLogo-icon {
		text-align: center;
		padding-top: 0.5em;
	}
	.c-logo-image {
		width: 12.0em;
    	height: 3.0em;
	}
	.c-application-button {
	    top: 1.0em;
	    position: absolute;
	    float: right;
	    width: 2.0em;
	    z-index: 999;
	    cursor: pointer;
	}
	.o-button-wrapper {
    	width: 100%;
    	display: flex;
    	flex-direction: row;
    	padding: 0.7em 0;
	}
	.o-button-wrapper img {
		flex: 3;
		width: 5.0em;
    	height: 3em;
    	cursor: pointer;
	}
	.o-button-wrapper img:hover {
		flex: 3;
		width: 5.0em;
    	height: 3em;
    	cursor: pointer;
	}
	.o-application-menu {
		    z-index: 1000!important;
		    position: absolute;
		    padding: 0.5em;
		    right: 5.75em;
		    top: 3.5em;
		    background-color: #FFFFFF;
		    box-shadow: 0px 1px 3px #999999;
		    text-align: center;
		    min-width: 85px;
		    width: auto;
    		height: auto;

	}
	
	.o-application-menu:after {
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

	.o-application-menu:before {
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

	a {
		color: ${colors.orange};
		text-decoration: none;
	}
	a:hover {
		color: ${colors.orangesnd};
	}

	& {
		height: 100%;
	}

	button, .button {
			background-color: ${colors.buttonBackground};
			border-radius: 3px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 8px 12px;
			font-family: "Avenir Next W01", 'Open sans';
			border: 2px solid ${colors.dirtText};
			margin-top: 10px;
			color: ${colors.dirtText};
			font-weight: 500;
			text-decoration: none;
		}

	button.purple, .button.purple {
		background-color: ${colors.purple};
		color: white;
		box-shadow: 0 2px 0 0 #252040;
		border: 0;
	}

			.has-bg {
				padding: 30px;
				background-color: ${colors.dirtWhite};
			}

	{/* Mobile (Landscape)
	================================================== */}
	@media only screen and (min-width: 180px) and (max-width: 767px) {
		.o-button-wrapper {
	    	flex-direction: column;
		}
		.o-button-wrapper img {
			margin-bottom: 0.5em;
		}
		.o-noorLogo-icon {
			text-align:left;
			margin-left:0.2em;
			padding-top: 0.5em;
		}
		.c-logo-image {
			width: 8.0em;
	    	height: 3.0em;
	    	margin-left: 1.75em;
		}
        
	}		

`;

export default style;