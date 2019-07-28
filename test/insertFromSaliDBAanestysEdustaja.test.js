const { expect } = require('chai');
const getDb = require('../src/db');

describe('insertFromSaliDBAanestysEdustaja', () => {
  let db;
  before(() => getDb('testing').then(_db => (db = _db)));
  after(() => db.destroy());

  it('creates a matching row in SaliDBAanestysEdustaja', () => {
    const row = {
      EdustajaId: '2736692',
      AanestysId: '13259',
      EdustajaEtunimi: 'Markus',
      EdustajaSukunimi: 'Aaltonen',
      EdustajaHenkiloNumero: '102',
      EdustajaRyhmaLyhenne: 'sd',
      EdustajaAanestys: 'Jaa',
      Imported: '2018-02-05 11:49:36.328432'
    };
    return insertFromSaliDBAanestysEdustaja(db, [row]).then(() =>
      db('SaliDBAanestysEdustaja').then(rows => {
        expect(rows).to.deep.equal([
          row
        ]);
      })
    );
  });

  it('creates multiple rows at once', () => {
    const row = {
      EdustajaId: '2736692',
      AanestysId: '13259',
      EdustajaEtunimi: 'Markus',
      EdustajaSukunimi: 'Aaltonen',
      EdustajaHenkiloNumero: '102',
      EdustajaRyhmaLyhenne: 'sd',
      EdustajaAanestys: 'Jaa',
      Imported: '2018-02-05 11:49:36.328432'
    };
    return insertFromSaliDBAanestysEdustaja(db, [row, row]).then(() =>
      db('SaliDBAanestysEdustaja').then(rows => {
        expect(rows).to.deep.equal([
          row,
          row
        ]);
      })
    );
  });

  it('creates a matching Date-casted row in SaliDBAanestysEdustaja_Imported', () => {
    const row = {
      EdustajaId: '2736692',
      AanestysId: '13259',
      EdustajaEtunimi: 'Markus',
      EdustajaSukunimi: 'Aaltonen',
      EdustajaHenkiloNumero: '102',
      EdustajaRyhmaLyhenne: 'sd',
      EdustajaAanestys: 'Jaa',
      Imported: '2018-02-05 11:49:36.328432'
    };
    return insertFromSaliDBAanestysEdustaja(db, [row]).then(() =>
      db('SaliDBAanestysEdustaja_Imported').then(rows => {
        expect(rows).to.deep.equal([
          {
            EdustajaId: '2736692',
            Imported: new Date('2018-02-05 11:49:36.328432')
          }
        ]);
      })
    );
  }));

  it('creates a edustaja-row in edustajat', () => {
    const row = {
      EdustajaId: '2736692',
      AanestysId: '13259',
      EdustajaEtunimi: 'Markus',
      EdustajaSukunimi: 'Aaltonen',
      EdustajaHenkiloNumero: '102',
      EdustajaRyhmaLyhenne: 'sd',
      EdustajaAanestys: 'Jaa',
      Imported: '2018-02-05 11:49:36.328432'
    };
    return insertFromSaliDBAanestysEdustaja(db, [row]).then(() =>
      db('edustajat').then(rows => {
        expect(rows).to.deep.equal([
          {
            id: '1234-1234-1234-1234',
            firstName: 'Markus',
            lastName: 'Aaltonen'
          }
        ]);
      })
    );
  }));

  it('does not create a edustaja-row if one exists already, based on EdustajaHenkiloNumero', () => {
    const row = {
      EdustajaId: '2736692',
      AanestysId: '13259',
      EdustajaEtunimi: 'Markus',
      EdustajaSukunimi: 'Aaltonen',
      EdustajaHenkiloNumero: '102',
      EdustajaRyhmaLyhenne: 'sd',
      EdustajaAanestys: 'Jaa',
      Imported: '2018-02-05 11:49:36.328432'
    };
    return insertFromSaliDBAanestysEdustaja(db, [row, row]).then(() =>
      db('edustajat').then(rows => {
        expect(rows).to.deep.equal([
          {
            id: '1234-1234-1234-1234',
            firstName: 'Markus',
            lastName: 'Aaltonen'
          }
        ]);
      })
    );
  }));
});
