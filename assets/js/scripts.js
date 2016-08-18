//create objects for each character
var ackbar = {name: "Admiral Ackbar", image: "ackbar.png", health: 100};
var boba = {name: "Boba Fett", image: "boba.png", health: 100};
var greedo = {name: "Greedo", image: "greedo.png", health: 100};
var porkins = {name: "Porkins", image: "porkins.png", health: 100};

imgPath = "assets/images/";
var charactersArray = [ackbar,boba,greedo,porkins];

function startGame() {
	//Print each character into the main character window.
	// JQUERY notes 
		// for (i=0;i<letters.length; i++) {
	 	//add()
		// 	var b = $('<button>');
		// 	b.addClass('letter-button letter letter-button-color');
		// 	b.attr('data-let', letters[i]);
		// 	b.text(letters[i]);
		// 	$( "#buttons" ).append( b );
		// }

	for (i=0;i<charactersArray.length; i++) {
		var createCharacterCard = ("<div id=" + i + " class='card options'><h3>" + charactersArray[i].name + "</h3><img src=" + imgPath + charactersArray[i].image + " height=200px><h4>Health: " + charactersArray[i].health + "</h4></div>");
		console.log(createCharacterCard);
		$( "#allCharacters" ).append( createCharacterCard );
	}


	//on click, send images into the correct buckets
	$('.options').on('click', function(event) {
		//determine which was clicked by obtaining the array index
		var characterID = this.id;
	
		//load variable to write the selected character into the "Your Character" box
		var selectedCharacter = ("<div id=" + characterID + " class='card options'><h3>" + charactersArray[characterID].name + "</h3><img src=" + imgPath + charactersArray[characterID].image + " height=200px><h4>Health: " + charactersArray[characterID].health + "</h4></div>");
		$( "#human" ).append( selectedCharacter );

		//move all others into #enemies
		for (i=0;i<charactersArray.length; i++) {
			if (i != characterID) {
				var createEnemyCard = ("<div id=" + i + " class='card options'><h3>" + charactersArray[i].name + "</h3><img src=" + imgPath + charactersArray[i].image + " height=200px><h4>Health: " + charactersArray[i].health + "</h4></div>");
				console.log(createEnemyCard);
				$( "#enemies" ).append( createEnemyCard );
			}
		}
		
		//kill all 4 original objects
		$("#allCharacters").empty();
	});

};


	//     $('.letter-button').on('click', function() {
	//     	//JQuery method
	// 		var fridgeMagnet = $('<div class="letter fridge-color">').text($(this).data('let'));
	    	
	//     	//Javascript
	// 		// var letter = $(this).data('let');
	//   		//var fridgeMagnet = "<div class='letter-button letter letter-button-color'>" + letter + "</div>";
	    
	//     	$( "#display" ).append( fridgeMagnet );
	// 	});


	//     $('#clear').on('click', function() {
	// 		// alert("test clear");
	// 		$("#display").empty();
	// 	});
	// });
