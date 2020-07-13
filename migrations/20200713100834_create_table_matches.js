
exports.up = function(knex) {
  return knex.schema.createTable('matches', (table) => {
  	table.increments();
  	table.string('fen');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('matches');
};
