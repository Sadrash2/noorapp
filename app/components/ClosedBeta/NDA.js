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
import globalFunction from "../../components/GlobalFunction";

import globalBetaFunction from "../../components/ClosedBeta/GlobalBetaFunction";

var token, betaEmail;
class NDA extends React.Component {
	onClickNext() {
		var opt = { "steps": 2, "email": betaEmail}
		globalBetaFunction.editSteps(opt);
		this.context.router.push(config.root + "/BetaRegisteration?email="+betaEmail+"&token="+token);
	}

	exit(){
		this.context.router.push(config.root + "/NotFound");
	}

	timeout() {
		this.context.router.push(config.root + "/graditude?email="+betaEmail+"&token="+token);
	}

	componentDidMount() {
		var $ = require('jquery')
		$('.c-application-button').css('display','none');
        $('#UserCPMenu').addClass('logout');
		var isoCountries = {
    		'AF' : 'Afghanistan',
    		'AX' : 'Aland Islands',
    		'AL' : 'Albania',
    		'DZ' : 'Algeria',
    		'AS' : 'American Samoa',
    		'AD' : 'Andorra',
    		'AO' : 'Angola',
    		'AI' : 'Anguilla',
    		'AQ' : 'Antarctica',
    		'AG' : 'Antigua And Barbuda',
    		'AR' : 'Argentina',
    		'AM' : 'Armenia',
    		'AW' : 'Aruba',
    		'AU' : 'Australia',
    		'AT' : 'Austria',
    		'AZ' : 'Azerbaijan',
    		'BS' : 'Bahamas',
    		'BH' : 'Bahrain',
    		'BD' : 'Bangladesh',
    		'BB' : 'Barbados',
    		'BY' : 'Belarus',
    		'BE' : 'Belgium',
    		'BZ' : 'Belize',
    		'BJ' : 'Benin',
    		'BM' : 'Bermuda',
    		'BT' : 'Bhutan',
    		'BO' : 'Bolivia',
    		'BA' : 'Bosnia And Herzegovina',
    		'BW' : 'Botswana',
    		'BV' : 'Bouvet Island',
    		'BR' : 'Brazil',
    		'IO' : 'British Indian Ocean Territory',
    		'BN' : 'Brunei Darussalam',
    		'BG' : 'Bulgaria',
    		'BF' : 'Burkina Faso',
    		'BI' : 'Burundi',
    		'KH' : 'Cambodia',
    		'CM' : 'Cameroon',
    		'CA' : 'Canada',
    		'CV' : 'Cape Verde',
    		'KY' : 'Cayman Islands',
    		'CF' : 'Central African Republic',
    		'TD' : 'Chad',
    		'CL' : 'Chile',
    		'CN' : 'China',
    		'CX' : 'Christmas Island',
    		'CC' : 'Cocos (Keeling) Islands',
    		'CO' : 'Colombia',
    		'KM' : 'Comoros',
    		'CG' : 'Congo',
    		'CD' : 'Congo, Democratic Republic',
    		'CK' : 'Cook Islands',
    		'CR' : 'Costa Rica',
    		'CI' : 'Cote D\'Ivoire',
    		'HR' : 'Croatia',
    		'CU' : 'Cuba',
    		'CY' : 'Cyprus',
    		'CZ' : 'Czech Republic',
    		'DK' : 'Denmark',
    		'DJ' : 'Djibouti',
    		'DM' : 'Dominica',
    		'DO' : 'Dominican Republic',
    		'EC' : 'Ecuador',
    		'EG' : 'Egypt',
    		'SV' : 'El Salvador',
    		'GQ' : 'Equatorial Guinea',
    		'ER' : 'Eritrea',
    		'EE' : 'Estonia',
    		'ET' : 'Ethiopia',
    		'FK' : 'Falkland Islands (Malvinas)',
    		'FO' : 'Faroe Islands',
    		'FJ' : 'Fiji',
    		'FI' : 'Finland',
    		'FR' : 'France',
    		'GF' : 'French Guiana',
    		'PF' : 'French Polynesia',
    		'TF' : 'French Southern Territories',
    		'GA' : 'Gabon',
    		'GM' : 'Gambia',
    		'GE' : 'Georgia',
    		'DE' : 'Germany',
    		'GH' : 'Ghana',
    		'GI' : 'Gibraltar',
    		'GR' : 'Greece',
    		'GL' : 'Greenland',
    		'GD' : 'Grenada',
    		'GP' : 'Guadeloupe',
    		'GU' : 'Guam',
    		'GT' : 'Guatemala',
    		'GG' : 'Guernsey',
    		'GN' : 'Guinea',
    		'GW' : 'Guinea-Bissau',
    		'GY' : 'Guyana',
    		'HT' : 'Haiti',
    		'HM' : 'Heard Island & Mcdonald Islands',
    		'VA' : 'Holy See (Vatican City State)',
    		'HN' : 'Honduras',
    		'HK' : 'Hong Kong',
    		'HU' : 'Hungary',
    		'IS' : 'Iceland',
    		'IN' : 'India',
    		'ID' : 'Indonesia',
    		'IR' : 'Iran, Islamic Republic Of',
    		'IQ' : 'Iraq',
    		'IE' : 'Ireland',
    		'IM' : 'Isle Of Man',
    		'IL' : 'Israel',
    		'IT' : 'Italy',
    		'JM' : 'Jamaica',
    		'JP' : 'Japan',
    		'JE' : 'Jersey',
    		'JO' : 'Jordan',
    		'KZ' : 'Kazakhstan',
    		'KE' : 'Kenya',
    		'KI' : 'Kiribati',
    		'KR' : 'Korea',
    		'KW' : 'Kuwait',
    		'KG' : 'Kyrgyzstan',
    		'LA' : 'Lao People\'s Democratic Republic',
    		'LV' : 'Latvia',
    		'LB' : 'Lebanon',
    		'LS' : 'Lesotho',
    		'LR' : 'Liberia',
    		'LY' : 'Libyan Arab Jamahiriya',
    		'LI' : 'Liechtenstein',
    		'LT' : 'Lithuania',
    		'LU' : 'Luxembourg',
    		'MO' : 'Macao',
    		'MK' : 'Macedonia',
    		'MG' : 'Madagascar',
    		'MW' : 'Malawi',
    		'MY' : 'Malaysia',
    		'MV' : 'Maldives',
    		'ML' : 'Mali',
    		'MT' : 'Malta',
    		'MH' : 'Marshall Islands',
    		'MQ' : 'Martinique',
    		'MR' : 'Mauritania',
    		'MU' : 'Mauritius',
    		'YT' : 'Mayotte',
    		'MX' : 'Mexico',
    		'FM' : 'Micronesia, Federated States Of',
    		'MD' : 'Moldova',
    		'MC' : 'Monaco',
    		'MN' : 'Mongolia',
    		'ME' : 'Montenegro',
    		'MS' : 'Montserrat',
    		'MA' : 'Morocco',
    		'MZ' : 'Mozambique',
    		'MM' : 'Myanmar',
    		'NA' : 'Namibia',
    		'NR' : 'Nauru',
    		'NP' : 'Nepal',
    		'NL' : 'Netherlands',
    		'AN' : 'Netherlands Antilles',
    		'NC' : 'New Caledonia',
    		'NZ' : 'New Zealand',
    		'NI' : 'Nicaragua',
    		'NE' : 'Niger',
    		'NG' : 'Nigeria',
    		'NU' : 'Niue',
    		'NF' : 'Norfolk Island',
    		'MP' : 'Northern Mariana Islands',
    		'NO' : 'Norway',
    		'OM' : 'Oman',
    		'PK' : 'Pakistan',
    		'PW' : 'Palau',
    		'PS' : 'Palestinian Territory, Occupied',
    		'PA' : 'Panama',
    		'PG' : 'Papua New Guinea',
    		'PY' : 'Paraguay',
    		'PE' : 'Peru',
    		'PH' : 'Philippines',
    		'PN' : 'Pitcairn',
    		'PL' : 'Poland',
    		'PT' : 'Portugal',
    		'PR' : 'Puerto Rico',
    		'QA' : 'Qatar',
    		'RE' : 'Reunion',
    		'RO' : 'Romania',
    		'RU' : 'Russian Federation',
    		'RW' : 'Rwanda',
    		'BL' : 'Saint Barthelemy',
    		'SH' : 'Saint Helena',
    		'KN' : 'Saint Kitts And Nevis',
    		'LC' : 'Saint Lucia',
    		'MF' : 'Saint Martin',
    		'PM' : 'Saint Pierre And Miquelon',
    		'VC' : 'Saint Vincent And Grenadines',
    		'WS' : 'Samoa',
    		'SM' : 'San Marino',
    		'ST' : 'Sao Tome And Principe',
    		'SA' : 'Saudi Arabia',
    		'SN' : 'Senegal',
    		'RS' : 'Serbia',
    		'SC' : 'Seychelles',
    		'SL' : 'Sierra Leone',
    		'SG' : 'Singapore',
    		'SK' : 'Slovakia',
    		'SI' : 'Slovenia',
    		'SB' : 'Solomon Islands',
    		'SO' : 'Somalia',
    		'ZA' : 'South Africa',
    		'GS' : 'South Georgia And Sandwich Isl.',
    		'ES' : 'Spain',
    		'LK' : 'Sri Lanka',
    		'SD' : 'Sudan',
    		'SR' : 'Suriname',
    		'SJ' : 'Svalbard And Jan Mayen',
    		'SZ' : 'Swaziland',
    		'SE' : 'Sweden',
    		'CH' : 'Switzerland',
    		'SY' : 'Syrian Arab Republic',
    		'TW' : 'Taiwan',
    		'TJ' : 'Tajikistan',
    		'TZ' : 'Tanzania',
    		'TH' : 'Thailand',
    		'TL' : 'Timor-Leste',
    		'TG' : 'Togo',
    		'TK' : 'Tokelau',
    		'TO' : 'Tonga',
    		'TT' : 'Trinidad And Tobago',
    		'TN' : 'Tunisia',
    		'TR' : 'Turkey',
    		'TM' : 'Turkmenistan',
    		'TC' : 'Turks And Caicos Islands',
    		'TV' : 'Tuvalu',
    		'UG' : 'Uganda',
    		'UA' : 'Ukraine',
    		'AE' : 'United Arab Emirates',
    		'GB' : 'United Kingdom',
    		'US' : 'United States',
    		'UM' : 'United States Outlying Islands',
    		'UY' : 'Uruguay',
    		'UZ' : 'Uzbekistan',
    		'VU' : 'Vanuatu',
    		'VE' : 'Venezuela',
    		'VN' : 'Viet Nam',
    		'VG' : 'Virgin Islands, British',
    		'VI' : 'Virgin Islands, U.S.',
    		'WF' : 'Wallis And Futuna',
    		'EH' : 'Western Sahara',
    		'YE' : 'Yemen',
    		'ZM' : 'Zambia',
    		'ZW' : 'Zimbabwe'
		};
		var geoCoder = new google.maps.Geocoder();
		var url = window.location.search;
		if(url != "") {
			var queryStart = url.indexOf("?") + 1;
         	var queryEnd  = url.indexOf("#") + 1 || url.length + 1;
         	var query = url.slice(queryStart, queryEnd - 1);
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
		        	//
		        	getUserData=getUserData.bind(this);
		        	var dataArray = { "email": betaEmail, "token": token}
		        	globalBetaFunction.getUserEmailToken(dataArray, getUserData);
		        	function getUserData(data){
		        		var response = JSON.parse(data);
		 			if(response.state === 200) {
		 				var array = response.success;
		 				comparefunction=comparefunction.bind(this);
		 				globalBetaFunction.compareTimeExpired(array[0].email, comparefunction);
		 				function comparefunction(data) {
		 					if (data == "timeremain") {
		 						var d = new Date();
		 						$('#date').text(("00" + d.getDate()).slice(-2) + "/" + ("00" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear());

		 						//if user_data DB doesnt have data then do this.
		 							var request =  [
		 								"BetaUserData",
		 								"getBetaName",
		 								betaEmail];
		 							$.ajax({
		 								type: "POST",
		 								datatype: 'json',
		 								url: "./app/bridge/enter.php",
		 								data: {request},
		 								cache: false,
		 								success: function(data) {
		 									var response = JSON.parse(data);
		 									if(response.state === 200) {
		 										$('#user').text(response.success.betaname);
                                              $.getJSON('https://ipapi.co/json', function(data){
                                                   $('#country').text(isoCountries[data.country]);
                                               });
		 									} else {						
												
		 									}
		 								}.bind(this)
		 							});
		 					} else {
		 						this.timeout();
		 					}
		 				}

		 				if (array[0].steps == 0) {
		 					betaEmail = betaEmail.replace("@","%40");
		 					this.context.router.push(config.root + "/SignUp?email="+betaEmail+"&token="+token);
		 				} else if (array[0].steps == 2) {
		 					betaEmail = betaEmail.replace("@","%40");
		 					this.context.router.push(config.root + "/BetaRegisteration?email="+betaEmail+"&token="+token);
		 				} else if (array[0].steps == 3) {
		 					betaEmail = betaEmail.replace("@","%40");
		 					this.context.router.push(config.root + "/StartSession?email="+betaEmail+"&token="+token);
		 				} else if (array[0].steps == 4) {
		 					betaEmail = betaEmail.replace("@","%40");
		 					this.context.router.push(config.root + "/AboutPage?email="+betaEmail+"&token="+token);
		 				} else if (array[0].steps == 5) {
		 					betaEmail = betaEmail.replace("@","%40");
		 					this.context.router.push(config.root + "/AppsPage?email="+betaEmail+"&token="+token);
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
		globalFunction.differentiate_device(betaEmail,token); //get the u_id, right device?

	}

  render() {
    return (
     	<InlineCss stylesheet={NDA.css(this.props.arabic)} namespace="NDA"> 
     		<div className="o-NDA-container"> 
     		  	<h1 className="o-heading-title1">We would like to keep NOOR a secret…</h1>
     		  	<h2 className="o-heading-title2">Given the stage of our project we ask all participants to read and sign our nondisclosure agreement.</h2>
     			<div className="o-NDA-form">
	     			<header>   				
	     				<h2 className="o-heading-NDA">Non Disclosure Agreement</h2>
	     				<h3 className="o-heading-NDA">Last Update 03/08/2016</h3>
	     			</header>
		     		<div className="o-NDA-main">
		     			<p>THIS AGREEMENT (the “Agreement”) is entered into on the <label id="date"></label> by and between NOOR Me Technology Asia Sdn Bhd, Licence #1166521W, Jalan Pinang No. 19, 21-01, 50450 Kuala Lumpur, Malaysia (”Disclosing Party”), and <label id="user"></label> <label id="country"></label> with (“Receiving Party”).
		     				</p>
						<p>The Parties hereto enter into discussions for the provision of Head Hunter and or other Hiring Services by the Receiving Party; Disclosing Party may share certain proprietary information with the Recipient. Therefore, in consideration of the mutual promises and covenants contained in this Agreement, and other good and valuable consideration, the receipt and sufficiency of which is hereby acknowledged, the parties hereto agree as follows:
						</p>
						<p className="top">1. Definition of Confidential Information.</p>
						<p>(a) For purposes of this Agreement, “Confidential Information” means any data or information that is proprietary to the Disclosing Party and not generally known to the public, whether in tangible or intangible form, whenever and however disclosed, including, but not limited to:</p>
						<p>(i) any hiring, financial, marketing, business or technological strategies, plans, financial information, or projections, operations, sales estimates, business plans and performance results relating to the past, present or future business activities of such party, its affiliates, subsidiaries and affiliated companies;</p>
						<p>(ii) plans for products or services, and customer or supplier lists; </p>
						<p>(iii) any scientific or technical information, invention, design, process, procedure, formula, improvement, technology or method; </p>
						<p>(iv) any concepts, reports, data, know-how, works-in-progress, designs, development tools, specifications, computer software, source code, object code, flow charts, databases, inventions, information and trade secrets; and </p>
						<p>(v) any other information that should reasonably be recognized as confidential information of the Disclosing Party. 
								Confidential Information need not be novel, unique, patentable, copyrightable or constitute a trade secret in order to be designated Confidential Information. The Receiving Party acknowledges that the Confidential Information is proprietary to the Disclosing Party, has been developed and obtained through great efforts by the Disclosing Party and that Disclosing Party regards all of its Confidential Information as trade secrets</p>

						<p className="top">2. Disclosure of Confidential Information.</p>
						<p>From time to time, the Disclosing Party may disclose Confidential Information to the Receiving Party. The Receiving Party will: </p>
						<p>(a) limit disclosure of any Confidential Information to its directors, officers, employees, agents or representatives (collectively “Representatives”) who have a need to know such Confidential Information in connection with the current or contemplated business relationship between the parties to which this Agreement relates, and only for that purpose; </p>
						<p>(b) advise its Representatives of the proprietary nature of the Confidential Information and of the obligations set forth in this Agreement and require such Representatives to keep the Confidential Information confidential; </p>
						<p>(c) shall keep all Confidential Information strictly confidential by using a reasonable degree of care, but not less than the degree of care used by it in safeguarding its own confidential information; and </p>
						<p>(d) not disclose any Confidential Information received by it to any third parties (except as otherwise provided for herein). 
							Each party shall be responsible for any breach of this Agreement by any of their respective Representatives. </p>


						<p className="top">3. Use of Confidential Information.</p>
						<p>The Receiving Party agrees to use the Confidential Information solely in connection with the current or contemplated business relationship between the parties and not for any purpose other than as authorized by this Agreement without the prior written consent of an authorized representative of the Disclosing Party. No other right or license, whether expressed or implied, in the Confidential Information is granted to the Receiving Party hereunder. Title to the Confidential Information will remain solely in the Disclosing Party. All use of Confidential Information by the Receiving Party shall be for the benefit of the Disclosing Party and any modifications and improvements thereof by the Receiving Party shall be the sole property of the Disclosing Party. Nothing contained herein is intended to modify the parties' existing agreement that their discussions in furtherance of a potential business relationship are governed by English Law. </p>

						<p className="top">4. Term.</p>
						<p>This Agreement shall remain in effect for a two-year term (subject to a one year extension if the parties are still discussing and considering the Transaction at the end of the second year). Notwithstanding the foregoing, the parties’ duty to hold in confidence Confidential Information that was disclosed during term shall remain in effect indefinitely. </p>

						<p className="top">5. Remedies.</p>
						<p>Both parties acknowledge that the Confidential Information to be disclosed hereunder is of a unique and valuable character, and that the unauthorized dissemination of the Confidential Information would destroy or diminish the value of such information. The damages to Disclosing Party that would result from the unauthorized dissemination of the Confidential Information would be impossible to calculate. Therefore, both parties hereby agree that the Disclosing Party shall be entitled to injunctive relief preventing the dissemination of any Confidential Information in violation of the terms hereof. Such injunctive relief shall be in addition to any other remedies available hereunder, whether at law or in equity. Disclosing Party shall be entitled to recover its costs and fees, including reasonable attorneys’ fees, incurred in obtaining any such relief. Further, in the event of litigation relating to this Agreement, the prevailing party shall be entitled to recover its reasonable attorney’s fees and expenses. </p>

						<p className="top">6. Return of Confidential Information.</p>
						<p>Receiving Party shall immediately return and redeliver to the other all tangible material embodying the Confidential Information provided hereunder and all notes, summaries, memoranda, drawings, manuals, records, excerpts or derivative information deriving there from and all other documents or materials (“Notes”) (and all copies of any of the foregoing, including “copies” that have been converted to computerized media in the form of image, data or word processing files either manually or by image capture) based on or including any Confidential Information, in whatever form of storage or retrieval, upon the earlier of (i) the termination of the dealings between the parties contemplated hereunder; (ii) the termination of this Agreement; or (iii) at such time as the Disclosing Party may so request; provided however that the Receiving Party may retain such of its documents as is necessary to enable it to comply with its document retention policies. Alternatively, the Receiving Party, with the written consent of the Disclosing Party may (or in the case of Notes, at the Receiving Party’s option) immediately destroy any of the foregoing embodying Confidential Information (or the reasonably non-recoverable data erasure of computerized data) and, upon request, certify in writing such destruction by an authorized officer of the Receiving Party supervising the destruction). </p>

						<p className="top">7. Notice of Breach.</p>
						<p>Receiving Party shall notify the Disclosing Party immediately upon discovery of any unauthorized use or disclosure of Confidential Information by Receiving Party or its Representatives, or any other breach of this Agreement by Receiving Party or its Representatives, and will cooperate with efforts by the Disclosing Party to help the Disclosing Party regain possession of Confidential Information and prevent its further unauthorized use.</p>

						<p className="top">8. No Binding Agreement for Transaction.</p>
						<p>The parties agree that neither party will be under any legal obligation of any kind whatsoever with respect to a Transaction by virtue of this Agreement, except for the matters specifically agreed to herein. The parties further acknowledge and agree that they each reserve the right, in their sole and absolute discretion, to reject any and all proposals and to terminate discussions and negotiations with respect to a Transaction at any time. This Agreement does not create a joint venture or partnership between the parties. If a Transaction goes forward, the non-disclosure provisions of any applicable transaction documents entered into between the parties (or their respective affiliates) for the Transaction shall supersede this Agreement. In the event such provision is not provided for in said transaction documents, this Agreement shall control. </p>

						<p className="top">9. Warranty.</p>
						<p>Each party warrants that it has the right to make the disclosures under this Agreement. NO WARRANTIES ARE MADE BY EITHER PARTY UNDER THIS AGREEMENT WHATSOEVER. The parties acknowledge that although they shall each endeavour to include in the Confidential Information all information that they each believe relevant for the purpose of the evaluation of a Transaction, the parties understand that no representation or warranty as to the accuracy or completeness of the Confidential Information is being made by either party as the Disclosing Party. Further, neither party is under any obligation under this Agreement to disclose any Confidential Information it chooses not to disclose. Neither Party hereto shall have any liability to the other party or to the other party’s Representatives resulting from any use of the Confidential Information except with respect to disclosure of such Confidential Information in violation of this Agreement. </p>
						
						<p className="top">10. Miscellaneous.</p>
						<p>(a) This Agreement constitutes the entire understanding between the parties and supersedes any and all prior or contemporaneous understandings and agreements, whether oral or written, between the parties, with respect to the subject matter hereof. This Agreement can only be modified by a written amendment signed by the party against whom enforcement of such modification is sought. </p>
						<p>(b) The validity, construction and performance of this Agreement shall be governed and construed in accordance with English Law applicable to contracts made and to be wholly performed within such state, without giving effect to any conflict of laws provisions thereof. </p>
						<p>(c) Any failure by either party to enforce the other party’s strict performance of any provision of this Agreement will not constitute a waiver of its right to subsequently enforce such provision or any other provision of this Agreement. </p>
						<p>(d) Although the restrictions contained in this Agreement are considered by the parties to be reasonable for the purpose of protecting the Confidential Information, if any such restriction is found by a court of competent jurisdiction to be unenforceable, such provision will be modified, rewritten or interpreted to include as much of its nature and scope as will render it enforceable. If it cannot be so modified, rewritten or interpreted to be enforceable in any respect, it will not be given effect, and the remainder of the Agreement will be enforced as if such provision was not included. </p>
						<p>(e) Any notices or communications required or permitted to be given hereunder may be delivered by hand, deposited with a nationally recognized overnight carrier, electronic-mail, or mailed by certified mail, return receipt requested, postage prepaid, in each case, to the address of the other party first indicated above. All such notices or communications shall be deemed to have been given and received.</p>
						<p>(f) This Agreement is personal in nature, and neither party may directly or indirectly assign or transfer it by operation of law or otherwise without the prior written consent of the other party, which consent will not be unreasonably withheld. All obligations contained in this Agreement shall extend to and be binding upon the parties to this Agreement and their respective successors, assigns and designees. </p>
						<p>(g) The receipt of Confidential Information pursuant to this Agreement will not prevent or in any way limit either party from: (i) developing, making or marketing products or services that are or may be competitive with the products or services of the other; or (ii) providing products or services to others who compete with the other. </p>
						<p>(h) Paragraph headings used in this Agreement are for reference only and shall not be used or relied upon in the interpretation of this Agreement. </p>

						<p>IN WITNESS WHEREOF, the parties hereto have executed this Agreement as of the date first above written. </p>

		     			<div className="o-NDA-button-wrapper">
			     			<p>By clicking “Next” you agree to the Non Disclosure Agreement of NOOR.</p>
    		     			<a href="" id="c-start-button" className="c-start-button" onClick={this.onClickNext.bind(this)}>Next</a>
			     		</div>
		     		</div>
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

				p{
					padding:5px 0;
					line-height:1.2em;
					text-align:justify;
				}
				p.top {
					font-weight:700;
					padding-bottom:0;
				}

				.o-heading-NDA {
					line-height: normal;
					font-size: xx-large;
					font-weight: 500;
				}
				.c-input {
					width: 100%;
					padding: 2%; 
					font-size: 1em;
					border: 1px solid #DDDDDD;
				}
				.o-NDA-button-wrapper {
					margin-top: 3.0em;
					margin-bottom: 1.0em;
					text-align:center;
					background-color: #ECE8E1;
					padding: 3% 3%;
					float: left;
					width: 100%;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;
				}
				.o-NDA-button-wrapper > p {
					padding-top: 0.5em;
                    line-height: 1.7em;
				}
				.c-start-button {
                    padding: 0.5em 3em;
                    background-color: #C79269;
                    color: white;
                    border:none;
                    font-size: 1.2em;
                    outline: none;
                    margin-top: 0px;
                }
				.c-start-button:hover {
					background-color: #DBA982;
				}

				ul { 
					list-style:none;
					color: rgb(160,160,160);
				}

				li {
					padding-bottom: 0.8em;
					margin-top: 0.5em;
				}
				.o-NDA-main {
					overflow-y: scroll;
					font-size: 0.8em;
    				height: 40em;
				}
				& > .o-NDA-container .o-NDA-form {
					padding: 4%;
					display: flex;
					flex-direction: column;
					flex-wrap: wrap;
					background-color:white;
					box-shadow: 0px 0px 6px #999999;
				}

				& > .o-NDA-container {
					padding: 5% 10% 5%;	
				}
				.o-heading-title1 {
					text-align: center;
					font-weight: 500;
					color: #4D4D4D;
					padding-bottom: 0.3em;
					font-size: 2em;
					line-height: 1em;
				}
				.o-heading-title2 {
					text-align: center;
					color: #4D4D4D;
					padding-bottom: 2em;
					font-size: 1.5em;
				}
				.o-NDA-form > header > h2 {
					font-size: 2.0em;
					font-weight: 600;
					color: #4D4D4D;
					text-align: -webkit-left;

				}
				.o-NDA-form > header > h3 {
					font-weight: 500;
					font-size: 1.5em;
					color: #4D4D4D;
					line-height: 0;
					margin-bottom: 2em;

				}
				.o-NDA-form > p {
					word-wrap: break-word;
					width: 100%;
					
					margin-bottom: 10%;
					text-align: center;
					text-align: -webkit-center;
					text-align: -moz-center;
				}

				{/* Mobile (Landscape)
				================================================== */}
				@media only screen and (min-width: 180px) and (max-width: 767px) {
					& > .o-NDA-container {
						padding: 5% 12% 5%;		
					}
					.o-NDA-button-wrapper {
						flex-direction: column;
					}
					.c-start-button {
						margin: 1em;
					}

					.o-heading-title1 {
						font-size: 1.5em;
					}
					.o-heading-title2 {
						font-size: 1em;
					}
					.o-NDA-form > header > h2 {
						font-size: 1.5em;
					}
					.o-NDA-form > header > h3 {
						font-size: 1.0em;
					}
				}

				{/* Tablet (Portrait)
				================================================== */}
				@media only screen and (min-width: 768px) and (max-width: 959px) {
					& > .o-NDA-container {
						padding: 5% 22% 5%;		
					}
				}
		`;

		const arabic = `
			
		`;

		return arabicToggle ? base + arabic : base;

	}

};

NDA.contextTypes = {
	router: React.PropTypes.object.isRequired,
};

export default NDA;