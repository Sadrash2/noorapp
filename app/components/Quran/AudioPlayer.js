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
var isPlaying = false;
var mediaPath = 'app/assets/audio/quran/';
var extension = '';
var trackCount;
var tracks = [];
var selected = 0;
var scroll = 0;

class AudioPlayer extends React.Component {
	/////add more audio? just check out GlobalQuranFunction.getAudioList() and add details into it.
	audioPlay() {
		var $ = require ('jquery')
		isPlaying = true;
		var npAction = $('#c-audio-action');
	    npAction.text('Now Playing...');
	}

	audioPause() {
		var $ = require ('jquery')
		isPlaying = false;
		var npAction = $('#c-audio-action');
	    npAction.text('Paused...');
	}

	audioEnded() {
		var $ = require ('jquery')
		var npAction = $('#c-audio-action');
		var audio = document.getElementById("c-audio-player");
		var playlistDiv = document.getElementById("o-playlist-wrap");
		npAction.text('Paused...');

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

	playlistClick(e) {
		if (e.currentTarget.id !== audioIndex) {
			var id = parseInt(e.currentTarget.id);
	        this.playTrack(id);
	    }
	}

	handleAudioPrevious() {
		var $ = require ('jquery')
		var audio = document.getElementById("c-audio-player");
		var playlistDiv = document.getElementById("o-playlist-wrap");

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
	    }
	}

	handleAudioNext() {
		var $ = require ('jquery')
		var audio = document.getElementById("c-audio-player");
		var playlistDiv = document.getElementById("o-playlist-wrap");

		if ((audioIndex + 1) <= trackCount) {
	        audioIndex++;
	        this.loadTrack(audioIndex);
	        scroll = scroll + 30;
	        playlistDiv.scrollTop = scroll;
	        if (isPlaying) {
	            audio.play();
	        }
	    } else {
	        audioIndex = 1;
	        this.loadTrack(audioIndex);
	        scroll = 0;
	        playlistDiv.scrollTop = 0;
	    }	
	}

	loadTrack(id) {
		var $ = require ('jquery')
		var npTitle = $('#c-audio-title');
		var audio = document.getElementById("c-audio-player");
		$('#plList #' + selected + '').removeClass('plSel');
		selected = id;
	    $('#plList #' + id + '').addClass('plSel');
	    npTitle.text(tracks[id-1].name);
	    audioIndex = id;
	    var obj = extension.split(".");
	    audio.setAttribute('src', mediaPath + tracks[id-1].file + extension);
	    audio.setAttribute('type', "audio/"+obj[1]);
	   	audio.pause();
	   	audio.load();
	}

	playTrack(id) {
	    this.loadTrack(id);
	    var $ = require ('jquery')
	    var audio = document.getElementById("c-audio-player");
	    //set what time start to play the audio
	    audio.currentTime = 10;
	    audio.play();

		// Assign an ontimeupdate event to the video element, and execute a function if the current playback position has changed
		audio.ontimeupdate = function() {myFunction()};

		function myFunction() {
		    // Display the current position of the video in a p element with id="demo"
		    console.log(Math.floor(audio.currentTime));
		}
	}

	loadAudioPlayer() {
		var $ = require ('jquery')
		$( "#plList" ).empty();
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
				$( "#plList" ).append($('<li></li>')
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
	        var npAction = $('#c-audio-action');
	        var npTitle = $('#c-audio-action');
	        this.audioEnded = this.audioEnded.bind(this);
	        this.playlistClick = this.playlistClick.bind(this);
	        $('#c-audio-player').bind('play', this.audioPlay).bind('pause', this.audioPause).bind('ended', this.audioEnded);
	       	$('#plList li').bind('click', this.playlistClick);
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
     	<InlineCss stylesheet={AudioPlayer.css(this.props.arabic)} namespace="AudioPlayer">
     		<div className="o-audio-container">
     			<div className="column center">
			        <h1>HTML5 Audio Player</h1>
			        <h6>responsive playlist</h6>
			    </div>
			    <div className="column">
			        <div id="o-main-wrap">
			            <div className="o-now-playing">
			                <span className="left" id="c-audio-action">Paused</span>
			                <span className="right" id="c-audio-title"></span>
			            </div>
			            <div className="o-audio-wrap">
			                <div id="audio0">
			                    <audio id="c-audio-player" src="app/assets/audio/quran/001.mp3" controls="controls">
			                     	
			                    	Your browser does not support HTML5 Audio!
			                    </audio>
			                </div>
			                <div className="o-track-wrap">
			                    <a id="btnPrev" onClick={this.handleAudioPrevious.bind(this)} className="c-track-button">&laquo;</a>
			                    <a id="btnNext" onClick={this.handleAudioNext.bind(this)} className="c-track-button">&raquo;</a>
			                </div>
			            </div>
			        </div>
			    </div>
			    <div id="o-playlist-wrap" className="o-playlist-wrap">
	                <ul id="plList">
	                   
	                </ul>
	            </div>
     		</div>
     	</InlineCss>
    );
  }

