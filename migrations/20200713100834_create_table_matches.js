
exports.up = function(knex) {
  return knex.schema.createTable('matches', (table) => {
  	table.increments();
  	table.string('fen').defaultTo('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('matches');
};
