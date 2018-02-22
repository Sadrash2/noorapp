import React from "react";
import lang from "../../languages/lang";
import InlineCss from "react-inline-css";
import colors from "../../scss/colors";
import {Link, RouterContext} from "react-router";
import ReactDOM from "react-dom";
import config from "../../config";
import globalFunction from "../../components/GlobalFunction";
import Footer from "../Footer";
import globalQuranFunction from "../../components/Quran/GlobalQuranFunction";
import GlobalBetaFunction from "../../components/ClosedBeta/GlobalBetaFunction";
import Cookies from "../../components/Cookies";
import calldata from "../../components/apiCall";
import css from "./quranCSS";
import Draggable, {DraggableCore} from 'react-draggable';
import globalBetaFunction from "../../components/ClosedBeta/GlobalBetaFunction";

var Menu = require('react-burger-menu').slide;
var $ = require('jquery');
//quranArray hold all the verse from one sura
var quranArray=[], favouriteQuranArray=[], checkpointArray=[], suraArray = [], suraArabicArray = [], preSelect, DocBody, DocBody2;
var pageCheck=0, scroll = 0, selected = 0, readmorePageCheck = 0, menuWidth=350;
var quranLanguage = "AyahTextEnglish";
var isFullscreen = false, isNightMode = false, isPageMode=true, isLogin=false, isFavourite=false, isReadmore=false, previousCheck =false, nextCheck = false, isMenuOpen = false;
var windowHeight=0, windowWidth=0;
var buttonX=-60, buttonY=0;
var resizeTimer;
//audioplayer
var isPlaying, isMute = false;
var mediaPath = 'http://beta.noor.me/audio/abdulrahman_alsudaes/';
var extension = '';
var trackNumber;

var betaEmail, token;
var feedbackSession = false;

class QuranMainNew extends React.Component {
	//TO change how is the textarea show Locate to this.loadQuran() -> quranSetter() 

	///////////////////////AUDIO PLAYER//////////////////////////////
	//audio play pause button
	handlePlay(e) {
		var audio = document.getElementById("c-audioplayer");
		if (isPlaying == false) {
			if(isNightMode == false){
				document.getElementById('c-playbutton-icon').className='fa fa-pause';
			} else {
				document.getElementById('c-playbutton-icon').className='fa fa-pause isNightMode';
			}			
			audio.play();
			isPlaying = true;
		} else {
			if(isNightMode == false){
				document.getElementById('c-playbutton-icon').className='fa fa-play';
			} else {
				document.getElementById('c-playbutton-icon').className='fa fa-play isNightMode';
			}
			audio.pause();
			isPlaying = false;
		}
	}

	//when the mp3 ended
	audioEnded() {
		var audio = document.getElementById("c-audioplayer");
		var playlistDiv = document.getElementById("o-playlist-wrap");
		var loadedBar = document.getElementById("o-audioplayer-bar-loaded");

		document.getElementById("o-audioplayer-currenttime").innerHTML = "00:00";
		loadedBar.style.width = 0 + '%';

		audio.currentTime=0;
		document.getElementById('c-playbutton-icon').className='fa fa-play';
		audio.pause();
		isPlaying = false;
	}

