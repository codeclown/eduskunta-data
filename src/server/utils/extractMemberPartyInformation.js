const cheerio = require('cheerio');

const parseDate = dateString => {
  const [day, month, year] = dateString.split('.');
  return new Date(`${year}-${month}-${day}`);
};

const extractMemberPartyInformation = XmlDataFi => {
  const $ = cheerio.load(XmlDataFi);

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
  ].filter(group => group !== null);
};

module.exports = extractMemberPartyInformation;
