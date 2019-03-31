document.getElementById("getFocus").onclick = getFocus;
document.getElementById("toggleCardBacks").onclick = toggleCardBacks;
document.getElementById("listcontainer").onclick = commandCard;

function commandCard(e) {
	if (e.target !== e.currentTarget && e.target.className.indexOf("save") != -1) {
		if (e.target.parentNode.className.indexOf("savedCards") == -1) {
			document.getElementById("savedCards").appendChild(e.target.parentNode);
			var clone = e.target.parentNode.cloneNode(true);
			document.getElementById("printContainer").appendChild(clone);
		}
	}
	if (e.target !== e.currentTarget && e.target.className.indexOf("flip") != -1) {
		var allPs = e.target.parentNode.getElementsByTagName("p");
		e.target.parentNode.parentNode.remove();
	}
	e.stopPropagation();
}

function flipCard(e) {
	if (e.target !== e.currentTarget && e.target.tagName == "DIV") {
		if (e.target.className.indexOf("fullcardMargin") != -1) {
			var allPs = e.target.getElementsByTagName("p");
			for (i=0, len=allPs.length; i<len; i++){
				if (allPs[i].style.visibility !== "hidden" && allPs[i].className.indexOf("cardback") != -1){
					allPs[i].style.visibility = "hidden";
				} else {
					allPs[i].style.visibility = "visible";
				}					
			}
		}
	}
}

function hideAllCards(){
	var allCards = document.getElementsByClassName("fullcardMargin");
	for (i=0, len=allCards.length; i<len; i++){
		if (allCards[i].parentElement.id == "listcontainer"){
			allCards[i].style.display = "none";
		}
	}
};

function showAllCards(){
	//showall kanji
	var allCards = document.getElementsByClassName("fullcardMargin");
	for (i=0, len=allCards.length; i<len; i++){
		if (allCards[i].parentElement.id == "listcontainer"){
			allCards[i].style.display = "block"
		}
	}
};

function getFocus() {
	var allCards = document.getElementsByClassName("fullcardMargin");
	var totalCards = allCards.length;
	var cardCount = parseInt(document.getElementById("cardcount").value);
	hideAllCards();
	toggleCardBacks(true);
	//loop through the count
	for (i=0, len=cardCount; i<len; i++){
		var randomCard = Math.floor(Math.random() * totalCards);
		allCards[randomCard].style.display = "block";
		if (allCards[randomCard].className.indexOf("seen") == -1) {
			allCards[randomCard].className += " seen";
		}
	};
	document.getElementById("getFocus").style.display = "none";
	document.getElementById("toggleCardBacks").style.display = "block";
};

function toggleCardBacks(off=false) {
	var allPs = document.getElementsByTagName("p");
	for (i=0, len=allPs.length; i<len; i++){
		if (allPs[i].className.indexOf("cardback") != -1){
			if (allPs[i].style.visibility !== "hidden" || off == true){
				allPs[i].style.visibility = "hidden";
			} else {
				allPs[i].style.visibility = "visible";
			}
		}
	};
	document.getElementById("toggleCardBacks").style.display = "none";
	document.getElementById("getFocus").style.display = "block";
};

function HideCardBacks(off=false) {
	var allPs = document.getElementsByTagName("p");
	for (i=0, len=allPs.length; i<len; i++){
		if (allPs[i].className.indexOf("cardback") != -1){
			allPs[i].style.visibility = "hidden";
		}
	}
};

function ShowCardBacks(off=false) {
	var allPs = document.getElementsByTagName("p");
	for (i=0, len=allPs.length; i<len; i++){
		if (allPs[i].className.indexOf("cardback") != -1){
			allPs[i].style.visibility = "visible";
		}
	}
};

function getCardSets(cardData) {
	return Object.keys(cardData);
}

function makeSetSelector(sets) {
	for (var set in sets) {
		var setSelector = document.getElementById("lesson");
		var option = document.createElement("option");
		option.text = sets[set];
		option.value = sets[set];
		setSelector.add(option);
	}
}

