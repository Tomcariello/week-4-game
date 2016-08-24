//create objects for each character
var ackbar  = {name: "Admiral Ackbar", image: "ackbar.png", health: 166, strength: 11, counterAttack: 15};
var boba    = {name: "Boba Fett", image: "boba.png", health: 180, strength: 7, counterAttack: 18};
var greedo  = {name: "Greedo", image: "greedo.png", health: 172, strength: 8, counterAttack: 23};
var porkins = {name: "Porkins", image: "porkins.png", health: 137, strength: 9, counterAttack: 29};

var characterID = 999;
var isEnemySelectedID = 999;
var isEnemySelected = 0;
var readyForAttack = 0;
var initialStrength = 0;
var winTotal = 0;
var lossTotal = 0;
var numberOfEnemiesKilled = 0;
var attackButtonActive = true;

imgPath = "assets/images/";
var charactersArray = [ackbar,boba,greedo,porkins];

function startGame() {
	$('#allCharacters').css("display","block");
	$('#newGame').css("display","none");
	for (i=0;i<charactersArray.length; i++) {
		var createCharacterCard = ("<div id=" + i + " class='left card options'><h3>" + charactersArray[i].name + "</h3><img src=" + imgPath + charactersArray[i].image + " height=200px><h4>Health: " + charactersArray[i].health + "</h4></div>");
		$( "#allCharacters" ).append( createCharacterCard );
	}
	attackButtonActive = true;
	selectHumanCharacter();
};

//on selection of player character, send images into the correct buckets
function selectHumanCharacter() {
	$('.options').on('click', function(event) {
		//determine which was clicked by obtaining the array index
		characterID = this.id;
		initialStrength = charactersArray[characterID].strength;
	
		//load variable to write the selected character into the "Your Character" box
		var selectedCharacter = ("<div id=" + characterID + " class='card human'><h3>" + charactersArray[characterID].name + "</h3><img src=" + imgPath + charactersArray[characterID].image + " height=200px><h4>Health: " + charactersArray[characterID].health + "</h4></div>");
		$( "#playerCard" ).append( selectedCharacter );
		$( "#human").css("display", "block");

		//move all others into #enemies
		for (i=0;i<charactersArray.length; i++) {
			if (i != characterID) {
				var createEnemyCard = ("<div id=" + i + " class='left card enemy'><h3>" + charactersArray[i].name + "</h3><img src=" + imgPath + charactersArray[i].image + " height=200px><h4>Health: " + charactersArray[i].health + "</h4></div>");
				// console.log(createEnemyCard);
				$( "#enemyCardHolder" ).append( createEnemyCard );
				$( "#enemies").css("display", "block");
			}
		}
		
		//kill all 4 original objects
		$("#allCharacters").empty();
		selectEnemy();
	});
}

$('#playAgain').on('click', function(event) {
	//reset all players health
	ackbar.health = 160;
	boba.health = 190;
	greedo.health = 175;
	porkins.health = 130;

	//reset humanplayer's strength to the original value
	charactersArray[characterID].strength = initialStrength;

	//clear html elements
	$('#playerCard').empty();
	$('#currentEnemyCard').empty();

	characterID = 999;
	isEnemySelectedID = 999;
	isEnemySelected = 0;
	readyForAttack = 0;
	initialStrength = 0;
	numberOfEnemiesKilled = 0;

	startGame();
});


