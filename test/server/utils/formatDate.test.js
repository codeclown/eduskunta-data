const fs = require('fs');
const path = require('path');
const { expect } = require('chai');
const dateFormatting = require('../../../src/server/utils/dateFormatting');

describe('dateFormatting.formatDate', () => {
  it('formats date', () => {
    expect(dateFormatting.formatDate(new Date('1991-03-21'))).to.equal('21.3.1991')
  });
});

describe('dateFormatting.formatTime', () => {
  it('formats time', () => {
    expect(dateFormatting.formatTime(new Date('1991-03-21 10:05:40'))).to.equal('10:05')
    expect(dateFormatting.formatTime(new Date('1991-03-21 10:15:40'))).to.equal('10:15')
  });
});
