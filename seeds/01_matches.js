
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('matches').del()
    .then(function () {
      // Inserts seed entries
      return knex('matches').insert([
        {}, // Inits a single match with default values
      ]);
    });
};
