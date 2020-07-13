const express = require('express');

const router = express.Router();

const knex = require('../../db/knex');

router.get('/', (req, res) => {
	const query = knex('matches');

	query.then((matches) => {
		res.json(matches);
	});
});

module.exports = router;