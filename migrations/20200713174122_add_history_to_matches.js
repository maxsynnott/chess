
exports.up = function(knex) {
  return knex.schema.table('matches', (table) => {
  	table.specificType('history', 'text[]');
  })
};

exports.down = function(knex) {
  return knex.schema.table('matches', (table) => {
    table.dropColumn('history');
  });
};
