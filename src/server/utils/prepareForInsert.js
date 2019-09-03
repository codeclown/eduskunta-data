const prepareForInsert = (table, row) => {
  const prepared = Object.assign({}, row);

  prepared[`${table.primaryKey}_Integer`] = parseInt(prepared[table.primaryKey]);

  table.columns.filter(column => column.type === 'date').forEach(dateColumn => {
    prepared[`${dateColumn}_Datetime`] = new Date(prepared[dateColumn]);
  });

  return prepared;
};

module.exports = prepareForInsert;
