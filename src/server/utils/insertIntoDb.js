const insertIntoDb = (trx, table, rows) => {
  const insertToMainTable = trx.insert(rows).into(table.tableName);
  const insertToDateTimeTables = table.columns.filter(column => column.columnType === 'date').map(dateColumn => {
    const dateRows = rows.map(row => {
      const obj = {};
      obj[table.primaryKey] = row[table.primaryKey];
      obj[dateColumn.columnName] = new Date(row[dateColumn.columnName]);
      return obj;
    });
    return trx.insert(dateRows).into(`${table.tableName}__DateTime__${dateColumn.columnName}`);
  });
  return Promise.all([
    insertToMainTable,
    ...insertToDateTimeTables
  ]);
};

module.exports = insertIntoDb;