  static css(arabicToggle) {

		const base = `
			& {
				padding-top: 65px;
			}

			* {
				-moz-transition:all 100ms ease;
				-o-transition:all 100ms ease;
				-webkit-transition:all 100ms ease;
				transition:all 100ms ease;
			}

			.o-audio-container { 
				position:relative; 
				margin:0 auto; 
				width:700px; 
			}

			{/* Tablet (Portrait)
			================================================== */}

			@media only screen and (min-width: 768px) and (max-width: 959px) {
				.o-audio-container { width:556px; }
			}


			{/* Mobile (Portrait)
			================================================== */}

			@media only screen and (max-width: 767px) {
				.o-audio-container { width:300px; }
			}


			{/* Mobile (Landscape)
			================================================== */}

			@media only screen and (min-width: 480px) and (max-width: 767px) {
				.o-audio-container { width:420px; }
			}

			.column { width:inherit; }
			.center { text-align:center; }
			.left { float:left; }
			.right { float:right; }
			.add-bottom { margin-bottom:20px !important; }
			.o-now-playing { 
				display:inline;
				-moz-user-select: none; 
				-webkit-user-select: none; 
				-ms-user-select:none; 
				user-select:none;
				-o-user-select:none; 
			}
			.o-audio-wrap { 
				background-color:#231F20; 
				margin:0 auto; 
			}

			.o-track-wrap { 
				min-height:65px; 
				position:relative; 
				text-align:center; 
				text-decoration:none; 
				top:13px;
				-moz-user-select: none; 
				-webkit-user-select: none; 
				-ms-user-select:none; 
				user-select:none;
				-o-user-select:none; 
			}

			#c-audio-title { 
				margin:0; 
				padding:21px; 
				text-align:right; 
			}
			#c-audio-action { 
				padding:21px; 
				position:absolute; 
			}

			audio { 
				width:100%; 
				padding:0 15px 0 15px; 
				
			}
			
			.c-track-button {
				background-color: #231F20;
			    color: #C8C7C8;
			    cursor: pointer;
			    font-size: 50px;
			    margin: 0;
			    padding: 0 27px 10px;
			    text-decoration: none;
			}

			.c-track-button:hover {
				background-color: rgba(255,255,255, 0.1);
				color: white;
			}

			ul { list-style:none; }
			#o-playlist-wrap { 
				margin:0 auto;
			    height: 200px;
			    overflow-y: auto;
			    overflow-x:hidden;
			}
			#o-playlist-wrap::-webkit-scrollbar {
			    width: 12px;
			}

			#o-playlist-wrap::-webkit-scrollbar-track {
			    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
			    background-color:rgb(16,16,16); 
			}

			#o-playlist-wrap::-webkit-scrollbar-thumb {
			    border-radius: 10px;
			    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);
			    background-color:rgb(64,64,64); 
			}
			#plList { margin:0; }
			#plList li { background-color:rgb(16,16,16); cursor:pointer; margin:0; padding:21px 0; }
			#plList li:hover { background-color:rgba(0,0,0,0.1)!important; cursor:default!important; }
			.plSel { background-color:rgba(0,0,0,0.1)!important; cursor:default!important; }
			.o-playlist-item { position:relative; }
			.o-playlist-title { left:50px; overflow:hidden; position:absolute; right:65px; text-overflow:ellipsis; top:0; white-space:nowrap; }
			.o-playlist-number { padding-left:21px; width:25px; }
			.o-playlist-length { padding-left:21px; position:absolute; right:21px; top:0; }
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

AudioPlayer.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default AudioPlayer;