function makeCards(cardData, setIdentifier) {
	document.getElementById("getFocus").style.display = "block";
	document.getElementById("toggleCardBacks").style.display = "none";
	var cardType = "";
	var cardSet = cardData[setIdentifier];
	cardData = cardSet;

	// clear out any existing cards
	if (document.getElementById('listcontainer').childNodes.length > 0) {
		var myNode = document.getElementById('listcontainer');
		while (myNode.firstChild) {
		    myNode.removeChild(myNode.firstChild);
		}
	}
	
	// create and show new cards
	for (var card in cardData){
		
		if (cardData[card].length == 5) {
			cardType = "joyokanji";
		} else {
			cardType = "standard";
		}

		var isAsciiChar = cardData[card][0].charCodeAt(0) < 256 ? true : false;

		//handle empty cells
		if (cardData[card][0]) { cardData[card][0] = cardData[card][0]|| '&nbsp;'; };
		if (cardData[card][1]) { cardData[card][1] = cardData[card][1]|| '&nbsp;'; };
		if (cardData[card][2]) { cardData[card][2] = cardData[card][2]|| '&nbsp;'; };
		if (cardData[card][3]) { cardData[card][3] = cardData[card][3]|| '&nbsp;'; };
		if (cardData[card][4]) { cardData[card][4] = cardData[card][4]|| '&nbsp;'; };

		// figure out card widths based on number of characters on card front
		// var cardWidthXl = cardData[card][0].length > 8 ? 3 : 2;
		// var cardWidthXl = cardData[card][0].length > 20 ? 4 : 3;
		var cardWidthXl = 4;

		// var cardWidthLg = cardData[card][0].length > 8 ? 4 : 2;
		// var cardWidthLg = cardData[card][0].length > 20 ? 6 : 4;
		var cardWidthLg = 3;

		// var cardWidthMd = cardData[card][0].length > 8 ? 4 : 4;
		// var cardWidthMd = cardData[card][0].length > 20 ? 6 : 4;
		var cardWidthMd = 3;

		// var cardWidthSm = cardData[card][0].length > 8 ? 6 : 4;
		// var cardWidthSm = cardData[card][0].length > 20 ? 6 : 3;
		var cardWidthSm = 3;

		// if (isAsciiChar) {
		// 	var cardWidthXs = cardData[card][0].length < 30 ? 6 : 12;
		// } else {
		// 	var cardWidthXs = cardData[card][0].length < 9 ? 6 : 12;
		// }
		var cardWidthXs = 12;
		
		//create cards and add to screen
		var formattedCard = document.createElement("div");
		formattedCard.className = 'fullcardMargin front-card col-xl-'+ cardWidthXl + ' col-lg-'+ cardWidthLg + ' col-md-'+ cardWidthMd + ' col-sm-'+ cardWidthSm + ' col-xs-'+ cardWidthXs;
		if (cardType == "standard") {
			formattedCard.innerHTML = '<div class="fullcard vocabulary"><p class="cardfront">'+ cardData[card][0] +'</p><p class="pronunciation cardback">'+ cardData[card][1] +'</p><p class="english cardback">'+ cardData[card][2] +'</p></div>';
		} else if (cardType == "joyokanji") {
			formattedCard.innerHTML = '<div class="fullcard vocabulary"><p class="kanji cardfront">'+ cardData[card][0] +'</p><p class="oldkanji cardback">'+ cardData[card][1] +'</p><p class="english cardback">'+ cardData[card][2] +'</p><p class="pronunciation cardback">'+ cardData[card][3] +'</p><p class="romaji cardback">'+ cardData[card][4] +'</p></div>';
		}
		document.getElementById('listcontainer').appendChild(formattedCard);

		//create cards and add to screen
		var formattedCard = document.createElement("div");
		formattedCard.className = 'fullcardMargin back-card col-xl-'+ cardWidthXl + ' col-lg-'+ cardWidthLg + ' col-md-'+ cardWidthMd + ' col-sm-'+ cardWidthSm + ' col-xs-'+ cardWidthXs;
		if (cardType == "standard") {
			formattedCard.innerHTML = '<div class="fullcard vocabulary"><p class="cardfront englishcardfront">'+ cardData[card][2] +'</p><p class="pronunciation cardback">'+ cardData[card][1] +'</p><p class="english cardback kanjicardback">'+ cardData[card][0] +'</p></div>';
		} else if (cardType == "joyokanji") {
			formattedCard.innerHTML = '<div class="fullcard vocabulary"><p class="kanji cardfront englishcardfront">'+ cardData[card][2] +'</p><p class="english cardback">'+ cardData[card][0] +'</p><p class="pronunciation cardback">'+ cardData[card][3] +'</p><p class="romaji cardback">'+ cardData[card][4] +'</p></div>';
		}
		document.getElementById('listcontainer').appendChild(formattedCard);
	}
};

