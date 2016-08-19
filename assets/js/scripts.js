//create objects for each character
var ackbar  = {name: "Admiral Ackbar", image: "ackbar.png", health: 100, strength: 10, counterAttack: 9};
var boba    = {name: "Boba Fett", image: "boba.png", health: 100, strength: 11, counterAttack: 8};
var greedo  = {name: "Greedo", image: "greedo.png", health: 100, strength: 12, counterAttack: 7};
var porkins = {name: "Porkins", image: "porkins.png", health: 100, strength: 13, counterAttack: 6};
var characterID = 999;
var firstEnemyID = 999;
var firstEnemy = 0;
var firstAttack = 0;
var initialStrength = 0;

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
		// console.log(createCharacterCard);
		$( "#allCharacters" ).append( createCharacterCard );
	}
};


$(document).ready(function() {

	//on click, send images into the correct buckets
	$('.options').on('click', function(event) {
		//determine which was clicked by obtaining the array index
		characterID = this.id;
		// console.log("you selected " + charactersArray[characterID].name);
		initialStrength = charactersArray[characterID].strength;
	
		//load variable to write the selected character into the "Your Character" box
		var selectedCharacter = ("<div id=" + characterID + " class='card human'><h3>" + charactersArray[characterID].name + "</h3><img src=" + imgPath + charactersArray[characterID].image + " height=200px><h4>Health: " + charactersArray[characterID].health + "</h4></div>");
		$( "#playerCard" ).append( selectedCharacter );

		//move all others into #enemies
		for (i=0;i<charactersArray.length; i++) {
			if (i != characterID) {
				var createEnemyCard = ("<div id=" + i + " class='card enemy'><h3>" + charactersArray[i].name + "</h3><img src=" + imgPath + charactersArray[i].image + " height=200px><h4>Health: " + charactersArray[i].health + "</h4></div>");
				// console.log(createEnemyCard);
				$( "#enemies" ).append( createEnemyCard );
			}
		}
		
		//kill all 4 original objects
		$("#allCharacters").empty();
		selectFirstEnemy();
	});








	$('#attackButton').on('click', function(event) {
		if (firstAttack == 1) {
		
		// console.log(charactersArray[characterID].name + " attacks for " + charactersArray[characterID].strength + " points.");
				
		//Subtract player STRENGTH from enemy HEALTH
		charactersArray[firstEnemyID].health = charactersArray[firstEnemyID].health - charactersArray[characterID].strength;
		// console.log(charactersArray[firstEnemyID].name + " health is " + charactersArray[firstEnemyID].health);
		
		//update Health displayed under enemy
		rePrint = ("<div id=" + firstEnemyID + " class='card currentEnemy'><h3>" + charactersArray[firstEnemyID].name + "</h3><img src=" + imgPath + charactersArray[firstEnemyID].image + " height=200px><h4>Health: " + charactersArray[firstEnemyID].health + "</h4></div>");
		$( "#currentEnemyCard" ).html("");
		$( "#currentEnemyCard" ).append( rePrint );

		//increase players strength by original number.
		charactersArray[characterID].strength = charactersArray[characterID].strength + initialStrength;
		
		//check for death
		if (charactersArray[firstEnemyID].health < 1) {
			alert(charactersArray[firstEnemyID].name + " is dead!");
			firstEnemy = 0;
			$( "#currentEnemyCard" ).html("");
			selectFirstEnemy();
			firstAttack = 0;

		//Are there enemies left??
		
		} else {
			enemyAttack();
		}
	}
	});
});


function enemyAttack() {
		//Substract enemy's COUNTER from player's HEALTH
		charactersArray[characterID].health = charactersArray[characterID].health - charactersArray[firstEnemyID].strength;
		console.log(charactersArray[firstEnemyID].name + " counter attacks for " + charactersArray[firstEnemyID].strength + " points.");
		
		//update Health displayed under player
		rePrint = ("<div id=" + characterID + " class='card currentEnemy'><h3>" + charactersArray[characterID].name + "</h3><img src=" + imgPath + charactersArray[characterID].image + " height=200px><h4>Health: " + charactersArray[characterID].health + "</h4></div>");
		$( "#playerCard" ).html("");
		$( "#playerCard" ).append( rePrint );
		//check for death

}



function selectFirstEnemy() {
	//on click, send images into the correct buckets
	$('.enemy').on('click', function(event) {
		//This is necessary to prevent mutliple enemies being selected at once
		if (firstEnemy == 0) {
			firstEnemy = 1;
			firstAttack = 1;
			//determine which enemy was clicked by obtaining the array index
			firstEnemyID = this.id;
			console.log("you selected the enemy " + charactersArray[firstEnemyID].name);
		
			//load variable to write the enemy character into the "Current Enemy" box
			var selectedEnemy = ("<div id=" + firstEnemyID + " class='card currentEnemy'><h3>" + charactersArray[firstEnemyID].name + "</h3><img src=" + imgPath + charactersArray[firstEnemyID].image + " height=200px><h4>Health: " + charactersArray[firstEnemyID].health + "</h4></div>");
			$( "#currentEnemyCard" ).append( selectedEnemy );
			
			//remove current enemy from all enemies box
			this.remove();

			//remove class "enemy" from remaining 2 enemies
			removeEnemyClass();
		}
	});
}

function removeEnemyClass() {
	// console.log("removing enemy class");
	$('.enemy').removeClass("enemy").addClass("waiting");
}





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
