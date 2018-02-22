/////For Desktop notification
   window.onerror = function() {
      if (typeof window.console !== "undefined" && typeof window.console.log === "function") {
      console.log("Uncatched error: ", arguments);
      } 
    };



import React from "react";
import Router from "react-router";
import lang from "../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../scss/colors";
import {Link} from "react-router";
import ReactDOM from "react-dom";
import Footer from "./Footer";
import config from "../config";
import Notification  from '../components/NotificationFunction.js';

window.React = React;

class DesktopNotification extends React.Component {

	constructor(props) {
    	super(props);
    	this.state = {
      		ignore: true,
      		title: ''
    	};
  	}

  	handlePermissionGranted(){
    	console.log('Permission Granted');
    	this.setState({
     		ignore: false
    	});
  	}
	  handlePermissionDenied(){
	    console.log('Permission Denied');
	    this.setState({
	      ignore: true
	    });
	  }
	  handleNotSupported(){
	    console.log('Web Notification not Supported');
	    this.setState({
	      ignore: true
	    });
	  }

	  handleNotificationOnClick(e, tag){
	    console.log("clicked");
	  }

	  handleNotificationOnError(e, tag){
	    console.log(e, 'Notification error tag:' + tag);
	  }

	  handleNotificationOnClose(e, tag){
	    console.log(e, 'Notification closed tag:' + tag);
	  }

	  handleNotificationOnShow(e, tag){
	    //this.playSound();
	    console.log(e, 'Notification shown tag:' + tag);
	  }

	  playSound(filename){
	    document.getElementById('sound').play();
	  }

	  handleButtonClick() {

	    if(this.state.ignore) {
	      return;
	    }

	    const now = Date.now();

	    const title = 'NOOR Notification';
	    const body = 'welcome to NOOR';
	    const tag = now;
	    const icon = 'http://georgeosddev.github.io/react-web-notification/example/Notifications_button_24.png';
	    // const icon = 'http://localhost:3000/Notifications_button_24.png';

	    // Available options
	    // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
	    const options = {
	      tag: tag,
	      body: body,
	      icon: icon,
	      lang: 'en',
	      dir: 'ltr',
	      sound: './sound.mp3'  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
	    }
	    this.setState({
	      title: title,
	      options: options
	    });
	  }

  render() {
  	


    return (
     	<InlineCss stylesheet={DesktopNotification.css(this.props.arabic)} namespace="DesktopNotification">
     		<div className="container">
     			<div className = "o-homepagebutton" onClick={this.handleButtonClick.bind(this)}>Notify me</div>
     			<Notification
          			ignore={this.state.ignore && this.state.title !== ''}
			          notSupported={this.handleNotSupported.bind(this)}
			          onPermissionGranted={this.handlePermissionGranted.bind(this)}
			          onPermissionDenied={this.handlePermissionDenied.bind(this)}
			          onShow={this.handleNotificationOnShow.bind(this)}
			          onClick={this.handleNotificationOnClick.bind(this)}
			          onClose={this.handleNotificationOnClose.bind(this)}
			          onError={this.handleNotificationOnError.bind(this)}
			          timeout={5000}
			          title={this.state.title}
			          options={this.state.options}
			    />
			    //<audio id='sound' preload='auto'>
		         // <source src='./sound.mp3' type='audio/mpeg' />
		         // <source src='./sound.ogg' type='audio/ogg' />
		         // <embed hidden='true' autostart='false' loop='false' src='./sound.mp3' />
		       // </audio>
     		</div>
     	</InlineCss>
    );
  }

  static css(arabicToggle) {

		const base = `
			& {
				padding: 102px 0 60px;
			}

			& > .container {
				padding: 23px 19%;
			}

			& .o-homepagebutton {
				text-align: center;
				border-style: solid;
				border-width: 2px;
			}
			.notify-container {
				padding: 23px 19%];
  				display: flex;
  				flex-direction: column;
  				flex-wrap: wrap;
			  	justify-content: flex-end;
			  	align-items: flex-start;
			 	align-content: flex-start;
			 	position: absolute;
			  	top: 0;
			  right: 0;
			}
			 
			.notify-item {
			  	width: 250px;
			  	margin: 5px 10px;
			  	color: #FFF;
			  	border-radius: 5px;
			}
			 
			.notify-item:hover {
			  	opacity: 0.8;
			  	box-shadow: 0 0 10px 0 rgb(15, 15, 15);
			}
			 
			.notify-item > p {
			  	font-family: 'Lora', serif;
			  	margin: 10px;
			  	opacity: .8;
			}
			 
			.notify-item.success {
			  	background-color: rgba(81, 163, 81, 0.4);
			}
			 
			.notify-item.error {
			  	background-color: rgba(203, 100, 94, 0.8);
			}
			 
			.notify-item.info {
			  	background-color: rgba(33, 150, 243, 0.8);
			}
			 
			.notify-title {
			  	font-weight: 700;
			}
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};
 
export default DesktopNotification;