function updateCardSet() {
	var newSet = document.getElementById("lesson").value;
	makeCards(cardData, newSet);
}

function navigate() {
	var newLocation = document.getElementById("topic").value;
	document.location = newLocation;
}

function updateWallpaper() {
	var wallpaperList = ['luca-bravo-mountains', '2fgvaqx-fxs-oskar-krawczyk', 'chineseStreet', 'subwayCar', 'photo-1434871619871-1f315a50efba', 'photo-1437326516294-01d0da392e11', 'photo-1440613905118-99b921706b5c','photo-1441794016917-7b6933969960','photo-1442512595331-e89e73853f31','photo-1445346366695-5bf62de05412','photo-1454942901704-3c44c11b2ad1','photo-1463078488370-efa8ff1efb34','photo-1464306208223-e0b4495a5553','photo-1465199714202-a6918cf734a2','photo-1465588042420-47a53c2d0320','photo-1466854076813-4aa9ac0fc347','HugttoPrecureED'];
	if (document.body.style.backgroundImage == '') {
		document.body.style.backgroundImage = 'url(wallpaper/' + wallpaperList[0] + '.jpg)';
	}
	var currentWallpaper = document.body.style.backgroundImage.split('.')[0].split('wallpaper/')[1];
	var currentWallpaperIndex = wallpaperList.indexOf(currentWallpaper);
	var nextWallpaperIndex = 0;
	if (currentWallpaperIndex == wallpaperList.length - 1){
		nextWallpaperIndex = 0;
	} else {
		nextWallpaperIndex = currentWallpaperIndex + 1;
	}
	document.body.style.backgroundImage = 'url(wallpaper/' + wallpaperList[nextWallpaperIndex] + '.jpg)';
	return true
}

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  console.log(keyName);
  if (keyName === "Enter" || keyName === " ") {
	  toggleCardBacks();
  }
  if (keyName === "b") {
	  removeFrontCards();
  }
  if (keyName === "f") {
	  removeBackCards();
  }
  if (keyName === "a") {
	  autoplay();
  }
  if (keyName === "h") {
	  toggleControls();
  }
  if (keyName === "w") {
	  updateWallpaper();
  }
  if (keyName === "ArrowRight") {
	  getFocus();
  }
  // alert('keydown event\n\n' + 'key: ' + keyName);
});

function toggleControls() {
	if ( document.querySelector('#menubar').style.display != "none" ) {
		document.querySelector('#menubar').style.display = "none";
	} else {
		document.querySelector('#menubar').style.display = "block";
	}
}

function removeFrontCards(){
	var frontCards = document.querySelectorAll('.front-card');
	for (var i=0, len=frontCards.length; i < len; i++) {
		frontCards[i].parentNode.removeChild(frontCards[i]);
	}
}

function removeBackCards(){
	var backCards = document.querySelectorAll('.back-card');
	for (var i=0, len=backCards.length; i < len; i++) {
		backCards[i].parentNode.removeChild(backCards[i]);
	}
}

function autoShow(){
	getFocus();
	setTimeout(function(){
		toggleCardBacks()
	}, 2000)
}

function autoplay(){
	setInterval(function(){
		autoShow();
	}, 4000);
}

makeSetSelector(getCardSets(cardData));
var setSelector = document.getElementById("lesson");
defaultSetIdentifier = setSelector.selectedOptions[0].innerHTML;
makeCards(cardData, defaultSetIdentifier);