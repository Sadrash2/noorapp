import functions from "../../scss/styleFunctions";
import colors from "../../scss/colors";

let cssFunction = {
	mosquefinderMain: function(arabicToggle) {
		const arabic = ``;
		return `

    /* index
    --------------------------
    1. Commons
      - 1.1 Header
      - 1.2 Tags
      - 1.3 Colors
      - 1.4 Preload CSS
    2. Keyframes
    3. Structure
      - 3.1 Maps
      - 3.2 Overlay
      - 3.3 React autosuggest
      - 3.4 Modal
    4. Map UI
    5. Right Sidebar
    6. Left Sidebar
      - 6.1 Commons
      - 6.2 Default / Search Mosque / #hamBurgerMenu
      - 6.3 Direction Panel
      - 6.4 Add New Mosque Panel
      - 6.5 Mosque Detail Panel
    7. Feedback
      - 7.1 Question form modal
      - 7.2 Modal structure
    8. New and yet to sort out CSS
    --------------------------
    */

    /* --- 1. Commons
    ----------------- */

    * {
      -moz-transition:all 100ms ease;
      -o-transition:all 100ms ease;
      -webkit-transition:all 100ms ease;
      transition:all 100ms ease;
    }

    /* 1.1 Header */

    .o-noorLogo-icon {
      position: absolute;
      padding: 0;
      top: 88vh;
      bottom: 88%;
      margin-left: -96px;
      z-index: 1;
      width: 100%;
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

    #UserCPHamburgerMenu > .bm-burger-button {
      width: 56px !important;
      height: 56px !important;
      right: 16px !important;
      top: 16px !important;
    }

    #UserCPMenu > div > .bm-burger-button {
        position: fixed;
        width: 60px!important;
        height: 60px!important;
        right: 12px!important;
        left: auto!important;
        top: 10px!important;
        z-index: 100!important;
        padding: 0;
        border-radius: 50%;
    }    

    /* 1.2 Tags */

    ul { list-style:none; }

    /* 1.3 Colors */

    .color-turquoise {
      color: ${colors.mosqueThird};
    }

    /* 1.4 Preload CSS */

    #loading{
      background-color: #fff;
      height: 100%;
      width: 100%;
      position: fixed;
      z-index: 90;
      margin-top: 0px;
      top: 0px;
    }

    #loading-center{
      width: 100%;
      height: 100%;
      position: relative;
    }


    #loading-center-absolute {
      position: absolute;
      left: 50%;
      top: 50%;
      height: 100px;
      width: 50px;
      margin-top: -50px;
      margin-left: -25px;
    }

    .object{
      width: 50px;
      height: 8px;
      margin-bottom:15px;
      background-color: #000;
      -webkit-animation: animate 0.8s infinite;
      animation: animate 0.8s infinite;
      }

    #object_two { 
      -webkit-animation-delay: 0.2s; 
      animation-delay: 0.2s;
    }

    #object_four {  
      -webkit-animation-delay: 0.2s; 
      animation-delay: 0.2s; 
    }

    /* --- 2. Keyframes
    ----------------- */

    @-webkit-keyframes animate {
      50% {
      -ms-transform: translate(50%,0); 
        -webkit-transform: translate(50%,0); 
        transform: translate(50%,0); 
        }
    }

    @keyframes animate {
      50% {
      -ms-transform: translate(50%,0); 
        -webkit-transform: translate(50%,0); 
        transform: translate(50%,0); 
        }  
    }

    @keyframes slideRight {
      0% {
        transform: translateX(-150%);
      }
      65%{
        transform: translateX(-4%);
      }    
      100% {
        transform: translateX(0%);
      } 
    }

    @-webkit-keyframes slideRight {
      0% {
        -webkit-transform: translateX(-150%);
      }
      65%{
        -webkit-transform: translateX(-4%);
      }     
      100% {
        -webkit-transform: translateX(0%);
      }
    }

    @-webkit-keyframes animatetop {
        from {top:-300px; opacity:0}
        to {top:0; opacity:1}
    }

    @keyframes animatetop {
        from {top:-300px; opacity:0}
        to {top:0; opacity:1}
    }

    /* --- 3. Structure
    ----------------- */

    /* 3.1 Maps */

    #map {
      width: 100%;
      min-height: 100%;
      height: 100%;
      height: 100vh;
      z-index:0;
      overflow-y: hidden;
    }

    /* 3.2 Overlay */
    /* Morph shape necessary with bubble or elastic */
    .bm-morph-shape {
      fill: #373a47;
    }
        
    /* Styling of overlay */
    .bm-overlay {
      background: ${colors.overlay};
    }

    /* 3.3 React autosuggest */
    .react-autosuggest__container {
     
    }
    .react-autosuggest__input {
      width: 240px;
      height: 40px;
      padding: 10px 50px;
      font-family: Helvetica, sans-serif;
      font-weight: 300;
      font-size: 16px;
      border: 1px solid #aaa;
      border-radius: 4px;
    }
    .o-sidebar-search-box > .react-autosuggest__container {
      width: 100%;
      height: 85%;
    }
    .o-sidebar-search-box > .react-autosuggest__container > .react-autosuggest__input {
      width: 100%;
      height: 100%;
      font-weight: 300;
      font-size: 16px;
      border: none;
      padding: 0 0 0 4%;
      background-color: transparent;
      border-radius: 0;
      color: ${colors.mosquePrimary};
    }
    .react-autosuggest__input:focus {
      outline: none;
    }
    .react-autosuggest__container--open .react-autosuggest__input {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    .react-autosuggest__suggestions-container {
      position: absolute;
      width: 240px;
      margin: 0;
      padding: 0;
      list-style-type: none;
      border: 1px solid #aaa;
      background-color: #fff;
      font-family: Helvetica, sans-serif;
      font-weight: 300;
      font-size: 16px;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      z-index: 2;
    }
    .react-autosuggest__suggestion {
      cursor: pointer;
      padding: 10px 20px;
    }
    .react-autosuggest__suggestion:not(:first-child) {
      border-top: 1px solid #ddd;
    }
    .react-autosuggest__suggestion--focused {
      background-color: #0C7EAF;
      color: #fff;
    }
    .suggestion-content {
      display: flex;
      align-items: center;
      background-repeat: no-repeat;
    }
    .suggestionContainer {
      line-height: 45px;
    }
    .react-autosuggest__suggestion--focused .highlight {
      color: #120000;
    }

    /* 3.4 Modal */

    .closeModalBtn {
      float: right;
      font-size: 20px;
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
    }

    .modal-header h2 {
      font-size: 2.0rem;
    }

    .modal-body {
      padding: 16px;
      font-size: 1.6rem;
    }

    .modal-footer {
      padding: 16px;
    }

    /* --- 4. Map UI
    ----------------- */

    .o-google-search {
      position: left;
      width: 18.0em;
      left: 0;
      bottom: 0;
    }

    .gmnoprint > .gm-style-mtc {
      margin-top: 6px;
    }

    .gmnoprint > .gm-style-mtc:first-child {
      margin-left: 6px;
    }

    .currentLocationButton, .requestmosqueButton {
      position: absolute;     
      background-color: #fff; 
      right: 12px;
      bottom: 22px;
    }
    .currentLocationButton:hover, .requestmosqueButton:hover {
      background-color: #fff;
    }
    .requestmosqueButton {
      right: 80px;
    }
    .currentLocationButton > img, .requestmosqueButton > img {
      width: auto;
      height: 32px;
      background-color: #fff;
    }

    .o-search-box {
      position: absolute;
      width: 18.0em;
      left: 16px;
      top: 16px;
    }

    ::-webkit-input-placeholder {
       color: ${colors.mosqueThird};
    }
    :-moz-placeholder { /* Firefox 18- */
       color: ${colors.mosqueThird};
    }
    ::-moz-placeholder {  /* Firefox 19+ */
       color: ${colors.mosqueThird};  
    }
    :-ms-input-placeholder {  
       color: ${colors.mosqueThird};
    }

    .controls {
      margin-top: 10px;
      border: 1px solid transparent;
      border-radius: 2px 0 0 2px;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      height: 32px;
      outline: none;
      box-shadow: 0 2px 6px ${colors.overlay};);
    }

    .c-search-input {
      display: block;
      height: 40px;
      padding: 5px 5px 5px 52px;
      background-color: white;
      border: 1px solid ${colors.mosqueSearchBorderColor};
      font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
      font-size: 1.4rem;
      font-weight: 500;
      text-indent: 0;
      line-height: 1.42857143;
      color: ${colors.mosqueSearchInputColor};
      outline: none;
      box-shadow: 0 1px 3px ${colors.mosqueSearchBoxShadow};
      transition: border-color .25s ease-in-out;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    input.c-search-input::-webkit-input-placeholder {
       color: ${colors.mosqueSearchInputPlaceholder};
    }

    input.c-search-input:-moz-placeholder { /* Firefox 18- */
       color: ${colors.mosqueSearchInputPlaceholder}; 
    }

    input.c-search-input::-moz-placeholder {  /* Firefox 19+ */
       color: ${colors.mosqueSearchInputPlaceholder}; 
    }

    input.c-search-input:-ms-input-placeholder {  
       color: ${colors.mosqueSearchInputPlaceholder}; 
    }

    #pac-input {
      left: 16px !important;
      top: 16px !important;
      width: 288px;
      display: block;
      height: 40px;
      padding: 5px;
      background-color: white;
      border: 1px solid ${colors.mosqueSearchBorderColor};
      border-radius: 0;
      font-size: 1.4rem;
      font-weight: 500;
      text-indent: 0;
      line-height: 1.42857143;
      color: ${colors.mosqueSearchInputColor};
      text-indent: 16px;
      outline: none;
      box-shadow: 0 1px 3px ${colors.mosqueSearchBoxShadow};
      transition: border-color .25s ease-in-out;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    #pac-input:focus {
      outline: none;
    }

    input#pac-input::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: ${colors.mosqueSearchInputPlaceholder};
    }
    input#pac-input::-moz-placeholder { /* Firefox 19+ */
      color: ${colors.mosqueSearchInputPlaceholder};
    }
    input#pac-input:-ms-input-placeholder { /* IE 10+ */
      color: ${colors.mosqueSearchInputPlaceholder};
    }
    input#pac-input:-moz-placeholder { /* Firefox 18- */
      color: ${colors.mosqueSearchInputPlaceholder};
    }

    .pac-container {
      font-family: Roboto;
    }

    

    #type-selector {
      color: #fff;
      background-color: #4d90fe;
      padding: 5px 11px 0px 11px;
    }

    #type-selector label {
      font-family: Roboto;
      font-size: 13px;
      font-weight: 300;
    }
    #target {
      width: 345px;
    }
    
    /* --- 5. Right Sidebar
    ----------------- */

    .slideRight{
      animation-name: slideRight;
      -webkit-animation-name: slideRight; 

      animation-duration: 1s; 
      -webkit-animation-duration: 1s;

      animation-timing-function: ease-in-out; 
      -webkit-animation-timing-function: ease-in-out;   

      visibility: visible !important; 
    }

    /* --- 6. Left Sidebar
    ----------------- */

    /* 6.1 Commons */

    .o-app-sidebar {         
      height: 100vh;
      min-height: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 30;
      transition: 0.5s;
      background-color: ${colors.mosqueAppSidebarBg};
      box-shadow: 2px 4px 5px ${colors.mosqueAppSidebarShadow};
      -webkit-box-shadow: 2px 4px 5px ${colors.mosqueAppSidebarShadow};
    }   

    .bm-burger-button {
      position: absolute;
      width: 20px;
      height: 15px;
      left: 32px;
      top: 28px;
      font-size: 16px;
      padding: 2px 2px 2px 2px;
    }
    
    .bm-burger-bars {
      background: ${colors.mosquePrimary};
    }
    .bm-cross-button {
      height: 24px;
      width: 24px;
      z-index: 50;
    }
    .bm-cross {
      background: white;
    }
    .closebtn {
      position: absolute;
      z-index: 5;
      right: 16px;
      height: 24px;
      width: 24px;
      font-size: 1.5em;
      font-weight: 600;
      color: ${colors.mosqueAppSidebarIconActive};
      background: transparent;
      border: none;
    }
    .closebtn:focus { outline: none; }
    .closebtn:hover { 
      color: ${colors.mosqueAppSidebarIconHover}; 
    }
    .backbtn {
      position: absolute;
      z-index: 2;
      left: 16px;
      height: 24px;
      width: 24px;
      font-size: 1.8em;
      background: transparent;
      border: none;
      color: ${colors.mosqueAppSidebarIconActive};
    }
    .backbtn:focus { outline: none; }
    .backbtn:hover {
      color: ${colors.mosqueAppSidebarIconHover}; 
    }

    /* 6.2 Default / Search Mosque / #hamBurgerMenu */

    .bm-menu {
      background-color: ${colors.mosqueAppSidebarBg};
      box-shadow: 2px 4px 5px ${colors.mosqueAppSidebarShadow};
      -webkit-box-shadow: 2px 4px 5px ${colors.mosqueAppSidebarShadow};
    }
    .o-sidebar-search-box {
      height: 136px;
      max-height: 136px;
      padding: 0 46px 0 16px;
      padding-top: 20px;
      background-color: ${colors.mosquePrimary};
    }
    .o-sidebar-search-box > .c-sidebar-search-input {
      display: block;
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: 4px 0;
      background-color: transparent;
      border: 0;
      border-bottom: 1px solid rgba(0,0,0,.12);
      border-radius: 0;
      font-size: 2.0rem;
      font-weight: 400;
      text-align: left;
      color: ${colors.mosqueFourth};
      outline: none;
    }
    .o-sidebar-search-box > .c-sidebar-search-input:focus {
      color: white;
      border-color: white;
    }
    .c-search-icon {
      position: absolute;
      top: 20px;
      right: 48px;
      z-index: 1;
      font-weight: 300;
      font-size: 1.6rem; 
      height: 24px;
      width: 24px;;
      border: none;
      outline: none;
      color: ${colors.mosqueAppSidebarIconActive};
      text-align: center;
    }
    .o-scroll-content {
      overflow-y: scroll;
      height: 100%;
      padding-bottom: 150px;
    }
    .o-scroll-content::-webkit-scrollbar {
        width: 0px;
    }
    .o-sidebar-content > header > div > h3 {
      height: 48px;
      max-height: 48px;
      padding: 0 16px;
      background-color: ${colors.mosqueAppSidebarCategoryBg};
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 48px;
      font-family: inherit;
      margin: 0px;
      color: ${colors.mosqueAppSidebarCategoryColor};
    }
    .o-sidebar-content > header > div > h3 > i {
      font-size: inherit;
      height: 24px;
      width: 24px;
      margin-right: 32px;
      text-align: left;
      line-height: 48px;
    }
    .accordion {
      cursor: pointer;
      outline: none;
      transition: 0.4s;
    }
    .errorMessage {
      padding: 16px;
      width: 100%;
      background-color: ${colors.mosqueAppFallbackErrorBg};
      color: ${colors.mosqueAppFallbackErrorColor};
    }
    div.panel {
      max-height: 0;
      overflow: hidden;
      transition: 0.6s ease-in-out;
      opacity: 0;
    }
    div.panel.active {
      overflow-y: auto;
      opacity: 1;
      max-height: 384px;
    }
    div.panel.active::-webkit-scrollbar {
      width: 6px;
    }
    div.panel.active::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
        border-radius: 10px;
        background-color: #f0f0f0;
    }               
    div.panel.active::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
        background-color: #888;
    }      
    .o-sidebar-favouritemosque {
      padding-bottom: 10px;
    }
    ul.o-sidebar-results li {
      display: flex;
      background-color: ${colors.mosqueAppListClearBg};
      padding: 8px 16px;
      cursor: pointer;
      border-bottom: 1px solid ${colors.mosqueAppFallbackErrorColor};
      min-height: 48px;
    }
    ul.o-sidebar-results li > .listmosque-container {
      flex: 1;
    }
    .o-sidebar-favouritemosque > ul > li.c-sidebar {
      height: auto;
      display: flex;
      flex-direction: row;
    }
    li.c-sidebar > i {
      margin-right: 36px;
      font-size: 2.0rem;
      line-height: 55px;
    }
    .c-sidebar-container {
      display: flex;
      flex-direction: column;
      width: 60%;
    }
    .listmosque-container {
      width: 80%!important;
    }
    .c-sidebar-container header > h5 {
      margin: 0px;
      color: ${colors.mosquePrimary};
      font-size: 1em;
      font-weight: 400;
      line-height: 2em;
    }
    .c-sidebar-content {
      display: flex;
      flex-direction: column;
    }
    .c-nearme-time, .c-mosque-distance, .c-sidebar-content > label {
      font-size: 1.2rem;
      line-height: 2rem;
    }
    .c-sidebar-content > .c-nearme-time > i {
      margin-right: 5px;
    }
    .c-sidebar-content > .c-mosque-distance {
      line-height: 2em;
      color: black;
    }
    .o-sidebar-nearme, .o-sidebar-recentsearch {
      background-color: white;
    }
    .c-sidebar-image > img {
      height: 80px;
    }
    .is-selected {
      background-color: #F6F6F6 !important; 
      cursor: pointer!important;
    }

    {/*menu search bar and suggestion css*/}

    .o-sidebar-suggestion-wrap { 
      height: 300%;
      width: 100%;
    }
    .c-sidebar-suggestion-ul {
      position: relative;
      width: 100%;
      border-radius: 0 0 2px 2px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }
    .c-sidebar-suggestion-ul li {
      height: 48px;
      max-height: 48px;
      background-color: white;
      font-size: 1.6rem;
      font-weight: 300;
      line-height: 48px;
      text-indent: 1.6rem;
      color: #444444;
      cursor: pointer;
    }

    /* 6.3 Direction Panel */

    .option-active {
      border-bottom: 1px solid #fff;
    }
    .o-direction-option {
      position: relative;
      top: 0;
      height: 136px;
      max-height: 136px;
      background-color: ${colors.mosquePrimary};
      -webkit-box-shadow: 5px -1px 10px black;
      box-shadow: 5px -1px 10px black;
    }
    .mdl-tabs.is-upgraded .mdl-tabs__tab.is-active:after {
      background: #000;
    }
    .o-button-container {
      position: relative;
      top: 88px;
    }
    .o-button-option {
      width: 100%;
    }
    a.o-button-option:hover {
      color: #000;
    }
    /* To remove
    .o-button-container > div {
      flex:3;
      width: 33.33333333333333%
    }     
    .o-button-container > div > button {
      height: 48px;
      min-height: 48px;
      width: 100%;
      margin: 0 auto;
      background: none;
      border: 0px;
      color: ${colors.mosqueThird};
      line-height: 48px;
    }
    .o-button-container > div > button:hover {
      color: #fff;
    }
    .o-button-container > div > button:focus {
      border-bottom: 2px solid #fff;
      border-radius: 0;
      color: #fff;
      outline: none;
    }*/
    .o-direction-label {
      margin: 16px 0;
    }
    .o-direction-label > div {
      padding: 0 16px;
      margin: 8px 0;
      min-height: 48px;
    }
    .o-label-panel {
      color: ${colors.mosqueThird};
      font-size: 14px;
      font-weight: 500;
    }
    #o-from-label, #o-to-label {
      width: 100%;
      color: ${colors.mosqueThird};
      font-weight: bolder;
    }
    #o-to-label {
      font-size: 2.4rem;
      font-weight: 300;
      line-height: 27px;
      color: #fff;
    }
    .o-app-sidebar::-webkit-scrollbar { width: 6px; }             
    .o-app-sidebar::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
      border-radius: 10px;
      background-color: #f0f0f0;
    }               
    .o-app-sidebar::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
      background-color: #888;
    }
/*    .o-direction-sidebar a, .o-mosquedetaill-sidebar a {
      padding: 8px 8px 8px 8px;
      text-decoration: none;
      color: ${colors.mosqueThird};
      display: block;
      transition: 0.3s
    }
    .o-direction-sidebar a:hover, .offcanvas a:focus, .o-mosquedetaill-sidebar a:hover{ color: #f1f1f1; }*/
    #o-direction-container {
      background: #fff;
    }
    .errorMessage {
      padding: 16px;
      color: red;      
    }
    .TELL-ALI-THAT-WE-NEED-A-NEW-CLASS-AS-OTHERWISE-IT-WILL-LOOK-SHIT {
      padding: 16px;
      background-color: ${colors.mosquePrimary};
      font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
    }
    .adp-list {
      margin: 0;
      padding: 0;
      border: 0;
    }
    .adp-list > table.adp-fullwidth {
      margin: 0;
      padding: 0;
      border-collapse: collapse;
    }
    .adp-list > table > tbody > tr > td {
      height: 48px;
      max-height: 48px;
      line-height: 48px;
      background-color: white;
    }
    .adp-list > table > tbody > tr > td.adp-listheader {
      margin: 0;
      padding: 0;                       
      height: 48px;
      max-height: 48px;
      line-height: 48px;
      color: ${colors.mosqueThird};
      font-size: 14px;
      font-weight: 500;
      background-color: transparent !important;
    }
    .adp-listsel {
      background-color: ${colors.mosqueThird} !important;
    }
    .adp-listinfo {
      position: relative;
    }
    .adp-listinfo > b {
      position: relative;
      float: left;
      left: 16px;
      color: black;
    }
    .adp-listinfo > span {
      position: relative;
      float: right;
      right: 16px;
      font-size: 12px;
      color: #eee;
    }
    .adp-listinfo > span:first-child {
      right: 16px;
    }
    .adp-listinfo > span:nth-child(2) {
      display: none;
    }
    .adp-listinfo > span:last-child {
      right: 32px;
    }
    .adp-listsel > .adp-listinfo > b {
      color: ${colors.mosquePrimary};
    }
    .adp-listsel > .adp-listinfo > span {
      color: ${colors.mosquePrimary};
    }
    .adp {

    }
    table.adp-placemark {
      margin: 0;
      padding: 16px;
      border: none;
      background-color: ${colors.mosqueThird};
    }
    table.adp-placemark > tbody > tr > td {
      font-size: 14px;
      line-height: 22px;
    }
    table.adp-placemark > tbody > tr > td > img {
      height: 24px;
      width: 24px;
      margin-right: 32px;
    }
    .adp-summary {
      padding: 0;
      height: 56px;
      max-height: 56px;
      border-bottom: 1px solid ${colors.mosqueAppListClearSeparator};
      text-align: -webkit-center;
      text-align: center;
      font-size: 2.0rem;
      line-height: 56px;
      font-weight: 600;
      font-family: "Avenir Next W01",Helvetica,Arial,sans-serif;
    }
    table.adp-directions {
      padding: 0;
      margin: 0;
    }
    table.adp-directions > tbody > tr {
      border-bottom: 1px solid ${colors.mosqueAppListClearSeparator};
    }
    table.adp-directions > tbody > tr:hover {
      background-color: #eee;
    }
    table.adp-directions > tbody > tr > td.adp-substep {
      padding: 16px 0;
      font-size: 14px;
      line-height: 22px;
    }
    table.adp-directions > tbody > tr > td:first-child, table.adp-directions > tbody > tr > td:last-child {
      width: 48px;
    }
    table.adp-directions > tbody > tr > td.adp-substep > img.adp-stepicon {
      left: 16px;
    }
    table.adp-directions > tbody > tr > td.adp-substep > div.adp-distance {
      position: relative;
      right: 16px;
      color: #eee;
      font-size: 12px;
      text-align: right;
    }
    .adp-legal { 
      padding: 1em 4%;
      font-size: 0.6em;
      text-align: center; 
    }
    .warnbox-content { padding: 15px 25px; }
    .adp-directions td { 
      padding: 0.5em 0; 
      font-size: 0.9em;
      font-weight: 400;
    }

    /* 6.4 Add New Mosque Panel */
    

    .o-newmosque-form > .mdl-grid > .mdl-cell--12-col > .mdl-textfield {
      width: 100% !important;
    }
    .o-newmosque-form > .mdl-grid > .mdl-cell--12-col {
      padding-left: 16px;
    }
    .mdl-textfield--floating-label.is-focused .mdl-textfield__label, .mdl-textfield--floating-label.is-dirty .mdl-textfield__label {
      color: ${colors.mosqueFourth};
    }
    .mdl-textfield__label:after {
      background-color: ${colors.mosqueFourth};
    }
    .c-newmosque__title {
      display: block;
      position: absolute;
      z-index: 4;
      top: 0;
      height: 48px;
      width: 100%;
      max-height: 48px;
      line-height: 48px;
      font-size: 1.6rem;
      font-weight: 300;
      text-indent: 16px;
      color: white;
      background-color: ${colors.mosqueSecondary};
      margin: 0px;
    }
    .o-newmosque-form > .c-photo-input {
      position: absolute;
      top: 0;
      height: 266px;
      max-height: 266px;
      width: 100%;
      z-index: 3;
      background-color: transparent;
    }
    .o-newmosque-form > .c-photo-input > button {
      color: #fff;
      border: 0px;
      border-radius: 50%;
      height: 56px;
      width: 56px;
      position: absolute;
      bottom: 0;
      margin-bottom: -28px;
      right: 16px;
      box-shadow: 0 1px 6px 0 rgba(0,0,0,.3);
      transition: box-shadow 150ms cubic-bezier(.4,0,1,1);
      background-color: white;
      color: ${colors.mosqueFourth};
      outline: none;
    }
    .o-newmosque-form > .c-photo-input > button:hover {
      background-color: ${colors.mosqueFourth};
      color: white;
    }
    .o-upload__field { display: none; }
    .o-newmosque-form > .c-form-group {
      height: 72px;
      max-height: 72px;
      padding: 8px 16px;
      background-color: white;
    }
    .is-required {
      display: block;
      width: 100%;
      padding: 4px 0;
      border: none;
      border-bottom: 1px solid #C54D4D;
    }
    .is-photo-required {
      border: 1px solid #C54D4D !important;
    }
    .o-newmosque-form > .c-form-group label {
      display: block;
      font-size: 1.4rem;
      font-weight: normal;
      color: ${colors.mosqueSecondary};
    }
    .o-newmosque-form > .c-form-group label span.o-required {
      color: red;
      font-size: 5px;
      margin-right: 5px;
      vertical-align: super;
    }
    .o-newmosque-form > .c-form-group > div > .o-form-input {
      border: none;
      border-bottom: 1px solid rgba(0,0,0,.12);
      display: block;
      font-size: 1.6rem;
      margin: 0;
      padding: 4px 0;
      width: 100%;
      background: 0 0;
      text-align: left;
      color: inherit;
    }
    .o-newmosque-form > div:nth-child(2) {
      height: 266px;
      max-height: 266px;
      padding: 0;
    }
    .o-newmosque-form > div:nth-child(2) > label.c-mosque-photo {
      display: none;
    }
    .o-newmosque-form > div:nth-child(2) > div {
      height: 218px;
    }
    .o-newmosque-form > div:nth-child(2) > div > img#c-mosque-photo {
      position: absolute;
      top: 48px;
      width: 100%;
      margin: 0;
      padding: 0;
      height: 218px;
      background-color: #BABABA;
      z-index: 2;
    }
    .o-newmosque-button {
      position: fixed;
      bottom: 0;
      display: block;
      padding: 0;
      margin: 0;
      width: 400px;
      height: 48px;
      max-height: 48px;
      background: ${colors.mosqueFourth};
      color: ${colors.mosqueThird};
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 48px;
      border: none;
      border-radius: 0;
      outline: none;
    }
    .o-newmosque-button > i {
      margin-right: 16px;
    }
    .o-newmosque-button:hover { color: white; }
    #o-newmosque-panel { background: #fff; height: 100%; }
    .o-newmosque-response { padding: 5px 25px 5px; }
    .o-newmosque-response h2 {
      margin: 10px 0 10px;
      font-weight: 500;
    }
    .o-newmosque-response hr {
      margin-bottom: 20px;
      border-color: #fff;
    }

    /* 6.5 Mosque Detail Panel */

    .iw-container {
      display:flex;
      flex-direction: column;
      position: relative;
      top: 0;
      z-index: 1;
      width: 100%;
    }
    .o-sidebar-container {
      background-repeat: no-repeat;
      background-size: contain;
      width: 100%;
    }
    .o-sidebar-mosque {
      height: 266px;
      max-height: 266px;
      padding: 0 16px;
      background-repeat: no-repeat;
      background-color: ${colors.mosqueThird};
      width: 100%;
      height: 300px;
    }
    .iw-title {
      display: block;
      position: relative;
      top: 20px;
      font-size: 2.4rem;
      font-weight: 300;
      line-height: 27px;
    }
    .iw-content {
      display: block;
      position: relative;
      top: 16px;
      font-weight: 300;
      font-size: 1.6rem;
      padding: 0.5em 0;
    }
    .iw-distance {
      position: absolute;
      bottom: 128px;
    }
    .iw-distance > .mosque-distance {
      font-size: 1.4rem;
      font-weight: 500;
    }
    .iw-distance > .mosque-distance > i {
      margin-right: 18px;
    }
    .iw-direction { 
      position: absolute;
      right: 16px;
      bottom: 0;
      margin-bottom: 90px;
    }
    #showdirection {
      color: #fff;
      border: 0px;
      border-radius: 50%;
      height: 56px;
      width: 56px;
      box-shadow: 0 1px 6px 0 rgba(0,0,0,.3);
      transition: box-shadow 150ms cubic-bezier(.4,0,1,1);
      background-color: white;
      color: ${colors.mosqueFourth};
      outline: none;
    }
    #showdirection:hover {
      background-color: ${colors.mosqueFourth};
      color: white;
    }
    .iw-prayertime {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 120px;
      max-height: 120px; 
      padding: 0px 16px;
      background-color: ${colors.mosqueFourth};
    }
    .iw-prayertime > icon {
      height: 40px;
      width: 40px;
    }
    .iw-container > .o-sidebar-container > .iw-prayertime > .c-prayertime-content {
      padding-left: 16px;
      display: flex;
      flex-direction: column;
      color: white;
    }
    .iw-container > .o-sidebar-container > .iw-prayertime > .c-prayertime-content > span {
      font-size: 2.0rem;;
    }
    .iw-container > .o-sidebar-container > .iw-prayertime > .c-prayertime-content > span:first-child {
      color: ${colors.mosqueThird};
      font-size: 1.4rem;
    }
    .iw-container > .o-sidebar-container > .iw-prayertime > .c-prayertime-content > span > label {
      font-weight: 600;
    }
    .iw-favourite {
      position: fixed;
      bottom: 0;
      width: 400px;
      align-items: center;
      display: flex;
    }
    .iw-favourite > button {
      margin: 0;
      padding: 0;
      border: none;
      flex: 1;
      height: 48px;
      max-height: 48px;
      background: ${colors.mosqueFourth};
      color: ${colors.mosqueThird};
      font-size: 1.6rem;
      font-weight: 400;
      line-height: 48px;
      border: none;
      border-radius: 0;
      outline: none;
    }
    .iw-favourite > button:hover {
      color: white;
    }
    .iw-favourite > button > i {
      margin-right: 16px;
    }

    /* --- 7. Feedback
    ----------------- */

    /* 7.1 Question form modal */

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

    /* 7.2 Modal structure */

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

    /* draggable button */

    .c-feedback-button {
        border-radius: 50%;
        font-size: 4rem;
        font-weight: 600;
        height: 60px;
        width: 60px;
        border: none;
        color: white;
        background-color: #de3131;
        outline:none;
        position:absolute;
        z-index:1;
        padding-left: 0.3em;
      }
     

      /* --- 8. New and yet to sort out CSS
      ----------------- */
      
      .hamburgermenu {
        width: 700px;
      }
      
      .o-suggestion-wrap { 
        height: 300%;
        width: 100%;
        background-color:white;
      }

      .c-suggestion-ul {
        border-radius: 0 0 2px 2px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      }

      .c-suggestion-ul li {
        height: 48px;
        max-height: 48px;
        line-height: 48px;
        font-size: 1.4rem;
        text-indent: 16px;
        background-color:white; 
        color: #444444;
        cursor:pointer;
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

      /* Wrapper for item list */
        .bm-item-list {
          color: #b8b7ad;
          height: auto !important;
        }

      /*===========================================================*/
      /*                  RESPONSIVE CSS                           */
      /*===========================================================*/

      @media (min-width: 768px) {
        .c-application-button {
          right: 100px !important;
          top: 28px !important;
          height: 20px !important;
          width: 20px !important;
        }
        #demo-mosquefinder-overlay{
          font-size:24px;
        }
        #demo-mosquefinder-overlay .demo2{
          top:10em;
        }
        #UserCPMenu > div > .bm-overlay {
          z-index: 2 !important;
        }
        .c-search-input {
          width: 100%;  
        }
      }

      @media (max-width: 380px) {
        #UserCPHamburgerMenu > .bm-burger-button {
          display: none;
        }
        .c-application-button {
          right: 0px !important;
          top: 9px !important;
        }
        .o-search-box {
          position: absolute;
          top: 16px;
          left: 16px;
        }
         #pac-input {
          position: absolute;
          top: 16px;
          left: 16px;
        }
        .bm-burger-button {
          font-size: 16px;
          padding: 2px 2px 2px 2px;
        }
      }

      @media screen and (min-device-width: 768px) and (max-device-width: 1023px) { 
         .o-app-sidebar {
            width: 300px;
         }
        .o-newmosque-button {
          bottom: 50px;
        }
        .o-newmosque-button {
          margin-top: 32% !important;
          bottom: 66px;
        }
      }

      @media screen and (min-device-width: 1024px) { 
         .o-app-sidebar {
            width: 400px;
         }
      }

      /* Landscape ip5*/
      @media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (orientation: landscape) {
        .o-newmosque-button {
          bottom: 66px;
          margin-top 30% !important;
        }
      }

      {/* Mobile (Landscape)
      ================================================== */}
      @media screen and (min-width: 280px) and (max-width: 767px) {
         .c-application-button {
          right: 0px !important;
          top: 9px !important;
        }
        #UserCPMenu > div > .bm-overlay {
          z-index: 2 !important;
        }
        #UserCPMenu > div > .bm-burger-button {
            position: fixed;
            width: 40px!important;
            height: 40px!important;
            right: 12px!important;
            left: auto!important;
            top: 18px!important;
            z-index: 100!important;
            border-radius: 50%;
        }
        .o-search-box {
          position: absolute;
          top: 16px;
          left: 16px;
        }
         #pac-input {
          width: 206px;
          margin-top: 0px;
          position: absolute;
          top: 16px;
          left: 16px;
        }
        .o-app-sidebar {
            width: 300px;
            z-index: 100;
         }
         .o-newmosque-button {
          margin-top: 20%;
          bottom: 66px;
        }
        .modal {
          padding: 8% 0% 0%;
        }
        #demo-mosquefinder-overlay{
          font-size:16px;
        }
        #demo-mosquefinder-overlay .demo2{
          top:10em;
        }
        .c-questionlist-container > h1 {
          line-height: 1em;
          font-size: 3rem;
          margin: 0;
        }
        button.is-save {
          width: 100%;
        }
        .iw-distance > .mosque-distance {
          font-size: 1.2rem;
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

        .requestmosqueButton, .currentLocationButton {
          width: 45px;
          min-width: 45px;
          height: 45px;
        }
        .requestmosqueButton {
          right: 12px;
          bottom: 70px;
        }
        .currentLocationButton {
          right: 12px;
          bottom: 20px;
        }
        .c-feedback-button {
          font-size: 2.5rem;
          height: 40px;
          width: 40px;
          padding-top: 5px;
          padding-right: 8px;
        }
        #hamBurgerMenu {
          z-index: 100 !important;
        }
        #UserCPMenu > div > .bm-burger-button {
            width: 40px;
            height: 40px;
            top: 20px;
            padding: 0;
        }
        #UserCPMenu > div > .bm-overlay {
            z-index: 2 !important;
        }
        .o-noorLogo-icon {
          text-align: center !important;
          margin-left: 0;
          padding-top: 0;
        }
        .c-logo-image {
           width: 8.0em;
           height: 3.0em;
           margin-left: 0% !important;
        }
        .c-application-button {
           top: 1.7em !important;
           right: 60px !important;
           height: 20px;
           width: 20px;
        }

        .o-application-menu {
           right: 3.5em !important;
           top: 3.5em !important;
        }

        .o-newmosque-button {
          width: 100%;
          position: relative;
          margin-top: 60%;
        }
        #pac-input {
          width: 206px;
          margin-top: 0px;
          position: absolute;
          top: 16px;
          left: 16px;
        }
        .iw-favourite {
          width: 300px;
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

      @media only screen and (min-width: 768px) and (max-width: 959px) {
        .modal {
          padding: 8% 0% 0%;
        }
        button.is-save {
          width: 80%;
        }
      }

      @media screen and (max-height: 450px) {
        .o-direction-sidebar {padding-top: 15px;}
        .o-direction-sidebar a {font-size: 18px;}
        .o-mosquedetaill-sidebar {padding-top: 15px;}
        .o-mosquedetaill-sidebar a {font-size: 18px;}
      }

      {/* Safari Only
      ================================================== */}
      @media screen and (min-width:0\0) {
          .c-feedback-button {
            padding-left: 0.45em;
          }
      }

		`+(arabicToggle ? arabic : "");
	}
};

export default cssFunction;