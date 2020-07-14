const express = require('express');

const router = express.Router();

const knex = require('../../db/knex');

// index
router.get('/', (req, res) => {
	const query = knex
		.select('*')
		.from('matches');

	query.then((matches) => {
		res.json(matches);
	});
});

// show
router.get('/:id', (req, res, next) => {
	const query = knex
		.select('*')
		.from('matches')
		.where('id', req.params.id)
		.limit(1)
		.first();

	query.then((match) => {
		if (match) {
			res.json(match);
		} else {
			next();
		}
	})
});

// create
router.post('/', (req, res) => {
	const query = knex
		.returning('*')
		.insert({
			// To be replaced with matchmaking logic
			'white_user_id': 1,
      'black_user_id': 2
    })
		.into('matches');

	query.then((match) => {
		res.json(match[0])
	})
})

// run match
router.post('/run', (req, res) => {
	const { runMatch } = require('../../services/matches');

	const query = knex
		.select('*')
		.from('matches')
		.where('id', req.body.id)
		.limit(1)
		.first();

	query // Fetch match
		.then(runMatch) // then run the match (equivalent to: match => runMatch(match))
		.then((data) => { // then update the match
			return knex('matches')
				.returning('*')
				.where('id', req.body.id)
				.update(data);
		})
		.then(matches => res.json(matches[0])) // then return the match as json
});

module.exports = router;
