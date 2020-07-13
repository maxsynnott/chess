const express = require('express');

const router = express.Router();

const knex = require('../../db/knex');

router.get('/', (req, res) => {
	const query = knex
		.select('*')
		.from('matches');

	query.then((matches) => {
		res.json(matches);
	});
});

router.get('/:id', (req, res, next) => {
	const query = knex
		.select('*')
		.from('matches')
		.where('id', req.params.id)
		.limit(1)
		.first()

	query.then((match) => {
		if (match) {
			res.json(match);
		} else {
			next();
		}
	})
});

module.exports = router;
