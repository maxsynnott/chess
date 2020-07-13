
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('matches').del()
    .then(function () {
      // Inserts seed entries
      return knex('matches').insert([
        {
        	'white_user_id': 1,
        	'black_user_id': 2
        }, // Inits a single match
      ]);
    });
};
