import React from "react";
import Router from "react-router";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import {Link} from "react-router";
import ReactDOM from "react-dom";
import Footer from "../Footer";
import config from "../../config";
import functions from "../../scss/styleFunctions";
import globalQuranFunction from "../../components/Quran/GlobalQuranFunction";

var audioIndex = 1;
var isPlaying, isMute = false;
var tracks = [];
var trackCount;
var mediaPath = 'app/assets/audio/quran/';
var extension = '';
var selected = 0;
var scroll = 0;


class AudioPlayer2 extends React.Component {

	//audio play pause button
	handlePlay(e) {
		var audio = document.getElementById("c-audioplayer");
		if (isPlaying == false) {
			document.getElementById('c-playbutton-icon').className='fa fa-pause';
			audio.play();
			isPlaying = true;
			//var $ = require ('jquery')
			//var npAction = $('#c-audio-action');
	    	//npAction.text('Now Playing...');
		} else {
			document.getElementById('c-playbutton-icon').className='fa fa-play';
			audio.pause();
			isPlaying = false;
			//var $ = require ('jquery')
			//var npAction = $('#c-audio-action');
	    	//npAction.text('paused...');
		}
	}

	//when the mp3 ended
	audioEnded() {
		var $ = require ('jquery')
		//var npAction = $('#c-audio-action');
		//npAction.text('Paused...');
		var audio = document.getElementById("c-audioplayer");
		var playlistDiv = document.getElementById("o-playlist-wrap");
		var loadedBar = document.getElementById("o-audioplayer-bar-loaded");

		document.getElementById("o-audioplayer-currenttime").innerHTML = "00:00";
		loadedBar.style.width = 0 + '%';

	    if ((audioIndex + 1) <= trackCount) {
	      	audioIndex++;
	      	scroll = scroll + 30;
	        playlistDiv.scrollTop = scroll;
	        this.loadTrack(audioIndex);	
	        audio.play();
	    } else {
	        audioIndex = 1;
	        this.loadTrack(audioIndex);
	        scroll = 0;
	        playlistDiv.scrollTop = 0;
	    }
	}

	//when playlist is clicked
	playlistClick(e) {
		if (e.currentTarget.id !== audioIndex) {
			var playedBar = document.getElementById("o-audioplayer-bar-played");
		
			document.getElementById("o-audioplayer-currenttime").innerHTML = "00:00";
			playedBar.style.width = 0 + '%';
			document.getElementById('c-playbutton-icon').className='fa fa-pause';
			isPlaying = true;

			var id = parseInt(e.currentTarget.id);
	        this.loadTrack(id);
		    var $ = require ('jquery')
		    var audio = document.getElementById("c-audioplayer");
		    audio.play();
	    }
	}

	

	handleVolume() {
		var audio = document.getElementById("c-audioplayer");
		var volumePlayedBar = document.getElementById("o-audioplayer-volume-bar-played");
		if (isMute == false) {
			audio.muted = true;
			volumePlayedBar.style.height = 0 + "%";
			document.getElementById('c-volumebutton-icon').className='fa fa-volume-off';
			isMute = true;
		} else {
			audio.muted = false;
			if (audio.volume >= 0.50) {
				var newVolume = audio.volume * 100;
				volumePlayedBar.style.height = newVolume + "%";
				document.getElementById('c-volumebutton-icon').className='fa fa-volume-up';
			} else if (audio.volume == 0) {

			}else {
				var newVolume = audio.volume * 100;
				volumePlayedBar.style.height = newVolume + "%";
				document.getElementById('c-volumebutton-icon').className='fa fa-volume-down';
			}
			isMute = false;
		}
	}

