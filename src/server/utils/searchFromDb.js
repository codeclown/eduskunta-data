const bluebird = require('bluebird');

const searchFromDb = (db, terms) => {
  terms = terms.toString().trim();

  if (!terms.length) {
    return {
      MemberOfParliament: []
    };
  }

  const MemberOfParliament = db('MemberOfParliament');
  terms.split(/\s+/g).forEach(term => {
    MemberOfParliament.orWhere('firstname', 'ilike', `%${term}%`);
    MemberOfParliament.orWhere('lastname', 'ilike', `%${term}%`);
  });

  return bluebird.props({
    MemberOfParliament
  });
};

module.exports = searchFromDb;
