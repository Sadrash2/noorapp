
//////////////export functions///////////////////
let GlobalQuranFunction = {

	getSuraList: function(type) {
		var SuraArray = ["1 Al-Fatihah", 
			"2 Al-Baqarah", "3 Al-Imran", 
			"4 An-Nisa'", "5 Al-Ma'idah", 
			"6 Al-An'am", "7 Al-A'raf", 
			"8 Al-Anfal", "9 At-Tawbah",
			"10 Yunus", "11 Hud", 
			"12 Yusuf", "13 Ar-Ra'd", 
			"14 Ibrahim", "15 Al-Hijr", 
			"16 An-Nahl", "17 Al-Isra", 
			"18 Al-Kahf", "19 Maryam",
			"20 Ta-Ha", "21 Al-Anbiya'", 
			"22 Al-Hajj", "23 Al-Mu'minun", 
			"24 An-Nur", "25 Al-Furqan", 
			"26 Ash-Shu'ara'", "27 An-Naml", 
			"28 Al-Qasas", "29 Al-'Ankabut",
			"30 Ar-Rum", "31 Luqman", 
			"32 As-Sajdah", "33 Al-Ahzab", 
			"34 Al-Saba'", "35 Al-Fatir", 
			"36 YaSin", "37 As-Saffat", 
			"38 Sad", "39 Az-Zumar",
			"40 Al-Mu'min", "41 HaMim", 
			"42 Ash-Shura", "43 Az-Zukhruf", 
			"44 Ad-Dukhan", "45 Al-Jathiyah", 
			"46 Al-Ahqaf", "47 Muhammad", 
			"48 Al-Fath", "49 Al-Hujurat",
			"50 Qaf", "51 Ad-Dhariyat", 
			"52 At-Tur", "53 An-Najm", 
			"54 Al-Qamar", "55 Ar-Rahman", 
			"56 Al-Waqi'ah", "57 Al-Hadid", 
			"58 Al-Mujadilah", "59 Al-Hashr",
			"60 Al-Mumtahanah", "61 As-Saff", 
			"62 Al-Jumu'ah", "63 Al-Munafiqun", 
			"64 At-Taghabun", "65 At-Talaq", "66 At-Tahrim",
			"67 Al-Mulk", "68 Al-Qalam", 
			"69 Al-Haqqah", "70 Al-Ma'arij",
			"71 Nuh", "72 Al-Jinn", 
			"73 Al-Muzzammil", "74 Al-Muddaththir", 
			"75 Al-Qiyamah", "76 Al-Insan", 
			"77 Al-Mursalat", "78 An-Naba'",
			"79 An-Nazi'at", "80 `Abasa",
			"81 At-Takwir","82 Al-Infitar", 
			"83 At-Tatfif", "84 Al-Inshiqaq", 
			"85 Al-Buruj","86 At-Tariq", 
			"87 Al-A'la", "88 Al-Ghashiyah", 
			"89 Al-Fajr", "90 Al-Balad", 
			"91 Ash-Shams","92 Al-Lail", 
			"93 Ad-Duha", "94 Al-Inshirah", 
			"95 At-Tin", "96 Al-'Alaq", 
			"97 Al-Qadr", "98 Al-Bayyinah", 
			"99 Al-Zilzal", "100 Al-'Adiyat", 
			"101 Al-Qari'ah", "102 At-Takathur", 
			"103 Al-'Asr", "104 Al-Humazah", 
			"105 Al-Fil", "106 Al-Quraish", 
			"107 Al-Ma'un", "108 Al-Kauthar", 
			"109 Al-Kafirun", "110 An-Nasr", 
			"111 Al-Lahab", "112 Al-Ikhlas", 
			"113 Al-Falaq", "114 An-Nas"];

		var SuraArabicArray = ["1 سورة الفاتحة", 
			"2 سورة البقرة", "3 سورة آلعمران", 
			"4 سورة النساء", "5 سورة المائدة", 
			"6 سورة الأنعام", "7 سورة الأعراف", 
			"8 سورة الأنفال", "9 سورة التوبة",
			"10 سورة يونس", "11 	 هود", 
			"12 سورة يوسف", "13 سورة الرّعد", 
			"14 سورة إبراهيم", "15 سورة الحجر", 
			"16 سورة النحل", "17 سورة الإسراء", 
			"18 سورة الكهف", "19 سورة مريم",
			"20 سورة طه", "21 سورة الأنبياء", 
			"22 سورة الحج", "23 سورة المؤمنون", 
			"24 سورة النّور", "25 سورة الفرقان", 
			"26 سورة الشعراء'", "27 سورة النمل", 
			"28 سورة القصص", "29 سورة العنكبوت",
			"30 سورة الروم", "31 سورة لقمان", 
			"32 سورة السجدة", "33 سورة الأحزاب", 
			"34 سورة سبإ'", "35 سورة فاطر", 
			"36 سورة يس", "37 سورة الصّافّات", 
			"38 سورة ص", "39 سورة الزمر",
			"40 سورة غافر", "41 سورة فصّلت", 
			"42 سورة الشورى", "43 سورة الزخرف", 
			"44 سورة الدخان", "45 سورة الجاثية", 
			"46 سورة الأحقاف", "47 سورة محمّـد", 
			"48 سورة الفتح", "49 سورة الحُـجُـرات",
			"50 سورة ق", "51 سورة الذاريات", 
			"52 سورة الـطور", "53 سورة الـنحـم", 
			"54 سورة الـقمـر", "55 سورة الـرحـمـن", 
			"56 سورة الواقيـة", "57 سورة الحـديد", 
			"58 سورة الـمجادلـة", "59 سورة الـحـشـر",
			"60 سورة الـمـمـتـحنة", "61 سورة الـصّـف", 
			"62 سورة الـجـمـعـة", "63 سورة الـمنافقون", 
			"64 سورة الـتغابن", "65 سورة الـطلاق", "66 سورة الـتحريم",
			"67 سورة الـملك", "68 سورة الـقـلـم", 
			"69 سورة الـحاقّـة", "70 سورة الـمعارج",
			"71 سورة نوح", "72 سورة الجن", 
			"73 سورة الـمـزّمّـل", "74 سورة الـمّـدّثّـر", 
			"75 سورة الـقـيامـة", "76 سورة الإنسان", 
			"77 سورة الـمرسلات", "78 سورة الـنبإ'",
			"79 سورة الـنازعات", "80 سورة عبس",
			"81 سورة التكوير","82 سورة الانفطار", 
			"83 سورة المطـفـفين", "84 سورة الانشقاق", 
			"85 سورة البروج","86 سورة الـطارق", 
			"87 سورة الأعـلى", "88 سورة الغاشـيـة", 
			"89 سورة الفجر", "90 سورة الـبلد", 
			"91 سورة الـشـمـس","92 سورة اللـيـل", 
			"93 سورة الضـحى", "94 سورة الـشرح", 
			"95 سورة الـتين", "96 سورة الـعلق", 
			"97 سورة الـقدر", "98 سورة الـبينة", 
			"99 سورة الـزلزلة", "100 سورة الـعاديات", 
			"101 سورة الـقارعـة", "102 سورة الـتكاثر", 
			"103 سورة الـعصر", "104 سورة الـهمزة", 
			"105 سورة الـفيل", "106 سورة قريش", 
			"107 سورة المـاعون", "108 سورة الـكوثر", 
			"109 سورة الـكافرون", "110 سورة الـنصر", 
			"111 سورة الـمسد", "112 سورة الإخلاص", 
			"113 سورة الـفلق", "114 سورة الـناس"];

		var SuraArrayShort = ["سورة ١ سورة 1", "سورة ٢ سورة 2", "سورة ٣ سورة 3", "سورة ٤ سورة 4", "سورة ٥ سورة 5", "سورة ٦ سورة 6", "سورة ٧ سورة 7", "سورة ٨ سورة 8", "سورة ٩ سورة 9", "سورة ١٠ سورة 10",
							"سورة ١١ سورة 11", "سورة ١٢ سورة 12", "سورة ١٣ سورة 13", "سورة ١٤ سورة 14", "سورة ١٥ سورة 15", "سورة ١٦ سورة 16", "سورة ١٧ سورة 17", "سورة ١٨ سورة 18", "سورة ١٩ سورة 19", "سورة ٢٠ سورة 20",
							"سورة ٢١ سورة 21", "سورة ٢٢ سورة 22", "سورة ٢٣ سورة 23", "سورة ٢٤ سورة 24", "سورة ٢٥ سورة 25", "سورة ٢٦ سورة 26", "سورة ٢٧ سورة 27", "سورة ٢٨ سورة 28", "سورة ٢٩ سورة 29", "سورة ٣٠ سورة 30",
							"سورة ٣١ سورة 31", "سورة ٣٢ سورة 32", "سورة ٣٣ سورة 33", "سورة ٣٤ سورة 34", "سورة ٣٥ سورة 35", "سورة ٣٦ سورة 36", "سورة ٣٧ سورة 37", "سورة ٣٨ سورة 38", "سورة ٣٩ سورة 39", "سورة ٤٠ سورة 40",
							"سورة ٤١ سورة 41", "سورة ٤٢ سورة 42", "سورة ٤٣ سورة 43", "سورة ٤٤ سورة 44", "سورة ٤٥ سورة 45", "سورة ٤٦ سورة 46", "سورة ٤٧ سورة 47", "سورة ٤٨ سورة 48", "سورة ٤٩ سورة 49", "سورة ٥٠ سورة 50",
							"سورة ٥١ سورة 51", "سورة ٥٢ سورة 52", "سورة ٥٣ سورة 53", "سورة ٥٤ سورة 54", "سورة ٥٥ سورة 55", "سورة ٥٦ سورة 56", "سورة ٥٧ سورة 57", "سورة ٥٨ سورة 58", "سورة ٥٩ سورة 59", "سورة ٦٠ سورة 60",
							"سورة ٦١ سورة 61", "سورة ٦٢ سورة 62", "سورة ٦٣ سورة 63", "سورة ٦٤ سورة 64", "سورة ٦٥ سورة 65", "سورة ٦٦ سورة 66", "سورة ٦٧ سورة 67", "سورة ٦٨ سورة 68", "سورة ٦٩ سورة 69", "سورة ٧٠ سورة 70",
							"سورة ٧١ سورة 71", "سورة ٧٢ سورة 72", "سورة ٧٣ سورة 73", "سورة ٧٤ سورة 74", "سورة ٧٥ سورة 75", "سورة ٧٦ سورة 76", "سورة ٧٧ سورة 77", "سورة ٧٨ سورة 78", "سورة ٧٩ سورة 79", "سورة ٨٠ سورة 80",
							"سورة ٨١ سورة 81", "سورة ٨٢ سورة 82", "سورة ٨٣ سورة 83", "سورة ٨٤ سورة 84", "سورة ٨٥ سورة 85", "سورة ٨٦ سورة 86", "سورة ٨٧ سورة 87", "سورة ٨٨ سورة 88", "سورة ٨٩ سورة 89", "سورة ٩٠ سورة 90",
		      		      	"سورة ٩١ سورة 91", "سورة ٩٢ سورة 92", "سورة ٩٣ سورة 93", "سورة ٩٤ سورة 94", "سورة ٩٥ سورة 95", "سورة ٩٦ سورة 96", "سورة ٩٧ سورة 97", "سورة ٩٨ سورة 98", "سورة ٩٩ سورة 99", "سورة ١٠٠ سورة 100",
		      		      	"سورة ١٠١ سورة 101", "سورة ١٠٢ سورة 102", "سورة ١٠٣ سورة 103", "سورة ١٠٤ سورة 104", "سورة ١٠٥ سورة 105", "سورة ١٠٦ سورة 106", "سورة ١٠٧ سورة 107", "سورة ١٠٨ سورة 108", "سورة ١٠٩ سورة 109", "سورة ١١٠ سورة 110",
		      		      	"سورة ١١١ سورة 111", "سورة ١١٢ سورة 112", "سورة ١١٣ سورة 113", "سورة ١١٤ سورة 114"];
		
		if (type == "arabic") {
			return SuraArabicArray;
		} else if (type == "english") {
			return SuraArray;
		} else {
			return SuraArrayShort;
		}
					
	},

	getJuzList: function(type) {
		var juzEnglishArray = ["Juz 1","Juz 2","Juz 3","Juz 4","Juz 5","Juz 6","Juz 7","Juz 8","Juz 9","Juz 10",
								"Juz 11","Juz 12","Juz 13","Juz 14","Juz 15","Juz 16","Juz 17","Juz 18","Juz 19","Juz 20",
								"Juz 21","Juz 22","Juz 23","Juz 24","Juz 25","Juz 26","Juz 27","Juz 28","Juz 29","Juz 30"];
		var juzArabicArray = ["الجزء الاول", "الجزء الثاني", "الجزء الثالث", "الجزء الرابع", "الجزء الخامس", "الجزء السادس", "الجزء السابع",
						"الجزء الثامن", "الجزء التاسع", "الجزء العاشر", "الجزء الحادي عشر", "الجزء الثاني عشر", "الجزء الثالث عشر", "الجزء الرابع عشر",
						"الجزء الخامس عشر", "الجزء السادس عشر", "الجزء السابع عشر", "الجزء الثامن عشر", "الجزء التاسع عشر", "الجزء العشرون", 
						"الجزء الحادي والعشرون", "الجزء الثاني والعشرون", "الجزء الثالث والعشرون", "الجزء الرابع والعشرون", "الجزء الخامس والعشرون", 
						"الجزء السادس والعشرون", "الجزء السابع والعشرون", "الجزء الثامن والعشرون", "الجزء التاسع والعشرون", "الجزء الثلاثون"];

		var juyzArabicArrayShort =["الجزء ١ الجزء1", "الجزء ٢ الجزء 2", "الجزء ٣ الجزء 3", "الجزء ٤ الجزء 4", "الجزء ٥ الجزء 5", "الجزء ٦ الجزء 6", "الجزء ٧ الجزء 7", "الجزء ٨ الجزء 8", "الجزء ٩ الجزء 9", "الجزء ١٠ الجزء 10",
									"الجزء ١١ الجزء 11", "الجزء ١٢ الجزء 12", "الجزء ١٣ الجزء 13", "الجزء ١٤ الجزء 14", "الجزء ١٥ الجزء 15", "الجزء ١٦ الجزء 16", "الجزء ١٧ الجزء 17", "الجزء ١٨ الجزء 18", "الجزء ١٩ الجزء 19", "الجزء ٢٠ الجزء 20",
									"الجزء ٢١ الجزء 21", "الجزء ٢٢ الجزء 22", "الجزء ٢٣ الجزء 23", "الجزء ٢٤ الجزء 24", "الجزء ٢٥ الجزء 25", "الجزء ٢٦ الجزء 26", "الجزء ٢٧ الجزء 27", "الجزء ٢٨ الجزء 28", "الجزء ٢٩ الجزء 29", "الجزء ٣٠ الجزء 30"];

		if (type == "english") {
			return juzEnglishArray;	
		} else if (type == "arabic") {
			return juzArabicArray;
		} else {
			return juyzArabicArrayShort;
		}
	},

	getJuzDetails: function() {
		var JuzList = ["1.1", "2.142", "2.253", "3.93", "4.24", "4.148", "5.82", "6.111", "7.88", "8.41",
						"9.93", "11.6", "12.53", "15.1", "17.1", "18.75", "21.1", "23.1", "25.21", "27.56",
						"29.46", "33.31", "36.28", "39.32", "41.47", "46.1", "51.31", "58.1", "67.1", "78.1"];
		///return sura and aya of all the JUZ
		return JuzList;
	},

	//convert arabic nuber into number
	converter: function(arabicnumber) {
		var newString = "";
		for (var i=0; i < arabicnumber.length; i ++) {
			newString = newString + convertNumber(arabicnumber.charAt(i));

		}
		
		function convertNumber(item) {
			if (item == "١") {
				return "1";
			} else if (item == "٢") {
				return "2";
			} else if (item == "٣") {
				return "3";
			} else if (item == "٤") {
				return "4";
			} else if (item == "٥") {
				return "5";
			} else if (item == "٦") {
				return "6";
			} else if (item == "٧") {
				return "7";
			} else if (item == "٨") {
				return "8";
			} else if (item == "٩") {
				return "9";
			} else if (item == "٠") {
				return "0";
			} else {
				return "";
			}
		}

		return newString;
	},

	//convert number into arabic number
	converter2: function(arabicnumber) {
		var newString = "";
		for (var i=0; i < arabicnumber.length; i ++) {
			newString = newString + convertNumber(arabicnumber.charAt(i));

		}
		
		function convertNumber(item) {
			if (item == "1") {
				return "١";
			} else if (item == "2") {
				return "٢";
			} else if (item == "3") {
				return "٣";
			} else if (item == "4") {
				return "٤";
			} else if (item == "5") {
				return "٥";
			} else if (item == "6") {
				return "٦";
			} else if (item == "7") {
				return "٧";
			} else if (item == "8") {
				return "٨";
			} else if (item == "9") {
				return "٩";
			} else if (item == "0") {
				return "٠";
			} else {
				return "";
			}
		}

		return newString;
	},

	getAudioList: function() {
		var audioNumber = ["1. ", "2. ", "3. ", "4. ", "5. "];
		var audioTitle = ["Al-Fatihah", "Al-Baqarah", "Al-Imran", "An-Nisa", "Al-Ma'idah"];
		var audioLength = ["00:29", "1:22:20", "47:58", "48:25", "36:53"];
		
		return {number:audioNumber, title:audioTitle, length:audioLength};
	},

	//convert digit into arabic digit
	convertNumberDigitToArabic: function(number) {
		var numberString = number.toString();
		var newNumberString = numberString;

		for (var i = 0; i < number.toString().length; i ++) {
			newNumberString = newNumberString.replace('1', '١').replace('2', '٢').replace('3', '٣').replace('4', '٤').replace('5', '٥')
							.replace('6', '٦').replace('7', '٧').replace('8', '٨').replace('9', '٩').replace('0', '٠');
		}
		//var arabicNumber= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];

		return newNumberString;	
	},

	getQuran: function(suraID, callback) {
		var $ = require ('jquery')

			var request =  [
			"UserData",
			"fetchQuranWithSura",
			suraID];
			$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	getQuranCheckpoint: function(email, callback) {
		var $ = require ('jquery')

		var request =  [
					"UserData",
					"fetchQuranCheckpoint",
					email];

		$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: {request},
				cache: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	updateQuranCheckpoint: function(email, suraID, verseID) {
		var $ = require ('jquery')

		var opt = {"email": email,
					"SuraID": suraID,
					"VerseID": verseID
				}

		var request =  [
					"UserData",
					"updateQuranCheckpoint",
					opt];

		var json = JSON.stringify(request);  
		var form_data = new FormData();  
		form_data.append('request', json);

		$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: form_data,
				cache: false,
			               contentType: false,
			               processData: false,
				success: function(data) {
					var response = JSON.parse(data);
					if(response.state === 200) {
					}
					else {
					}
				}.bind(this)
		});
	},

	fetchAyaBySuraID: function(suraID, ayaID, callback) {
		var $ = require ('jquery')

		var opt = {"SuraID": suraID,
					"VerseID": ayaID
				}

		var request =  [
					"Quran",
					"fetchAya",
					opt];

		var json = JSON.stringify(request);  
		var form_data = new FormData();  
		form_data.append('request', json);

		$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: form_data,
				cache: false,
			               contentType: false,
			               processData: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	fetchFavouriteSuraAya: function(email, suraID, callback) {
		var $ = require ('jquery')

		var opt = {"email": email,
					"SuraID": suraID
				}

		var request =  [
					"UserSuraAya",
					"fetchFavouriteSuraAya",
					opt];

		var json = JSON.stringify(request);  
		var form_data = new FormData();  
		form_data.append('request', json);

		$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: form_data,
				cache: false,
			               contentType: false,
			               processData: false,
				success: function(data) {
					callback(data);
				}.bind(this)
		});
	},

	addFavouriteSuraAya: function(email, suraID, verseID) {
		var $ = require ('jquery')

		var opt = {"email": email,
					"SuraID": suraID,
					"VerseID": verseID
				}

		var request =  [
					"UserSuraAya",
					"addFavouriteSuraAya",
					opt];

		var json = JSON.stringify(request);  
		var form_data = new FormData();  
		form_data.append('request', json);

		$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: form_data,
				cache: false,
			               contentType: false,
			               processData: false,
				success: function(data) {
					var response = JSON.parse(data);
					if(response.state === 200) {
					}
					else {
					}
				}.bind(this)
		});
	},

	deleteFavouriteSuraAya: function(email, suraID, verseID) {
		var $ = require ('jquery')

		var opt = {"email": email,
					"SuraID": suraID,
					"VerseID": verseID
				}

		var request =  [
					"UserSuraAya",
					"deleteFavouriteSuraAya",
					opt];

		var json = JSON.stringify(request);  
		var form_data = new FormData();  
		form_data.append('request', json);

		$.ajax({
				type: "POST",
				datatype: 'json',
				url: "./app/bridge/enter.php",
				data: form_data,
				cache: false,
			               contentType: false,
			               processData: false,
				success: function(data) {
					var response = JSON.parse(data);
					if(response.state === 200) {
					}
					else {
					}
				}.bind(this)
		});
	}
};
export default GlobalQuranFunction;