$('#attackButton').on('click', function(event) {
	if (readyForAttack == 1 && attackButtonActive==true) {
		//lock the attach button
		attackButtonActive = false;

		//Subtract player STRENGTH from enemy HEALTH
		charactersArray[isEnemySelectedID].health = charactersArray[isEnemySelectedID].health - charactersArray[characterID].strength;
		
		//animate the attack
		$( '#playerCard').addClass('playerCardAttack');
		
		//List damage inflicted on the enemy
		$('#playerDamageDealt').append("Attacks for " + charactersArray[characterID].strength + " points");

		//wait 2 seconds, clear damage report and move playerCard back
		setTimeout(function(){
			$('#playerDamageDealt').html("");
			$( '#playerCard').removeClass('playerCardAttack');
		
		//update Health displayed under enemy
		rePrint = ("<div id=" + isEnemySelectedID + " class='card currentEnemy'><h3>" + charactersArray[isEnemySelectedID].name + "</h3><img src=" + imgPath + charactersArray[isEnemySelectedID].image + " height=200px><h4>Health: " + charactersArray[isEnemySelectedID].health + "</h4></div>");
		$( "#currentEnemyCard" ).html("");
		$( "#currentEnemyCard" ).append( rePrint );

		//increase players strength by original number.
		charactersArray[characterID].strength = charactersArray[characterID].strength + initialStrength;
		
		//check for death
		if (charactersArray[isEnemySelectedID].health < 1) {
			alert(charactersArray[isEnemySelectedID].name + " is dead!");
			numberOfEnemiesKilled++;
			if (numberOfEnemiesKilled == 3) {
				winTotal++;
				$('#winTotal').html(winTotal);
				$('#human').css("display","none");
				$('#allCharacters').css("display","none");

				$('#human').css("display","none");
				$('#VS').css("display","none");
				$('#currentEnemy').css("display","none");
				$('#attack').css("display","none");
				$('#enemies').css("display","none");
				$('#newGame').css("display","block");
				return;
			}

			isEnemySelected = 0;
			$( "#currentEnemy").css("display", "none");
			$( "#VS").css("display", "none");
			$( "#currentEnemyCard" ).html("");
			$( '#enemyWaitingList').html("Select your next opponent");
			selectEnemy();
			readyForAttack = 0;
			attackButtonActive = true;

		//Are there enemies left??
		
		} else {
			enemyAttack();
		}
	},2000); 
	}
});


function enemyAttack() {
	//Substract enemy's COUNTER from player's HEALTH
	charactersArray[characterID].health = charactersArray[characterID].health - charactersArray[isEnemySelectedID].counterAttack;
	
	//animate the attack
	$( '#currentEnemyCard').addClass('enemyCardAttack');
	
	//List damage inflicted on the enemy
	$('#enemyDamageDealt').append("Attacks for " + charactersArray[isEnemySelectedID].counterAttack + " points");

	//wait 2 seconds, clear damage report and put playerCard back
	setTimeout(function(){
		$('#enemyDamageDealt').html("");
		$( '#currentEnemyCard').removeClass('enemyCardAttack');

		//update Health displayed under player
		rePrint = ("<div id=" + characterID + " class='card currentEnemy'><h3>" + charactersArray[characterID].name + "</h3><img src=" + imgPath + charactersArray[characterID].image + " height=200px><h4>Health: " + charactersArray[characterID].health + "</h4></div>");
		$( "#playerCard" ).html("");
		$( "#playerCard" ).append( rePrint );
		
		//check for death
		if (charactersArray[characterID].health < 1) {
			alert(charactersArray[characterID].name + " is dead!");
			lossTotal++;
			$('#lossTotal').html(lossTotal);

			//hide all elements
			$('#human').css("display","none");
			$('#allCharacters').css("display","none");
			$('#human').css("display","none");
			$('#VS').css("display","none");
			$('#currentEnemy').css("display","none");
			$('#attack').css("display","none");
			$('#enemies').css("display","none");

			//Show new game div
			$('#newGame').css("display","block");

			isEnemySelected = 0;
			$( "#currentEnemyCard" ).html("");
			$( '#eneameyWaitingList').html("Select your next opponent");
			$( '#enemyCardHolder').html("");
			selectEnemy();
			readyForAttack = 0;
			return;
		}
		attackButtonActive = true;
	},2000); 
	
}


function selectEnemy() {
	//on click, send images into the correct buckets
	$('.enemy').on('click', function(event) {
		//This is necessary to prevent mutliple enemies being selected at once
		if (isEnemySelected == 0) {
			isEnemySelected = 1;
			readyForAttack = 1;
			//determine which enemy was clicked by obtaining the array index
			isEnemySelectedID = this.id;
			// console.log("you selected the enemy " + charactersArray[isEnemySelectedID].name);
		
			//load variable to write the enemy character into the "Current Enemy" box
			var selectedEnemy = ("<div id=" + isEnemySelectedID + " class='card currentEnemy'><h3>" + charactersArray[isEnemySelectedID].name + "</h3><img src=" + imgPath + charactersArray[isEnemySelectedID].image + " height=200px><h4>Health: " + charactersArray[isEnemySelectedID].health + "</h4></div>");
			$( "#currentEnemyCard" ).append( selectedEnemy );
			$( "#currentEnemy").css("display", "block");
			$( "#VS").css("display", "block");
			$( "#attack").css("display", "block");
			$( '#enemyWaitingList').html("Waiting for their chance to kill you");
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

startGame();