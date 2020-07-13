
exports.up = function(knex) {
  return knex.schema.table('matches', (table) => {
  	table.integer('white_user_id');
  	table.integer('black_user_id');
  })
};

exports.down = function(knex) {
  return knex.schema.table('matches', (table) => {
    table.dropColumn('white_user_id');
    table.dropColumn('black_user_id');
  });
};
