exports.up = knex => Promise.all([
  knex.schema.createTable('parliamentGroups', table => {
    table.string('groupId').primary();
    table.string('groupName');
  }),
  knex.schema.createTable('parliamentGroupMemberships', table => {
    table.string('personId').index('idx_parliamentGroupMemberships_personId');
    table.string('groupId').index('idx_parliamentGroupMemberships_groupId');
    table.date('startDate');
    table.date('endDate').nullable();
  })
]);

exports.down = knex => Promise.all([
  knex.schema.dropTable('parliamentGroups'),
  knex.schema.dropTable('parliamentGroupMemberships')
]);
