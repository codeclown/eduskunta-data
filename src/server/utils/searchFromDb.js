const bluebird = require('bluebird');

const searchFromDb = (db, terms) => {
  terms = terms.toString().trim();

  if (!terms.length) {
    return {
      MemberOfParliament: [],
      SaliDBAanestys: []
    };
  }

  let MemberOfParliament = db('MemberOfParliament');
  terms.split(/\s+/g).forEach(term => {
    MemberOfParliament.orWhere('firstname', 'ilike', `%${term}%`);
    MemberOfParliament.orWhere('lastname', 'ilike', `%${term}%`);
  });
  MemberOfParliament.select(['personId', 'lastname', 'firstname']);
  MemberOfParliament = MemberOfParliament.then(members => {
    return db('parliamentGroupMemberships')
      .whereIn('personId', members.map(member => member.personId))
      .orderBy('endDate', 'desc')
      .join('parliamentGroups', 'parliamentGroups.groupId', '=', 'parliamentGroupMemberships.groupId')
      .select(['personId', 'parliamentGroupMemberships.groupId', 'endDate', 'parliamentGroups.groupName'])
      .then(groupInformation => {
        groupInformation.forEach(({ personId, endDate, groupId, groupName }) => {
          const member = members.find(member => member.personId === personId);
          if (typeof member.lastParliamentEndDate === 'undefined' || (member.lastParliamentEndDate !== null && endDate > member.lastParliamentEndDate)) {
            member.lastParliamentGroupId = groupId;
            member.lastParliamentGroupName = groupName;
            member.lastParliamentEndDate = endDate;
          }
        });
        return members;
      });
  });

  let SaliDBAanestys = db('SaliDBAanestys');
  terms.split(/\s+/g).forEach(term => {
    SaliDBAanestys.orWhere('KohtaOtsikko', 'ilike', `%${term}%`);
  });
  SaliDBAanestys.join('SaliDBAanestys__DateTime__IstuntoPvm', 'SaliDBAanestys.AanestysId', '=', 'SaliDBAanestys__DateTime__IstuntoPvm.AanestysId');
  SaliDBAanestys.join('SaliDBAanestys__DateTime__IstuntoIlmoitettuAlkuaika', 'SaliDBAanestys.AanestysId', '=', 'SaliDBAanestys__DateTime__IstuntoIlmoitettuAlkuaika.AanestysId');
  SaliDBAanestys.join('SaliDBAanestys__DateTime__IstuntoAlkuaika', 'SaliDBAanestys.AanestysId', '=', 'SaliDBAanestys__DateTime__IstuntoAlkuaika.AanestysId');
  SaliDBAanestys.join('SaliDBAanestys__DateTime__AanestysAlkuaika', 'SaliDBAanestys.AanestysId', '=', 'SaliDBAanestys__DateTime__AanestysAlkuaika.AanestysId');
  SaliDBAanestys.join('SaliDBAanestys__DateTime__AanestysLoppuaika', 'SaliDBAanestys.AanestysId', '=', 'SaliDBAanestys__DateTime__AanestysLoppuaika.AanestysId');

  return bluebird.props({
    MemberOfParliament,
    SaliDBAanestys
  });
};

module.exports = searchFromDb;
