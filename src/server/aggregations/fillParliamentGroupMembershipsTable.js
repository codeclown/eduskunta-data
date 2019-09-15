const bluebird = require('bluebird');
const cheerio = require('cheerio');

const parseDate = dateString => {
  const [day, month, year] = dateString.split('.');
  return new Date(`${year}-${month}-${day}`);
};

const extractParliamentGroupInformation = XmlDataFi => {
  const $ = cheerio.load(XmlDataFi, { xml: true });

  const EdellisetEduskuntaryhmat = $('EdellisetEduskuntaryhmat > Eduskuntaryhma').map((index, Eduskuntaryhma) => {
    const groupName = $(Eduskuntaryhma).find('> Nimi').text();
    const groupId = $(Eduskuntaryhma).find('> Tunnus').text();
    if (groupName === '') {
      return null;
    }
    return $(Eduskuntaryhma).find('Jasenyys').map((index, Jasenyys) => {
      return {
        groupName,
        groupId,
        startDate: parseDate($(Jasenyys).find('AlkuPvm').text()),
        endDate: parseDate($(Jasenyys).find('LoppuPvm').text())
      };
    }).get();
  }).get();

  const NykyinenEduskuntaryhma = $('NykyinenEduskuntaryhma > Nimi').text() === '' ? null : {
    groupName: $('NykyinenEduskuntaryhma > Nimi').text(),
    groupId: $('NykyinenEduskuntaryhma > Tunnus').text(),
    startDate: parseDate($('NykyinenEduskuntaryhma > AlkuPvm').text()),
    endDate: null
  };

  return [
    ...EdellisetEduskuntaryhmat,
    NykyinenEduskuntaryhma
  ]
    .filter(group => group !== null)
    // detect invalid dates (https://stackoverflow.com/a/1353711/239527)
    .filter(group => !group.startDate || !isNaN(group.startDate.getTime()))
    .filter(group => !group.endDate || !isNaN(group.endDate.getTime()));
};

const fillParliamentGroupMembershipsTable = (trx, out) => {
  return Promise.all([
    trx('parliamentGroupMemberships').truncate(),
    trx('parliamentGroups').truncate()
  ])
    .then(() => trx('MemberOfParliament'))
    .then(members => {
      out.write(`Starting to process ${members.length} members\n`);
      return bluebird.map(members, member => {
        const memberships = extractParliamentGroupInformation(member.XmlDataFi);
        return trx.transaction(trx =>
            Promise.all(memberships.map(membership =>
              trx.raw(`INSERT INTO "parliamentGroups" ("groupId", "groupName") VALUES (?, ?) ON CONFLICT ("groupId") DO NOTHING`, [membership.groupId, membership.groupName])
                .then(() =>
                  trx('parliamentGroupMemberships')
                    .insert({
                      personId: member.personId,
                      groupId: membership.groupId,
                      startDate: membership.startDate,
                      endDate: membership.endDate
                    })
                )
            ))
        ).catch(error => {
          out.write('\n');
          out.write(`Error: ${error}\n`);
          out.write('\n');
          out.write(`${member.XmlDataFi}\n`);
          out.write('\n');
        }).then(() => {
          out.write('.');
        });
      }, { concurrency: 100 });
    })
    .then(() => {
      out.write('\n');
      out.write('Done!\n');
    });
};

module.exports = fillParliamentGroupMembershipsTable;