	handleVolume() {
		var audio = document.getElementById("c-audioplayer");
		var volumePlayedBar = document.getElementById("o-audioplayer-volume-bar-played");
		if (isMute == false) {
			audio.muted = true;
			volumePlayedBar.style.height = 0 + "%";
			if (isNightMode == false) {
				document.getElementById('c-volumebutton-icon').className='fa fa-volume-off';
			} else {
				document.getElementById('c-volumebutton-icon').className='fa fa-volume-off isNightMode';
			}
			isMute = true;
		} else {
			audio.muted = false;
			if (audio.volume >= 0.50) {
				var newVolume = audio.volume * 100;
				volumePlayedBar.style.height = newVolume + "%";
				if (isNightMode == false) {
					document.getElementById('c-volumebutton-icon').className='fa fa-volume-up';
				} else {
					document.getElementById('c-volumebutton-icon').className='fa fa-volume-up isNightMode';
				}
			} else if (audio.volume == 0) {

			}else {
				var newVolume = audio.volume * 100;
				volumePlayedBar.style.height = newVolume + "%";
				if (isNightMode == false) {
					document.getElementById('c-volumebutton-icon').className='fa fa-volume-down';
				} else {
					document.getElementById('c-volumebutton-icon').className='fa fa-volume-down isNightMode';
				}
			}
			isMute = false;
		}
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

		//update audioDuration time //bar clicked event
		audio.addEventListener('loadedmetadata', function audioLoaded() {
			document.getElementById("o-audioplayer-currenttime").innerHTML = "00:00";
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
				var h = window.innerHeight;
				var mouseX = e.pageY - h + 78;
				var newVolume = (100 / volumeBar.clientHeight) * mouseX;
				volume.style.height = Math.abs(Math.floor(newVolume)) + "%";
				if (Math.abs(Math.floor(newVolume)) >= 50) {
					if (isNightMode == false) {
						document.getElementById('c-volumebutton-icon').className='fa fa-volume-up';
					} else {
						document.getElementById('c-volumebutton-icon').className='fa fa-volume-up isNightMode';
					}			
				} else {
					if (isNightMode == false) {
						document.getElementById('c-volumebutton-icon').className='fa fa-volume-down';
					} else {
						document.getElementById('c-volumebutton-icon').className='fa fa-volume-down isNightMode';
					}
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

	//get time duration of the audio and return time format example: 00:20
	secondsToTime(secs) {
		var hours = Math.floor( secs / 3600 ), minutes = Math.floor( secs % 3600 / 60 ), seconds = Math.ceil( secs % 3600 % 60 );
		return ( hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0'+hours+':' : hours+':' ) + ( minutes.toString().length < 2 ? '0'+minutes : minutes ) + ':' + ( seconds.toString().length < 2 ? '0'+seconds : seconds );
	}

	//exmaple : 005, 055, 112
	numberFormatFunction(str, max) {
		return str.length < max ? this.numberFormatFunction("0" + str, max) : str;
	}	

	loadTrack(number) {
		
		//var npTitle = $('#c-audio-title');
		var audio = document.getElementById("c-audioplayer");

		//when load for the first time
		if (isPlaying == undefined) {
			audio.volume=1;
			isPlaying = false;
			if(isNightMode == false){
				document.getElementById('c-playbutton-icon').className='fa fa-play';
			} else {
				document.getElementById('c-playbutton-icon').className='fa fa-play isNightMode';
			}
		}
		else if (isPlaying == true) {
			if(isNightMode == false){
				document.getElementById('c-playbutton-icon').className='fa fa-pause';
			} else {
				document.getElementById('c-playbutton-icon').className='fa fa-pause isNightMode';
			}
			
		} else if (isPlaying == false) {
			if(isNightMode == false){
				document.getElementById('c-playbutton-icon').className='fa fa-play';
			} else {
				document.getElementById('c-playbutton-icon').className='fa fa-play isNightMode';
			}			
		}
		var numberString = number.toString();
		var audioNumber = this.numberFormatFunction(numberString, 3);
	    var obj = extension.split(".");
	    audio.setAttribute('src', mediaPath + audioNumber + extension);
	    audio.setAttribute('type', "audio/"+obj[1]);
	   	audio.load();
	   	if(isNightMode == false){
			document.getElementById('c-playbutton-icon').className='fa fa-play';
		} else {
			document.getElementById('c-playbutton-icon').className='fa fa-play isNightMode';
		}
		audio.pause();
		isPlaying = false;
		document.getElementById("o-audioplayer-currenttime").innerHTML = "Loading";
		document.getElementById("o-audioplayer-duration").innerHTML = "...";
		document.getElementById("o-audioplayer-bar-played").style.width = 0 + "%";
	   	document.getElementById("c-download-button").href="app/bridge/classes/downloadAudio.php?path=" + mediaPath + audioNumber + extension; 
	   	//audio event listener
	   	this.audioEventListener();
	}

	loadAudioPlayer(number) {
		$( "#c-playlist" ).empty();
		// html5media enables <video> and <audio> tags in all major browsers
		// HTML5 audio player + playlist controls...
		trackNumber = number;
	    var supportsAudio = !!document.createElement('audio').canPlayType;
	    if (supportsAudio) {
	        //var npAction = $('#c-audio-action');
	        //var npTitle = $('#c-audio-action');
	        this.audioEnded = this.audioEnded.bind(this);
	        $('#c-audioplayer').bind('ended', this.audioEnded);
	       	var obj = document.createElement('audio');
	       	extension = obj.canPlayType('audio/mp3') ? '.mp3' : obj.canPlayType('audio/ogg') ? '.ogg' : '';
	       	if (quranLanguage == "AyahTextEnglish") {
	       		var splitter = suraArray[number - 1];
	       		var stringArray = splitter.split(' ');
	       		document.getElementById('o-audioplayer-track-title').innerHTML = stringArray[1];
	       	} else {
	       		var splitter = suraArabicArray[number - 1];
	       		var stringArray = splitter.split(' ');
	       		document.getElementById('o-audioplayer-track-title').innerHTML = stringArray[1]+" "+stringArray[2];
	       	}
	        this.loadTrack(number);
	    }   	  
	}

	handleDownload() {
		window.location=document.getElementById("c-download-button").href;
	}

	/////////////////////////////////////////////////////////////////////

	//readmore mode button click event
	handleViewFlip() {
		var flipmode;
		var juzArray = globalQuranFunction.getJuzList("english");
		var juzArabicArray = globalQuranFunction.getJuzList("arabic");
		//empty the text area
		$( "#o-text-area" ).empty();
		if (isReadmore == false) {
			$('#c-previous-button').hide();
			$('#c-next-button').hide();
			$('#c-readmore-button').show();
			isReadmore = true;
			flipmode = "readmode";
			var ayaDropdownCheck = false;
			var newAyaID = 0;
			for (var i = 0; i < quranArray.length; i ++) {
				//set suraayaDropdown value (ayaDropdownCheck is to make sure it only run once when the loop start from the page)
				if (ayaDropdownCheck == false) {
					newAyaID = quranArray[i].VerseID;
					ayaDropdownCheck = true;
					//set page and juz title
					if (quranLanguage == "AyahTextArabic") {
						//document.getElementById('c-page-title-label').innerHTML = globalQuranFunction.convertNumberDigitToArabic(quranArray[i].PageID);
						document.getElementById('c-juz-title-label').innerHTML = juzArabicArray[parseInt(quranArray[i].JuzID) - 1];
						if (parseInt(quranArray[0].SuraID) != 1) {
							document.getElementById('c-sura-starter-label').innerHTML = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
						}
					} else {
						//document.getElementById('c-page-title-label').innerHTML = quranArray[i].PageID;
						document.getElementById('c-juz-title-label').innerHTML = juzArray[parseInt(quranArray[i].JuzID) - 1];
						if (parseInt(quranArray[0].SuraID) != 1) {
							document.getElementById('c-sura-starter-label').innerHTML = "In the name of Allah, the Beneficent, the Merciful";
						}
					}
				}
				preSelect = newAyaID;
				$('#c-quran-text-'+(parseInt(newAyaID) - 1)).addClass('active');
				if (quranArray[parseInt(quranArray.length) - 1].PageID == pageCheck) {
					$('.o-nextprevious-wrapper').show();
					$('#c-readmore-button').hide();
				}
				if (quranArray[i].PageID <= pageCheck) {
					this.quranSetter(i, "viewflip");
				} else {
					break;
				}
			}
			//this.favouriteSetter();
			this.translationButtonBottom(parseInt(quranArray[0].SuraID));
		} else {
			var suraID = parseInt(quranArray[0].SuraID);
			this.translationButtonMain(suraID);
			$('#c-readmore-button').hide();
			$('.o-nextprevious-wrapper').hide();
			$('.o-spinner-wrapper').hide();
			isReadmore = false;
			flipmode = "pagemode";
			var ayaDropdownCheck = false;
			var newAyaID = 0;
			for (var i = 0; i < quranArray.length; i ++) { 
				//if pagecheck -1 equal to quranArray
				if (pageCheck == parseInt(quranArray[i].PageID)) {
					//set suraayaDropdown value (ayaDropdownCheck is to make sure it only run once when the loop start from the page)
					if (ayaDropdownCheck == false) {
						newAyaID = parseInt(quranArray[i].VerseID);
						ayaDropdownCheck = true;
						if (parseInt(quranArray[0].SuraID) != 1) {
							if (newAyaID == 1) {
								if (quranLanguage == "AyahTextArabic") {
									document.getElementById('c-sura-starter-label').innerHTML = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
								} else {
									document.getElementById('c-sura-starter-label').innerHTML = "In the name of Allah, the Beneficent, the Merciful";
								}
							} else {
								document.getElementById('c-sura-starter-label').innerHTML = "";
							}
						}

					}
					//set page and juz title
					if (quranLanguage == "AyahTextArabic") {
							//document.getElementById('c-page-title-label').innerHTML = globalQuranFunction.convertNumberDigitToArabic(quranArray[i].PageID);
							document.getElementById('c-juz-title-label').innerHTML = juzArabicArray[parseInt(quranArray[i].JuzID) - 1];
					} else {
							//document.getElementById('c-page-title-label').innerHTML = quranArray[i].PageID;
							document.getElementById('c-juz-title-label').innerHTML = juzArray[parseInt(quranArray[i].JuzID) - 1];
					}
					this.quranSetter(i, "viewflip");
				}
				preSelect = newAyaID;
				$('#c-quran-text-'+(parseInt(newAyaID) - 1)).addClass('active');
				if (quranArray[i].PageID > pageCheck) {
					break;
				}
			}
			//this.favouriteSetter();
		}
		if (isLogin == true) {
			var opt = {"email":betaEmail,"changemode":flipmode}
			calldata.passFormDataWithoutCallback("UserData", "updateChangeMode", opt)	
		}
	}

	translationButtonMain(suraID) {
		if (quranLanguage == "AyahTextArabic") {
			document.getElementById("c-next-button").onclick = this._handlePrevious.bind(this);
			document.getElementById("c-previous-button").onclick = this._handleNext.bind(this);
			//hide previous button in 1st page and hide next button in last page
			if (parseInt(suraID) == 1) {
				$('#c-previous-button').show();
				$('#c-next-button').hide();
			} else if (parseInt(suraID) == 114) {
				$('#c-next-button').show();
				$('#c-previous-button').hide();
			}else {
				$('#c-previous-button').show();
				$('#c-next-button').show();
			}
		} else {
			document.getElementById("c-next-button").onclick = this._handleNext.bind(this);
			document.getElementById("c-previous-button").onclick = this._handlePrevious.bind(this);
			//hide previous button in 1st page and hide next button in last page
			if (parseInt(suraID) == 1) {
				$('#c-previous-button').hide();
				$('#c-next-button').show();
			} else if (parseInt(suraID) == 114) {
				$('#c-next-button').hide();
				$('#c-previous-button').show();
			}else {
				$('#c-previous-button').show();
				$('#c-next-button').show();
			}
		}
	}

	translationButtonBottom(suraID) {
		if (quranLanguage == "AyahTextArabic") {
			document.getElementById("c-readmore-next-button").onclick = this.handlePreviousSura.bind(this);
			document.getElementById("c-readmore-previous-button").onclick = this.handleNextSura.bind(this)
			//hide previous button in 1st page and hide next button in last page
			if (parseInt(suraID) == 1) {
				$('#c-readmore-previous-button').show();
				$('#c-readmore-next-button').hide();
			} else if (parseInt(suraID) == 114) {
				$('#c-readmore-next-button').show();
				$('#c-readmore-previous-button').hide();
			}else {
				$('#c-readmore-previous-button').show();
				$('#c-readmore-next-button').show();
			}
		} else {
			document.getElementById("c-readmore-next-button").onclick = this.handleNextSura.bind(this);
			document.getElementById("c-readmore-previous-button").onclick = this.handlePreviousSura.bind(this)
			//hide previous button in 1st page and hide next button in last page
			if (parseInt(suraID) == 1) {
				$('#c-readmore-previous-button').hide();
				$('#c-readmore-next-button').show();
			} else if (parseInt(suraID) == 114) {
				$('#c-readmore-next-button').hide();
				$('#c-readmore-previous-button').show();
			}else {
				$('#c-readmore-previous-button').show();
				$('#c-readmore-next-button').show();
			}
		}
	}

	///readMore Mode next button
	handleNextSura() {
		selected = parseInt(quranArray[0].SuraID);		
		this.loadQuran("next", parseInt(quranArray[0].SuraID) + 1, 1);
	}
	///readMore Mode previous button
	handlePreviousSura() {
		selected = parseInt(quranArray[0].SuraID) - 2;
		this.loadQuran("previous", parseInt(quranArray[0].SuraID) - 1, 1);
	}

	quranSetter(i, type) {
		var juzArray = globalQuranFunction.getJuzList("english");
		var juzArabicArray = globalQuranFunction.getJuzList("arabic");
		var iconClass, textClass, lineClass;
		if (isNightMode == false){
			iconClass = "c-text-icon";
			textClass = "c-text";
			lineClass = "o-ayamode-div";
		} else {
			iconClass = "c-text-icon isNightMode";
			textClass = "c-text isNightMode";
			lineClass = "o-ayamode-div isNightMode";
		}
		var arabicNumber = globalQuranFunction.converter2((parseInt(i)+1).toString());
		//push aya from the quranArray of the current Sura into the textarea.
		if (quranLanguage == "AyahTextArabic") {
			if (isPageMode == true) {
					//PageMode
					$( "#o-text-area" ).removeClass('text-left');
					$( "#o-text-area" ).removeClass('arabic-text');
					$('#o-text-area')
				        .append('<span id="c-quran-text-'+i+'" class="'+textClass+'" data-content-id="'+quranArray[i].VerseID+'">'
				               	+ (quranLanguage == "AyahTextEnglish" ? quranArray[i].AyahTextEnglish : quranArray[i].AyahTextArabic)
				               	+ '<span id="c-quran-text-icon-'+i+'" class="'+iconClass+'">'
				               	+ arabicNumber
				               	+ '</span>'
				               	+ '</span>');
					$( "#o-text-area" ).addClass('text-left');
					$( "#o-text-area" ).addClass('arabic-text');
			} else {
					//SuraMode
					$( "#o-text-area" ).removeClass('text-left');
					$( "#o-text-area" ).removeClass('arabic-text');
					$('#o-text-area')
				        .append('<div id="div-'+i+'" class="'+lineClass+'">'
				        		+'<span id="c-quran-text-'+i+'" class="'+textClass+'" data-content-id="'+quranArray[i].VerseID+'">'
				         	   	+ '<span id="c-quran-text-icon-'+i+'" class="'+iconClass+'">'
				               	+ arabicNumber
				               	+ '</span>'
				               	+ (quranLanguage == "AyahTextEnglish" ? quranArray[i].AyahTextEnglish : quranArray[i].AyahTextArabic)
				               	+ '</span>'
				               	+ '</div>');
					$( "#o-text-area" ).addClass('text-right');
			}
		} else {
			if (isPageMode == true) {
				$( "#o-text-area" ).removeClass('text-right');
				$( "#o-text-area" ).removeClass('arabic-text');
				$('#o-text-area')
			        .append('<span id="c-quran-text-'+i+'" class="'+textClass+'" data-content-id="'+quranArray[i].VerseID+'">'
			         	   	+ '<span id="c-quran-text-icon-'+i+'" class="'+iconClass+'">'
			               	+ (parseInt(i) + 1)
			               	+ '</span>'
			               	+ (quranLanguage == "AyahTextEnglish" ? quranArray[i].AyahTextEnglish : quranArray[i].AyahTextArabic)
			               	+ '</span>');
				    
				$( "#o-text-area" ).addClass('text-left');
			} else {
				$( "#o-text-area" ).removeClass('text-right');
				$( "#o-text-area" ).removeClass('arabic-text');
				$('#o-text-area')
			        .append('<div id="div-'+i+'" class="'+lineClass+'">'
			        		+'<span id="c-quran-text-'+i+'" class="'+textClass+'" data-content-id="'+quranArray[i].VerseID+'">'
			         	   	+ '<span id="c-quran-text-icon-'+i+'" class="'+iconClass+'">'
			               	+ (parseInt(i) + 1)
			               	+ '</span>'
			               	+ (quranLanguage == "AyahTextEnglish" ? quranArray[i].AyahTextEnglish : quranArray[i].AyahTextArabic)
			               	+ '</span>'
			               	+ '</div>');
				$( "#o-text-area" ).addClass('text-left');
			}	
		}

		//span(quran-text)click event
		$("#c-quran-text-"+i).click(function(){
			var selectedClassName = $('#c-quran-text-' + ($(this).data('content-id') - 1)).attr('class');
			/*if (selectedClassName == "c-text is-favourite") {
				isFavourite = true;
				$( ".c-favourite-span" ).addClass('favourite');
				$( ".c-favourite-span-in" ).text('Saved to favourite');
			} else {
				isFavourite = false;
				$( ".c-favourite-span" ).removeClass('favourite');
				$( ".c-favourite-span-in" ).text('Save to favourite');
			}*/
			$('#c-quran-text-'+($(this).data('content-id') - 1)).addClass('active');
			if(preSelect != $(this).data('content-id')){
				$('#c-quran-text-'+(preSelect-1)).removeClass('active');
				preSelect = $(this).data('content-id');
			}

			if (type == "viewflip") {
				if (isReadmore == true) {
					for (var i = 0; i < quranArray.length; i ++) {
						if ($(this).data('content-id') == quranArray[i].VerseID) {
							//set page and juz title
							if (quranLanguage == "AyahTextArabic") {
									//document.getElementById('c-page-title-label').innerHTML = globalQuranFunction.convertNumberDigitToArabic(quranArray[i].PageID);
									document.getElementById('c-juz-title-label').innerHTML = juzArabicArray[parseInt(quranArray[i].JuzID) - 1];
							} else {
									//document.getElementById('c-page-title-label').innerHTML = quranArray[i].PageID;
									document.getElementById('c-juz-title-label').innerHTML = juzArray[parseInt(quranArray[i].JuzID) - 1];
							} 
						}
					}
				}
			}
		})
	}

	//need modify, if decided to add on favourite function
	favouriteSetter() {
		//if user is login, get favouriteSuraAya
		if (isLogin == true) {
			//setFavouriteSuraAya CSS
			if (isReadmore == false) {
				for (var i = 0; i < quranArray.length; i ++) {
					if (quranArray[i].PageID  == pageCheck) {
						for (var a = 0; a < favouriteQuranArray.length; a++) {
							if (quranArray[i].VerseID == favouriteQuranArray[a].VerseID) {
								$('#c-quran-text-'+(parseInt(quranArray[i].VerseID) - 1)).addClass('is-favourite');
								break;
							} 
						}
					}
				}
			} else {
				for (var i = 0; i < quranArray.length; i ++) {
					if (quranArray[i].PageID  <= pageCheck) {
						for (var a = 0; a < favouriteQuranArray.length; a++) {
							if (quranArray[i].VerseID == favouriteQuranArray[a].VerseID) {
								$('#c-quran-text-'+(parseInt(quranArray[i].VerseID) - 1)).addClass('is-favourite');
								break;
							} 
						}
					}
				}
			}	
		}

		//set favourite button and function
		var selectedClassName = $('#c-quran-text-' + (preSelect - 1)).attr('class');	
		if (selectedClassName == "c-text active is-favourite") {
			isFavourite = true;
			$( ".c-favourite-span" ).addClass('favourite');
			$( ".c-favourite-span-in" ).text('Saved to favourite');
		} else {
			isFavourite = false;
			$( ".c-favourite-span" ).removeClass('favourite');
			$( ".c-favourite-span-in" ).text('Save to favourite');
		}
	}
	//need modify, if decided to add on favourite function
	_handleFavourite(e) {
		var email = betaEmail;
		if (isFavourite == true) {
			globalQuranFunction.deleteFavouriteSuraAya(email, quranArray[0].SuraID, preSelect);
			alert("Removed Favourite Aya successfully");
		} else {
			globalQuranFunction.addFavouriteSuraAya(email, quranArray[0].SuraID, preSelect);
			alert("Added Favourite Aya successfully");
		}
		var selectedClassName = $('#c-quran-text-' + preSelect).attr('class');
					if (selectedClassName == "c-text is-favourite active") {
						isFavourite = true;
						$( ".c-favourite-span" ).addClass('favourite');
						$( ".c-favourite-span-in" ).text('Saved to favourite');
					} else {
						isFavourite = false;
						$( ".c-favourite-span" ).removeClass('favourite');
						$( ".c-favourite-span-in" ).text('Save to favourite');
					}
		//load the current page into text area with view
		for (var i = 0; i < quranArray.length; i ++) {
			 if (quranArray[i].PageID == pageCheck) {
			 	this.loadQuran("translation", quranArray[i].SuraID, preSelect + 1);
			 	break;
			 }
		}	
	}

	//fullscreen function after clicking on the button
	toggleFullScreen() {
		//fullscreen this div
		DocBody = document.getElementById("o-quran-container");
		// Entering fullscreen mode
		if(isFullscreen == false){
			//window fullscreen api
			if(DocBody.requestFullScreen){
			    DocBody.requestFullScreen();
			} else if(DocBody.webkitRequestFullscreen){
			    DocBody.webkitRequestFullscreen();
			} else if(DocBody.mozRequestFullScreen){
			    DocBody.mozRequestFullScreen();
			} else if(DocBody.msRequestFullscreen){
			    DocBody.msRequestFullscreen();
			}
			$('#c-viewflipmode-button').removeClass('settings-button');
			$('#c-translation-button').removeClass('settings-button');
			$('#c-nightmode-button').removeClass('settings-button');
			$('#c-viewmode-button').removeClass('settings-button');
			$('#o-topbar-container > div > .bm-burger-button').addClass('active');
			isFullscreen = true;
			 //$( '#o-quran-container' ).style.width(window.screen.width+"px");
			 //$( '#o-quran-container' ).style.height(window.screen.height+"px");
		} else {
			//window fullscreen api close function ESC button to close
			if(document.cancelFullScreen){
				//console.log("cancel");
			    document.cancelFullScreen();
			} else if(document.exitFullScreen){
				//console.log("exit");
			    document.exitFullScreen();
			} else if(document.mozCancelFullScreen){
				//console.log("mozcancel");
			    document.mozCancelFullScreen();
			} else if(document.webkitCancelFullScreen){
				//console.log("webkit");
			    document.webkitCancelFullScreen();
			} else if(document.msExitFullscreen){
				//console.log("ms");
			    document.msExitFullscreen();
			}
			$('#o-topbar-container > div > .bm-burger-button').removeClass('active');
			isFullscreen = false;
			//$( '#o-quran-container' ).style.width("100%");
			//$( '#o-quran-container' ).style.height("100%");
		}
	}

	//nightandday mode function after clicking on the button
	handleNightMode() {
		this.nightmodeFunction("button");
	}

	nightmodeFunction(state) {
		var boolean = true;
		var nightmode;
		if (state == "first") {
			boolean = true;
		} else {
			boolean = false;
		}
		if(isNightMode == boolean){
			//nightmode css
			//change the classname to change the css of the div
			$( "#c-nightmode-button i" ).removeClass('fa fa-moon-o').addClass('fa fa-sun-o');
			document.getElementById('o-main-container').className='is-nightmode_o-main-container';
			document.getElementById('o-quran-container').className='o-quran-container_isNightMode';
			document.getElementById('o-title-area').className='is-nightmode_o-title-area';
			document.getElementById('o-topbar-container').className='is-nightmode_o-topbar-container';
			document.getElementById('o-bottom-container').className='is-nightmode_o-bottom-container';
			$('#o-topbar-container > div > .bm-burger-button > span > .bm-burger-bars').addClass('isNightMode');
			$('.c-quran-title').addClass('isNightMode');
			$('.c-topbar-button').addClass('isNightMode');
			$('.c-title-label').addClass('isNightMode');
			$('.c-juz-title-label').addClass('isNightMode');
			$('.c-previous-button').addClass('isNightMode');
			$('.c-next-button').addClass('isNightMode');
			$('.c-text').addClass('isNightMode');
			$('.c-text.is-favourite').addClass('isNightMode');
			$('.c-text-icon').addClass('isNightMode');
			$('.c-translation-button').addClass('isNightMode');	
			$('.c-viewflipmode-button').addClass('isNightMode');
			$('.c-readmore-button').addClass('isNightMode');
			$('.c-readmore-previous-button').addClass('isNightMode');
			$('.c-readmore-next-button').addClass('isNightMode');
			$('.o-audioplayer-container').addClass('isNightMode');
			$('#c-playbutton-icon').addClass('isNightMode');
			$('#c-volumebutton-icon').addClass('isNightMode');
			$('#c-download-icon').addClass('isNightMode');
			$('#c-spinner-icon').addClass('isNightMode');
			$('.c-readmore-next-button').addClass('isNightMode');
			$('.o-ayamode-div').addClass('isNightMode');
			if (state == "button") {
				isNightMode = true;
				nightmode = "on";
			}
		} else {
			//daymode css
			$( "#c-nightmode-button i" ).removeClass('fa fa-sun-o').addClass('fa fa-moon-o');
			document.getElementById('o-main-container').className='is-daymode_o-main-container';
			document.getElementById('o-quran-container').className='o-quran-container_isDayMode';
			document.getElementById('o-title-area').className='is-daymode_o-title-area';
			document.getElementById('o-topbar-container').className='is-daymode_o-topbar-container';
			document.getElementById('o-bottom-container').className='is-daymode_o-bottom-container';
			$('#o-topbar-container > div > .bm-burger-button > span > .bm-burger-bars').removeClass('isNightMode');
			$('.c-quran-title').removeClass('isNightMode');
			$('.c-topbar-button').removeClass('isNightMode');
			$('.c-title-label').removeClass('isNightMode');
			$('.c-juz-title-label').removeClass('isNightMode');
			$('.c-previous-button').removeClass('isNightMode');
			$('.c-next-button').removeClass('isNightMode');
			$('.c-text').removeClass('isNightMode');
			$('.c-text.is-favourite').removeClass('isNightMode');
			$('.c-text-icon').removeClass('isNightMode');
			$('.c-translation-button').removeClass('isNightMode');
			$('.c-viewflipmode-button').removeClass('isNightMode');
			$('.c-readmore-button').removeClass('isNightMode');
			$('.c-readmore-previous-button').removeClass('isNightMode');
			$('.c-readmore-next-button').removeClass('isNightMode');
			$('.o-audioplayer-container').removeClass('isNightMode');
			$('#c-playbutton-icon').removeClass('isNightMode');
			$('#c-volumebutton-icon').removeClass('isNightMode');
			$('#c-download-icon').removeClass('isNightMode');
			$('#c-spinner-icon').removeClass('isNightMode');
			$('.c-readmore-next-button').removeClass('isNightMode');
			$('.o-ayamode-div').removeClass('isNightMode');
			if (state == "button") {
				isNightMode = false;
				nightmode = "off";
			}
		}
		if (isLogin == true) {
			var opt = {"email":betaEmail,"nightmode":nightmode}
			calldata.passFormDataWithoutCallback("UserData", "updateNightMode", opt)
		}
	}

	//sura mode function after clicking on the button
	handleViewMode() {
		var viewmode;
		if(isPageMode == false){
			isPageMode = true;
			viewmode = "suraview";
		} else {
			isPageMode = false;
			viewmode = "ayaview";
		}
		//load the current page into text area with view
		for (var i = 0; i < quranArray.length; i ++) {
			 if (quranArray[i].PageID == pageCheck) {
			 	this.loadQuran("translation", parseInt(quranArray[i].SuraID), parseInt(quranArray[i].VerseID));
			 	break;
			 }
		}
		if (isLogin == true) {
			var opt = {"email":betaEmail,"viewmode":viewmode}
			calldata.passFormDataWithoutCallback("UserData", "updateViewMode", opt)
		}
	}

	//change translation of the quran after clicking on the button
	_handleTranslation(e) {
		var translation;
		//if the current quran language is english(default)
		if (quranLanguage == "AyahTextEnglish") {
			//change to arabic
			quranLanguage = "AyahTextArabic";
			$( "#c-translation-button" ).text("English");
			translation = "ar";
			quranLanguage = "AyahTextArabic";
			$('#o-search-firstpage').addClass('text-right');
			$('#c-firstpage-title').empty();
			$('#c-firstpage-juz2-span').empty();
			$(".c-firstpage-title").css("font-size", "2.8em");
			$(".c-firstpage-juz-span").css("font-size", "1.6em");
			$(".c-firstpage-juz2-span").css("font-size", "1.3em");
			$('#c-firstpage-title').append('نصائح سريعة <i class="fa fa-lightbulb-o" id="c-lightbuld-icon"></i>');
			document.getElementById("c-firstpage-juz-span").innerHTML = "للبحث عن جزء، سورة أو آية محددة";
			$('#c-firstpage-juz2-span').append('اكتب <b>الجزء</b> / <b>سورة</b> / <b>س٧ا١</b>');
		}
		else {
			//change to english
			quranLanguage = "AyahTextEnglish";
			$( "#c-translation-button" ).text("Arabic");
			translation = "en";
			$('#o-search-firstpage').removeClass('text-right');
			$('#c-firstpage-title').empty();
			$('#c-firstpage-juz2-span').empty();
			$(".c-firstpage-title").css("font-size", "2.5em");
			$(".c-firstpage-juz-span").css("font-size", "1.3em");
			$(".c-firstpage-juz2-span").css("font-size", "1.0em");
			$('#c-firstpage-title').append('<i class="fa fa-lightbulb-o" id="c-lightbuld-icon"></i> '+lang(this.props.language, "sidebarQuickTips")+'');
			document.getElementById("c-firstpage-juz-span").innerHTML = lang(this.props.language, "sidebarQuickJuzSearch");
			$('#c-firstpage-juz2-span').append(''+lang(this.props.language, "sidebarQuickType")+' <b>'+lang(this.props.language, "sidebarQuickJuz1")+'</b> / <b>'+lang(this.props.language, "sidebarQuickJuz2")+'</b> / <b>'+lang(this.props.language, "sidebarQuickJuz3")+'</b>');
		}
		if (isLogin == true) {
			//apicall to database
			var opt = {"email":betaEmail,"langmode":translation}
			calldata.passFormDataWithoutCallback("UserData", "updateLangMode", opt)
		}

		//change audioname
		if (quranLanguage == "AyahTextEnglish") {
	     	var splitter = suraArray[(parseInt(trackNumber) - 1)];
	     	var stringArray = splitter.split(' ');
	     	document.getElementById('o-audioplayer-track-title').innerHTML = stringArray[1];
	    } else {
	    	var splitter = suraArabicArray[(parseInt(trackNumber) - 1)];
	     	var stringArray = splitter.split(' ');
	     	document.getElementById('o-audioplayer-track-title').innerHTML = stringArray[1]+" "+stringArray[2];
	     }

		//load the current page into text area with different language
		for (var i = 0; i < quranArray.length; i ++) {
			if (quranArray[i].PageID == pageCheck) {
			 	$("#c-juz-dropdown").val(parseInt(quranArray[i].JuzID));
	
			 	this.loadQuran("translation", parseInt(quranArray[i].SuraID), parseInt(quranArray[i].VerseID));
			 	if (isReadmore == true) {
			 		this.translationButtonBottom(parseInt(quranArray[i].SuraID));
			 	}
			 	break;
			}
		}
	}	

	handleReadmore() {
		$('#c-readmore-button').hide();
		$('.o-spinner-wrapper').show();
		setReadmoreFunction=setReadmoreFunction.bind(this);
		setTimeout(setReadmoreFunction,1000);
		function setReadmoreFunction(){
			pageCheck = (pageCheck + 1);
			for (var i = 0; i < quranArray.length; i ++) {
				if (quranArray[i].PageID == pageCheck) {
					this.quranSetter(parseInt(i), "viewflip");
				}
				if (quranArray[i].PageID > pageCheck) {
					break;
				}
				if (quranArray[(parseInt(quranArray.length) - 1)].PageID == pageCheck) {
					$('#c-readmore-button').hide();
					$('.o-nextprevious-wrapper').show();
					this.translationButtonBottom(parseInt(quranArray[0].SuraID));
				} else {
					$('#c-readmore-button').show();	
				}
			}
			//this.favouriteSetter();
			$('.o-spinner-wrapper').hide();
		}	
	}

	//previous page of the quran after clicking on the button
	_handlePrevious(e) {
		var juzArray = globalQuranFunction.getJuzList("english");
		var juzArabicArray = globalQuranFunction.getJuzList("arabic");
		document.getElementById('c-sura-starter-label').innerHTML = "";

		//current page -1 page
		pageCheck = (parseInt(pageCheck) - 1);
		//empty the text area 
		$( "#o-text-area" ).empty();

		var ayaDropdownCheck = false;
		var newAyaID = 0;
		for (var i = 0; i < quranArray.length; i ++) { 
			//if pagecheck -1 equal to quranArray
			if (pageCheck == quranArray[i].PageID) {
				//set suraayaDropdown value (ayaDropdownCheck is to make sure it only run once when the loop start from the page)
				if (ayaDropdownCheck == false) {
					newAyaID = parseInt(quranArray[i].VerseID);
					ayaDropdownCheck = true;
				}
				//set page and juz title
				if (quranLanguage == "AyahTextArabic") {
					//document.getElementById('c-page-title-label').innerHTML = globalQuranFunction.convertNumberDigitToArabic(quranArray[i].PageID);
					document.getElementById('c-juz-title-label').innerHTML = juzArabicArray[parseInt(quranArray[i].JuzID) - 1];
				} else {
					//document.getElementById('c-page-title-label').innerHTML = quranArray[i].PageID;
					document.getElementById('c-juz-title-label').innerHTML = juzArray[parseInt(quranArray[i].JuzID)];
				}
				this.quranSetter(i, "pagemodeprevious");
				if (parseInt(quranArray[0].SuraID) != 1) {
					if (parseInt(quranArray[i].VerseID) == 1) {
						if (quranLanguage == "AyahTextArabic") {
							document.getElementById('c-sura-starter-label').innerHTML = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
						} else {
							document.getElementById('c-sura-starter-label').innerHTML = "In the name of Allah, the Beneficent, the Merciful";
						}
					}
				}
			}
			preSelect = newAyaID;
			$('#c-quran-text-'+(parseInt(newAyaID) - 1)).addClass('active');
			if (quranArray[i].PageID > pageCheck) {
				break;
			}
		}

		//if user is login, get favouriteSuraAya
		/*if (isLogin == true) {
			//setFavouriteSuraAya CSS	
			for (var i = 0; i < quranArray.length; i ++) {
				if (quranArray[i].PageID  == pageCheck) {
					for (var a = 0; a < favouriteQuranArray.length; a++) {
						if (quranArray[i].VerseID == favouriteQuranArray[a].VerseID) {
							$('#c-quran-text-'+(quranArray[i].VerseID - 1)).addClass('is-favourite');
							break;
						} 
					}
				} 
			}	
		}*/

		//set favourite button and function
		/*var selectedClassName = $('#c-quran-text-' + (preSelect - 1)).attr('class');	
		if (selectedClassName == "c-text active is-favourite") {
			isFavourite = true;
			$( ".c-favourite-span" ).addClass('favourite');
			$( ".c-favourite-span-in" ).text('Saved to favourite');
		} else {
			isFavourite = false;
			$( ".c-favourite-span" ).removeClass('favourite');
			$( ".c-favourite-span-in" ).text('Save to favourite');
		}*/

		//if the 1st array of the quranArray(1st aya page of the sura) more than pageCheck -1 example:(2page < 3page)
		if (pageCheck < quranArray[0].PageID) {
			selected = parseInt(quranArray[0].SuraID) - 2;
			//load the pagecheck -1 into textarea
			this.loadQuran("previous", parseInt(quranArray[0].SuraID) - 1, 0);
		}	
	}

	//next page of the quran after clicking on the button
	_handleNext(e) {
		var juzArray = globalQuranFunction.getJuzList("english");
		var juzArabicArray = globalQuranFunction.getJuzList("arabic");
		document.getElementById('c-sura-starter-label').innerHTML = "";
		//current page +1 page
		pageCheck = (parseInt(pageCheck) + 1);
		//empty the text area 
		$( "#o-text-area" ).empty();
		var ayaDropdownCheck = false;
		var newAyaID = false;
		for (var i = 0; i < quranArray.length; i ++) {
			//if pagecheck +1 equal to quranArray
			if (pageCheck == parseInt(quranArray[i].PageID)) {
				//set suraayaDropdown value (ayaDropdownCheck is to make sure it only run once when the loop start from the page)
				if (ayaDropdownCheck == false) {
					newAyaID = parseInt(quranArray[i].VerseID);
					ayaDropdownCheck = true;
				}
				//set page and juz title
				if (quranLanguage == "AyahTextArabic") {
					//document.getElementById('c-page-title-label').innerHTML = globalQuranFunction.convertNumberDigitToArabic(quranArray[i].PageID);
					document.getElementById('c-juz-title-label').innerHTML = juzArabicArray[parseInt(quranArray[i].JuzID) - 1];
				} else {
					//document.getElementById('c-page-title-label').innerHTML = quranArray[i].PageID;
					document.getElementById('c-juz-title-label').innerHTML = juzArray[parseInt(quranArray[i].JuzID) - 1];
				}
				this.quranSetter(i, "pagemodenext");
			}
			preSelect = newAyaID;
			$('#c-quran-text-'+(parseInt(newAyaID) - 1)).addClass('active');
			if (quranArray[i].PageID > pageCheck) {
				break;
			} 
		}	
		//if user is login, get favouriteSuraAya
		/*if (isLogin == true) {
			//setFavouriteSuraAya CSS	
			for (var i = 0; i < quranArray.length; i ++) {
				if (quranArray[i].PageID  == pageCheck) {
					for (var a = 0; a < favouriteQuranArray.length; a++) {
						if (quranArray[i].VerseID == favouriteQuranArray[a].VerseID) {
							$('#c-quran-text-'+(quranArray[i].VerseID - 1)).addClass('is-favourite');
							break;
						} 
					}
				} 
			}	
		}*/

		//set favourite button and function
		/*var selectedClassName = $('#c-quran-text-' + (preSelect - 1)).attr('class');	
		if (selectedClassName == "c-text active is-favourite") {
			isFavourite = true;
			$( ".c-favourite-span" ).addClass('favourite');
			$( ".c-favourite-span-in" ).text('Saved to favourite');
		} else {
			isFavourite = false;
			$( ".c-favourite-span" ).removeClass('favourite');
			$( ".c-favourite-span-in" ).text('Save to favourite');
		}*/

		//if the last array of the quranArray(last aya page of the sura) less than pageCheck +1 example:(3page is the last page to >next sura 4page)
		if (pageCheck > quranArray[parseInt(quranArray.length) - 1].PageID) {
			selected = (quranArray[0].SuraID);
			//load the next sura
			this.loadQuran("next", parseInt(quranArray[0].SuraID ) + 1, 1);

		}
	}

	loadQuran(type, suraID, ayaID) {
		//empty the text area and aya dropdown
		$( "#o-text-area" ).empty();
		var juzArray = globalQuranFunction.getJuzList("english");
		var juzArabicArray = globalQuranFunction.getJuzList("arabic");
		document.getElementById('c-sura-starter-label').innerHTML = "";
		//other than "first" there already have suraID passing in. so doesn't need this if statement.
		if (type == "first") {
			suraID = (parseInt(selected) + 1);
		}
		if (isReadmore == false) {
			$('#c-readmore-button').hide();
			$('.o-nextprevious-wrapper').hide();
			$('.o-spinner-wrapper').hide();
			//set next and previous button onclick function 
			this.translationButtonMain(suraID);
		} else {
			$('#c-previous-button').hide();
			$('#c-next-button').hide();
			//$('#c-readmore-button').show();
		}
		
		$( "#o-loading-icon" ).show();
		document.getElementById('c-sura-title-label').innerHTML ="";
		document.getElementById('c-juz-title-label').innerHTML = "";
		//globalfunction getQuran of the Sura
		getQuranFunction=getQuranFunction.bind(this);
		globalQuranFunction.getQuran(suraID, getQuranFunction);
		function getQuranFunction(data){
			var response = JSON.parse(data);
			if(response.state === 200) {
				$( "#o-loading-icon" ).hide();
				quranArray = response.success;
				if (type == "first" || type == "next") {
						//set current page
						pageCheck=parseInt(quranArray[0].PageID);
						//set text area title
						titleSetter(selected, parseInt(quranArray[0].PageID), parseInt(quranArray[0].JuzID));

						if (parseInt(quranArray[0].SuraID) != 1) {
							if (quranLanguage == "AyahTextArabic") {
								document.getElementById('c-sura-starter-label').innerHTML = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
							} else {
								document.getElementById('c-sura-starter-label').innerHTML = "In the name of Allah, the Beneficent, the Merciful";
							}
						}
							
						//push the firstpage of the current sura into o-text-area
						for (var i = 0; i < quranArray.length; i ++) {
							if (quranArray[i].PageID  == pageCheck) {
								this.quranSetter(i, "loadquranfirst");
							} else {
								break;
							}
						}
						if (isReadmore == true) {
							if (quranArray[parseInt(quranArray.length) - 1].PageID == pageCheck) {
								$('#c-readmore-button').hide();
								$('.o-nextprevious-wrapper').show();
								this.translationButtonBottom(quranArray[0].SuraID);
							} else {
								$('#c-readmore-button').show();
								$('.o-nextprevious-wrapper').hide();
							}
						}
						
						preSelect = quranArray[0].VerseID;
						$('#c-quran-text-'+(parseInt(quranArray[0].VerseID) - 1)).addClass('active');
						this.loadAudioPlayer(parseInt(quranArray[0].SuraID));
				}
				else if (type == "previous") {
						var ayaDropdownCheck = false;
						var newAyaID = 0;
						if (isReadmore == true) {
							//set current page
							pageCheck=parseInt(quranArray[0].PageID);
							//set text area title
							titleSetter(selected, parseInt(quranArray[0].PageID), parseInt(quranArray[0].JuzID));

							if (parseInt(quranArray[0].SuraID) != 1) {
								if (quranLanguage == "AyahTextArabic") {
									document.getElementById('c-sura-starter-label').innerHTML = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
								} else {
									document.getElementById('c-sura-starter-label').innerHTML = "In the name of Allah, the Beneficent, the Merciful";
								}
							}

							//push the firstpage of the current sura into o-text-area
							for (var i = 0; i < quranArray.length; i ++) {
								if (parseInt(quranArray[i].PageID)  == parseInt(pageCheck)) {
									this.quranSetter(i, "loadquranprevious");
								} else {
									break;
								}
							}
							newAyaID = parseInt(quranArray[0].VerseID);

							if (quranArray[parseInt(quranArray.length) - 1].PageID == pageCheck) {
								$('#c-readmore-button').hide();
								$('.o-nextprevious-wrapper').show();
								this.translationButtonBottom(quranArray[0].SuraID);
							} else {
								$('#c-readmore-button').show();
								$('.o-nextprevious-wrapper').hide();
							}
						} else {
							//set current page
							pageCheck=quranArray[parseInt(quranArray.length) - 1].PageID;

							//set text area title
							titleSetter(selected, quranArray[parseInt(quranArray.length) - 1].PageID, quranArray[parseInt(quranArray.length) - 1].JuzID);
							
							//push the last page of the current sura into o-text-area
							for (var i = 0; i < quranArray.length; i ++) {
								if (quranArray[i].PageID < pageCheck) {
									continue;
								}
								else if (quranArray[i].PageID == pageCheck) {
									//set ayaDropdown value
									if (ayaDropdownCheck == false) {
										newAyaID = parseInt(quranArray[i].VerseID);
										ayaDropdownCheck = true;
									}
									this.quranSetter(i, "loadquranprevious");
									if (parseInt(quranArray[i].SuraID) != 1) {
										if (parseInt(quranArray[i].VerseID) == 1) {
											if (quranLanguage == "AyahTextArabic") {
												document.getElementById('c-sura-starter-label').innerHTML = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
											} else {
												document.getElementById('c-sura-starter-label').innerHTML = "In the name of Allah, the Beneficent, the Merciful";
											}
										}
									}  
								}
							}
						}
						preSelect = newAyaID;
						$('#c-quran-text-'+(parseInt(newAyaID) - 1)).addClass('active');
						this.loadAudioPlayer(parseInt(quranArray[0].SuraID));
				}
				else if (type == "juz") {
						selected = (parseInt(suraID) - 1);
					    var pageAvailable = false;
						if (isReadmore == true) {
							//push the current sura of the juz into o-text-area
							for (var i = 0; i < quranArray.length; i ++) {
								if (quranArray[i].VerseID == ayaID) {
									//set text area title
									titleSetter(selected, quranArray[i].PageID, quranArray[i].JuzID);
									if (parseInt(quranArray[0].SuraID) != 1) {
											if (quranLanguage == "AyahTextArabic") {
												document.getElementById('c-sura-starter-label').innerHTML = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
											} else {
												document.getElementById('c-sura-starter-label').innerHTML = "In the name of Allah, the Beneficent, the Merciful";
											}
									}
									pageCheck=quranArray[i].PageID;
									pageAvailable = true;
								}

								if (pageAvailable == true) {
									if (quranArray[i].PageID <= pageCheck) {
										this.quranSetter(i, "loadquranjuz");
									} else {
										break;
									}
								} else {
									this.quranSetter(i, "loadquranjuz");
								}
							}
							
							if (quranArray[parseInt(quranArray.length) - 1].PageID == pageCheck) {
								$('#c-readmore-button').hide();
								$('.o-nextprevious-wrapper').show();
								this.translationButtonBottom(quranArray[0].SuraID);
							} else {
								$('#c-readmore-button').show();
								$('.o-nextprevious-wrapper').hide();
							}
						} else {	
							//push the current sura of the juz into o-text-area
							for (var i = 0; i < quranArray.length; i ++) {
								if (quranArray[i].VerseID == ayaID) {
									//set text area title
									titleSetter(selected, quranArray[i].PageID, quranArray[i].JuzID);
									pageCheck=quranArray[i].PageID;
									pageAvailable = true;
								}

								if (pageAvailable == true) {
									if (quranArray[i].PageID  == pageCheck) {
										this.quranSetter(i, "loadquranjuz");
										if (parseInt(quranArray[0].SuraID) != 1) {
											if (parseInt(quranArray[i].VerseID) == 1) {
												if (quranLanguage == "AyahTextArabic") {
													document.getElementById('c-sura-starter-label').innerHTML = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
												} else {
													document.getElementById('c-sura-starter-label').innerHTML = "In the name of Allah, the Beneficent, the Merciful";
												}
											}
										}  
									} else {
										break;
									}
								}
							}
						}	
						preSelect = parseInt(ayaID);
						$('#c-quran-text-'+(parseInt(ayaID) - 1)).addClass('active');
						this.loadAudioPlayer(parseInt(suraID));	
				}
				else if (type == "translation") {
						selected = (parseInt(suraID) - 1);
						var checker = false;
						var newAyaID = 0;
						if (isReadmore == true) {
							for (var i = 0; i < quranArray.length; i++) {
								if (quranArray[i].PageID  <= pageCheck) {
									//set text area title
									titleSetter(selected, parseInt(quranArray[i].PageID), parseInt(quranArray[i].JuzID));
									if (parseInt(quranArray[0].SuraID) != 1) {
											if (quranLanguage == "AyahTextArabic") {
												document.getElementById('c-sura-starter-label').innerHTML = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
											} else {
												document.getElementById('c-sura-starter-label').innerHTML = "In the name of Allah, the Beneficent, the Merciful";
											}
									}
									this.quranSetter(i, "loadqurantranslation");
								} else {
									break;
								}
							}
						} else {
							for (var i = 0; i < quranArray.length; i++) {
								if (quranArray[i].PageID  == pageCheck) {
									if (checker == false) {
										checker = true;
										newAyaID = parseInt(quranArray[i].VerseID);
									}
									//set text area title
									titleSetter(selected, parseInt(quranArray[i].PageID), parseInt(quranArray[i].JuzID));
									if (parseInt(quranArray[0].SuraID) != 1) {
										if (parseInt(quranArray[i].VerseID) == 1) {
											if (quranLanguage == "AyahTextArabic") {
												document.getElementById('c-sura-starter-label').innerHTML = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
											} else {
												document.getElementById('c-sura-starter-label').innerHTML = "In the name of Allah, the Beneficent, the Merciful";
											}
										}
									}
									this.quranSetter(i, "loadqurantranslation");
								}
							}
						}
	
						$('#c-quran-text-'+(parseInt(preSelect) - 1)).addClass('active');				
				}
				else if (type == "ayaChange") {
						selected = (parseInt(suraID) - 1);
						//push the current sura of the juz into o-text-area
						for (var i = 0; i < quranArray.length; i ++) {
							if (quranArray[i].VerseID == ayaID) {
								//set text area title
								titleSetter(selected, parseInt(quranArray[i].PageID), parseInt(quranArray[i].JuzID));
								pageCheck=parseInt(quranArray[i].PageID);
							}		
						}
						if (isReadmore == true) {
							//push the current sura of the juz into o-text-area
							for (var i = 0; i < quranArray.length; i ++) {
								if (quranArray[i].VerseID == ayaID) {
									//set text area title
									titleSetter(selected, parseInt(quranArray[i].PageID), parseInt(quranArray[i].JuzID));
									if (parseInt(quranArray[0].SuraID) != 1) {
											if (quranLanguage == "AyahTextArabic") {
												document.getElementById('c-sura-starter-label').innerHTML = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
											} else {
												document.getElementById('c-sura-starter-label').innerHTML = "In the name of Allah, the Beneficent, the Merciful";
											}
									}
									pageCheck=parseInt(quranArray[i].PageID);
									pageAvailable = true;
								}
								if (pageAvailable == true) {
									if (quranArray[i].PageID <= pageCheck) {
										this.quranSetter(i, "loadquranayachange");
									} else {
										break;
									}
								} else {
									this.quranSetter(i, "loadquranayachange");
								}
							}
							if (quranArray[parseInt(quranArray.length) - 1].PageID == pageCheck) {
								$('#c-readmore-button').hide();
								$('.o-nextprevious-wrapper').show();
								this.translationButtonBottom(quranArray[0].SuraID);
							} else {
								$('#c-readmore-button').show();
								$('.o-nextprevious-wrapper').hide();
							}
						} else {	
							for (var i = 0; i < quranArray.length; i ++) {
								if (quranArray[i].PageID  == pageCheck) {
									this.quranSetter(i, "loadquranayachange");
									if (parseInt(quranArray[i].SuraID) != 1) {
										if (parseInt(quranArray[i].VerseID) == 1) {
											if (quranLanguage == "AyahTextArabic") {
												document.getElementById('c-sura-starter-label').innerHTML = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
											} else {
												document.getElementById('c-sura-starter-label').innerHTML = "In the name of Allah, the Beneficent, the Merciful";
											}
										}
									}  
								}
							}
						}
						preSelect = ayaID;
						$('#c-quran-text-'+(parseInt(ayaID) - 1)).addClass('active');	
				}

				function titleSetter(sura, page, juz) {
						if (quranLanguage == "AyahTextArabic") {
							var suraText = suraArabicArray[sura];
							var suraSelectedArray = suraText.split(" ");
							document.getElementById('c-sura-title-label').innerHTML = suraSelectedArray[1]+" "+suraSelectedArray[2];
							//document.getElementById('c-page-title-label').innerHTML = globalQuranFunction.convertNumberDigitToArabic(page);
							document.getElementById('c-juz-title-label').innerHTML = juzArabicArray[parseInt(juz) - 1];
						} else {
							var suraText = suraArray[sura];
							var suraSelectedArray = suraText.split(" ");
							document.getElementById('c-sura-title-label').innerHTML = suraSelectedArray[1];
							//document.getElementById('c-page-title-label').innerHTML = page;
							document.getElementById('c-juz-title-label').innerHTML = juzArray[parseInt(juz) - 1];
						}	
				}

				//if user is login, get favouriteSuraAya
				/*if (isLogin == true) {
					var email = betaEmail;
					fetchFavouriteFunction=fetchFavouriteFunction.bind(this);
					globalQuranFunction.fetchFavouriteSuraAya(email, suraID, fetchFavouriteFunction);
					function fetchFavouriteFunction(data){
						var response = JSON.parse(data);
						if(response.state === 200) {
							favouriteQuranArray = response.success;		
							//setFavouriteSuraAya CSS
							for (var i = 0; i < quranArray.length; i ++) {
								if (quranArray[i].PageID  == pageCheck) {
									//add click event to text
									$("#c-quran-text-"+(quranArray[i].VerseID - 1)).click(function(){ 
										var selectedClassName = $('#c-quran-text-' + ($(this).data('content-id') - 1)).attr('class');
										if (selectedClassName == "c-text is-favourite" || selectedClassName == "c-text is-favourite active") {
											isFavourite = true;	
											$( ".c-favourite-span" ).addClass('favourite');
											$( ".c-favourite-span-in" ).text('Saved to favourite');
										} else {
											isFavourite = false;
											$( ".c-favourite-span" ).removeClass('favourite');
											$( ".c-favourite-span-in" ).text('Save to favourite');
										}
										$("#c-aya-dropdown").val($(this).data('content-id'));
										$('#c-quran-text-'+($(this).data('content-id') - 1)).addClass('active');
										if(preSelect != $(this).data('content-id')){
											$('#c-quran-text-'+(preSelect-1)).removeClass('active');
											preSelect = $(this).data('content-id');
										}
									});
									for (var a = 0; a < favouriteQuranArray.length; a++) {
										if (quranArray[i].VerseID == favouriteQuranArray[a].VerseID) {
											$('#c-quran-text-'+(quranArray[i].VerseID - 1)).addClass('is-favourite');
											break;
										} 
									}
								} 
							}
							var selectedClassName = $('#c-quran-text-' + (preSelect - 1)).attr('class');
							if (selectedClassName == "c-text active is-favourite" || selectedClassName == "c-text is-favourite") {
								isFavourite = true;
								$( ".c-favourite-span" ).addClass('favourite');
								$( ".c-favourite-span-in" ).text('Saved to favourite');
							} else {
								isFavourite = false;
								$( ".c-favourite-span" ).removeClass('favourite');
								$( ".c-favourite-span-in" ).text('Save to favourite');
							}
						} else {
							//set Clik function for all text
							for (var i = 0; i < quranArray.length; i ++) {
								if (quranArray[i].PageID  == pageCheck) {
									$("#c-quran-text-"+(quranArray[i].VerseID - 1)).click(function(){
										var selectedClassName = $('#c-quran-text-' + ($(this).data('content-id') - 1)).attr('class');
										if (selectedClassName == "c-text is-favourite") {
											isFavourite = true;
											$( ".c-favourite-span" ).addClass('favourite');
											$( ".c-favourite-span-in" ).text('Saved to favourite');
										} else {
											isFavourite = false;
											$( ".c-favourite-span" ).removeClass('favourite');
											$( ".c-favourite-span-in" ).text('Save to favourite');
										}
										$("#c-aya-dropdown").val($(this).data('content-id'));
										$('#c-quran-text-'+($(this).data('content-id') - 1)).addClass('active');
										if(preSelect != $(this).data('content-id')){
											$('#c-quran-text-'+(preSelect-1)).removeClass('active');
											preSelect = $(this).data('content-id');
										}
									})
								}
							}
							var selectedClassName = $('#c-quran-text-' + (preSelect - 1)).attr('class');
							if (selectedClassName == "c-text active is-favourite" || selectedClassName == "c-text is-favourite") {
								isFavourite = true;
								$( ".c-favourite-span" ).addClass('favourite');
								$( ".c-favourite-span-in" ).text('Saved to favourite');
							} else {
								isFavourite = false;
								$( ".c-favourite-span" ).removeClass('favourite');
								$( ".c-favourite-span-in" ).text('Save to favourite');
							}	
						}
					}
				} else {
					//set Clik function for all text
					for (var i = 0; i < quranArray.length; i ++) {
						if (quranArray[i].PageID  == pageCheck) {
							$("#c-quran-text-"+(quranArray[i].VerseID - 1)).click(function(){
								var selectedClassName = $('#c-quran-text-' + ($(this).data('content-id') - 1)).attr('class');
								if (selectedClassName == "c-text is-favourite") {
											isFavourite = true;
											$( ".c-favourite-span" ).addClass('favourite');
											$( ".c-favourite-span-in" ).text('Saved to favourite');
										} else {
											isFavourite = false;
											$( ".c-favourite-span" ).removeClass('favourite');
											$( ".c-favourite-span-in" ).text('Save to favourite');
										}
								$("#c-aya-dropdown").val($(this).data('content-id'));
								$('#c-quran-text-'+($(this).data('content-id') - 1)).addClass('active');
								if(preSelect != $(this).data('content-id')){
									$('#c-quran-text-'+(preSelect-1)).removeClass('active');
									preSelect = $(this).data('content-id');
								}
							})
						}
						var selectedClassName = $('#c-quran-text-' + i).attr('class');
								
									if (selectedClassName == "c-text active is-favourite") {
										isFavourite = true;
										$( ".c-favourite-span" ).removeClass('favourite');
										$( ".c-favourite-span-in" ).text('Save to favourite');
									}
					}	
				}*/
			} else {
				$('#c-text-area').empty();
				$('#c-readmore-button').hide();
				$('.o-spinner-wrapper').hide();
				$('.o-nextprevious-wrapper').hide();
				$('.c-next-button').hide();
				$('.c-previous-button').hide();
				if (quranLanguage == "AyahTextArabic") {
					$( "#o-text-area" ).removeClass('text-left');
					$( "#o-text-area" ).removeClass('text-right');
					$( "#o-text-area" ).removeClass('arabic-text');
					$( "#o-text-area" ).removeClass('text-center');
					$('#o-text-area')
				        .append('<span id="c-error-message" class="c-error-message">'
				        		+ "Error in loading database, Please reload or try again later."
				               	+ '</span>');
					$( "#o-text-area" ).addClass('text-center');
					$( "#o-text-area" ).addClass('arabic-text');
				} else {
					$( "#o-text-area" ).removeClass('text-left');
					$( "#o-text-area" ).removeClass('text-right');
					$( "#o-text-area" ).removeClass('arabic-text');
					$( "#o-text-area" ).removeClass('text-center');
					$('#o-text-area')
					        .append('<span id="c-error-message" class="c-error-message">'
					        		+ "Error in loading database, Please reload or try again later."
					               	+ '</span>');
					$( "#o-text-area" ).addClass('text-center');
				}
			}
		}
	}

	//if user database have quran checkpoint it will load the checkpoint page or else it will load the 1st page.
	loadQuranCheckpoint() {
		//check did the user have the quran checkpoint in the database
		var email = betaEmail; //get user email if logged in
		if (email == "") {
			isLogin = false;
			document.getElementById("c-lastread").innerHTML ="";
			document.getElementById("c-title-1").innerHTML ="Welcome to";
			document.getElementById("c-title-2").innerHTML ="Quran Reader";
			this.loadQuran("first", 1, 1);
			this.loadAudioPlayer(1);
		} else {
			isLogin = true;
			getQuranCheckpointFunction=getQuranCheckpointFunction.bind(this);
			globalQuranFunction.getQuranCheckpoint(email, getQuranCheckpointFunction);
			function getQuranCheckpointFunction(data){
				var response = JSON.parse(data);
				if(response.state === 200) {
					if (parseInt(response.success[0].SuraID) != 0) {
						var suraText = suraArray[(parseInt(response.success[0].SuraID) - 1)];
						var suraSelectedArray1 = suraText.split(" ");
						var suraArabText = suraArabicArray[(parseInt(response.success[0].SuraID) - 1)];
						var suraSelectedArray2 = suraArabText.split(" ");
						document.getElementById("c-lastread").innerHTML ="Last read";
						document.getElementById("c-title-1").innerHTML = suraSelectedArray1[0]+" "+suraSelectedArray1[1];
						document.getElementById("c-title-2").innerHTML = suraSelectedArray2[1]+" "+suraSelectedArray2[2];
						if (response.success[0].VerseID == 0) {
							this.loadQuran("ayaChange", parseInt(response.success[0].SuraID), 1);
						} else {
							this.loadQuran("ayaChange", parseInt(response.success[0].SuraID), parseInt(response.success[0].VerseID));
						}
						this.loadAudioPlayer(parseInt(response.success[0].SuraID));
					} else {
						isLogin = false;
						document.getElementById("c-lastread").innerHTML ="";
						document.getElementById("c-title-1").innerHTML ="Welcome to";
						document.getElementById("c-title-2").innerHTML ="Quran Reader";
						this.loadQuran("first", 1, 1);
						this.loadAudioPlayer(1);
					}
				} else {
					//if user_data DB doesnt have data then do this.
					//alert("Error loading database.");
						var request =  [
							"UserData",
							"add",
							email];

						$.ajax({
							type: "POST",
							datatype: 'json',
							url: "./app/bridge/enter.php",
							data: {request},
							cache: false,
							success: function(data) {
								var response = JSON.parse(data);
								if(response.state === 200) {
									this.loadQuran("ayaChange", 1, 1);
								} else {	
								}
							}.bind(this)
						});
				}
			}
		}
		
		/*if (checkpointArray[0].SuraID != 0) {
			this.loadQuran("ayaChange", checkpointArray[0].SuraID, checkpointArray[0].VerseID);
		} else {
			this.loadQuran("first", 0, 0);
		}*/
	}

	//search input function
	handleSearchFunction(e) {
		$('#c-juz-ul').empty();
		$('#c-sura-ul').empty();
		$('#c-aya-ul').empty();
		$('#c-juz-span').hide();
		$('#c-sura-span').hide();
		$('#c-aya-span').hide();
		$('#c-juz-ul').hide();
		$('#c-sura-ul').hide();
		$('#c-aya-ul').hide();
		if ($('#c-search-input').val().length != 0) {
			$('#o-search-firstpage').hide();
			$(".o-app-title").css("visibility", "hidden");	
		} else {
			$('#o-search-firstpage').show();
			$(".o-app-title").css("visibility", "visible");	
		}
		var count = 0;
		var runAllSearchFunction = true;
		var alphaNumericSpace = /^[a-zA-Z0-9-' ]*$/;
		var arabicCharacter = /[\u0600-\u06ff]|[\u0750-\u077f]|[\ufb50-\ufc3f]|[\ufe70-\ufefc]|[0-9 ]/;
		var juzEnglishArray = globalQuranFunction.getJuzList("english");
		var juzArabicArray = globalQuranFunction.getJuzList("arabic");
		var juzArabicArray2 = globalQuranFunction.getJuzList("arabicShort");
		var suraArrayShort = globalQuranFunction.getSuraList("suraShort");

		//English language
		if(alphaNumericSpace.test(e.target.value) != false) {
			var typeString = e.target.value;
			var lowerValue = typeString.toLowerCase();
			if (typeString != "") {
				//"j", "ju", "juz", "juz 1"
				if (/^[jJuUzZ0-9 ]*$/.test(e.target.value) == true) {
					var typeString = lowerValue; //searchBox value
				   	//j1
				   	if (/^[j]{1}[0-9 ]{1,2}/.test(lowerValue) == true){
				   		var options = ["j1","j2","j3","j4","j5","j6","j7","j8","j9","j10","j11","j12","j13","j14","j15","j16","j17","j18","j19","j20",
				   						"j21","j22","j23","j24","j25","j26","j27","j28","j29","j30",];
				   		for (var i = 0; i < 30; i++) {
					        var optionText = options[i]; //current option text
					        optionText = optionText.replace(/\s+/g, '');
					        var lowerOptionText = optionText.toLowerCase(); //option text lowercased for case insensitive testing
					        typeString = typeString.replace(/\s+/g, '');
					        var lowerText = typeString.toLowerCase(); //searchBox value lowercased for case insensitive testing
					        var regex = new RegExp("^" + typeString, "i"); //regExp, "i"=ignore case
					        var match = optionText.match(regex); //test if regExp is true
					        var contains = lowerOptionText.indexOf(lowerText) != -1; //test if searchBox value is contained by the option text
					        if (match || contains) { //if one or the other goes through
					            juzBuilder(i);
					            //return; //prevent other code inside this event from executing
					        }
					    }
				   	} else {
				   		var options = juzEnglishArray.length; //select options
					    for (var i = 0; i < options; i++) {
					        var optionText = juzEnglishArray[i]; //current option text
					        optionText = optionText.replace(/\s+/g, '');
					        var lowerOptionText = optionText.toLowerCase(); //option text lowercased for case insensitive testing
					        typeString = typeString.replace(/\s+/g, '');
					        var lowerText = typeString.toLowerCase(); //searchBox value lowercased for case insensitive testing
					        var regex = new RegExp("^" + typeString, "i"); //regExp, "i"=ignore case
					        var match = optionText.match(regex); //test if regExp is true
					        var contains = lowerOptionText.indexOf(lowerText) != -1; //test if searchBox value is contained by the option text
					        if (match || contains) { //if one or the other goes through
					            juzBuilder(i);
					            //return; //prevent other code inside this event from executing
					        }
				   		}
				   	}   	
				}

				//Typed "Sura"
				if (/^[sSuUrRaAyY0-9 ]*$/.test(e.target.value) == true) {
					lowerValue = lowerValue.replace(/\s+/g, '');
					//"sura"
					if (lowerValue == "sura") {
						for (var i = 0; i < suraArray.length; i++) {
							suraBuilder(i);
						}
						runAllSearchFunction = false;
					} 
					//"sura 112"
					else if (/^[s]{1}[u]{1}[r]{1}[a]{1}[0-9 ]*$/.test(lowerValue) == true){
						lowerValue = lowerValue.replace("sura", "");
						var number = parseInt(lowerValue);
						if (number <115 && number >0) {
							suraBuilder((number - 1));
							runAllSearchFunction = false;
						}
					}
					//"s 112" 
					else if (/^[s]{1}[0-9 ]*$/.test(lowerValue) == true){
						lowerValue = lowerValue.replace("s", "");
						var number = parseInt(lowerValue);
						if (number <115 && number >0) {
							suraBuilder((number - 1));
							runAllSearchFunction = false;
						}
					}
					//"sura 1 a 1"
					else if (/^[s]{1}[u]{1}[r]{1}[a]{1}[0-9 ]{1,3}[a]{1}[0-9 ]{1,3}/.test(lowerValue) == true) {
						lowerValue = lowerValue.replace("sura", "");
						lowerValue = lowerValue.replace("a", " ");
						var splitArray = lowerValue.split(' ');

						getAyaFunction=getAyaFunction.bind(this);
						globalQuranFunction.fetchAyaBySuraID(parseInt(splitArray[0]), parseInt(splitArray[1]), getAyaFunction);
						function getAyaFunction(data) {
							var response = JSON.parse(data);
							if(response.state === 200) {
								for (var i = 0; i < response.success.length; i ++) {
									ayaBuilder(parseInt(response.success[i].VerseID), (parseInt(response.success[i].SuraID) - 1));
								}
								runAllSearchFunction = false;
							} else {

							}
						}
					}
					//"sura 1 aya 1"
					else if (/^[s]{1}[u]{1}[r]{1}[a]{1}[0-9 ]{1,3}[a]{1}[y]{1}[a]{1}[0-9 ]{1,3}/.test(lowerValue) == true) {
						lowerValue = lowerValue.replace("sura", "");
						lowerValue = lowerValue.replace("aya", " ");
						var splitArray = lowerValue.split(' ');

						getAyaFunction=getAyaFunction.bind(this);
						globalQuranFunction.fetchAyaBySuraID(parseInt(splitArray[0]), parseInt(splitArray[1]), getAyaFunction);
						function getAyaFunction(data) {
							var response = JSON.parse(data);
							if(response.state === 200) {
								for (var i = 0; i < response.success.length; i ++) {
									ayaBuilder(parseInt(response.success[i].VerseID), (parseInt(response.success[i].SuraID) - 1));
								}
								runAllSearchFunction = false;
							} else {

							}
						}
					}
					//"s1a2"
					else if (/^[s]{1}[0-9 ]{1,3}[a]{1}[0-9 ]{1,3}/.test(lowerValue) == true) {
						lowerValue = lowerValue.replace("s", "");
						lowerValue = lowerValue.replace("a", " ");
						var splitArray = lowerValue.split(' ');

						getAyaFunction=getAyaFunction.bind(this);
						globalQuranFunction.fetchAyaBySuraID(parseInt(splitArray[0]), parseInt(splitArray[1]), getAyaFunction);
						function getAyaFunction(data) {
							var response = JSON.parse(data);
							if(response.state === 200) {
								for (var i = 0; i < response.success.length; i ++) {
									ayaBuilder(parseInt(response.success[i].VerseID), (parseInt(response.success[i].SuraID) - 1));
								}
								runAllSearchFunction = false;
							} else {

							}
						}
					}
					//"s1aya2"
					else if (/^[s]{1}[0-9 ]{1,3}[a]{1}[y]{1}[a]{1}[0-9 ]{1,3}/.test(lowerValue) == true) {
						lowerValue = lowerValue.replace("s", "");
						lowerValue = lowerValue.replace("aya", " ");
						var splitArray = lowerValue.split(' ');

						getAyaFunction=getAyaFunction.bind(this);
						globalQuranFunction.fetchAyaBySuraID(parseInt(splitArray[0]), parseInt(splitArray[1]), getAyaFunction);
						function getAyaFunction(data) {
							var response = JSON.parse(data);
							if(response.state === 200) {
								for (var i = 0; i < response.success.length; i ++) {
									ayaBuilder(parseInt(response.success[i].VerseID), (parseInt(response.success[i].SuraID) - 1));
								}
								runAllSearchFunction = false;
							} else {

							}
						}
					}
				}

				//search everything in sura if above not true.
				if (runAllSearchFunction == true) {
					//sura
				    var options = suraArray.length; //select options
				    for (var i = 0; i < options; i++) {
				    	var splitArray1 = suraArray[i].split(' ');
				    	var splitArray2 = splitArray1[1].split('-');
				        var optionText = splitArray2[0] +" "+ splitArray2[1] + suraArray[i]; //current option text
				        optionText = optionText.replace(/\s+/g, '');
				        var lowerOptionText = optionText.toLowerCase(); //option text lowercased for case insensitive testing
				        typeString = typeString.replace(/\s+/g, '');
				        var lowerText = typeString.toLowerCase(); //searchBox value lowercased for case insensitive testing
				        var regex = new RegExp("^" + typeString, "i"); //regExp, "i"=ignore case
				        var match = optionText.match(regex); //test if regExp is true
				        var contains = lowerOptionText.indexOf(lowerText) != -1; //test if searchBox value is contained by the option text
				        if (match || contains) { //if one or the other goes through
				            suraBuilder(i);
				            //return; //prevent other code inside this event from executing
				        }
				    }
				}
				
			}
        } 
        //Arabic language
        else if (arabicCharacter.test(e.target.value) !=false) {
        	var typeString = e.target.value;
        	typeString = typeString.replace(/\s+/g, '');
        	if (typeString != "") {
        		//الجزء and ١٢٣٤٥٦٧٨٩٠
				if (/^[الجزء١٢٣٤٥٦٧٨٩٠أوثنيربعخمسدتشرح0123456789]/.test(typeString) == true) {
					//الجزء and number
					if (/^[ا]{1}[ل]{1}[ج]{1}[ز]{1}[ء]{1}[١٢٣٤٥٦٧٨٩٠0123456789]{1,2}/.test(typeString) == true) {
						for (var i = 0; i < 30; i++) {
					        var optionText = juzArabicArray2[i]; //current option text
					        optionText = optionText.replace(/\s+/g, '');
					        var lowerOptionText = optionText.toLowerCase(); //option text lowercased for case insensitive testing
					        typeString = typeString.replace(/\s+/g, '');
					        var lowerText = typeString.toLowerCase(); //searchBox value lowercased for case insensitive testing
					        var regex = new RegExp("^" + typeString, "i"); //regExp, "i"=ignore case
					        var match = optionText.match(regex); //test if regExp is true
					        var contains = lowerOptionText.indexOf(lowerText) != -1; //test if searchBox value is contained by the option text
					        if (match || contains) { //if one or the other goes through
					            juzBuilder(i);
					            //return; //prevent other code inside this event from executing
					        }	
					    }
					} 
					//جزء and number
					else if (/^[ج]{1}[ز]{1}[ء]{1}[١٢٣٤٥٦٧٨٩٠0123456789]{1,2}/.test(typeString) == true) {
						for (var i = 0; i < 30; i++) {
					        var optionText = juzArabicArray2[i]; //current option text
					        optionText = optionText.replace(/\s+/g, '');
					        var lowerOptionText = optionText.toLowerCase(); //option text lowercased for case insensitive testing
					        typeString = typeString.replace(/\s+/g, '');
					        var lowerText = typeString.toLowerCase(); //searchBox value lowercased for case insensitive testing
					        var regex = new RegExp("^" + typeString, "i"); //regExp, "i"=ignore case
					        var match = optionText.match(regex); //test if regExp is true
					        var contains = lowerOptionText.indexOf(lowerText) != -1; //test if searchBox value is contained by the option text
					        if (match || contains) { //if one or the other goes through
					            juzBuilder(i);
					            //return; //prevent other code inside this event from executing
					        }	
					    }
					}
					//ج number
					else if (/^[ج]{1}[١٢٣٤٥٦٧٨٩٠0123456789]{1,2}/.test(typeString) == true) {
						var options = ["ج1 ج١","ج2 ج٢","ج3 ج٣","ج4 ج٤","ج5 ج٥","ج6 ج٦","ج7 ج٧","ج8 ج٨","ج9 ج٩","ج10 ج١٠","ج11 ج١١","ج12 ج١٢","ج13 ج١٣","ج14 ج١٤","ج15 ج١٥","ج16 ج١٦","ج17 ج١٧","ج18 ج١٨","ج19 ج١٩","ج20 ج٢٠",
				   						"ج21 ج٢١","ج22 ج٢","ج23 ج٢٣","ج24 ج٢٤","ج25 ج٢٥","ج26 ج٢٦","ج27 ج٢٧","ج28 ج٢٨","ج29 ج٢٩","ج30 ج٣٠"];
				   		for (var i = 0; i < 30; i++) {
					        var optionText = options[i]; //current option text
					        optionText = optionText.replace(/\s+/g, '');
					        var lowerOptionText = optionText.toLowerCase(); //option text lowercased for case insensitive testing
					        typeString = typeString.replace(/\s+/g, '');
					        var lowerText = typeString.toLowerCase(); //searchBox value lowercased for case insensitive testing
					        var regex = new RegExp("^" + typeString, "i"); //regExp, "i"=ignore case
					        var match = optionText.match(regex); //test if regExp is true
					        var contains = lowerOptionText.indexOf(lowerText) != -1; //test if searchBox value is contained by the option text
					        if (match || contains) { //if one or the other goes through
					            juzBuilder(i);
					            //return; //prevent other code inside this event from executing
					        }
					    }
					}
					else {
						for (var i = 0; i < 30; i++) {
					        var optionText = juzArabicArray2[i] + juzArabicArray[i]; //current option text
					        optionText = optionText.replace(/\s+/g, '');
					        var lowerOptionText = optionText.toLowerCase(); //option text lowercased for case insensitive testing
					        typeString = typeString.replace(/\s+/g, '');
					        var lowerText = typeString.toLowerCase(); //searchBox value lowercased for case insensitive testing
					        var regex = new RegExp("^" + typeString, "i"); //regExp, "i"=ignore case
					        var match = optionText.match(regex); //test if regExp is true
					        var contains = lowerOptionText.indexOf(lowerText) != -1; //test if searchBox value is contained by the option text
					        if (match || contains) { //if one or the other goes through
					            juzBuilder(i);
					            //return; //prevent other code inside this event from executing
					        }	
					    }
					}
				}	
				//Sura سورة
				if (/^[سورةايةآأ١٢٣٤٥٦٧٨٩٠0123456789]/.test(typeString) == true) {
					//سورة all sura
					if (typeString == "سورة") {
						for (var i = 0; i < suraArray.length; i++) {
							suraBuilder(i);
							runAllSearchFunction = false;
						}
					} 
					//"سورة 1 آاأ 1"
					else if (/^[س]{1}[و]{1}[ر]{1}[ة]{1}[0-9 ١٢٣٤٥٦٧٨٩٠]{1,3}[اآأ]{1}[0-9 ١٢٣٤٥٦٧٨٩٠]{1,3}/.test(typeString) == true) {
						typeString = typeString.replace("سورة", "");
						typeString = typeString.replace("آ", " ");
						typeString = typeString.replace("ا", " ");
						typeString = typeString.replace("أ", " ");
						var splitArray = typeString.split(' ');
						if (/^[0-9]/.test(splitArray[0]) != true) {
							splitArray[0] = globalQuranFunction.converter(splitArray[0]);
						}
						if (/^[0-9]/.test(splitArray[1]) != true) {
							splitArray[1] = globalQuranFunction.converter(splitArray[1]);
						}

										
						getAyaFunction=getAyaFunction.bind(this);
						globalQuranFunction.fetchAyaBySuraID(parseInt(splitArray[0]), parseInt(splitArray[1]), getAyaFunction);
						function getAyaFunction(data) {
							var response = JSON.parse(data);
							if(response.state === 200) {
								for (var i = 0; i < response.success.length; i ++) {
									ayaBuilder(parseInt(response.success[i].VerseID), (parseInt(response.success[i].SuraID) - 1));
								}
								runAllSearchFunction = false;
							} else {

							}
						}
					}
					//سورة 1 اية 1
					else if (/^[س]{1}[و]{1}[ر]{1}[ة]{1}[0-9 ١٢٣٤٥٦٧٨٩٠]{1,3}[اآأ]{1}[ي]{1}[ة]{1}[0-9 ١٢٣٤٥٦٧٨٩٠]{1,3}/.test(typeString) == true){
						typeString = typeString.replace("سورة", "");
						typeString = typeString.replace("ا", "");
						typeString = typeString.replace("آ", "");
						typeString = typeString.replace("أ", "");
						typeString = typeString.replace("ية", " ");
						var splitArray = typeString.split(' ');
						if (/^[0-9]/.test(splitArray[0]) != true) {
							splitArray[0] = globalQuranFunction.converter(splitArray[0]);
						}
						if (/^[0-9]/.test(splitArray[1]) != true) {
							splitArray[1] = globalQuranFunction.converter(splitArray[1]);
						}
						getAyaFunction=getAyaFunction.bind(this);
						globalQuranFunction.fetchAyaBySuraID(parseInt(splitArray[0]), parseInt(splitArray[1]), getAyaFunction);
						function getAyaFunction(data) {
							var response = JSON.parse(data);
							if(response.state === 200) {
								for (var i = 0; i < response.success.length; i ++) {
									ayaBuilder(parseInt(response.success[i].VerseID), (parseInt(response.success[i].SuraID) - 1));

								}
								
							} else {

							}
						}
						runAllSearchFunction = false;
					}
					//سورة and number
					else if (/^[س]{1}[و]{1}[ر]{1}[ة]{1}[0-9 ١٢٣٤٥٦٧٨٩٠]{1,3}/.test(typeString) == true) {
						for (var i = 0; i < 114; i++) {
					        var optionText = suraArrayShort[i]; //current option text
					        optionText = optionText.replace(/\s+/g, '');
					        var lowerOptionText = optionText.toLowerCase(); //option text lowercased for case insensitive testing
					        typeString = typeString.replace(/\s+/g, '');
					        var lowerText = typeString.toLowerCase(); //searchBox value lowercased for case insensitive testing
					        var regex = new RegExp("^" + typeString, "i"); //regExp, "i"=ignore case
					        var match = optionText.match(regex); //test if regExp is true
					        var contains = lowerOptionText.indexOf(lowerText) != -1; //test if searchBox value is contained by the option text
					        if (match || contains) { //if one or the other goes through
					            suraBuilder(i);
					            //return; //prevent other code inside this event from executing
					            runAllSearchFunction = false;
					        }	
					    }
					}
					//"س1ا2"
					else if (/^[س]{1}[0-9 ١٢٣٤٥٦٧٨٩٠]{1,3}[اآأ]{1}[0-9 ١٢٣٤٥٦٧٨٩٠]{1,3}/.test(typeString) == true) {
						typeString = typeString.replace("س", "");
						typeString = typeString.replace("ا", " ");
						typeString = typeString.replace("آ", " ");
						typeString = typeString.replace("أ", " ");
						var splitArray = typeString.split(' ');
						if (/^[0-9]/.test(splitArray[0]) != true) {
							splitArray[0] = globalQuranFunction.converter(splitArray[0]);
						}
						if (/^[0-9]/.test(splitArray[1]) != true) {
							splitArray[1] = globalQuranFunction.converter(splitArray[1]);
						}

						getAyaFunction=getAyaFunction.bind(this);
						globalQuranFunction.fetchAyaBySuraID(parseInt(splitArray[0]), parseInt(splitArray[1]), getAyaFunction);
						function getAyaFunction(data) {
							var response = JSON.parse(data);
							if(response.state === 200) {
								for (var i = 0; i < response.success.length; i ++) {
									ayaBuilder(parseInt(response.success[i].VerseID), (parseInt(response.success[i].SuraID) - 1));
								}
								runAllSearchFunction = false;
							} else {

							}
						}
					}
					//"س1اية2"
					else if (/^[س]{1}[0-9 ١٢٣٤٥٦٧٨٩٠]{1,3}[اآأ]{1}[ي]{1}[ة]{1}[0-9 ١٢٣٤٥٦٧٨٩٠]{1,3}/.test(typeString) == true) {
						typeString = typeString.replace("س", "");
						typeString = typeString.replace("اية", " ");
						typeString = typeString.replace("آية", " ");
						typeString = typeString.replace("أية", " ");
						var splitArray = typeString.split(' ');
						if (/^[0-9]/.test(splitArray[0]) != true) {
							splitArray[0] = globalQuranFunction.converter(splitArray[0]);
						}
						if (/^[0-9]/.test(splitArray[1]) != true) {
							splitArray[1] = globalQuranFunction.converter(splitArray[1]);
						}
						getAyaFunction=getAyaFunction.bind(this);
						globalQuranFunction.fetchAyaBySuraID(parseInt(splitArray[0]), parseInt(splitArray[1]), getAyaFunction);
						function getAyaFunction(data) {
							var response = JSON.parse(data);
							if(response.state === 200) {
								for (var i = 0; i < response.success.length; i ++) {
									ayaBuilder(parseInt(response.success[i].VerseID), (parseInt(response.success[i].SuraID) - 1));
								}
								runAllSearchFunction = false;
							} else {

							}
						}
					}
					//س and number
					else if (/^[س]{1}[0-9 ١٢٣٤٥٦٧٨٩٠]{1,3}/.test(typeString) == true) {
						typeString = typeString.replace("س", "");
						if (/^[0-9]/.test(typeString) != true) {
							typeString = globalQuranFunction.converter(typeString);
						}
						var number = parseInt(typeString);
						if (number <115 && number >0) {
							suraBuilder(number - 1);
							runAllSearchFunction = false;
						}
					}					
				}
				//search everything in sura if above not true.
				if (runAllSearchFunction == true) {
					//sura
				    for (var i = 0; i < 114; i++) {
				    	var splitArray1 = suraArabicArray[i].split(' ');
				    	var splitArray2 = suraArrayShort[i].split(' ');
				        var optionText = splitArray1[1] +" "+ splitArray1[2] + splitArray2[1]; //current option text
				        optionText = optionText.replace(/\s+/g, '');
				        var lowerOptionText = optionText.toLowerCase(); //option text lowercased for case insensitive testing
				        typeString = typeString.replace(/\s+/g, '');
				        var lowerText = typeString.toLowerCase(); //searchBox value lowercased for case insensitive testing
				        var regex = new RegExp("^" + typeString, "i"); //regExp, "i"=ignore case
				        var match = optionText.match(regex); //test if regExp is true
				        var contains = lowerOptionText.indexOf(lowerText) != -1; //test if searchBox value is contained by the option text
				        if (match || contains) { //if one or the other goes through
				            suraBuilder(i);
				            //return; //prevent other code inside this event from executing
				        }
				    }
				}	
			}
        }

		function juzBuilder(number) {
			$('#c-juz-span').show();
        	$('#c-juz-ul').show();
        	number = (parseInt(number) + 1);
        	var suraArabicText = suraArabicArray[number].split(" ");
			var suraText = suraArray[number].split(" ");
			var juzDetailsArray = globalQuranFunction.getJuzDetails();
			var splitter = juzDetailsArray[number - 1];
			var splitArray = splitter.split('.');
			$( "#c-juz-ul" ).append($('<li></li>')
				.attr("id", "c-juz-li_"+number)
				.attr("tabindex", (count + 1)));
				count ++;
			$( "#c-juz-li_"+number).append($('<div></div>')
				.attr("id", "c-juz-div-"+ number)
				.attr("class", "c-search-result-div"));
			$( "#c-juz-div-" + number).append($('<span></span>')
				.attr("class", "c-span-first")
				.text(juzEnglishArray[(number - 1)]+" Sura: " + splitArray[0] + "Aya: " + splitArray[1]));
			$( "#c-juz-div-" + number).append($('<span></span>')
				.attr("class", "c-span-second")
				.text(juzArabicArray[(number - 1)]));
		}

        function suraBuilder(number) {
        	$('#c-sura-span').show();
        	$('#c-sura-ul').show();
        	number = (parseInt(number) + 1);
        	var suraArabicText = suraArabicArray[(number - 1)].split(" ");
			var suraText = suraArray[(number - 1)].split(" ");
			$( "#c-sura-ul" ).append($('<li></li>')
				.attr("id", "c-sura-li_"+number)
				.attr("tabindex", (count + 1)));
				count ++;
			$( "#c-sura-li_"+number).append($('<div></div>')
				.attr("id", "c-sura-div-"+ number)
				.attr("class", "c-search-result-div"));
			$( "#c-sura-div-" + number).append($('<span></span>')
				.attr("class", "c-span-number")
				.text(suraText[0]+". "));
			$( "#c-sura-div-" + number).append($('<span></span>')
				.attr("class", "c-span-first")
				.text(suraText[1]));
			$( "#c-sura-div-" + number).append($('<span></span>')
				.attr("class", "c-span-second")
				.text(suraArabicText[1] +" "+suraArabicText[2]));
        }

        function ayaBuilder(number, suraID) {
			$('#c-aya-span').show();
        	$('#c-aya-ul').show();
        	var suraArabicARRay = globalQuranFunction.getSuraList("arabic");
        	var suraArabicText = suraArabicARRay[parseInt(suraID)].split(" ");
			var suraText = suraArray[parseInt(suraID)].split(" ");
			$( "#c-aya-ul" ).append($('<li></li>')
				.attr("id", "c-aya-li_"+suraID+"_"+number)
				.attr("tabindex", (count + 1)));
				count ++;
			$( "#c-aya-li_"+suraID+"_"+number).append($('<div></div>')
				.attr("id", "c-aya-div-"+ number)
				.attr("class", "c-search-result-div"));
			$( "#c-aya-div-" + number).append($('<span></span>')
				.attr("class", "c-span-first")
				.text(suraText[1]+": "+"Aya: "+ number));
			$( "#c-aya-div-" + number).append($('<span></span>')
				.attr("class", "c-span-second")
				.text(suraArabicText[1]+" "+suraArabicText[2]));
		}
	}	

	searchEvent() {
		//sura list keyboard up,down and click event
		focusFunction=focusFunction.bind(this);
		$('#o-search-result-wrapper').on('focus', 'li', focusFunction);
		function focusFunction(e) {	
			var splitter = e.target.id;
			var splitArray = splitter.split('_');
			if (splitArray[0] == "c-juz-li") {
				var juzDetailsArray = globalQuranFunction.getJuzDetails();
				var juzID = splitArray[1];
				juzID = parseInt(juzID);
				
				var selectedJuz = juzDetailsArray[(juzID - 1)];
				var stringArray = selectedJuz.split(".");
				this.loadQuran("juz", stringArray[0], stringArray[1]);

				isMenuOpen = false;
    			this.forceUpdate();
    			
			} else if (splitArray[0] == "c-sura-li") {
				selected = parseInt((splitArray[1] - 1));
				this.loadQuran("first", 1, 1);
    			isMenuOpen = false;
    			this.forceUpdate();
    					
			} else if (splitArray[0] == "c-aya-li") {
				selected = parseInt(splitArray[1])+ 1 ;
				this.loadQuran("ayaChange", selected, parseInt(splitArray[2]));	
				isMenuOpen = false;
    			this.forceUpdate();
			}	 	
			//selected = parseInt(e.target.id);
		  	
    		//isMenuOpen = false;
    		//this.forceUpdate();
	    	//this.loadQuran("first", 1, 1);	
		}

		//$('#c-aya-ul #c-aya-li_' + splitArray[1]).addClass('plSel').siblings().removeClass();
    	//$('#c-aya-ul #c-aya-li_' + splitArray[1]).closest('#o-search-result-wrapper').scrollTop($('#c-aya-ul #c-aya-li_' + splitArray[1]).index() * $('#c-aya-ul #c-aya-li_' + splitArray[1]).outerHeight());
		//$('#o-search-result-wrapper').on('focus', 'li', focusFunction).on('keydown', 'li', keydownFunction);
		/*function keydownFunction(e) {
			console.log("asdasd	");
			var splitter = e.target.id;
			var splitArray = splitter.split('_');
			var idString;
			if (splitArray[0] == "c-juz-li") {
				idString = '#c-juz-ul #c-juz-li_' + splitArray[1];
			}	
		    if (e.keyCode == 40) {        
		       $(idString).next().focus();
        		
		    } else if (e.keyCode == 38) {        
		       $(idString).prev().focus();
        		
		    }
		}*/
	}

	handleMenuState(state) {
		if (state.isOpen == true) {
			isMenuOpen = true;
		} else {
			isMenuOpen = false;
		}	
	}

	handleSearchIconClick() {
		$('#c-search-input').focus();
	}

	handleFeedback(e) {
		this.getQuestionFeedback();
	}

	componentWillUnmount() {
		$(window).off("resize");
	}

	exit() {
		this.context.router.push(config.root + "/NotFound");
	}

	timeout() {
		this.context.router.push(config.root + "/graditude?email="+betaEmail+"&token="+token);
	}
	removeOverlay() {
      $("#demo-quran-overlay").remove();
  	}

	displayOverlay(text) {
		$("<table id='demo-quran-overlay'><tbody><tr><td>" + text + "</td></tr></tbody></table>").css({
		    "position": "fixed",
		    "top": "0px",
		    "left": "0px",
		    "width": "100%",
		    "height": "100%",
		    "background-color": "rgba(0,0,0,.5)",
		    "z-index": "10000",
		    "vertical-align": "middle",
		    "text-align": "center",
		    "color": "#fff",
		    "font-weight": "bold",
		    "cursor": "pointer"
		}).appendTo("body");
	}

	componentDidUpdate() {
		$('#UserCPMenu').removeClass('logout');
	}

	componentDidMount() {
		if (Cookies.readCookie('quran_demo')!=1){ //if demo not displayed
    		this.displayOverlay("<div class='demo1' style='position: absolute;margin-left: 2em;display: -webkit-box'> <img style='width: 30px;padding: 4px; ' src='app/assets/images/ui/arrow_left.gif'> Sura, Juz, Ayah </div> <div class='demo3' style='position: absolute;float:right;right:2em;bottom:7em;display: -webkit-box'> <img style='width: 30px;padding: 4px;left: -30px;top: 6px;transform: rotate(180deg);position: absolute;' src='app/assets/images/ui/arrow_right.gif'> Play the Surah</div> <input type='button' class='c-input-green remove_overlay' value='Got it?' >");
    		Cookies.writeCookie('quran_demo','1','3'); //off demo
		}

		//Beta check email token url
		var url = window.location.search;
		if(url != "") {
			var queryStart = (url.indexOf("?") + 1);
        	var queryEnd  = (url.indexOf("#") + 1) || (url.length + 1);
        	var query = url.slice(queryStart, (queryEnd - 1));
        	var pairs = query.replace(/\+/g, " ").split("&");
        	if (pairs[0] == "" || pairs[1] == "" || pairs[0] == null || pairs[1] == null) {
        		this.exit();
        	} else {
        		var emailPairs = pairs[0].replace(/\+/g, " ").split("="),
	        	tokenPairs = pairs[1].replace(/\+/g, " ").split("="),
	        	parms = {}, i, n, v, nv;
	        	betaEmail = emailPairs[1];
	        	token = tokenPairs[1];
	        	betaEmail = betaEmail.replace("%40","@");
	        	getUserData=getUserData.bind(this);
	        	var dataArray = { "email": betaEmail, "token": token}
	        	globalBetaFunction.getUserEmailToken(dataArray, getUserData);
	        	function getUserData(data){
	        		var response = JSON.parse(data);
					if(response.state === 200) {
						var array = response.success;
						comparefunction=comparefunction.bind(this);
						globalBetaFunction.compareTimeExpired(betaEmail, comparefunction);
						function comparefunction(data) {
							if (data == "timeremain") {
								compareStartfunction=compareStartfunction.bind(this);
								globalBetaFunction.compareTimeStart(betaEmail, compareStartfunction);
								function compareStartfunction(data) {
									if (data == "timeremain") {

									} else {
										this.timeout();
									}
								}
							} else {
								this.timeout();
							}
						}

						if (array[0].steps == 0) {
		                  betaEmail = betaEmail.replace("@","%40");
		                  this.context.router.push(config.root + "/SignUp?email="+betaEmail+"&token="+token);
		                } else if (array[0].steps == 1) {
		                  betaEmail = betaEmail.replace("@","%40");
		                  this.context.router.push(config.root + "/NDA?email="+betaEmail+"&token="+token);
		                } else if (array[0].steps == 2) {
		                  betaEmail = betaEmail.replace("@","%40");
		                  this.context.router.push(config.root + "/BetaRegisteration?email="+betaEmail+"&token="+token);
		                } else if (array[0].steps == 3) {
		                  betaEmail = betaEmail.replace("@","%40");
		                  this.context.router.push(config.root + "/StartSession?email="+betaEmail+"&token="+token);
		                } else if (array[0].steps == 4) {
		                  betaEmail = betaEmail.replace("@","%40");
		                  this.context.router.push(config.root + "/AboutPage?email="+betaEmail+"&token="+token);
		                } 			
					}
					else {
						this.exit();
					}
	        	} 
        	}  	
   		} else {
			this.exit();
		}

		$(".remove_overlay").click(function () {
	        if ($("#demo-quran-overlay").length > 0) {
	          $("#demo-quran-overlay").remove();
	        }
    	});
        $('#UserCPMenu').removeClass('logout');
        $('#UserCPMenu > div > #UserCPHamburgerMenu').css('top', '65px');
        $('.o-noorLogo-icon').css("cssText","position: absolute !important;top: 0 !important;width: 100% !important;z-index: 999 !important;");

		suraArray = globalQuranFunction.getSuraList("english");
		suraArabicArray = globalQuranFunction.getSuraList("arabic");

		//Search box items
		$('#c-juz-span').hide();
		$('#c-sura-span').hide();
		$('#c-aya-span').hide();
		$('#c-juz-ul').hide();
		$('#c-sura-ul').hide();
		$('#c-aya-ul').hide();
		this.searchEvent();

		this.loadQuranCheckpoint();
		if (isLogin == true) {
			if (Cookies.readCookie('quranstate') != "") {
				var quranState = JSON.parse(Cookies.readCookie('quranstate'));			
				if (quranState.flipmode == "pagemode") {
					isReadmore = false;
					$('.o-nextprevious-wrapper').show();
				} else {
					isReadmore = true;
					$('.o-nextprevious-wrapper').show();
				}
				
				if (quranState.langmode == "en") {
					quranLanguage = "AyahTextEnglish";
					$('#o-search-firstpage').removeClass('text-right');
					$('#c-firstpage-title').empty();
					$('#c-firstpage-juz2-span').empty();
					$(".c-firstpage-title").css("font-size", "2.5em");
					$(".c-firstpage-juz-span").css("font-size", "1.3em");
					$(".c-firstpage-juz2-span").css("font-size", "1.0em");
					$('#c-firstpage-title').append('<i class="fa fa-lightbulb-o" id="c-lightbuld-icon"></i> '+lang(this.props.language, "sidebarQuickTips")+'');
					document.getElementById("c-firstpage-juz-span").innerHTML = lang(this.props.language, "sidebarQuickJuzSearch");
					$('#c-firstpage-juz2-span').append(''+lang(this.props.language, "sidebarQuickType")+' <b>'+lang(this.props.language, "sidebarQuickJuz1")+'</b> / <b>'+lang(this.props.language, "sidebarQuickJuz2")+'</b> / <b>'+lang(this.props.language, "sidebarQuickJuz3")+'</b>');
				} else {
					quranLanguage = "AyahTextArabic";
					$('#o-search-firstpage').addClass('text-right');
					$('#c-firstpage-title').empty();
					$('#c-firstpage-juz2-span').empty();
					$(".c-firstpage-title").css("font-size", "2.8em");
					$(".c-firstpage-juz-span").css("font-size", "1.6em");
					$(".c-firstpage-juz2-span").css("font-size", "1.3em");
					$('#c-firstpage-title').append('نصائح سريعة <i class="fa fa-lightbulb-o" id="c-lightbuld-icon"></i>');
					document.getElementById("c-firstpage-juz-span").innerHTML = "للبحث عن جزء، سورة أو آية محددة";
					$('#c-firstpage-juz2-span').append('اكتب <b>الجزء</b> / <b>سورة</b> / <b>س٧ا١</b>');
				}
				if (quranState.nightmode == "off") {
					isNightMode = false;
				} else {
					isNightMode = true;
				}
				if (quranState.viewmode == "suraview") {
					isPageMode = true;
				} else {
					isPageMode = false;
				}	
			}
		}
		$('#c-readmore-button').hide();
		$('.o-spinner-wrapper').hide();
		$('.o-nextprevious-wrapper').hide();
		$('.c-favourite-span').hide();

		//changing menu size in mobile
		if (window.innerWidth < 768 && window.innerWidth > 320) {
			menuWidth = window.innerWidth;
			this.forceUpdate();
		}
		
		//favourite aya and share aya display based on login details
		var email = betaEmail;
		if (email == "") {
			//$('.c-favourite-span').hide();
			$('#c-nightmode-button').removeClass('settings-button');
			$('#c-viewmode-button').removeClass('settings-button');
			$('#c-viewflipmode-button').removeClass('settings-button');
			$('#c-translation-button').removeClass('settings-button');
		} else {
			//$('.c-favourite-span').show();
			$('#c-nightmode-button').addClass('settings-button');
			$('#c-viewmode-button').addClass('settings-button');
			$('#c-viewflipmode-button').addClass('settings-button');
			$('#c-translation-button').addClass('settings-button');
		}

		//Fullscreen mode closed function
		$('#o-quran-container').bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e) {
		   var state = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
		    if (state == false) {
		    	if (email != "") {
		    		$('#c-viewflipmode-button').addClass('settings-button');
					$('#c-translation-button').addClass('settings-button');
					$('#c-nightmode-button').addClass('settings-button');
					$('#c-viewmode-button').addClass('settings-button');

		    	}
		    	$('#o-topbar-container > div > .bm-burger-button').removeClass('active');
				isFullscreen = false;
		    }
		});

		//GoogleSearchEngine API
		var cx = '007616792258555614997:vbtaxoxafuo';
	    var gcse = document.createElement('script');
	    gcse.type = 'text/javascript';
	    gcse.async = true;
	    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
	    var s = document.getElementsByTagName('script')[0];
	    s.parentNode.insertBefore(gcse, s);
	    
	    $('#gSearch').append('<gcse:searchbox-only></gcse:searchbox-only>');

	    ///when user reload or close the tab, confirmExit will load
	    window.onbeforeunload = confirmExit;
		function confirmExit() {
			var email = betaEmail;
			if (email != "") {
				var suraID = (parseInt(selected) + 1);
				var verseID = parseInt(preSelect);
				verseID = parseInt(verseID);

				globalQuranFunction.updateQuranCheckpoint(email, suraID, verseID);
			}
		}
		this.nightmodeFunction("first");
		userBurgerClick=userBurgerClick.bind(this);
		$('#UserCPMenu > div > .bm-burger-button').click(userBurgerClick);
		function userBurgerClick() {
			if (isMenuOpen == true) {
				isMenuOpen = false;
				this.forceUpdate();
			}
		}
		globalFunction.differentiate_device(betaEmail,token); //get the u_id, right device?
	}

	componentWillMount() {
		windowHeight = window.innerHeight;
		windowWidth = window.innerWidth;
		buttonX = windowWidth - 50;
		buttonY = 170;
		resizeWindow=resizeWindow.bind(this);
		$(window).resize(resizeWindow);
		function resizeWindow(){
			clearTimeout(resizeTimer);
			timer=timer.bind(this);
			resizeTimer = setTimeout(timer, 250);
			function timer() {
				windowHeight = window.innerHeight;
				windowWidth = window.innerWidth;
				buttonX = windowWidth - 50;
				buttonY = 170;
				this.forceUpdate();            
			}
		}
	}

	handleStart() {
		$('#c-feedback-button').off('click');
		$('#c-feedback-button').click(this.handleFeedback.bind(this));
	}

	handleDrag(e, ui) {
		buttonX = buttonX + ui.deltaX;
		buttonY = buttonY + ui.deltaY;
		$('#c-feedback-button').off('click');
	}

	handleStop() {
		var top = 0;
		var left = 0;
		var right = window.innerWidth;
		var bottom = window.innerHeight;
		var topCal = buttonY + top;
		var bottomCal = (bottom - 206) - buttonY;
		var leftCal = buttonX + left;
		var rightCal = right - buttonX
		var finalHeight = 0, finalWidth = 0;
		if (topCal < bottomCal){
			if (leftCal < rightCal) {
				if (leftCal > topCal) {
					finalHeight = -20;
					finalWidth = leftCal;
				} else {
					finalHeight = topCal;
					finalWidth = 0;
				}	
			} else {
				if (rightCal > topCal) {
					finalHeight = -20;
					finalWidth = right-rightCal;
				} else {
					finalHeight = topCal;
					finalWidth = (right - 50);
				}
			}
		} else {
			//finalHeight = (bottom - 206);
			if (leftCal < rightCal) {	
				if (leftCal > bottomCal) {
					finalHeight = (bottom - 206);
					finalWidth = leftCal;
				} else {
					finalHeight = topCal;
					finalWidth = 0;
				}	
			} else {
				if (rightCal > bottomCal) {
					finalHeight = (bottom - 206);
					finalWidth = right-rightCal;
				} else {
					finalHeight = topCal;
					finalWidth = (right - 50);
				}
			}
		}
		buttonX = finalWidth;
		buttonY = finalHeight;
		this.forceUpdate();
	}

	getQuestionFeedback() {
		if(feedbackSession) {
		  var modal = document.getElementById('myModal');
		  modal.style.display = 'block';
		} else {
			feedbackSession = true;
			getQuestionForm = getQuestionForm.bind(this);
			GlobalBetaFunction.getFeedbackModal("quran",getQuestionForm);
			function getQuestionForm(data) {
			  $('body').append(data);
			  var modal = document.getElementById('myModal');
			  modal.style.display = 'block';
			  $('.closeModalBtn').click(function(){        
			    	modal.style.display = "none";
			    	$('.c-errorClass').css('display','none');
			  });
			  $('.add-new').click(function() {
				    var newNo = $('.o-question-inner').children().length + 1;
				    $('#question-table').append(
				        '<li class="c-questionlistener">' +
				          '<label>'+newNo+'.</label>' +
				          '<div class="u-select__wrapper">' +
					          '<select id="quran-question-'+newNo+'" class="c-selection has-dropdown" ref="quranquestion">' +
					            '<option selected disabled>-- Choose Bug --</option>' +
					            '<option value="Function Not Working">Function Not Working</option>' +
								'<option value="Invalid Data">Invalid Data</option>' +
								'<option value="Spelling mistakes">Spelling mistakes</option>' +
								'<option value="Browser Compatibility">Browser Compatibility</option>' +
								'<option value="Logic Error">Logic Error</option>' +
								'<option value="Crashing Issues">Crashing Issues</option>' +
					          '</select>' +
					          '<i class="fa fa-angle-down"></i>' +
					      '</div>' +
				          '<input id="qurananswer'+newNo+'" class="o-form__input" type="text" placeholder="Comment..." />' +
				          '<div class="u-select__wrapper">' +
					          '<select id="quran-priority-'+newNo+'" class="c-selection has-dropdown" ref="quranpriority">' +
					            '<option selected disabled>-- Choose Priority --</option>' +
					            '<option value="Low">Low</option>' +
					            '<option value="Medium">Medium</option>' +
					            '<option value="High">High</option>' +
					            '<option value="Urgent">Urgent</option>' +
					            '<option value="Critical">Critical</option>' +
					          '</select>' +
					          '<i class="fa fa-angle-down"></i>' +
					       '</div>' + 
				        '</li>');
			  });
			  saveFeedback = saveFeedback.bind(this);
			  $('.is-save').click(saveFeedback);
			  function saveFeedback() {
				    var feedbackData;
				    var userEmail = betaEmail;
				    var validateAll = globalBetaFunction.validateFeedbackForm("quran");
				    if(validateAll.errorMsg == "") {          
						for(var i=1; i<=validateAll.answerFill; i++) {
							feedbackData = {
								email: userEmail,
								category: "quran",
								answer: $('#qurananswer'+i).val(),
								priority: $('#quran-priority-'+i).val(),
								question: $('#quran-question-'+i).val()
							};
							GlobalBetaFunction.addUserFeedback(feedbackData);
						}
						if(validateAll.extraFill) {
							feedbackData = {
							    email: userEmail,
							    category: "quran",
							    answer: $('#othercomment').val(),
							    priority: "medium",
							    question: "general"
							};
							GlobalBetaFunction.addUserFeedback(feedbackData);
						}
						modal.style.display = "none";
						modal.remove();
						this.context.router.push(config.root + "/summary?email="+betaEmail+"&token="+token);
				    }
				   	else {
              			$('.c-errorClass').text(validateAll.errorMsg);
						$('.c-errorClass').css('display','block');
		            }  
			  }
			}
		}
	}	

	render() {
		return (
			<InlineCss stylesheet={css.quranMain(this.props.arabic)} namespace="QuranMainNew">	
				<div id="o-quran-container" className="o-quran-container_isDayMode">
					<div id="o-topbar-container" className="is-daymode_o-topbar-container">
						<Menu id="c-menu-wrapper" width={menuWidth} isOpen={isMenuOpen} onStateChange={ this.handleMenuState.bind(this) }>
					        <div className="o-quran-sidebar-container">
					        	<div className="o-quran-sidebar-title">
					        		<h6 className="o-app-title">{lang(this.props.language, "sidebarTitle")}</h6>
					        		<div className="o-title-lastread">
					        			<span id="c-lastread">{lang(this.props.language, "sidebarLastread")}</span>
					        		</div>
					        		<div className="o-title-sura">
					        			<span id="c-title-1" className="c-span-first"></span>
					        			<span id="c-title-2" className="c-span-second"></span>
					        		</div>
					        		<div className="o-search-container">
										<input type="search" id ="c-search-input" className="c-search-input" onChange={this.handleSearchFunction.bind(this)}/>
										<span className="c-search-icon" onClick={this.handleSearchIconClick.bind(this)}><i className="fa fa-search" id="firstname"></i></span>
									</div>
					        	</div>
					        	<div className="o-quran-sidebar-main">
									<div id="o-search-result-wrapper" className="o-search-result-wrapper">
										<div id="o-search-firstpage" className="o-search-firstpage">
											<span id="c-firstpage-title" className="c-firstpage-title"><i className="fa fa-lightbulb-o" id="c-lightbuld-icon"></i> {lang(this.props.language, "sidebarQuickTips")}</span>
											<div id="o-firstpage-juz-div" className="o-firstpage-juz-div">
												<span id="c-firstpage-juz-span" className="c-firstpage-juz-span">{lang(this.props.language, "sidebarQuickJuzSearch")}</span>
												<div><span id="c-firstpage-juz2-span" className="c-firstpage-juz2-span">{lang(this.props.language, "sidebarQuickType")} <b>{lang(this.props.language, "sidebarQuickJuz1")}</b> / <b>{lang(this.props.language, "sidebarQuickJuz2")}</b> / <b>{lang(this.props.language, "sidebarQuickJuz3")}</b></span></div>
											</div>
										</div>
										<div id="c-juz-span" className="c-search-title">{lang(this.props.language, "sidebarSearchJuzTitle")}</div>
										<ul id="c-juz-ul">
			            				</ul>
			            				<div id="c-sura-span" className="c-search-title">{lang(this.props.language, "sidebarSearchSuraTitle")}</div>
			            				<ul id="c-sura-ul">
			            				</ul>
			            				<div id="c-aya-span" className="c-search-title">{lang(this.props.language, "sidebarSearchAyaTitle")}</div>
			            				<ul id="c-aya-ul">
			            				</ul>
									</div>
					        	</div>
					        </div>
					    </Menu>
						<div className="o-topbar-button-wrapper">	
							<button type="button" id="c-viewmode-button" className="c-topbar-button settings-button" onClick={this.handleViewMode.bind(this)} ><i className="fa fa-list-ul"></i></button>
							<button type="button" id="c-nightmode-button" className="c-topbar-button settings-button" onClick={this.handleNightMode.bind(this)} ><i className="fa fa-moon-o"></i></button>
							<button type="button" id="c-fullscreen-button" className="c-topbar-button" onClick={this.toggleFullScreen.bind(this)} ><i className="fa fa-arrows-alt"></i></button>
							<button type="button" id="c-viewflipmode-button" className="c-viewflipmode-button settings-button" onClick={this.handleViewFlip.bind(this)}>Mode</button>
							<button type="button" id="c-translation-button" className="c-translation-button settings-button" onClick={this._handleTranslation.bind(this)} >Arabic</button>								
						</div>
						<div id="o-bottom-container" className="is-daymode_o-bottom-container">
				       		<div id="o-audioplayer-container" className="o-audioplayer-container">
								<audio id="c-audioplayer" className="c-audioplayer" preload="auto" controls>
								
								</audio>
								<div className="o-audioplayer-playpause" title="Play" onClick={this.handlePlay.bind(this)}>
									<i className="fa fa-play" id="c-playbutton-icon"></i>
								</div>
								<div id="o-audioplayer-track-title" className="o-audioplayer-track-title"></div>								
								<div id="o-audioplayer-bar" className="o-audioplayer-bar">
									<div id="o-audioplayer-bar-loaded" className="o-audioplayer-bar-loaded"></div>
									<div id="o-audioplayer-bar-played" className="o-audioplayer-bar-played"></div>
								</div>
								<div id="o-audioplayer-duration-wrapper" className="audioplayer-time">
									<div id="o-audioplayer-currenttime" className="o-audioplayer-currenttime">Loading</div>
									<span>&nbsp;/&nbsp;</span>
									<div id="o-audioplayer-duration" className="o-audioplayer-duration">...</div>
								</div>
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
								<div className="o-audioplayer-download" onClick={this.handleDownload.bind(this)}>
									<i className="fa fa-download" id="c-download-icon"></i>
									<a id="c-download-button" href="app/bridge/classes/downloadAudio.php?path=http://noor.me/audio/abdulrahman_alsudaes/001.mp3"></a>
								</div>
							</div>
				    	</div>
					</div>
		       		<div id="o-main-container" className="is-daymode_o-main-container">
		       			<Draggable
					       axis="both"
					       grid={[10, 10]}
					       zIndex={20}
					       bounds={{top: -20, left: 0, right: windowWidth - 50, bottom: windowHeight - 206}}					  
					  	   position={{x: buttonX, y: buttonY}}
					       onStart={this.handleStart.bind(this)}
					       onDrag={this.handleDrag.bind(this)}
					       onStop={this.handleStop.bind(this)}>
						   <button type="button" id="c-feedback-button" className="c-feedback-button" >?</button>
						</Draggable>	
			       		<div id="o-title-area" className="is-daymode_o-title-area">
			       				<div className="o-sura-title">
			       					{/*<label htmlFor="c-page-title-label" id="c-page-title-label" className="c-title-label"></label>*/}
			       				</div>
			       				<div className="o-page-title">
			       					<label htmlFor="c-sura-title-label" id ="c-sura-title-label" className="c-title-label"></label>
			       					<div>
			       						<label htmlFor="c-sura-starter" id ="c-sura-starter-label" className="c-starter-label"></label>
			       					</div>
			       					<div className="o-page-title-button">
			       						<span className="c-favourite-span" onClick={this._handleFavourite.bind(this)}><i className="fa fa-star"></i> <span className="c-favourite-span-in">Save to favourite</span></span>
			       					</div>
			       				</div>
			       				<div className="o-juz-title"> 
			       					<label htmlFor="c-juz-title-label" id="c-juz-title-label" className="c-juz-title-label"></label>
			       				</div>
			       		</div>
			       		<div id ="o-text-container" className="o-text-container">
			       				 <div className="o-previousbutton-area">
			       				 	<button type="button" id="c-previous-button" className="c-previous-button" ><i className="fa fa-chevron-left"></i></button>
			       				 </div>
			       				 <div className="o-center-mainarea">
			       				 	<div id="o-text-area" className="o-text-area">

			       				 	</div>
			       				 	<div className="o-readbutton-wrapper">
							       		<button type="button" id="c-readmore-button" className="c-readmore-button" onClick={this.handleReadmore.bind(this)}>{lang(this.props.language, "readMoreButton")}</button>
							       		<div id="o-loading-icon" className="o-spinner-wrapper">
							       			<i className="fa fa-spinner fa-pulse fa-3x fa-fw" id="c-spinner-icon"></i>
							       		</div>
							       		<div className="o-nextprevious-wrapper">
							       			<button type="button" id="c-readmore-previous-button" className="c-readmore-previous-button" ><i className="fa fa-arrow-left"></i></button>
							       			<button type="button" id="c-readmore-next-button" className="c-readmore-next-button" ><i className="fa fa-arrow-right"></i></button>
							       		</div>
							       	</div>	
			       				 </div>
			       				 <div className="o-nextbutton-area">
			       				 	<button type="button" id="c-next-button" className="c-next-button" ><i className="fa fa-chevron-right"></i></button>
			       				 </div>
			       		</div>
			       	</div>  	
        		</div>
			</InlineCss>
		);
	}
};

QuranMainNew.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

export default QuranMainNew;