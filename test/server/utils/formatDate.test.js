const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const dateFormatting = require('../../../src/server/utils/dateFormatting');

describe('dateFormatting.formatDate', () => {
  it('parses former member of parliament', () => {
    expect(dateFormatting.formatDate(new Date('1991-03-21'))).to.equal('21.3.1991')
  });
});