	handlePrevious() {
		var $ = require ('jquery')
		var audio = document.getElementById("c-audioplayer");
		var playlistDiv = document.getElementById("o-playlist-wrap");
		var playedBar = document.getElementById("o-audioplayer-bar-played");
		
		document.getElementById("o-audioplayer-currenttime").innerHTML = "00:00";
		playedBar.style.width = 0 + '%';

		if ((audioIndex - 1) > 0) {
	        audioIndex--;
	        this.loadTrack(audioIndex);
	        scroll = scroll - 30;
	        playlistDiv.scrollTop = scroll;
	        if (isPlaying) {
	            audio.play();
	        }
	    } else {
	        audioIndex = 1;
	        this.loadTrack(audioIndex);
	        scroll = 0;
	        playlistDiv.scrollTop = 0;
	        if (isPlaying) {
	            audio.play();
	        }
	    }	
	}

	handleNext() {
		var $ = require ('jquery')
		var audio = document.getElementById("c-audioplayer");
		var playlistDiv = document.getElementById("o-playlist-wrap");
		var playedBar = document.getElementById("o-audioplayer-bar-played");
		
		document.getElementById("o-audioplayer-currenttime").innerHTML = "00:00";
		playedBar.style.width = 0 + '%';

		if ((audioIndex + 1) <= trackCount) {
	        audioIndex++;
	        this.loadTrack(audioIndex);
	        scroll = scroll + 30;
	        playlistDiv.scrollTop = scroll;
	        if (isPlaying) {
	            audio.play();
	        }
	    } else {
	    	isPlaying = false;
	        document.getElementById('c-playbutton-icon').className='fa fa-play';
	        audioIndex = 1;
	        this.loadTrack(audioIndex);
	        scroll = 0;
	        playlistDiv.scrollTop = 0;
	    }	
	}
	//get time duration of the audio and return time format example: 00:20
	secondsToTime(secs) {
		var hours = Math.floor( secs / 3600 ), minutes = Math.floor( secs % 3600 / 60 ), seconds = Math.ceil( secs % 3600 % 60 );
		return ( hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0'+hours+':' : hours+':' ) + ( minutes.toString().length < 2 ? '0'+minutes : minutes ) + ':' + ( seconds.toString().length < 2 ? '0'+seconds : seconds );
	}

	audioEventListener() {
		var audio = document.getElementById("c-audioplayer");
		
		//progress bar
		var audioContainer = document.getElementById("o-audioplayer-container");
		var barSize = document.getElementById("o-audioplayer-bar").clientWidth;
		var bar = document.getElementById("o-audioplayer-bar");
		var loadedBar = document.getElementById("o-audioplayer-bar-loaded");
		var progressBar = document.getElementById("o-audioplayer-bar-played");
		//volume bar
		var volumeSize = 100;
		var volumeBar = document.getElementById("o-audioplayer-volume-bar");
		var volume = document.getElementById("o-audioplayer-volume-bar-played");

		///browser resize listener
		window.onresize = function handleResize() {
				barSize = document.getElementById("o-audioplayer-bar").clientWidth;
		}

		//update audioDuration time //bar clicked event
		audio.addEventListener('loadedmetadata', function audioLoaded() {
			
		    document.getElementById("o-audioplayer-duration").innerHTML = secondsToTime(Math.floor(audio.duration));
		    function secondsToTime(secs) {
				var hours = Math.floor( secs / 3600 ), minutes = Math.floor( secs % 3600 / 60 ), seconds = Math.ceil( secs % 3600 % 60 );
				return ( hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0'+hours+':' : hours+':' ) + ( minutes.toString().length < 2 ? '0'+minutes : minutes ) + ':' + ( seconds.toString().length < 2 ? '0'+seconds : seconds );
			}
		});

		//audio load bar event listener
		bar.addEventListener('click', function clickedBar(e) {
				var mouseX = e.pageX- audioContainer.offsetLeft - bar.offsetLeft;
			    var newtime = (mouseX / barSize) * audio.duration;
			    audio.currentTime = newtime;
		});

		//volume bar event listener
		volumeBar.addEventListener('click', function clickedBar(e) {
				audio.muted = false;
				isMute = false;
				var mouseX = e.pageY - audioContainer.offsetTop - 12 + 20;
				var newVolume = (100 / volumeBar.clientHeight) * mouseX;
				volume.style.height = Math.abs(Math.floor(newVolume)) + "%";
				if (Math.abs(Math.floor(newVolume)) >= 50) {
					document.getElementById('c-volumebutton-icon').className='fa fa-volume-up';
				} else {
					document.getElementById('c-volumebutton-icon').className='fa fa-volume-down';
				}
				var updatedVolume = parseFloat(Math.abs(Math.floor(newVolume)) / 100);
				audio.volume=updatedVolume;	
		});

		//update audioCurrent time
		audio.ontimeupdate = function myFunction() {
			document.getElementById("o-audioplayer-currenttime").innerHTML = secondsToTime(Math.floor(audio.currentTime));	
	        var value = Math.floor((100 / audio.duration) * audio.currentTime);
			progressBar.style.width = value + "%";
			function secondsToTime(secs) {
				var hours = Math.floor( secs / 3600 ), minutes = Math.floor( secs % 3600 / 60 ), seconds = Math.ceil( secs % 3600 % 60 );
				return ( hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0'+hours+':' : hours+':' ) + ( minutes.toString().length < 2 ? '0'+minutes : minutes ) + ':' + ( seconds.toString().length < 2 ? '0'+seconds : seconds );
			}
		};			

	}

	loadTrack(id) {
		var $ = require ('jquery')
		//var npTitle = $('#c-audio-title');
		var audio = document.getElementById("c-audioplayer");

		//when load for the first time
		if (isPlaying == undefined) {
			audio.volume=1;
			isPlaying = false;
			document.getElementById('c-playbutton-icon').className='fa fa-play';
		}
		else if (isPlaying == true) {
			document.getElementById('c-playbutton-icon').className='fa fa-pause';
		} else if (isPlaying == false) {
			document.getElementById('c-playbutton-icon').className='fa fa-play';
		}

		$('#c-playlist #' + selected + '').removeClass('plSel');
		selected = id;
	    $('#c-playlist #' + id + '').addClass('plSel');
	    //npTitle.text(tracks[id-1].name);
	    audioIndex = id;
	    var obj = extension.split(".");
	    audio.setAttribute('src', mediaPath + tracks[id-1].file + extension);
	    audio.setAttribute('type', "audio/"+obj[1]);
	   	audio.load();

	   	//audio event listener
	   	this.audioEventListener();
	}

	loadAudioPlayer() {
		var $ = require ('jquery')
		$( "#c-playlist" ).empty();
		// html5media enables <video> and <audio> tags in all major browsers
		// HTML5 audio player + playlist controls...
		
	    var supportsAudio = !!document.createElement('audio').canPlayType;
	    if (supportsAudio) {
	    	var audioList = globalQuranFunction.getAudioList();
	    	var numberArray = audioList.number;
			var titleArray = audioList.title;
			var lengthArray = audioList.length;
			for (var i = 0; i < numberArray.length; i++) {
				var element = {};
				element.track = i+1;
				element.name = titleArray[i];
				element.audioLength = lengthArray[i];
				var numberSplit = numberArray[i].split(".");
				if (numberSplit[0].length == 1) {
					element.file = "00"+numberSplit[0];
				} else if (numberSplit[0].length == 2) {
					element.file = "0"+numberSplit[0];
				} else {
					element.file = toString(numberSplit[0]);
				}
				tracks.push(element);

				//append playlist into UL
				$( "#c-playlist" ).append($('<li></li>')
					.attr("id", i+1));
				$( "#" + (i+1) ).append($('<div></div>')
					.attr("id", "o-playlist-item" + i)
					.attr("class", "o-playlist-item"));
				$( "#o-playlist-item" + i ).append($('<div></div>')
					.attr("class", "o-playlist-number")
					.text(numberArray[i]));
				$( "#o-playlist-item" + i ).append($('<div></div>')
					.attr("class", "o-playlist-title")
					.text(titleArray[i]));
				$( "#o-playlist-item" + i ).append($('<div></div>')
					.attr("class", "o-playlist-length")
					.text(lengthArray[i]));	 
			}
	        
	        trackCount = tracks.length;
	        //var npAction = $('#c-audio-action');
	        //var npTitle = $('#c-audio-action');
	        this.audioEnded = this.audioEnded.bind(this);
	        this.playlistClick = this.playlistClick.bind(this);
	        $('#c-audioplayer').bind('ended', this.audioEnded);
	       	$('#c-playlist li').bind('click', this.playlistClick);
	       	var obj = document.createElement('audio');
	       	extension = obj.canPlayType('audio/mp3') ? '.mp3' : obj.canPlayType('audio/ogg') ? '.ogg' : '';
	        this.loadTrack(audioIndex);
	    }   	  
	}

	componentDidMount() {
		this.loadAudioPlayer();
	}

  render() {
    return (
     	<InlineCss stylesheet={AudioPlayer2.css(this.props.arabic)} namespace="AudioPlayer2">
     		<div id="o-audioplayer-container" className="o-audioplayer-container">
				<audio id="c-audioplayer" className="c-audioplayer" preload="auto" controls>
				
				</audio>
				<div className="o-audioplayer-playpause" title="Play" onClick={this.handlePlay.bind(this)}>
					<i className="fa fa-play" id="c-playbutton-icon"></i>
				</div>
				<div id="o-audioplayer-currenttime" className="audioplayer-time o-audioplayer-currenttime">00:00</div>
				<div id="o-audioplayer-bar" className="o-audioplayer-bar">
					<div id="o-audioplayer-bar-loaded" className="o-audioplayer-bar-loaded"></div>
					<div id="o-audioplayer-bar-played" className="o-audioplayer-bar-played"></div>
				</div>
				<div id="o-audioplayer-duration" className="audioplayer-time o-audioplayer-duration">&hellip;</div>
				<div id="o-audioplayer-volume" className="o-audioplayer-volume">
					<div className="o-audioplayer-volume-button" title="Volume" onClick={this.handleVolume.bind(this)}>
						<i className="fa fa-volume-up" id="c-volumebutton-icon"></i>
					</div>
					<div id="o-audioplayer-volume-adjust" className="o-audioplayer-volume-adjust" >
						<div id="o-audioplayer-volume-bar" className="o-audioplayer-volume-bar">
							<div id="o-audioplayer-volume-bar-played" className="o-audioplayer-volume-bar-played">
							</div>	
						</div>
					</div>
				</div>
			</div>
			<div className="o-track-wrap">
				<a id="btnPrev" onClick={this.handlePrevious.bind(this)} className="c-track-button"><i className="fa fa-angle-double-left"></i></a>
			   	<a id="btnNext" onClick={this.handleNext.bind(this)} className="c-track-button"><i className="fa fa-angle-double-right"></i></a>
			</div>
			<div id="o-playlist-wrap" className="o-playlist-wrap">
	            <ul id="c-playlist">
	                  
	            </ul>
	        </div>
     	</InlineCss>
    );
  }

  static css(arabicToggle) {

		const base = `
			& {
				padding-top: 165px;
			}

			.o-track-wrap { 
				min-height:50px;
				width: 80%;
				background-color: #231F20;
				margin-left: 10%; 
				margin-right: 10%;
				padding: 5px 5px 5px 5px;
				position:relative; 
				text-align:center; 
				text-decoration:none; 
				-moz-user-select: none; 
				-webkit-user-select: none; 
				-ms-user-select:none; 
				user-select:none;
				-o-user-select:none; 
			}

			.c-track-button {
				background-color: #231F20;
			    color: #C8C7C8;
			    cursor: pointer;
			    font-size: 2.0em;
			    padding: 0 27px 10px;
			}

			.c-track-button:hover {
				background-color: rgba(255,255,255, 0.1);
				color: white;
			}

			ul { list-style:none; }
			.o-playlist-wrap { 
				margin:0 auto;
			    height: 200px;
			    width: 80%;
			    margin-left: 10%;
			    margin-right: 10%;
			    overflow-y: auto;
			    overflow-x:hidden;
			}
			.o-playlist-wrap::-webkit-scrollbar {
			    width: 12px;
			}

			.o-playlist-wrap::-webkit-scrollbar-track {
			    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
			    background-color:rgb(16,16,16); 
			}

			.o-playlist-wrap::-webkit-scrollbar-thumb {
			    border-radius: 10px;
			    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
			    background-color:rgb(64,64,64); 
			}
			#c-playlist { margin:0; }
			#c-playlist li { background-color:rgb(16,16,16); cursor:pointer; margin:0; padding:21px 0; }
			#c-playlist li:hover { background-color:rgba(0,0,0,0.1)!important; cursor:default!important; }
			.plSel { background-color:rgba(0,0,0,0.1)!important; cursor:default!important; }
			.o-playlist-item { position:relative; }
			.o-playlist-title { left:50px; overflow:hidden; position:absolute; right:65px; text-overflow:ellipsis; top:0; white-space:nowrap; }
			.o-playlist-number { padding-left:21px; width:25px; }
			.o-playlist-length { padding-left:21px; position:absolute; right:21px; top:0; }

			.c-audioplayer {
				width: 0px; 
				height: 0px; 
				visibility: hidden;
			}

			.o-audioplayer-container {
				height: 2.5em;
				width: 80%;
				margin-left: 10%;
				color: #fff;
				text-shadow: 1px 1px 0 #000;
				border: 1px solid #222;
				position: relative;
				z-index: 1;
				background: #333;
				background: -webkit-gradient( linear, left top, left bottom, from( #444 ), to( #222 ) );
				background: -webkit-linear-gradient( top, #444, #222 );
				background: -moz-linear-gradient( top, #444, #222 );
				background: -ms-radial-gradient( top, #444, #222 );
				background: -o-linear-gradient( top, #444, #222 );
				background: linear-gradient( top, #444, #222 );
				-webkit-box-shadow: inset 0 1px 0 rgba( 255, 255, 255, .15 ), 0 0 1.25em rgba( 0, 0, 0, .5 ); 
				-moz-box-shadow: inset 0 1px 0 rgba( 255, 255, 255, .15 ), 0 0 1.25em rgba( 0, 0, 0, .5 );
				box-shadow: inset 0 1px 0 rgba( 255, 255, 255, .15 ), 0 0 1.25em rgba( 0, 0, 0, .5 );
				-webkit-border-radius: 2px;
				-moz-border-radius: 2px;
				border-radius: 2px;
			}

			.o-audioplayer-container > div {
				position: absolute;
			}

			.o-audioplayer-playpause {
				width: 2.5em; 
				height: 100%;
				text-align: center;
				cursor: pointer;
				text-decoration: none;
				z-index: 2;
				top: 0;
				left: 0;
				padding: 8px 8px 8px 8px;
			}

			.o-audioplayer-container .o-audioplayer-playpause {
				border-right: 1px solid #555;
				border-right-color: rgba( 255, 255, 255, .1 );
			}

			.o-audioplayer-playpause:hover,
			.o-audioplayer-playpause:focus {
				background-color: #222;
			}

			#c-playbutton-icon {
				color: white;
			}

			.audioplayer-time {
				width: 4.375em; 
				height: 100%;
				line-height: 2.375em; 
				text-align: center;
				z-index: 2;
				top: 0;
				text-decoration: none;
			}

			.o-audioplayer-currenttime {
				border-left: 1px solid #111;
				border-left-color: rgba( 0, 0, 0, .25 );
				left: 2.5em;
			}

			.o-audioplayer-duration {
				border-right: 1px solid #555;
				border-right-color: rgba( 255, 255, 255, .1 );
				right: 2.5em; 
			}

			.audioplayer-novolume .audioplayer-time-duration {
				border-right: 0;
				right: 0;
			}

			.o-audioplayer-bar {
				height: 0.875em; 
				background-color: #222;
				cursor: pointer;
				z-index: 1;
				top: 50%;
				right: 6.875em; 
				left: 6.875em; 
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

			.o-audioplayer-bar-loaded {
				background-color: #333;
				z-index: 1;
			}

			.o-audioplayer-bar-played {
				background: #007fd1;
				background: -webkit-gradient( linear, left top, right top, from( #007fd1 ), to( #c600ff ) );
				background: -webkit-linear-gradient( left, #007fd1, #c600ff );
				background: -moz-linear-gradient( left, #007fd1, #c600ff );
				background: -ms-radial-gradient( left, #007fd1, #c600ff );
				background: -o-linear-gradient( left, #007fd1, #c600ff );
				background: linear-gradient( left, #007fd1, #c600ff );
				z-index: 2;
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
				right: 0;
				padding: 8px 8px 8px 8px;

			}

			.o-audioplayer-volume:hover,
			.o-audioplayer-volume:focus {
				background-color: #222;
			}

			.o-audioplayer-volume-button a{
				width: 100%;
				height: 100%;
			}

			#c-volumebutton-icon {
				color: white;
				font-size: 1.3em;
			}

			
			.o-audioplayer-volume-adjust {
				height: 6.25em; 
				cursor: default;
				position: absolute;
				left: 0;
				right: -1px;
				top: -9999px;
				background: #222;
				background: -webkit-gradient( linear, left top, left bottom, from( #444 ), to( #222 ) );
				background: -webkit-linear-gradient( top, #444, #222 );
				background: -moz-linear-gradient( top, #444, #222 );
				background: -ms-radial-gradient( top, #444, #222 );
				background: -o-linear-gradient( top, #444, #222 );
				background: linear-gradient( top, #444, #222 );
				-webkit-border-top-left-radius: 2px;
				-webkit-border-top-right-radius: 2px;
				-moz-border-radius-topleft: 2px;
				-moz-border-radius-topright: 2px;
				border-top-left-radius: 2px;
				border-top-right-radius: 2px;
			}

			.o-audioplayer-volume:not(:hover) .o-audioplayer-volume-adjust {
				opacity: 0;
			}

			.o-audioplayer-volume:hover .o-audioplayer-volume-adjust {
				top: auto;
				bottom: 100%;
			}

			.o-audioplayer-volume-adjust > .o-audioplayer-volume-bar {
				width: 40%;
				height: 80%;
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
				left: 0;
				background: #007fd1;
				background: -webkit-gradient( linear, left bottom, left top, from( #007fd1 ), to( #c600ff ) );
				background: -webkit-linear-gradient( bottom, #007fd1, #c600ff );
				background: -moz-linear-gradient( bottom, #007fd1, #c600ff );
				background: -ms-radial-gradient( bottom, #007fd1, #c600ff );
				background: -o-linear-gradient( bottom, #007fd1, #c600ff );
				background: linear-gradient( bottom, #007fd1, #c600ff );
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

			.o-audioplayer-volume-adjust div div,
			.o-audioplayer-bar-played {
				-webkit-box-shadow: inset 0 0 5px rgba( 255, 255, 255, .5 );
				-moz-box-shadow: inset 0 0 5px rgba( 255, 255, 255, .5 );
				box-shadow: inset 0 0 5px rgba( 255, 255, 255, .5 );
			}

			.o-audioplayer-volume-adjust {
				-webkit-box-shadow: -2px -2px 2px rgba( 0, 0, 0, .15 ), 2px -2px 2px rgba( 0, 0, 0, .15 );
				-moz-box-shadow: -2px -2px 2px rgba( 0, 0, 0, .15 ), 2px -2px 2px rgba( 0, 0, 0, .15 );
				box-shadow: -2px -2px 2px rgba( 0, 0, 0, .15 ), 2px -2px 2px rgba( 0, 0, 0, .15 );
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

		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

AudioPlayer2.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default AudioPlayer2;