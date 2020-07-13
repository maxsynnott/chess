const fetchMove = (endpoint, data) => {
	const axios = require('axios');

	return axios.post(endpoint, data).then(response => response.data.move)
}

const runMatch = async (match) => {
	const { Chess } = require('chess.js');
	const chess = new Chess(match.fen);

	let invalid_mover;

	// Loop until game is over or user makes an invalid move
	while (!chess.game_over() && invalid_mover == undefined) {
		// Assigns player/endpoint based on move count (even is white)
		const player = (chess.history.length % 2 == 0) ? 'white' : 'black';
		const endpoint = 'http://localhost:3001/move'; // TODO: Fetch appropriate endpoint

		const move = await fetchMove(endpoint, {
			fen: chess.fen()
		})

		// Attempts to move, if not possible then blames appropriate player and ends game
		if (!chess.move(move)) {
			invalid_mover = player;
		}
	}

	return {
		fen: chess.fen()
	}
}

module.exports = {
	runMatch
}