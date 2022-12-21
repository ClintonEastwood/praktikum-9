var ogboard;
const hplayer = 'O';
const aimbot = 'X';
const kombinasi = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]


const cells = document.querySelectorAll('.cell');
        start();

    function start() {
	    document.querySelector(".lastgame").style.display = "none";
	    ogboard = Array.from(Array(9).keys());
	    for (var i = 0; i < cells.length; i++) {
		    cells[i].innerText = '';
		    cells[i].style.removeProperty('background-color');
		    cells[i].addEventListener('click', klik, false);
	    }
    }

    function klik(square) {
	    if (typeof ogboard[square.target.id] == 'number') {
		    turn(square.target.id, hplayer)
		if (!cekkemenangan(ogboard, hplayer) && !cekseri()) turn(spot(), aimbot);
	    }
    }

    function turn(squareId, player) {
	    ogboard[squareId] = player;
	    document.getElementById(squareId).innerText = player;
	    let pemenang = cekkemenangan(ogboard, player)
	    if (pemenang) gameover(pemenang)
    }

    function cekkemenangan(board, player) {
	    let plays = board.reduce((a, e, i) =>
		(e === player) ? a.concat(i) : a, []);
	    let pemenang = null;
	    for (let [index, win] of kombinasi.entries()) {
		    if (win.every(elem => plays.indexOf(elem) > -1)) {
			pemenang = {index: index, player: player};
			break;
		}
	}
	return pemenang;
    }

    function gameover(pemenang) {
	    for (let index of kombinasi[pemenang.index]) {
		    document.getElementById(index).style.backgroundColor =
			pemenang.player == hplayer ? "blue" : "red";
	    }
	    for (var i = 0; i < cells.length; i++) {
		    cells[i].removeEventListener('click', klik, false);
	    }
	deklarasipemenang(pemenang.player == hplayer ? "Anda Menang!" : "Anda Kalah.");
    }

    function deklarasipemenang(who) {
	document.querySelector(".lastgame").style.display = "block";
	document.querySelector(".lastgame .text").innerText = who;      
    }

    function blokkosong() {
	return ogboard.filter(s => typeof s == 'number');
    }

    function spot() {
	return minimax(ogboard, aimbot).index;
    }

    function cekseri() {
	if (blokkosong().length == 0) {
		for (var i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "green";
			cells[i].removeEventListener('click', klik, false);
		}
		deklarasipemenang("Seri!")
		return true;
	}
	return false;
    }

    function minimax(boardbaru, player) {
	    var blocktersedia = blokkosong();

	if (cekkemenangan(boardbaru, hplayer)) {
		return {score: -10};
	} 
    else if (cekkemenangan(boardbaru, aimbot)) {
		return {score: 10};
	} 
    else if (blocktersedia.length === 0) {
		return {score: 0};
	}
	var turnm = [];
	for (var i = 0; i < blocktersedia.length; i++) {
		var move = {};
		move.index = boardbaru[blocktersedia[i]];
		boardbaru[blocktersedia[i]] = player;

		if (player == aimbot) {
			var result = minimax(boardbaru, hplayer);
			move.score = result.score;
		} else {
			var result = minimax(boardbaru, aimbot);
			move.score = result.score;
		}

		boardbaru[blocktersedia[i]] = move.index;

		turnm.push(move);
	}



	var pilihanterbaik;
	if(player === aimbot) {
		var scoreterbaik = -10000;
		for(var i = 0; i < turnm.length; i++) {
			if (turnm[i].score > scoreterbaik) {
				scoreterbaik = turnm[i].score;
				pilihanterbaik = i;
			}
		}
	} else {
		var scoreterbaik = 10000;
		for(var i = 0; i < turnm.length; i++) {
			if (turnm[i].score < scoreterbaik) {
				scoreterbaik = turnm[i].score;
				pilihanterbaik = i;
			}
		}
	}

	return turnm[pilihanterbaik];
    }  






