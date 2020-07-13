const axios = require('axios');

const fetchMove = (endpoint, data) => {
	return axios.post(endpoint, data).then(response => response.data.move)
}

const runMatch = async (match) => {
	const { Chess } = require('chess.js');
	const chess = new Chess(match.fen);

	const response = await axios.get(`http://localhost:4000/api/v1/users?ids=${match.white_user_id},${match.black_user_id}`)
	const users = response.data

	match.white_user = users[0]
	match.black_user = users[1]

	let invalid_mover;

	// Loop until game is over or user makes an invalid move
	while (!chess.game_over() && invalid_mover == undefined) {
		// Assigns player/endpoint based on move count (even is white)
		const player = (chess.history.length % 2 == 0) ? 'white' : 'black';
		const endpoint = match[`${player}_user`]['endpoint'];

		const move = await fetchMove(endpoint, {
			fen: chess.fen()
		})

		// Attempts to move, if not possible then blames appropriate player and ends game
		if (!chess.move(move)) {
			invalid_mover = player;
		}
	}

	return {
		fen: chess.fen(),
		history: chess.history()
	}
}

module.exports = {
	runMatch
}