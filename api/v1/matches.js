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
		.insert({})
		.into('matches');

	query.then((match) => {
		res.json(match)
	})
})

// run match (Too nested and cofusing, rework this)
router.post('/run', (req, res) => {
	const { runMatch } = require('../../services/matches');

	const query = knex
		.select('*')
		.from('matches')
		.where('id', req.body.id)
		.limit(1)
		.first();

	// Fetch match
	// then run the match
	// then update the match
	// then display the match as json
	query
		.then(runMatch)
		.then((data) => {
			return knex('matches')
				.returning('*')
				.where('id', req.body.id)
				.update(data)
		})
		.then(matches => res.json(matches[0]))
});

module.exports = router;
