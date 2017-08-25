$(document).ready(()=>{
	$('.playground').hide();
	var matrix = [[],[],[]];

	$('#play').on("click", ()=>{ //stat the game

		if($('.player1').val().length === 0 || $('.player1').val() === ''){
			alert('Nome do jogador 1 não inserido');
			return false;
		}
		if($('.player2').val().length === 0 || $('.player2').val() === ''){
			alert('Nome do jogador 2 não inserido');
			return false;
		}

		var activeSpaces = 0;
		var turn = ['x', 'b'];
		var currentTurn = 1;

		function changeTurn(current){
			if(current === 1){
				$('.ingame-p1').css({background: 'white'});
				$('.ingame-p2').css({background: 'gray'});
			}else{
				$('.ingame-p2').css({background: 'white'});
				$('.ingame-p1').css({background: 'gray'});
			}
		}

		function test(){ // test if game is over

			/* 	0,0  0,1  0,2

				1,0  1,1  1,2

				2,0  2,1  2,2 */

			var score = 0;

			for(var i = 0; i< 3;i++){
				if (matrix[i].length !== 3)
					continue;
				score = matrix[i].reduce((b,c)=>{
					return b + c;
				});
				if(score === -3){
					return 1;
				}else if(score === 3){
					return 2;
				}
			}
			
			for(var i = 0; i< 3;i++){
				score = 0;
				for(var j = 0; j< 3;j++){
					score += matrix[j][i] === NaN ? 0:matrix[j][i];
				}
				if(score === -3){
					return 1;
				}else if(score === 3){
					return 2;
				}
			}

			score = 0;

			for(var i = 0; i< 3;i++){
				score += matrix[i][i]
			}

			if(score === -3){
				return 1;
			}else if(score === 3){
				return 2;
			}

			score = 0;

			for(var i = 2, j = 0; i > 0, j < 3; i--, j++){
					score += matrix[j][i]
			}

			if(score === -3){
				return 1;
			}else if(score === 3){
				return 2;
			}
			
			return false;// if game is not over, continue
		}

		function config(){
			$('.config').show();
			$('.playground').hide();
		}

		function playground(){
			$('.config').hide();
			$('.playground').show();
		}

		function gameOver(winner){ //function to call when game is over
			var winnerName = $('.player'+winner).val()
			alert("Player " + winnerName + " wins!");
			location.reload();
		}

		function play(target){ // every time a player plays his turn, this function is called
			target.addClass(turn[currentTurn-1]).addClass("active").css({background: "url(imgs/"+turn[currentTurn-1]+".png)"});
			changeTurn(currentTurn);
			matrix[target.parent().index()][target.index()] = currentTurn === 1 ? -1:1;
			if(activeSpaces >= 5){//test if game is over
				result = test();
				if(result !== false){
					gameOver(result);
					return;
				}
			}
			if(currentTurn === 1)
				currentTurn = 2;
			else
				currentTurn = 1;
		}	

		$('.ingame-p1').text($('.player1').val());
		$('.ingame-p2').text($('.player2').val());

		playground();

		$('.ingame-p1').css({background: 'gray'});

		$('.game').on('click', (e)=>{
			if($(e.target).hasClass("j")){	
				if(activeSpaces <= 8){
					if( !($(e.target).hasClass("active")) ){
						activeSpaces++;	
						play($(e.target));
					}
				}	
			}
		});
	});
});